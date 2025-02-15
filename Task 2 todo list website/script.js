const taskForm = document.getElementById('task-form');
const pendingTasks = document.getElementById('pending-tasks');
const completedTasks = document.getElementById('completed-tasks');
const editTaskModal = document.getElementById('edit-task-modal');
const overlay = document.getElementById('overlay');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const saveEdit = document.getElementById('save-edit');
const cancelEdit = document.getElementById('cancel-edit');

let taskToEdit = null;

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    addTask(title, description);

    taskForm.reset();
});


function addTask(title, description) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const createdAt = formatDateTime(new Date()); // Get formatted date & time

    taskElement.innerHTML = `
        <div>
            <strong>${title}</strong>
            <p>${description}</p>
            <small>Created: ${createdAt}</small>
            <span class="completion-time"></span>
        </div>
        <div class="buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">Complete</button>
        </div>
    `;

    const deleteBtn = taskElement.querySelector('.delete-btn');
    const editBtn = taskElement.querySelector('.edit-btn');
    const completeBtn = taskElement.querySelector('.complete-btn');

    deleteBtn.addEventListener('click', () => {
        taskElement.remove();
    });

    editBtn.addEventListener('click', () => {
        openEditModal(taskElement);
    });

    completeBtn.addEventListener('click', () => {
        taskElement.classList.add('completed');
        completeBtn.remove();

        const completionTime = formatDateTime(new Date()); // Get formatted completion date & time
        taskElement.querySelector('.completion-time').innerHTML = `<small>Completed: ${completionTime}</small>`;

        completedTasks.appendChild(taskElement);
    });

    pendingTasks.appendChild(taskElement);
}

function formatDateTime(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th"; // Covers 4th-20th
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensures two digits

    return `${day}${getDaySuffix(day)} ${month}, ${year} at ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function openEditModal(taskElement) {
    taskToEdit = taskElement;
    const title = taskElement.querySelector('strong').textContent;
    const description = taskElement.querySelector('p').textContent;

    editTitle.value = title;
    editDescription.value = description;

    editTaskModal.classList.add('active');
    overlay.classList.add('active');
}

function closeEditModal() {
    editTaskModal.classList.remove('active');
    overlay.classList.remove('active');
    taskToEdit = null;
}

saveEdit.addEventListener('click', () => {
    if (taskToEdit) {
        const newTitle = editTitle.value;
        const newDescription = editDescription.value;

        if (newTitle) taskToEdit.querySelector('strong').textContent = newTitle;
        if (newDescription) taskToEdit.querySelector('p').textContent = newDescription;

        closeEditModal();
    }
});

cancelEdit.addEventListener('click', closeEditModal);
overlay.addEventListener('click', closeEditModal);
