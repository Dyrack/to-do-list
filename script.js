// Начальное состояние
const state = {
    tasks: [],
    filter: 'all',
  };
  
  // Чистые функции
  const createTask = (title) => ({
    id: Date.now(),
    title,
    completed: false,
  });
  
  const addTask = (tasks, newTask) => [...tasks, newTask];
  
  const toggleTaskCompletion = (tasks, taskId) =>
    tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  
  const deleteTask = (tasks, taskId) => tasks.filter((task) => task.id !== taskId);
  
  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };
  
  // Вспомогательные функции
  const updateView = () => {
    const taskList = document.getElementById('tasks');
    const visibleTasks = filterTasks(state.tasks, state.filter);
  
    taskList.innerHTML = visibleTasks
      .map(
        (task) => `
          <li class="task-item ${task.completed ? 'completed' : ''}">
            <span>${task.title}</span>
            <div class="task-buttons">
              <button onclick="toggleTask(${task.id})">Toggle</button>
              <button onclick="removeTask(${task.id})">Delete</button>
            </div>
          </li>
        `
      )
      .join('');
  };
  
  const setActiveFilter = (filter) => {
    state.filter = filter;
    document
      .querySelectorAll('.filter-btn')
      .forEach((btn) => btn.classList.toggle('active', btn.dataset.view === filter));
    updateView();
  };
  
  // Обработчики событий
  document.getElementById('new-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-task');
    const newTask = createTask(input.value);
    state.tasks = addTask(state.tasks, newTask);
    input.value = '';
    updateView();
  });
  
  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => setActiveFilter(button.dataset.view));
  });
  
  // Методы, привязанные к кнопкам задач
  window.toggleTask = (id) => {
    state.tasks = toggleTaskCompletion(state.tasks, id);
    updateView();
  };
  
  window.removeTask = (id) => {
    state.tasks = deleteTask(state.tasks, id);
    updateView();
  };
  
  // Инициализация
  updateView();