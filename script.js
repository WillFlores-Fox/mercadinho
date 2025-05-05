function adicionarItem() {
    const produto = document.getElementById("produto").value;
    const valor = document.getElementById("valor").value;
    const quantidade = document.getElementById("quantidade").value;

    if (!produto || !valor || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const lista = document.getElementById("lista");

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h4>${produto}</h4>
      <p>Valor: R$ ${parseFloat(valor).toFixed(2)}</p>
      <p>Quantidade: ${quantidade}</p>
    `;

    lista.appendChild(card);

    // Salvar o item no localStorage
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    itens.push({ produto, valor, quantidade });
    localStorage.setItem('itens', JSON.stringify(itens));

    // Atualiza o total
    atualizarTotal();

    // Limpa inputs
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("quantidade").value = "";
}

function limparLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    // Limpar os itens no localStorage
    localStorage.removeItem('itens');

    // Limpar o total
    atualizarTotal();
}

function atualizarTotal() {
    const lista = document.getElementById("lista");
    const cards = lista.getElementsByClassName("card");
    let total = 0;

    // Percorre todos os cards e soma valor * quantidade
    for (let card of cards) {
        const valorText = card.querySelector("p:nth-of-type(1)").textContent;
        const quantidadeText = card.querySelector("p:nth-of-type(2)").textContent;

        const valor = parseFloat(valorText.replace('Valor: R$ ', '').replace(',', '.'));
        const quantidade = parseInt(quantidadeText.replace('Quantidade: ', ''));

        total += valor * quantidade;
    }

    // Exibe o total
    document.getElementById("valor-total").textContent = total.toFixed(2);
}

function carregarItens() {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    const lista = document.getElementById("lista");

    itens.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h4>${item.produto}</h4>
          <p>Valor: R$ ${parseFloat(item.valor).toFixed(2)}</p>
          <p>Quantidade: ${item.quantidade}</p>
        `;
        lista.appendChild(card);
    });

    // Atualiza o total ao carregar os itens
    atualizarTotal();
}

// Carregar itens ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarItens);


function alternarModo() {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
}
