# Teste de conectividade do Codespaces (não é ponte Minecraft)

Este pacote testa duas coisas isoladas:

1. Se um browser consegue abrir um WebSocket (`/ws`) no Codespace.
2. Se o Codespace consegue abrir uma conexão TCP simples até o endereço/porta do Aternos.

**Não é BungeeCord/Velocity, não inclui EaglerXServer, não implementa protocolo Minecraft/Eaglercraft e não faz autenticação.** Um resultado positivo de TCP/WebSocket não significa que o cliente Eaglercraft conseguirá entrar no Aternos. Em particular, isso não fornece uma sessão oficial Microsoft/Java.

## Rodar no GitHub Codespaces

1. Extraia o ZIP e coloque os arquivos em um repositório GitHub seu.
2. No repositório, escolha **Code → Codespaces → Create codespace**.
3. Aguarde o `npm install` do devcontainer terminar. Se necessário, execute `npm start` no terminal.
4. Abra a porta encaminhada **8080**. O Codespace deve abrir a página de teste; clique **Conectar** e depois **Enviar ping**. Uma resposta `echo` confirma somente o WebSocket.
5. Para testar alcance TCP ao Aternos, use o hostname e a porta atuais mostrados no painel:

   `node tcp-check.js`

   O destino padrão deste pacote é `gustavoklucinec.aternos.me:58275`. Para usar outro endereço, passe `node tcp-check.js HOST PORT`.

O teste TCP apenas abre e fecha uma conexão; não envia credenciais nem pacotes de login. O hostname/porta podem mudar conforme o endereço fornecido pelo Aternos.

## Interpretação

- WebSocket funciona + TCP funciona: o Codespace alcança os dois transportes básicos; ainda não prova compatibilidade de protocolo nem autenticação.
- TCP falha: a rota/porta não está acessível a partir desse ambiente, ou o servidor Aternos não está online.
- Para jogar no Aternos mantendo autenticação oficial, use o cliente Java oficial. Este pacote não altera as configurações de autenticação do servidor.
