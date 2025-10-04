const form = document.getElementById("expense-form");
const listaDespesas = document.getElementById("lista-despesas");
const saldoValue = document.getElementById("saldo-value");
const totalDespesasValue = document.getElementById("total-despesas-value");
const totalDespesasBox = document.querySelector(".total-despesas-box");

const addBotao = document.getElementById("adicionar");
const container = document.getElementById("div-inputs");

//função para adicionar as novas despesas / adicionar elas na div e adicionar no array despesas
addBotao.addEventListener("click", () => {
  const placeholder = prompt("Digite sua nova despesa");

  if (placeholder) {
    const novaDespesa = document.createElement("input");
    novaDespesa.type = "number";
    novaDespesa.placeholder = placeholder;
    container.appendChild(novaDespesa);

    // marca o input como dinâmico e guarda o nome
    novaDespesa.classList.add("input-group", "essenciais", "dynamic-input");
    novaDespesa.dataset.nome = placeholder;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const rendaLiquida = Number(document.getElementById("liquid-value").value);
  const moradia = Number(document.getElementById("moradia").value);
  const transporte = Number(document.getElementById("transporte").value);
  const saude = Number(document.getElementById("saude").value);
  const alimentacao = Number(document.getElementById("alimentacao").value);
  const educacao = Number(document.getElementById("educacao").value);
  const investimento = Number(document.getElementById("investimento").value);

  // essa const coleta os inputs dinamicos 
  const dinamicas = Array.from(
    container.querySelectorAll("input.dynamic-input") // procura todos os elementos com a seguinte class e retorna uma NodeList
  ).map((i) => ({
    nome: i.dataset.nome || i.placeholder,
    valor: Number(i.value) || 0,
  }));

  //array.from muda a NodeList para um array para poder usar o map
  //o map cria um objeto para cada input com duas regras : nome e valor
  //o nome tenta usar o nome da despesa se não houver, ele usa o PlaceHolder
  //o valor converte o valor para numero se der errado retorna NaN ou 0

  const despesas = [
    { nome: "Moradia", valor: moradia },
    { nome: "Transporte", valor: transporte },
    { nome: "Saúde", valor: saude },
    { nome: "Alimentação", valor: alimentacao },
    { nome: "Educação", valor: educacao },
    { nome: "Investimento", valor: investimento },
    ...dinamicas,
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
