let nome;
let type;
let from;
let text;
let time;
let to;
let entrar;

function perguntaNome() {
  nome = prompt("Qual o seu nome?");
}

function entrarNoChat() {
  let nomeServidor = {
    name: `${nome}`,
  };

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    nomeServidor
  );

  promise.then(nomeDisponivel);
  promise.catch(nomeIndisponivel);
}

function nomeDisponivel(resposta) {
  console.log(resposta.status);
  console.log("nome disponivel");
}

function nomeIndisponivel(resposta) {
  console.log(resposta.response.status);
  if (resposta.response.status === 400) {
    funcionamento();
  }
}

function manterConexao() {
  let nomeconectado = {
    name: `${nome}`,
  };

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    nomeconectado
  );
}

function pegarMensagens() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );

  promise.then(printarMensagens);
}

function printarMensagens(mensagem) {
  const msg = mensagem.data;

  for (let i = 0; i < msg.length; i++) {
    from = msg[i].from;
    text = msg[i].text;
    time = msg[i].time;
    to = msg[i].to;
    type = msg[i].type;
    console.log(from, text, time, to, type);
  }

  tipoDeMensagem();
}

function tipoDeMensagem() {
  let entrada = document.querySelector(".corpo");
  let comparar = document.querySelector(".corpo").lastChild.innerHTML;
  entrar = `\n          <p><b>(${time})</b> <strong> ${from} </strong> ${text}</p>\n      `;
  if (type === "status") {
    if (comparar !== entrar) {
      entrada.innerHTML += `
      <div class="entrou">
          <p><b>(${time})</b> <strong> ${from} </strong> ${text}</p>
      </div>`;
    }
  }
}

function listaUsuarios() {
  let dataAtual = new Date();
  let hora = dataAtual.getHours();
  let min = dataAtual.getMinutes();
  let sec = dataAtual.getSeconds();
  let entrada = document.querySelector(".corpo");
  entrada.innerHTML = `
    <div class="entrou">
        <p><b>(${hora}:${min}:${sec})</b> <strong> ${nome} </strong> entra na sala...</p>
    </div>`;
}

function funcionamento() {
  perguntaNome();
  entrarNoChat();
  listaUsuarios();
  setInterval(manterConexao, 5000);
  pegarMensagens();
  setInterval(pegarMensagens, 3000);
}

funcionamento();
