// 讯飞超拟人语音合成（super smart-tts）：返回 mp3 Buffer
// 凭证从环境变量读取（backend/.env），不写死在代码里
const WebSocket = require('ws');
const crypto = require('crypto');

const APPID = process.env.XFYUN_APPID;
const APIKEY = process.env.XFYUN_APIKEY;
const APISECRET = process.env.XFYUN_APISECRET;

const HOST = 'cbm01.cn-huabei-1.xf-yun.com';
const PATH = '/v1/private/mcd9m97e6';
const VOICE = 'x5_lingxiaotang_flow'; // 聆小糖（普通话女声）

function base64(s) {
  return Buffer.from(s, 'utf8').toString('base64');
}

// 生成带鉴权签名的 WebSocket 地址
function buildUrl() {
  const date = new Date().toUTCString();
  const signOrigin = `host: ${HOST}\ndate: ${date}\nGET ${PATH} HTTP/1.1`;
  const signature = crypto.createHmac('sha256', APISECRET).update(signOrigin).digest('base64');
  const authOrigin = `api_key="${APIKEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
  const authorization = base64(authOrigin);
  return `wss://${HOST}${PATH}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${HOST}`;
}

// 合成文本为 mp3
function generate(text) {
  return new Promise((resolve, reject) => {
    if (!APPID || !APIKEY || !APISECRET) {
      return reject(new Error('未配置讯飞凭证（请在 backend/.env 填写 APPID/APIKey/APISecret）'));
    }
    const ws = new WebSocket(buildUrl());
    const segs = [];
    const timer = setTimeout(() => { try { ws.close(); } catch (e) {} reject(new Error('语音合成超时，请检查网络')); }, 30000);

    ws.on('open', () => {
      console.log('[TTS] 发音人 =', VOICE, '| 文本长度 =', text.length);
      const frame = {
        header: { app_id: APPID, status: 2 },
        parameter: {
          oral: { oral_level: 'mid', stop_split: 1, remain: 1 },
          tts: {
            vcn: VOICE,
            speed: 50,
            volume: 50,
            pitch: 50,
            bgs: 0,
            audio: { encoding: 'lame', sample_rate: 24000, channels: 1, bit_depth: 16, frame_size: 0 },
          },
        },
        payload: {
          text: { encoding: 'utf8', compress: 'raw', format: 'plain', status: 2, seq: 0, text: base64(text) },
        },
      };
      ws.send(JSON.stringify(frame));
    });

    ws.on('message', (data) => {
      let msg;
      try { msg = JSON.parse(data.toString()); } catch (e) { return; }
      if (msg.header && msg.header.code !== undefined && msg.header.code !== 0) {
        clearTimeout(timer);
        try { ws.close(); } catch (e) {}
        return reject(new Error(msg.header.message || '语音合成失败'));
      }
      const a = msg.payload && msg.payload.audio;
      if (a && a.audio) segs.push({ seq: a.seq || 0, buf: Buffer.from(a.audio, 'base64') });
      if (a && a.status === 2) {
        clearTimeout(timer);
        try { ws.close(); } catch (e) {}
        segs.sort((x, y) => x.seq - y.seq);
        resolve(Buffer.concat(segs.map((s) => s.buf)));
      }
    });

    ws.on('error', (err) => { clearTimeout(timer); reject(err); });
  });
}

module.exports = { generate };
