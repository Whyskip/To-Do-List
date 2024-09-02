let pageCount = 3; // Contador para controlar o número de páginas

function switchPage(pageNumber) {
    const pages = document.querySelectorAll('.container');
    pages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(`page${pageNumber}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

function addPage() {
    pageCount++; // Incrementa o número total de páginas

    // Cria a nova página
    const newPage = document.createElement('div');
    newPage.classList.add('container');
    newPage.id = `page${pageCount}`;
    newPage.innerHTML = `
        <h2>Página ${pageCount}</h2>
        <div class="note">
            <input type="text" placeholder="Título..." class="notetitle">
            <textarea placeholder="Descrição..." class="notedescription"></textarea>
        </div>
    `;

    // Adiciona a nova página ao conteúdo
    document.querySelector('.content').appendChild(newPage);

    // Cria a nova entrada no menu lateral
    const newMenuItem = document.createElement('li');
    newMenuItem.innerHTML = `<a href="#" onclick="switchPage(${pageCount})">Página ${pageCount}</a>`;

    // Adiciona a nova entrada ao menu
    document.getElementById('sidemenu').appendChild(newMenuItem);

    // Exibe a nova página
    switchPage(pageCount);
}

window.onload = () => switchPage(1);