const form = document.getElementById("expense-form");
const listaDespesas = document.getElementById("lista-despesas");
const saldoValue = document.getElementById("saldo-value");
const totalDespesasValue = document.getElementById("total-despesas-value");
const totalDespesasBox = document.querySelector(".total-despesas-box");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const rendaLiquida = Number(document.getElementById("liquid-value").value);
  const moradia = Number(document.getElementById("moradia").value);
  const transporte = Number(document.getElementById("transporte").value);
  const saude = Number(document.getElementById("saude").value);
  const alimentacao = Number(document.getElementById("alimentacao").value);
  const educacao = Number(document.getElementById("educacao").value);
  const investimento = Number(document.getElementById("investimento").value);

  const despesas = [
    { nome: "Moradia", valor: moradia },
    { nome: "Transporte", valor: transporte },
    { nome: "Saúde", valor: saude },
    { nome: "Alimentação", valor: alimentacao },
    { nome: "Educação", valor: educacao },
    { nome: "Investimento", valor: investimento },
  ];

  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);


  //parte que cria a lista com as despesas no HTML, mapeando as despesas por ordem alfabetica
  listaDespesas.innerHTML = despesas
    .map(
      (d) =>
        `<li><span>${d.nome}</span><span>R$ ${d.valor.toFixed(2)}</span></li>`
    )
    .join("");

  document.getElementById("saldo-value").textContent = totalDespesas.toFixed(2);

  totalDespesasValue.textContent = totalDespesas.toFixed(2);

  //função pra deixar o total de despesas visivel quando clicar no botão de adicionar
  totalDespesasBox.classList.add("visible");


  //lógica resposável por identificar se o saldo é positivo ou negativo e mudar a cor dos elementos de acordo com o resultado
  const saldo = rendaLiquida - totalDespesas;
  saldoValue.textContent = saldo.toFixed(2);
  saldoValue.className =
    "saldo-value " + (saldo >= 0 ? "saldo-positivo" : "saldo-negativo");
});
