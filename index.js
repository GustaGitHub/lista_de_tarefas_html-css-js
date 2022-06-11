/*
    Classe : crud()
    Métodos : create(), read(), update(), delete()
*/
function crud(){
    this.create = async (value) =>{
        if(localStorage.getItem('db') == undefined){
            let addValue = [value]
            localStorage.setItem('db', addValue) 
        }
        else{
            let lastValues = localStorage.getItem('db').split(",")
            lastValues.push(value)
            localStorage.setItem('db', lastValues)
        }
    }

    this.read = async () =>{
       let results = localStorage.getItem('db')
       return results.split(",");
    }

    this.update = async (value, newValue) =>{
       let lastValues = localStorage.getItem('db').split(",")
       let indexOfValue = lastValues.indexOf(value)
       
       lastValues[indexOfValue] = newValue
       localStorage.setItem('db',lastValues)
    }

    this.delete = async (value) =>{
        let lastValues = localStorage.getItem('db').split(",")
        let indexOfValue = lastValues.indexOf(value)
    
        lastValues.splice(indexOfValue, 1)
        if(indexOfValue == 0){
            localStorage.removeItem('db')
        }
        else{
            localStorage.setItem('db', lastValues)
        }
    }
}

//Objeto da classe crud()
const listTasks = new crud();


function loadTasks(){
    listTasks.read()
        .then(res => {
            let divListTasks = document.querySelector('#listTasks')
            res.map(i => {
                divListTasks.innerHTML += `
                <h3>
                    - ${i.toUpperCase()}
                    <br/><br/> 
                    <button class="task" onclick="updateTask('${i}')"> Atualizar </button>
                    <button class="task" onclick="deleteTask('${i}')" > Deletar </button>
                </h3>
                <hr/>
                `
            })
        })
        .catch(() => {
            let divListTasks = document.querySelector('#listTasks')
            divListTasks.innerHTML = "<h3>Nenhuma tarefa adcionada</h3>"
        })
}

function addTask(){
    let taskValue = document.querySelector('#task').value
    if(taskValue.length == 0){
        alert('Adicione uma tarefa')
    }
    else{
        listTasks.create(taskValue)
            .then(() => alert(`Tarefa adicionanda: * ${taskValue} *`))
            .catch(err => alert(err))
            .finally(()=> location.reload())
    }
}

function updateTask(task){
    let newValueTask = prompt(`Atualizar esta tarefa:\n* ${task} *`)
    
    if(newValueTask == null){
        return;
    }
    else{
        listTasks.update(task, newValueTask)
            .then(() => alert(`A tarefa * ${task} * foi Atualizada para:\n*${newValueTask}*`))
            .catch(() => alert("Falha ao tentar atualizar o nome"))
            .finally(() => location.reload())
    }
}

function deleteTask(task){
    let confirmDeleteTask = confirm(`Deseja deletar a tarefa:\n* ${task} *`)
    
    if(confirmDeleteTask){
        listTasks.delete(task)
            .then(()=> alert(`A tarefa * ${task} *  Foi deletada`))
            .catch(()=> alert("Erro ao deletar"))
            .finally(()=> location.reload())
    }
    else{
        return;
    }
}
