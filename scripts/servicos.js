// Lista de serviços com preços e prazos fixos
const servicosTI = {
    "manutencao-rede": { nome: "Manutenção de rede", preco: 150, prazo: 5 },
    "instalacao-software": { nome: "Instalação de software", preco: 200, prazo: 3 },
    "backup-dados": { nome: "Backup de dados", preco: 120, prazo: 2 }
};

// Atualiza o preço, prazo e data prevista ao selecionar um serviço de TI
function atualizarDetalhesServico() {
    const servicoSelecionado = document.getElementById("servico-ti").value;
    const preco = document.getElementById("preco");
    const prazoAtendimento = document.getElementById("prazo-atendimento");
    const dataPrevista = document.getElementById("data-prevista");

    const servico = servicosTI[servicoSelecionado];
    const hoje = new Date();
    const prazo = servico.prazo;
    const dataAtendimento = new Date(hoje);
    dataAtendimento.setDate(hoje.getDate() + prazo);

    preco.textContent = `R$ ${servico.preco},00`;
    prazoAtendimento.textContent = `${prazo} dias úteis`;
    dataPrevista.textContent = dataAtendimento.toLocaleDateString("pt-BR");
}

// Adiciona uma nova solicitação à tabela
function incluirSolicitacao() {
    const servicoSelecionado = document.getElementById("servico-ti").value;
    const servico = servicosTI[servicoSelecionado];
    const hoje = new Date();
    const dataPedido = hoje.toLocaleDateString("pt-BR");

    const tabela = document.querySelector("#solicitacoes-anteriores tbody");
    const novaLinha = tabela.insertRow();

    // Preenchendo as células da nova linha
    novaLinha.insertCell(0).textContent = dataPedido;
    novaLinha.insertCell(1).textContent = gerarNumeroSolicitacao(); // Número de solicitação único
    novaLinha.insertCell(2).textContent = servico.nome;
    novaLinha.insertCell(3).textContent = "Em elaboração";
    novaLinha.insertCell(4).textContent = `R$ ${servico.preco},00`;
    novaLinha.insertCell(5).textContent = document.getElementById("data-prevista").textContent;

    // Botão para excluir a solicitação
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
        excluirSolicitacao(novaLinha);
    };
    novaLinha.insertCell(6).appendChild(botaoExcluir);

    return false; // Previne o envio do formulário
}

// Gera um número único de solicitação
function gerarNumeroSolicitacao() {
    return Math.floor(Math.random() * 10000);
}

// Exclui uma linha de solicitação
function excluirSolicitacao(linha) {
    linha.remove();
}

// Limpa os campos do formulário de nova solicitação
function limparCampos() {
    document.getElementById("form-nova-solicitacao").reset();
    document.getElementById("preco").textContent = "R$ 0,00";
    document.getElementById("prazo-atendimento").textContent = "";
    document.getElementById("data-prevista").textContent = "";
}

// Inicia com o primeiro serviço selecionado e atualiza os detalhes
document.addEventListener("DOMContentLoaded", function () {
    atualizarDetalhesServico();
    document.getElementById("servico-ti").addEventListener("change", atualizarDetalhesServico);
});
