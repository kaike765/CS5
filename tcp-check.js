'use strict';
const net = require('node:net');
const DEFAULT_HOST = 'gustavoklucinec.aternos.me';
const DEFAULT_PORT = 58275;
const [host = DEFAULT_HOST, portText = String(DEFAULT_PORT)] = process.argv.slice(2);
const port = Number(portText);
if (!host || !Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Uso: node tcp-check.js <host-aternos> <porta>');
  process.exit(2);
}
const socket = net.createConnection({ host, port, timeout: 7000 });
socket.once('connect', () => {
  console.log(`TCP alcançável: ${host}:${port}`);
  console.log('Apenas conectou e desconectou; nenhum login ou pacote Minecraft foi enviado.');
  socket.end();
});
socket.once('timeout', () => { console.error('Timeout ao abrir TCP.'); socket.destroy(); process.exitCode = 1; });
socket.once('error', (err) => { console.error(`Falha TCP: ${err.code || err.message}`); process.exitCode = 1; });
