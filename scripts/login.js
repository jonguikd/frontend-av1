function realizarLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Validar o email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    // Validar a senha
    if (senha.trim() === "") {
        alert("Por favor, insira sua senha.");
        return false;
    }

    // Se todas as validações passarem
    alert("Validação realizada com sucesso. Redirecionando para a página de conteúdo...");
    // Aqui você pode redirecionar para a página de conteúdo
    return true;
}

function limparCampos() {
    document.getElementById('email').value = "";
    document.getElementById('senha').value = "";
    document.getElementById('email').focus();
}