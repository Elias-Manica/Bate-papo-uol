let nome;
let type;
let from;
let text;
let time;
let to;
let tipo;
let para;
let msg;
let destinatario;
let mensagemEscrita;
let icone;

function perguntaNome() {
  nome = prompt("Qual o seu nome?");
  while (nome === null) {
    nome = prompt("Qual o seu nome?");
  }

  destinatario = "Todos";
}

function entrarNoChat() {
  let nomeServidor = {
    name: `${nome}`,
  };

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    nomeServidor
  );

  promise.catch(nomeIndisponivel);
}

function nomeIndisponivel(resposta) {
  if (resposta.response.status === 400) {
    window.location.reload();
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
  let gif = document.querySelector(".lds-dual-ring");

  msg = mensagem.data;

  let entrada = document.querySelector(".corpo");
  let indexEu = 99;
  entrada.innerHTML = "";
  for (let i = 0; i < msg.length; i++) {
    tipo = msg[i].type;
    para = msg[i].to;
    if (indexEu !== 99) {
      if (indexEu < 1) {
        console.log("Oi");
      }
      gif.classList.add("oculto");
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

        if (tipo === "status") {
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

function enviaMensagem() {
  mensagemEscrita = document.querySelector("input").value;
  let messageInput = {
    from: `${nome}`,
    to: `${destinatario}`,
    text: `${mensagemEscrita}`,
    type: "message",
  };
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    messageInput
  );
  document.querySelector("input").value = "";

  promise.catch(msgnaofoi);
}

function msgnaofoi() {
  alert(
    "Você ficou muito tempo inativo, reiniciaremos a página para você enviar mensagem de novo"
  );
  window.location.reload();
}

function buscarParticipantes() {
  let promise = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/participants"
  );
  promise.then(exibirParticipantes);
}

function exibirParticipantes(array) {
  lista = array.data;
  let participantes = document.querySelector(".escolhacontato");
  participantes.innerHTML = "";
  participantes.innerHTML = `
      <div class="titulo">Escolha um contato para enviar mensagem:</div>
      <div class="nomes" onclick ="selecionarPessoa(this)" data-identifier="participant">
        <ion-icon name="people"></ion-icon>
        <span>Todos</span>
        <ion-icon name="checkmark" class="certo"></ion-icon>
      </div>
  `;
  for (let i = 0; i < lista.length; i++) {
    participantes.innerHTML += `
      
      <div class="nomes" onclick ="selecionarPessoa(this)" data-identifier="participant">
        <ion-icon name="person-circle"></ion-icon>
        <span>${lista[i].name}</span>
        <ion-icon name="checkmark" class="certo oculto"></ion-icon>
      </div>`;
  }
}

function selecionarPessoa(elemento) {
  destinatario = elemento.children[1].innerHTML;
  let destMsg = document.querySelector(".destinario");
  destMsg.innerHTML = `
    Enviando para ${destinatario}
  `;
}

function aparecerLateral() {
  let lateral = document.querySelector(".escolhacontato");
  let esquerda = document.querySelector(".completar");
  lateral.classList.remove("oculto");
  esquerda.classList.remove("oculto");
}

function tirarLateral() {
  let lateral = document.querySelector(".escolhacontato");
  let esquerda = document.querySelector(".completar");
  lateral.classList.add("oculto");
  esquerda.classList.add("oculto");
}

function funcionamento() {
  perguntaNome();
  entrarNoChat();
  buscarParticipantes();
  pegarMensagens();
  setInterval(manterConexao, 5000);
  setInterval(pegarMensagens, 3000);
  setInterval(buscarParticipantes, 10000);
}

funcionamento();
