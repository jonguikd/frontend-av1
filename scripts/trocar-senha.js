// Função para validar o formato da senha
function validarSenha(senha) {
    // Mínimo 6 caracteres, 1 número, 1 maiúscula e 1 caractere especial
    const regexSenha = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*!?/\\|\-_+.=])[A-Za-z0-9@#$%&*!?/\\|\-_+.=]{6,}$/;
    
    // Caracteres não permitidos
    const regexCaracteresProibidos = /[̈{}[\]́`~^:;<>,"']/;

    if (!regexSenha.test(senha)) {
        return "A senha deve ter pelo menos 6 caracteres, uma letra maiúscula, um número e um caractere especial permitido.";
    }

    if (regexCaracteresProibidos.test(senha)) {
        return "A senha contém caracteres não permitidos.";
    }

    return ""; // Senha válida
}

// Função para mostrar mensagem de validação
function mostrarMensagem(mensagem, tipo) {
    const mensagemDiv = document.getElementById('mensagem-validacao');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.className = tipo === 'erro' ? 'error' : 'success';
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
        mensagemDiv.textContent = '';
        mensagemDiv.className = '';
    }, 3000);
}

// Função principal para trocar a senha
function trocarSenha() {
    const login = document.getElementById('login').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validar se o email está no formato correto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login)) {
        mostrarMensagem("Por favor, insira um email válido.", 'erro');
        return false;
    }

    // Validar se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
        mostrarMensagem("As senhas não coincidem.", 'erro');
        return false;
    }

    // Validar formato da senha
    const mensagemValidacao = validarSenha(novaSenha);
    if (mensagemValidacao) {
        mostrarMensagem(mensagemValidacao, 'erro');
        return false;
    }

    // Recuperar usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Encontrar o usuário pelo email
    const usuarioIndex = usuarios.findIndex(user => user.email === login);
    
    if (usuarioIndex === -1) {
        mostrarMensagem("Usuário não encontrado.", 'erro');
        return false;
    }

    // Atualizar a senha do usuário
    usuarios[usuarioIndex].senha = novaSenha;
    
    // Salvar alterações no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    mostrarMensagem("Senha alterada com sucesso!", 'success');
    
    // Limpar campos e redirecionar após 2 segundos
    setTimeout(() => {
        limparCampos();
        window.location.href = 'login.html';
    }, 2000);

    return false; // Previne o submit do form
}

// Função para limpar campos
function limparCampos() {
    document.getElementById('login').value = '';
    document.getElementById('nova-senha').value = '';
    document.getElementById('confirmar-senha').value = '';
    document.getElementById('login').focus();
}

// Adicionar validação em tempo real para a senha
document.addEventListener('DOMContentLoaded', () => {
    const novaSenhaInput = document.getElementById('nova-senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');

    novaSenhaInput.addEventListener('input', () => {
        const mensagemValidacao = validarSenha(novaSenhaInput.value);
        if (mensagemValidacao) {
            novaSenhaInput.setCustomValidity(mensagemValidacao);
        } else {
            novaSenhaInput.setCustomValidity('');
        }
    });

    confirmarSenhaInput.addEventListener('input', () => {
        if (confirmarSenhaInput.value !== novaSenhaInput.value) {
            confirmarSenhaInput.setCustomValidity('As senhas não coincidem');
        } else {
            confirmarSenhaInput.setCustomValidity('');
        }
    });
}); 