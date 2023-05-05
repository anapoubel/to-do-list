const form = document.querySelector(".task-form");
var taskDescription = document.querySelector(".add-input");
var taskList = document.querySelector(".tasks-list");
var tasks = JSON.parse(localStorage.getItem("itens")) || [];

tasks.forEach( e => {
   drawTask(e);
});

form.onsubmit = (e) => {
   e.preventDefault();

   let id = tasks[tasks.length -1] ? tasks[tasks.length -1].id +1 : 0;
   let descript = taskDescription.value;
   var atualTask = {
      "id": id,
      "description": descript
   }   

   drawTask(atualTask);
   tasks.push(atualTask);
   form.reset();
   
   localStorage.setItem("itens", JSON.stringify(tasks));
}

function drawTask(task) {
   taskList.innerHTML += `
      <div class="task-container">
         <label for="${task.id}" class="task-label">${task.description}
            <input type="checkbox" id="${task.id}" class="task-input">
            <span class="checkmark"></span>     
         </label>
         <span class="delete" onclick="delTask(this.parentNode, ${task.id})"></span>
      </div>
   `;   
}

function delTask(container, id) {
   container.remove();

   tasks.splice(tasks.findIndex(e => e.id == id), 1);

   localStorage.setItem("itens", JSON.stringify(tasks));
}