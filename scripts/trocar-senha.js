// Função de validação da senha e atualização no localStorage
function trocarSenha() {
    const login = document.getElementById("login").value;
    const novaSenha = document.getElementById("nova-senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;
    const mensagemValidacao = document.getElementById("mensagem-validacao");

    // Validação de email (login)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((usuario) => usuario.email === login);
    if (!usuario) {
        mensagemValidacao.textContent = "Usuário não encontrado.";
        return false;
    }

    // Validação da nova senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?/\|_\-+=])[A-Za-z\d@#$%&*!?/\|_\-+=]{6,}$/;
    if (!senhaRegex.test(novaSenha)) {
        mensagemValidacao.textContent = "A senha não atende aos requisitos.";
        return false;
    }

    // Verificar se a confirmação de senha é igual à nova senha
    if (novaSenha !== confirmarSenha) {
        mensagemValidacao.textContent = "A confirmação de senha não coincide.";
        return false;
    }

    // Atualizar a senha do usuário no localStorage
    usuario.senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagemValidacao.textContent = "Senha alterada com sucesso!";
    mensagemValidacao.style.color = "green";

    // Redirecionar para a página principal ou login após 2 segundos
    setTimeout(() => {
        window.location.href = "pagina-principal.html";
    }, 2000);

    return false; // Previne o envio do formulário
}

// Função para limpar os campos do formulário
function limparCampos() {
    document.getElementById("troca-senha-form").reset();
    document.getElementById("login").focus();
    document.getElementById("mensagem-validacao").textContent = "";
}
