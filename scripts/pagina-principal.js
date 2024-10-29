document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const navList = document.querySelector('nav ul');
    
    if (usuarioLogado) {
        // Se usuário está logado, mostra botão de logout e esconde login
        const loginItem = document.querySelector('nav ul li a[href="login.html"]').parentElement;
        loginItem.style.display = 'none';
        
        // Adiciona botão de logout
        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = '<a href="#" onclick="realizarLogout()">Logout</a>';
        navList.appendChild(logoutItem);
        
        // Mostra nome do usuário
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioAtual = usuarios.find(user => user.email === usuarioLogado);
        if (usuarioAtual) {
            const welcomeText = document.querySelector('header h1');
            welcomeText.textContent = `Bem-vindo(a), ${usuarioAtual.nome}!`;
        }
    } else {
        // Se não está logado, esconde link de serviços
        const servicosItem = document.querySelector('nav ul li a[href="servicos-ti.html"]').parentElement;
        servicosItem.style.display = 'none';
    }
});

function realizarLogout() {
    // Remove o usuário logado do localStorage
    localStorage.removeItem('usuarioLogado');
    
    // Mostra mensagem de logout
    alert('Logout realizado com sucesso!');
    
    // Redireciona para a página principal
    window.location.href = 'pagina-principal.html';
}