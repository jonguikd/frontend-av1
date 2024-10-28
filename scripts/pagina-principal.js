document.addEventListener("DOMContentLoaded", function () {
    // Verifica se há um login realizado (só um exemplo, substitua com sua lógica real)
    var loginRealizado = true; // Altere para true se o login foi realizado, caso contrário, deixe como false

    // Se o login foi realizado, mostra o link de solicitação de serviços de TI
    if (loginRealizado) {
        document.getElementById("solicitacao-servicos").style.display = "block";
    }
});