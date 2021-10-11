const formElement=document.querySelector("#toDoForm")
const toDo=document.querySelector('input[name="toDo"]')
const ol=document.querySelector("ol")


const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

for(let i=0;i<savedTodos.length;i++){




    let newLi=document.createElement("li");

    if(savedTodos[i].isCompleted===false){

        
        newLi.innerText=savedTodos[i].action;
        newLi.isClicked=savedTodos[i].isClicked;
        newLi.identity=savedTodos[i].id;
        newLi.isCompleted=savedTodos[i].isCompleted;
        console.log(newLi)
    
        if (newLi.isClicked) {
            newLi.classList.toggle('done')
        }

        ol.appendChild(newLi);

    }
}


function newToDo(action){
    const newLi=document.createElement("li");
    newLi.innerText=action;
    newLi.isClicked=false;
    newLi.isCompleted=false;
    newLi.identity=Date.now();
    return newLi;
    
}

formElement.addEventListener("submit",function(event){
 
    event.preventDefault();
    console.log("you just submit a form!!!")
    const li=newToDo(toDo.value)
    ol.appendChild(li)
    
    toDo.value=""
    
    savedTodos.push({ action: li.innerText, isClicked: li.isClicked, id: li.identity , isCompleted: li.isCompleted});
    localStorage.setItem("todos", JSON.stringify(savedTodos));

})

ol.addEventListener("click",function(event){
    if(event.target.tagName==="LI"){
        if(event.target.isClicked){
            event.target.isClicked=false
        }
        else{
            event.target.isClicked=true
            console.log(event.target.isClicked)
        }
        event.target.classList.toggle('done')

        for(let i in savedTodos){
            if(event.target.identity===savedTodos[i].id){
                savedTodos[i].isClicked=event.target.isClicked
            }

        }
        console.log(savedTodos)

        localStorage.setItem("todos", JSON.stringify(savedTodos));
        // localStorage.setItem("todos", JSON.stringify(savedTodos));
        //IS there any way to reach this savedTodos
    }

    
})

ol.addEventListener("dblclick",function(event){
    if(event.target.tagName==="LI"){
        event.target.isCompleted=true
        for(let i in savedTodos){
            if(event.target.identity===savedTodos[i].id){
                savedTodos[i].isCompleted=event.target.isCompleted
            }
        }

        event.target.remove()
        
    }
    


    localStorage.setItem("todos", JSON.stringify(savedTodos));
})
