// 语音朗读：统一使用讯飞云端真人语音（聆小璇），后端合成 mp3 后播放
import { ref, onUnmounted } from 'vue';

export function useSpeech() {
  const speakingId = ref(null);
  let currentAudio = null;

  function stop() {
    if (currentAudio) {
      try { currentAudio.pause(); } catch (e) {}
      currentAudio = null;
    }
    speakingId.value = null;
  }

  function speak(text, id = 'default') {
    if (speakingId.value === id) { stop(); return; } // 再点一次 = 停止
    stop();
    // 换行/段落 → 转成句号，强制 TTS 在这里停顿（讯飞不把换行当停顿）
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
        if (!res.ok) {
          let msg = '语音合成失败';
          try { msg = (await res.json()).error || msg; } catch (e) {}
          throw new Error(msg);
        }
        return res.blob();
      })
      .then((blob) => {
        const audio = new Audio(URL.createObjectURL(blob));
        currentAudio = audio;
        audio.onended = () => { if (speakingId.value === id) speakingId.value = null; currentAudio = null; };
        audio.onerror = () => { speakingId.value = null; currentAudio = null; };
        audio.play();
      })
      .catch((e) => {
        alert('语音播放失败：' + e.message + '（请确认服务已启动、网络正常）');
        speakingId.value = null;
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
