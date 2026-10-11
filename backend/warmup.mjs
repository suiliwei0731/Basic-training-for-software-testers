// 预热脚本：把所有关卡的朗读内容一次性调用讯飞合成并保存为本地 mp3
// 文本处理逻辑与前端 useSpeech.js / LessonBlock.vue 完全一致，保证缓存命中
import 'dotenv/config';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const tts = require('./tts.js');
import { LEVELS } from '../frontend/src/data/levels.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ttsDir = path.join(__dirname, 'data', 'tts');
fs.mkdirSync(ttsDir, { recursive: true });

// —— 以下逻辑复刻前端 ——
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function formatMd(text) {
  let html = text;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, __, code) => `<pre>${escapeHtml(code.trim())}</pre>`);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/((?:\|.+\|?\n)+)/g, (table) => {
    const rows = table.trim().split('\n').filter((r) => r.includes('|'));
    if (rows.length < 2) return table;
    const isSep = (r) => /^\|[\s\-:|]+\|$/.test(r.trim());
    let out = '<table>';
    rows.forEach((r, i) => {
      if (isSep(r)) return;
      const cells = r.split('|').slice(1, -1).map((c) => c.trim());
      const tag = i === 0 ? 'th' : 'td';
      out += '<tr>' + cells.map((c) => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
    });
    return out + '</table>';
  });
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.startsWith('<') ? l : `<p>${l}</p>`).join('');
  return html;
}
function htmlToText(html) {
  let s = String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(li|p|div|h[1-6]|tr|blockquote|pre)>/gi, '\n');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  s = s.replace(/\r/g, '').replace(/[ \t]+/g, ' ').replace(/[ \t]*\n[ \t]*/g, '\n').replace(/\n{2,}/g, '\n');
  return s.trim();
}
const clean = (text) => String(text || '')
  .replace(/\r/g, '')
  .replace(/[ \t]+/g, ' ')
  .replace(/(?:[ \t]*\n[ \t]*)+/g, '。')
  .replace(/^。+|。+$/g, '')
  .trim();

// 收集所有会被朗读的文本（去重）
const texts = new Set();
for (const lv of LEVELS) {
  for (const b of (lv.blocks || [])) {
    if (b.type === 'lesson' && b.body) {
      texts.add(clean(htmlToText(formatMd(b.body))));
    } else if (b.type === 'quiz' && Array.isArray(b.questions)) {
      b.questions.forEach((q, i) => {
        const opts = (q.options || []).map((o, j) => `选项${String.fromCharCode(65 + j)}，${o}`).join('。');
        texts.add(clean(`第${i + 1}题。${q.q}。${opts}`));
      });
    }
  }
}
const list = [...texts].filter((t) => t && t.trim());
console.log(`共 ${list.length} 段朗读内容，开始合成...`);

let done = 0, skip = 0, fail = 0;
for (const text of list) {
  const hash = crypto.createHash('md5').update(text, 'utf8').digest('hex');
  const file = path.join(ttsDir, hash + '.mp3');
  if (fs.existsSync(file)) { skip++; continue; }
  try {
    const buf = await tts.generate(text);
    fs.writeFileSync(file, buf);
    done++;
    console.log(`  ✓ [${done + skip}/${list.length}] ${text.slice(0, 24).replace(/\n/g, ' ')}...`);
  } catch (e) {
    fail++;
    console.error(`  ✗ 失败: ${text.slice(0, 30).replace(/\n/g, ' ')} | ${e.message}`);
  }
}
console.log(`\n完成：新增 ${done} 个，已存在跳过 ${skip} 个，失败 ${fail} 个`);
console.log(`缓存目录：${ttsDir}`);
