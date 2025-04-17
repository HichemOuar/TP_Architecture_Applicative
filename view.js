class TaskRenderer {
    render(task) {
        throw new Error("Méthode abstraite 'render' non implémentée");
    }
}

class TravailRenderer extends TaskRenderer {
    render(task, index) {
        return `
        <li style="color:red">
            ${index + 1}: ${task.text}
            <button class="delete-btn" data-index="${index}">Supprimer</button>
        </li>`;
    }
}

class MaisonRenderer extends TaskRenderer {
    render(task, index) {
        return `
        <li style="color:blue">
            ${index + 1}: ${task.text}
            <button class="delete-btn" data-index="${index}">Supprimer</button>
        </li>`;
    }
}

class DiversRenderer extends TaskRenderer {
    render(task, index) {
        return `
        <li style="color:green">
            ${index + 1}: ${task.text}
            <button class="delete-btn" data-index="${index}">Supprimer</button>
        </li>`;
    }
}

const TaskView = (() => {
    const appContainer = document.getElementById("taskApp");

    const getRenderer = (category) => {
        switch (category) {
            case "travail": return new TravailRenderer();
            case "maison": return new MaisonRenderer();
            case "divers": return new DiversRenderer();
            default: return new DiversRenderer();
        }
    };

    const render = (tasks) => {
        appContainer.innerHTML = `
            <div id="taskWrapper">
                <form id="taskForm" class="form-inline">
                    <input type="text" id="taskInput" placeholder="Ajouter une tâche..." />
                    <select id="taskCategory">
                        <option value="travail" style="color: red;">Travail</option>
                        <option value="maison" style="color: blue;">Maison</option>
                        <option value="divers" style="color: green;">Divers</option>
                    </select>
                    <button type="submit">Ajouter</button>
                </form>
                <ul id="taskList">
                    ${tasks.map((task, index) => getRenderer(task.category).render(task, index)).join("")}
                </ul>
            </div>`
            const categorySelect = document.getElementById("taskCategory");
            const updateSelectColor = () => {
                const colorMap = {
                    travail: "red",
                    maison: "blue",
                    divers: "green"
                };
                categorySelect.style.color = colorMap[categorySelect.value];
            };

        updateSelectColor();
        categorySelect.addEventListener("change", updateSelectColor);
    ;};

    const bindAddTask = (handler) => {
        const form = document.getElementById("taskForm");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.getElementById("taskInput");
            const category = document.getElementById("taskCategory").value;
            handler(input.value, category);
            input.value = "";
        });
    };

    const bindDeleteTask = (handler) => {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = parseInt(button.getAttribute("data-index"));
                handler(index);
            });
        });
    };

    return {
        render,
        bindAddTask,
        bindDeleteTask
    };
})();
