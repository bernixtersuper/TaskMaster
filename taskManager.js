// Array para almacenar las tareas
let tasks = [];

// Agregar este array de mensajes motivadores al principio del archivo
const motivationalMessages = [
    "¡Che, qué laburador! Seguí así, campeón.",
    "¡La rompiste, pibe! Vas como piña.",
    "¡Grosso! Una tarea menos, viste.",
    "¡Qué capo! Estás en racha, boludo.",
    "¡Zarpado! Nadie te para, eh.",
    "¡Dale que va! La estás rompiendo toda.",
    "¡Sos un crack! Tu productividad es una locura.",
    "¡Vamos, carajo! Cada tarea es un golazo.",
    "¡Qué máquina! Tu laburo está dando sus frutos.",
    "¡La pucha que sos groso! Estás dominando todo, loco."
];

// Función para actualizar la lista de tareas en el DOM
function updateTaskList() {
    const taskList = document.getElementById('taskList');
    const taskStatus = document.getElementById('taskStatus');
    taskList.innerHTML = '';

    // Ordenar tareas por prioridad
    tasks.sort((a, b) => {
        const priorityOrder = { high: 0, normal: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    // Actualizar el estado de las tareas
    if (tasks.length === 0) {
        taskStatus.textContent = 'No hay tareas pendientes.';
        taskStatus.className = 'no-tasks';
    } else if (incompleteTasks.length === 0) {
        taskStatus.textContent = '¡Felicidades! Has completado todas las tareas.';
        taskStatus.className = 'all-completed';
    } else {
        taskStatus.textContent = `Te faltan ${incompleteTasks.length} tarea(s) por completar.`;
        taskStatus.className = 'tasks-pending';
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''} priority-${task.priority}">${task.text}</span>
            <div>
                <button class="priority-button ${task.priority}" onclick="changePriority(${index})">
                ${getPriorityIcon(task.priority)}
                </button>
                <button class="toggle-button" onclick="toggleTask(${index})">
                    ${task.completed ? 'Desmarcar' : 'Completar'}
                </button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    // Mostrar u ocultar los botones de borrar tareas
    const clearCompletedButton = document.getElementById('clearCompleted');
    const clearAllButton = document.getElementById('clearAll');
    clearCompletedButton.style.display = completedTasks.length > 0 ? 'block' : 'none';
    clearAllButton.style.display = tasks.length > 0 ? 'block' : 'none';
}

// Función para obtener el icono de prioridad
function getPriorityIcon(priority) {
    const priorityIcons = {
        high: '!!!',
        normal: '!!',
        low: '!'
    };
    return priorityIcons[priority] || '!';
}

// Función para agregar una nueva tarea
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const priorityButton = document.getElementById('taskPriority');
    const priority = priorityButton.classList.contains('high') ? 'high' : 
                     priorityButton.classList.contains('normal') ? 'normal' : 'low';

    if (taskText !== '') {
        if (tasks.some(task => task.text.toLowerCase() === taskText.toLowerCase())) {
            showMessage('Esta tarea ya existe', 'error');
        } else {
            tasks.push({ text: taskText, completed: false, priority: priority });
            taskInput.value = '';
            resetPriorityButton(); // Agregamos esta línea para resetear la prioridad
            updateTaskList();
            showMessage('Tarea agregada con éxito', 'success');
        }
    }
}

// Función para marcar/desmarcar una tarea como completada
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        showMotivationalMessage();
    }
    updateTaskList();
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

// Nueva función para borrar todas las tareas completadas
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    updateTaskList();
    showMessage('Tareas completadas han sido borradas', 'success');
}

// Función para cambiar la prioridad de forma cíclica
function cyclePriority(index) {
    const priorities = ['low', 'normal', 'high'];
    const currentPriority = tasks[index].priority;
    const currentIndex = priorities.indexOf(currentPriority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    tasks[index].priority = priorities[nextIndex];
    updateTaskList();
}

// Agregar evento al botón de agregar tarea
document.getElementById('addTask').addEventListener('click', addTask);

// Agregar evento al input para agregar tarea al presionar Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Agregar evento al botón de borrar tareas completadas
document.getElementById('clearCompleted').addEventListener('click', clearCompletedTasks);

// Inicializar la lista de tareas
updateTaskList();

// Agregar esta nueva función para mostrar un mensaje motivador aleatorio
function showMotivationalMessage() {
    const messageIndex = Math.floor(Math.random() * motivationalMessages.length);
    const message = motivationalMessages[messageIndex];
    
    const motivationalDiv = document.createElement('div');
    motivationalDiv.textContent = message;
    motivationalDiv.className = 'motivational-message';
    
    document.body.appendChild(motivationalDiv);
    
    setTimeout(() => {
        motivationalDiv.remove();
    }, 3000);
}

// Nueva función para mostrar mensajes
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Agregar esta nueva función para cambiar la prioridad del botón de agregar tarea
function cyclePriorityButton() {
    const priorityButton = document.getElementById('taskPriority');
    if (priorityButton.classList.contains('low')) {
        priorityButton.classList.remove('low');
        priorityButton.classList.add('normal');
        priorityButton.textContent = '!!';
    } else if (priorityButton.classList.contains('normal')) {
        priorityButton.classList.remove('normal');
        priorityButton.classList.add('high');
        priorityButton.textContent = '!!!';
    } else {
        priorityButton.classList.remove('high');
        priorityButton.classList.add('low');
        priorityButton.textContent = '!';
    }
}

// Agregar este evento al final del archivo
document.getElementById('taskPriority').addEventListener('click', cyclePriorityButton);

// Agregar esta nueva función para resetear el botón de prioridad
function resetPriorityButton() {
    const priorityButton = document.getElementById('taskPriority');
    priorityButton.classList.remove('high', 'normal');
    priorityButton.classList.add('low');
    priorityButton.textContent = '!';
}

// Asegúrate de que esta línea esté al final del archivo
document.addEventListener('DOMContentLoaded', resetPriorityButton);

// Agregar estos event listeners al final del archivo
document.getElementById('clearCompleted').addEventListener('click', clearCompletedTasks);
document.getElementById('clearAll').addEventListener('click', clearAllTasks);

// Modificar la función clearAllTasks
function clearAllTasks() {
    tasks = [];
    updateTaskList();
    showMessage('Todas las tareas han sido borradas', 'success');
}

// Modificar la función clearCompletedTasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    updateTaskList();
    showMessage('Tareas completadas han sido borradas', 'success');
}

function changePriority(index) {
    const priorities = ['low', 'normal', 'high'];
    const currentPriority = tasks[index].priority;
    const currentIndex = priorities.indexOf(currentPriority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    tasks[index].priority = priorities[nextIndex];
    updateTaskList();
}

// Add this after updateTaskList is called
document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target.classList.contains('priority-button')) {
        const taskIndex = Array.from(this.children).indexOf(e.target.closest('li'));
        changePriority(taskIndex);
    }
});
