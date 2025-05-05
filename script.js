let indiceEdicao = null;

function adicionarItem() {
    const produto = document.getElementById("produto").value;
    const valor = document.getElementById("valor").value;
    const quantidade = document.getElementById("quantidade").value;

    if (!produto || !valor || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    itens.push({ produto, valor, quantidade, concluido: false });
    localStorage.setItem('itens', JSON.stringify(itens));

    limparCampos();
    carregarItens();
}

function limparLista() {
    document.getElementById("lista").innerHTML = "";
    localStorage.removeItem('itens');
    atualizarTotal();
}

function atualizarTotal() {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    let total = 0;

    itens.forEach(item => {
        if (!item.concluido) {
            total += parseFloat(item.valor) * parseInt(item.quantidade);
        }
    });

    document.getElementById("valor-total").textContent = total.toFixed(2);
}

function carregarItens() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    const itens = JSON.parse(localStorage.getItem('itens')) || [];

    itens.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        if (item.concluido) {
            card.classList.add("concluido");
        }

        card.innerHTML = `
            <h4>${item.produto}</h4>
            <p>Valor: R$ ${parseFloat(item.valor).toFixed(2)}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <button class="btn-editar" onclick="editarItem(${index})">Editar</button>
        `;

        card.addEventListener("click", (e) => {
            // Evita que clicar no botão editar ative o concluir
            if (e.target.tagName !== "BUTTON") {
                alternarConcluido(index);
            }
        });

        lista.appendChild(card);
    });

    atualizarTotal();
}

function alternarConcluido(index) {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    itens[index].concluido = !itens[index].concluido;
    localStorage.setItem('itens', JSON.stringify(itens));
    carregarItens();
}

function editarItem(index) {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    const item = itens[index];

    document.getElementById("produto").value = item.produto;
    document.getElementById("valor").value = item.valor;
    document.getElementById("quantidade").value = item.quantidade;

    indiceEdicao = index;

    // Mostra o botão "Confirmar Edição"
    document.getElementById("confirmar-edicao").style.display = "inline-block";
}

function confirmarEdicao() {
    if (indiceEdicao === null) return;

    const produto = document.getElementById("produto").value;
    const valor = document.getElementById("valor").value;
    const quantidade = document.getElementById("quantidade").value;

    if (!produto || !valor || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    itens[indiceEdicao] = {
        ...itens[indiceEdicao],
        produto,
        valor,
        quantidade
    };
    localStorage.setItem('itens', JSON.stringify(itens));

    limparCampos();
    indiceEdicao = null;
    document.getElementById("confirmar-edicao").style.display = "none";
    carregarItens();
    alert("Produto editado com sucesso!");
}

function limparCampos() {
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("quantidade").value = "";
}

function alternarModo() {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
}

document.addEventListener("DOMContentLoaded", carregarItens);
