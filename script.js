const tasklist = document.getElementById("taskList");
const input = document.getElementById("taskInput");
const description = document.getElementById("taskDescription");

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDesc = taskDescription.value.trim();
    if (taskText !== "") {

        const maxText = taskText.substring(0,35);
        const maxDesc = taskDesc.substring(0,150);

        const li = document.createElement("li");
        const desc = document.createElement("p");
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        desc.innerHTML = `
            <span2>${maxDesc}</span2>
            <button class="editButton" onClick="editDesc(this)">Editar</button>
        `
        tasklist.appendChild(li);
        tasklist.appendChild(desc);
        taskInput.value = "";
        taskDescription.value = "";
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar Tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

function editDesc(button) {
    const desc = button.parentElement;
    const span2 = desc.querySelector("span2");
    const newDesc = prompt("Editar Descrição:", span2.textContent);
    if (newDesc !== null && newDesc.trim() !== "") {
        span2.textContent = newDesc.trim();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    const desc = li.nextElementSibling; //Seleciona o próximo elemento após o "li", que é o "<p>"
    tasklist.removeChild(li); //Remove o elemento "li"
    if (desc && desc.tagName.toLowerCase() === "p") { //Verifica se o próximo elemento é "<p>"
        tasklist.removeChild(desc); //Remove o "<p>"
    }
    tasklist.removeChild(desc);
}