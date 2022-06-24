let nome;

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
  console.log("nome indisponivel");
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
}

funcionamento();
