function adicionarItem() {
    const produto = document.getElementById('produto').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const quantidade = document.getElementById('quantidade').value.trim();
  
    if (!produto || !valor || !quantidade) {
      alert('Preencha todos os campos!');
      return;
    }
  
    const lista = document.getElementById('lista');
  
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${produto}</h4>
      <p>Valor: R$ ${parseFloat(valor).toFixed(2)}</p>
      <p>Quantidade: ${quantidade}</p>
    `;
  
    lista.appendChild(card);
  
    // Limpar os campos
    document.getElementById('produto').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
  }
  
  function limparLista() {
    document.getElementById('lista').innerHTML = '';
  }
  