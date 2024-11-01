function validarFormulario() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("E-mail inválido.");
        return false;
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,20}$/;
    if (!senhaRegex.test(senha)) {
        alert("A senha deve ter entre 8 e 20 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (!@#$%&*).");
        return false;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return false;
    }

    const nomeRegex = /^[A-Za-z]{2,}(\s[A-Za-z]{2,})+$/;
    if (!nomeRegex.test(nome)) {
        alert("O nome deve conter pelo menos duas palavras, e a primeira palavra deve ter pelo menos 2 caracteres.");
        return false;
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf) || !validarCPF(cpf)) {
        alert("CPF inválido.");
        return false;
    }

    const dataAtual = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = dataAtual.getFullYear() - nascimento.getFullYear();
    if (idade < 18 || (idade === 18 && dataAtual < new Date(nascimento.setFullYear(nascimento.getFullYear() + 18)))) {
        alert("Você deve ter pelo menos 18 anos.");
        return false;
    }

    alert("Validação realizada com sucesso!");
    return true;
}

function incluir() {
    if (validarFormulario()) {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

        if (usuarioExistente) {
            alert("Este e-mail já está cadastrado.");
            return;
        }
        usuarios.push({ email, senha });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; 
    }
}

function limpar() {
    document.getElementById("cadastroForm").reset();
    document.getElementById("email").focus();
}

function voltar() {
    window.location.href = "pagina-principal.html"
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}
