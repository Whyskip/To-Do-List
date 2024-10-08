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

    // Solicita o nome da nova página
    const pageName = prompt("Digite o nome para a nova página:");
    if (!pageName) {
        alert('Nome da página não pode ser vazio.');
        pageCount--; // Reverte o contador de páginas
        return;
    }

    // Cria a nova página
    const newPage = document.createElement('div');
    newPage.classList.add('container');
    newPage.id = `page${pageCount}`;
    newPage.innerHTML = `
        <h2>${pageName}</h2>
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
    newMenuItem.innerHTML = `<a href="#" onclick="switchPage(${pageCount})">${pageName}</a>`;

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
    // Verifica se a página a ser removida existe
    const pageToRemove = document.getElementById(`page${pageNumber}`);
    if (pageToRemove) {
        // Move o conteúdo das páginas subsequentes para preencher a página removida
        for (let i = pageNumber + 1; i <= pageCount; i++) {
            const currentPage = document.getElementById(`page${i}`);
            if (currentPage) {
                const previousPage = document.getElementById(`page${i - 1}`);
                if (previousPage) {
                    // Move o conteúdo e o HTML da página atual para a página anterior
                    previousPage.innerHTML = currentPage.innerHTML;
                    noteCount[i - 1] = noteCount[i]; // Atualiza o contador de notas
                }
                
                // Remove a página atual
                currentPage.remove();
            }
        }

        // Remove o item do menu
        document.querySelector(`#sidemenu li:nth-child(${pageNumber})`).remove();

        // Atualiza o número total de páginas
        pageCount--;

        // Atualiza o contador de notas da página removida
        noteCount[pageNumber] = undefined;

        // Atualiza o menu lateral
        updateMenu();

        // Exibe a nova página 1
        switchPage(1);
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

function renamePagePrompt() {
    const pageNumber = prompt(`Digite o número da página que deseja renomear (1 a ${pageCount}):`);
    
    if (pageNumber && pageNumber >= 1 && pageNumber <= pageCount) {
        const newName = prompt('Digite o novo nome para a página:');
        
        if (newName) {
            renamePage(pageNumber, newName);
        } else {
            alert('O nome da página não pode ser vazio.');
        }
    } else {
        alert('Número de página inválido.');
    }
}

function renamePage(pageNumber, newName) {
    const pageToRename = document.getElementById(`page${pageNumber}`);
    if (pageToRename) {
        const menuItem = document.querySelector(`#sidemenu li:nth-child(${pageNumber}) a`);
        pageToRename.querySelector('h2').textContent = newName;
        menuItem.textContent = newName;
    }
}

window.onload = () => switchPage(1);