class Task {
    constructor(text) {
        this.text = text;
    }
}

class AdvancedTask extends Task {
    constructor(text, category) {
        super(text);
        this.category = category;
    }
}


const TaskModel = (() => {
    let instance;
    class TaskManager {
        constructor() {
            if (!instance) {
                this.tasks = [];
                instance = this;
            }
            return instance;
        }

        addTask(taskText, category) {
            if (taskText.trim() !== "" && category) {
                const task = new AdvancedTask(taskText, category);
                this.tasks.push(task);
            }
        }

        getTasks() {
            return this.tasks;
        }

        deleteTask(index) {
            if (index >= 0 && index < this.tasks.length) {
                this.tasks.splice(index, 1);
            }
        }
    }

    return new TaskManager();
})();
