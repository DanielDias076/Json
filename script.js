const input = document.getElementById("input-tarefa");
const btnAdicionar = document.getElementById("btn-adicionar");
const lista = document.getElementById("lista-tarefas");
const mensagem = document.getElementById("mensagem");

let tarefas = [];
let indexEdicao = null;

function salvarLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem("tarefas");
  if (dados) {
    tarefas = JSON.parse(dados);
    listarItens();
  }
}

function mostrarMensagem(texto, cor = "green") {
  mensagem.textContent = texto;
  mensagem.style.color = cor;
  setTimeout(() => {
    mensagem.textContent = "";
  }, 2000);
}

function listarItens() {
  lista.innerHTML = "";
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${tarefa}</span>
      <div>
        <button class="editar" onclick="editarItem(${index})">Editar</button>
        <button onclick="removerItem(${index})">Excluir</button>
      </div>
    `;

    lista.appendChild(li);
  });
}

function adicionarItem() {
  const valor = input.value.trim();

  if (!valor) {
    mostrarMensagem("Não pode adicionar vazio ❌", "red");
    return;
  }

  if (indexEdicao === null && tarefas.includes(valor)) {
    mostrarMensagem("Item duplicado ❌", "red");
    return;
  }

  if (indexEdicao !== null) {
    tarefas[indexEdicao] = valor;
    indexEdicao = null;
    mostrarMensagem("Item atualizado ✅");
  } else {
    tarefas.push(valor);
    mostrarMensagem("Item adicionado com sucesso ✅");
  }

  salvarLocalStorage();
  listarItens();
  input.value = "";
}

function removerItem(index) {
  tarefas.splice(index, 1);
  salvarLocalStorage();
  listarItens();
  mostrarMensagem("Item removido ❌", "red");
}

function editarItem(index) {
  input.value = tarefas[index];
  indexEdicao = index;
}

btnAdicionar.addEventListener("click", adicionarItem);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarItem();
  }
});

carregarLocalStorage();
