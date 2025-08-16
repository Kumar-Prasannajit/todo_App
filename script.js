document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("todo-input");
    const AddBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const saveTask = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    const renderTasks = (task) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
            <span class='task-text'>${task.text}</span>
            <button class='btn'>Delete</button>
        `
        if (task.completed) {
            li.querySelector('.task-text').classList.add("completed");
        }

        todoList.append(li);
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.querySelector('.task-text').classList.toggle("completed");
            saveTask();
        })
        li.querySelector('button').addEventListener('click', (e) => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTask();
            li.remove();
        })

    }
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTasks(task));
    AddBtn.addEventListener('click', () => {
        if (input.value === "") return;
        const taskText = input.value;
        const newtask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newtask);
        input.value = "";
        saveTask();
        renderTasks(newtask);
    })


})