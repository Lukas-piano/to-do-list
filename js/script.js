{
    let tasks = [];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();  
    };


    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
            }
        
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });

    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li class="
        task__item${task.done && hideDoneTasks ? " task__item--hidden" : ""} js-task">
        <button class="tasks__button tasks__button--done js-toggleDone">${task.done ? "✔" : ""}</button>
          <span class="tasks__content ${task.done ? " tasks__content--done" : ""}">${task.content}</span>
          <button class="tasks__button tasks__button--remove js-remove">🗑</button>        
        </li> `;
        
        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
         <button class=buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button
                class="buttons_button js-markAllDone"
                ${ task.every(({ done }) => done) ? " disabled" : ""}>
                Ukończ wszystkie
                </button>
                `;
        
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTaskDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneButton");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }

    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormsSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();


        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
        }

        newTaskInput.focus();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormsSubmit);

    };
    init();
