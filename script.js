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
  
    // Limpa inputs
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("quantidade").value = "";
  }
  
  function limparLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
  }
  
  function alternarModo() {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
  }
  