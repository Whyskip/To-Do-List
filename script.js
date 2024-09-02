function switchPage(pageNumber) {
    // Esconde todas as páginas removendo a classe 'active'
    const pages = document.querySelectorAll('.container');
    pages.forEach(page => page.classList.remove('active'));

    // Mostra a página selecionada adicionando a classe 'active'
    const selectedPage = document.getElementById(`page${pageNumber}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

// Inicialmente exibe a Página 1
window.onload = () => switchPage(1);