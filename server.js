'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { WebSocketServer } = require('ws');

const port = Number(process.env.PORT || 8080);
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
    fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
    return;
  }
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'websocket-smoke-test' }));
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 4096, perMessageDeflate: false });
wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'ready', note: 'WebSocket conectado; isto não é Minecraft.' }));
  socket.on('message', (data) => {
    socket.send(JSON.stringify({ type: 'echo', value: data.toString('utf8') }));
  });
});
server.listen(port, '0.0.0.0', () => console.log(`Smoke test listening on 0.0.0.0:${port}`));
