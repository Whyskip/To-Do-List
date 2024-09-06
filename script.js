let pageCount = 3; // Contador para controlar o número de páginas
let noteCount = {}; // Contador para controlar o número de notas em cada página

// Inicializa o contador de notas para cada página
for (let i = 1; i <= pageCount; i++) {
    noteCount[i] = 1; // Começamos com 1 nota por página
}

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
    noteCount[pageCount] = 1; // Inicializa o contador de notas para a nova página

    // Cria a nova página
    const newPage = document.createElement('div');
    newPage.classList.add('container');
    newPage.id = `page${pageCount}`;
    newPage.innerHTML = `
        <h2>Página ${pageCount}</h2>
        <div class="note-controls">
            <button onclick="addNoteToPage(${pageCount})">Adicionar Nota</button>
            <button onclick="removeNotePrompt(${pageCount})">Excluir Nota</button>
        </div>
        <div class="notes-wrapper">
            <div class="note" id="page${pageCount}_note1">
                <input type="text" placeholder="Título..." class="notetitle">
                <textarea placeholder="Descrição..." class="notedescription"></textarea>
            </div>
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

function removePagePrompt() {
    const pageNumber = prompt(`Digite o número da página que deseja excluir (1 a ${pageCount}):`);

    if (pageNumber && pageNumber >= 1 && pageNumber <= pageCount) {
        removePage(pageNumber);
    } else {
        alert('Número de página inválido.');
    }
}

function removePage(pageNumber) {
    const pageToRemove = document.getElementById(`page${pageNumber}`);
    if (pageToRemove) {
        pageToRemove.remove();
        document.querySelector(`#sidemenu li:nth-child(${pageNumber})`).remove();

        // Ajusta o contador de páginas e o menu lateral
        pageCount--;
        noteCount[pageNumber] = undefined; // Limpa o contador de notas da página removida
        updateMenu();
    }
}

function addNoteToPage(pageNumber) {
    noteCount[pageNumber]++; // Incrementa o número de notas para a página
    const notesWrapper = document.querySelector(`#page${pageNumber} .notes-wrapper`);

    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.id = `page${pageNumber}_note${noteCount[pageNumber]}`;
    newNote.innerHTML = `
        <input type="text" placeholder="Título..." class="notetitle">
        <textarea placeholder="Descrição..." class="notedescription"></textarea>
    `;

    notesWrapper.appendChild(newNote);
}

function removeNotePrompt(pageNumber) {
    const noteNumber = prompt(`Digite o número da nota que deseja excluir (1 a ${noteCount[pageNumber]}):`);

    if (noteNumber && noteNumber >= 1 && noteNumber <= noteCount[pageNumber]) {
        removeNote(pageNumber, noteNumber);
    } else {
        alert('Número de nota inválido.');
    }
}

function removeNote(pageNumber, noteNumber) {
    const noteToRemove = document.getElementById(`page${pageNumber}_note${noteNumber}`);
    if (noteToRemove) {
        noteToRemove.remove();
        noteCount[pageNumber]--; // Decrementa o número de notas da página
    }
}

function updateMenu() {
    // Atualiza o menu lateral após a exclusão de páginas
    const menuItems = document.querySelectorAll('#sidemenu li');
    menuItems.forEach((item, index) => {
        item.querySelector('a').innerHTML = `Página ${index + 1}`;
        item.querySelector('a').setAttribute('onclick', `switchPage(${index + 1})`);
    });
}

window.onload = () => switchPage(1);