

function login() {
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;
    const mensagemErro = document.getElementById("mensagemErro");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    console.log(usuarios)

    const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");
        window.location.href = "pagina-principal.html";
    } else {
        mensagemErro.textContent = "E-mail ou senha incorretos. Tente novamente.";
    }
}

function limpar() {
    document.getElementById("loginForm").reset();
    document.getElementById("loginEmail").focus();
    document.getElementById("mensagemErro").textContent = "";
}

