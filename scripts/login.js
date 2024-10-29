function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validar o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    // Validar a senha
    if (senha.trim() === "") {
        alert("Por favor, insira sua senha.");
        return false;
    }

    // Recuperar lista de usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Procurar usuário com email e senha correspondentes
    const usuarioEncontrado = usuarios.find(user => 
        user.email === email && user.senha === senha
    );

    if (!usuarioEncontrado) {
        alert("Email ou senha inválidos!");
        return false;
    }

    // Salvar email do usuário logado no localStorage
    localStorage.setItem('usuarioLogado', usuarioEncontrado.email);

    // Login bem-sucedido
    alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
    
    // Garantir que o redirecionamento aconteça após o alert
    setTimeout(() => {
        window.location.href = "pagina-principal.html";
    }, 100);
    
    return false; // Previne o submit do form
}

function limparCampos() {
    document.getElementById('email').value = "";
    document.getElementById('senha').value = "";
    document.getElementById('email').focus();
}