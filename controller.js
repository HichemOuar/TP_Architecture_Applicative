const TaskController = ((model, view) => {
    const init = () => {
        view.render(model.getTasks());
        view.bindAddTask(handleAddTask);
        view.bindDeleteTask(handleDeleteTask);
    };

    const handleAddTask = (taskText, category) => {
        model.addTask(taskText, category);
        view.render(model.getTasks());
        view.bindAddTask(handleAddTask);
        view.bindDeleteTask(handleDeleteTask);
    };

    const handleDeleteTask = (index) => {
        model.deleteTask(index);
        view.render(model.getTasks());
        view.bindAddTask(handleAddTask);
        view.bindDeleteTask(handleDeleteTask);
    };

    return {
        init
    };

})(TaskModel, TaskView);

document.addEventListener("DOMContentLoaded", TaskController.init);
