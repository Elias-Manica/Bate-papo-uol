let nome;
let type;
let from;
let text;
let time;
let to;
let entrar;
let tipo;
let para;
let msg;
let texto;
let mensagemEscrita;

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
    alert("Esse nome já está sendo utilizado, digite outro");
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
  msg = mensagem.data;

  console.log(msg);
  let entrada = document.querySelector(".corpo");
  let indexEu = 99;
  entrada.innerHTML = "";
  for (let i = 0; i < msg.length; i++) {
    tipo = msg[i].type;
    para = msg[i].to;
    if (indexEu !== 99) {
      console.log(indexEu);
      if (tipo === "message") {
        if (para === "Todos") {
          entrada.innerHTML += `
          <div class="global">
            <p><b>(${msg[i].time})</b> <strong> ${msg[i].from} </strong> para ${msg[i].to}: ${msg[i].text}</p>
          </div>`;
          let ultimoElemento = document.querySelector(".corpo").lastChild;
          ultimoElemento.scrollIntoView();
        } else if (para !== "Todos") {
          if (para === nome || msg[i].from === nome) {
            entrada.innerHTML += `
            <div class="privado">
              <p><b>(${msg[i].time})</b> <strong> ${msg[i].from} </strong> para ${msg[i].to}: ${msg[i].text}</p>
            </div>`;
            let ultimoElemento = document.querySelector(".corpo").lastChild;
            ultimoElemento.scrollIntoView();
          }
        }
      } else if (tipo === "status") {
        entrada.innerHTML += `
          <div class="entrou">
              <p><b>(${msg[i].time})</b> <strong> ${msg[i].from} </strong> ${msg[i].text}</p>
          </div>`;
        let ultimoElemento = document.querySelector(".corpo").lastChild;
        ultimoElemento.scrollIntoView();
      }
    }
    if (indexEu === 99) {
      if (msg[i].from === nome) {
        indexEu = i;
        console.log(indexEu);
        if (tipo === "message") {
          if (para === "Todos") {
            entrada.innerHTML += `
          <div class="global">
            <p><b>(${msg[i].time})</b> <strong> ${msg[i].from} </strong> para ${msg[i].to}: ${msg[i].text}</p>
          </div>`;
            let ultimoElemento = document.querySelector(".corpo").lastChild;
            ultimoElemento.scrollIntoView();
          } else if (para !== "Todos") {
            if (para === nome) {
              entrada.innerHTML += `
            <div class="privado">
              <p><b>(${msg[i].time})</b> <strong> ${msg[i].from} </strong> para ${msg[i].to}: ${msg[i].text}</p>
            </div>`;
              let ultimoElemento = document.querySelector(".corpo").lastChild;
              ultimoElemento.scrollIntoView();
            }
          }
        } else if (tipo === "status") {
          entrada.innerHTML += `
          <div class="entrou">
              <p><b>(${msg[i].time})</b> <strong> ${msg[i].from} </strong> ${msg[i].text}</p>
          </div>`;
          let ultimoElemento = document.querySelector(".corpo").lastChild;
          ultimoElemento.scrollIntoView();
        }
      }
    }
  }
}

function exemplo(array) {
  if (array[0] === nome) {
    return true;
  }
}

function enviaMensagem() {
  mensagemEscrita = document.querySelector("input").value;
  let messageInput = {
    from: `${nome}`,
    to: "Todos",
    text: `${mensagemEscrita}`,
    type: "message",
  };
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    messageInput
  );
  document.querySelector("input").value = "";

  promise.then(confirmacaoMsg);
  promise.catch(msgnaofoi);
}

function confirmacaoMsg() {
  console.log("chegou");
}

function msgnaofoi() {
  console.log("não chegou");
  alert(
    "Você ficou muito tempo inativo, reiniciaremos a página para você enviar mensagem de novo"
  );
  window.location.reload();
}

function funcionamento() {
  perguntaNome();
  entrarNoChat();
  setInterval(manterConexao, 5000);
  pegarMensagens();
  setInterval(pegarMensagens, 3000);
}

funcionamento();
