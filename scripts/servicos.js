// Verifica se há um usuário logado e carrega suas informações
function carregarInformacoesUsuario() {
    const usuarioEmail = localStorage.getItem('usuarioLogado');
    
    if (!usuarioEmail) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioAtual = usuarios.find(user => user.email === usuarioEmail);
    
    if (!usuarioAtual) {
        alert('Erro ao carregar informações do usuário.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('nome-usuario').textContent = usuarioAtual.nome;
    document.getElementById('email-usuario').textContent = usuarioAtual.email;

    // Carregar solicitações do usuário
    carregarSolicitacoes();
}

// Função para incluir nova solicitação
function incluirSolicitacao() {
    const usuarioEmail = localStorage.getItem('usuarioLogado');
    const servicoTi = document.getElementById('servico-ti');
    const servicoNome = servicoTi.options[servicoTi.selectedIndex].text;
    
    const novaSolicitacao = {
        id: Date.now(), // Usar timestamp como ID único
        dataPedido: new Date().toLocaleDateString(),
        numeroSolicitacao: gerarNumeroSolicitacao(),
        servicoTi: servicoNome,
        status: 'Em elaboração',
        preco: document.getElementById('preco').textContent,
        dataPrevista: document.getElementById('data-prevista').textContent,
        usuarioEmail: usuarioEmail
    };

    // Recuperar solicitações existentes ou criar nova lista
    let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    solicitacoes.push(novaSolicitacao);
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    // Atualizar a tabela
    carregarSolicitacoes();
    
    alert('Solicitação incluída com sucesso!');
    limparCampos();
    return false;
}

// Função para carregar solicitações do usuário atual
function carregarSolicitacoes() {
    const usuarioEmail = localStorage.getItem('usuarioLogado');
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    const solicitacoesUsuario = solicitacoes.filter(s => s.usuarioEmail === usuarioEmail);

    const tbody = document.querySelector('#solicitacoes-anteriores table tbody');
    tbody.innerHTML = ''; // Limpar tabela atual

    solicitacoesUsuario.forEach(solicitacao => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${solicitacao.dataPedido}</td>
            <td>${solicitacao.numeroSolicitacao}</td>
            <td>${solicitacao.servicoTi}</td>
            <td>${solicitacao.status}</td>
            <td>${solicitacao.preco}</td>
            <td>${solicitacao.dataPrevista}</td>
            <td><button onclick="excluirSolicitacao('${solicitacao.id}')">Excluir</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para excluir solicitação
function excluirSolicitacao(id) {
    if (confirm('Deseja realmente excluir esta solicitação?')) {
        let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
        solicitacoes = solicitacoes.filter(s => s.id !== Number(id));
        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
        carregarSolicitacoes();
    }
}

// Função para gerar número de solicitação
function gerarNumeroSolicitacao() {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    return `SOL${(solicitacoes.length + 1).toString().padStart(3, '0')}`;
}

// Função para limpar campos
function limparCampos() {
    document.getElementById('servico-ti').selectedIndex = 0;
    atualizarInformacoesServico();
}

// Função para atualizar informações do serviço selecionado
function atualizarInformacoesServico() {
    const servicoTi = document.getElementById('servico-ti').value;
    let preco, prazo;

    switch(servicoTi) {
        case 'manutencao-rede':
            preco = 'R$ 150,00';
            prazo = '5 dias úteis';
            break;
        case 'instalacao-software':
            preco = 'R$ 100,00';
            prazo = '2 dias úteis';
            break;
        case 'backup-dados':
            preco = 'R$ 200,00';
            prazo = '3 dias úteis';
            break;
        default:
            preco = 'R$ 150,00';
            prazo = '5 dias úteis';
    }

    document.getElementById('preco').textContent = preco;
    document.getElementById('prazo-atendimento').textContent = prazo;
    
    // Calcular data prevista
    const hoje = new Date();
    const diasUteis = parseInt(prazo);
    const dataPrevista = calcularDataPrevista(hoje, diasUteis);
    document.getElementById('data-prevista').textContent = dataPrevista.toLocaleDateString();
}

// Função auxiliar para calcular data prevista
function calcularDataPrevista(data, diasUteis) {
    const dataPrevista = new Date(data);
    let diasAdicionados = 0;
    
    while (diasAdicionados < diasUteis) {
        dataPrevista.setDate(dataPrevista.getDate() + 1);
        if (dataPrevista.getDay() !== 0 && dataPrevista.getDay() !== 6) {
            diasAdicionados++;
        }
    }
    
    return dataPrevista;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarInformacoesUsuario();
    document.getElementById('servico-ti').addEventListener('change', atualizarInformacoesServico);
    atualizarInformacoesServico();
});
