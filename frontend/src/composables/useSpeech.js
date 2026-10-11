// 语音朗读：优先播后端缓存的真人 mp3；没有缓存时回退浏览器内置语音
import { ref, onUnmounted } from 'vue';

export function useSpeech() {
  const speakingId = ref(null);
  let currentAudio = null;

  function stop() {
    if (currentAudio) {
      try { currentAudio.pause(); } catch (e) {}
      currentAudio = null;
    }
    // 停止浏览器本地语音
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    speakingId.value = null;
  }

  // 浏览器本地语音朗读（兜底）
  function speakLocal(text, id) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      speakingId.value = null;
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 1;
    u.onend = () => { if (speakingId.value === id) speakingId.value = null; };
    u.onerror = () => { speakingId.value = null; };
    window.speechSynthesis.speak(u);
  }

  function speak(text, id = 'default') {
    if (speakingId.value === id) { stop(); return; } // 再点一次 = 停止
    stop();
    // 换行/段落 → 转成句号，让朗读在这里停顿
    const clean = (text || '')
      .replace(/\r/g, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/(?:[ \t]*\n[ \t]*)+/g, '。')
      .replace(/^。+|。+$/g, '')
      .trim();
    if (!clean) return;
    speakingId.value = id;

    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: clean }),
    })
      .then(async (res) => {
        if (!res.ok) return null; // 无缓存/失败 → 走本地语音
        return res.blob();
      })
      .then((blob) => {
        if (!blob) { speakLocal(clean, id); return; }
        const audio = new Audio(URL.createObjectURL(blob));
        currentAudio = audio;
        audio.onended = () => { if (speakingId.value === id) speakingId.value = null; currentAudio = null; };
        audio.onerror = () => { speakingId.value = null; currentAudio = null; };
        audio.play();
      })
      .catch(() => {
        // 后端连不上等异常 → 直接本地语音
        speakLocal(clean, id);
      });
  }

  onUnmounted(stop);

  return { speakingId, speak, stop };
}

export function htmlToText(html) {
  const div = document.createElement('div');
  // 给换行标签、块级元素之间插入换行符，避免列表/段落被读成一整句
  div.innerHTML = (html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(li|p|div|h[1-6]|tr|blockquote|pre)>/gi, '\n');
  let text = (div.textContent || '').replace(/\r/g, '');
  // 压缩行内多余空格，保留换行（行首行尾的空格去掉）
  text = text.replace(/[ \t]+/g, ' ').replace(/[ \t]*\n[ \t]*/g, '\n').replace(/\n{2,}/g, '\n');
  return text.trim();
}
