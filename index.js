let url = "https://striveschool.herokuapp.com/api/agenda"

//CREATE
async function createEvent() {
    //get all the information from the form!
    let myEvent = {
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        time: document.querySelector("#date").value,
        price: document.querySelector("#price").value,
    }

    let response;

    let id = document.querySelector("#current-event").value;
    if (id){ //if we have an id, we update
        //PUT to update the info
        response = await fetch(url +"/" +id, { // https://striveschool.herokuapp.com/api/agenda/a2dsamkdj1dmsakd9012
            method: "PUT",
            body: JSON.stringify(myEvent),
            headers: {
                "Content-Type": "application/json"
            }
        } )   
    }
    else{ //else we create!
        //POST the information to the endpoint
        response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(myEvent),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
   
    if (response.ok){
        let responseJson = await response.json()
        await loadEvents()
        //document.querySelector("#current-events").innerHTML += `<li class="list-group-item">${myEvent.time}: ${myEvent.name} - ${myEvent.price}€</li>`

        console.log("Created!", responseJson)
        document.querySelector("#name").value = ""
        document.querySelector("#description").value = ""
        document.querySelector("#date").value = ""
        document.querySelector("#price").value = 0
        document.querySelector("#create-button").value = "Create event"
        document.querySelector("#current-event").value = ""
    }
    else{
        console.log("Error")
    }
}

//READ
async function loadEvents() {
    let response = await fetch(url)
    if(response.ok){
        let events = await response.json()
        let currentEvents = document.querySelector("#current-events");
        currentEvents.innerHTML = ""
        events.forEach(singleEvent => {
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.innerText = `${singleEvent.time.split("T")[0]}: ${singleEvent.name} - ${singleEvent.price}€`
            let div = document.createElement("div")
            let editButton = document.createElement("button")
            editButton.className ="btn btn-primary"
            editButton.innerText="Edit"
            editButton.addEventListener("click", () =>  editEvent(singleEvent))
            div.appendChild(editButton)
            let deleteButton = document.createElement("button")
            deleteButton.className ="btn btn-danger"
            deleteButton.innerText = "X"
            deleteButton.addEventListener("click", () => deleteEvent(singleEvent))
            div.appendChild(deleteButton)
            li.appendChild(div)
            currentEvents.appendChild(li)
        });
        // document.querySelector("#current-events").innerHTML = events.map(
        //         e => `  <li class="list-group-item">${e.time}: ${e.name} - ${e.price}€</li>`
        // ).join("")
    }
}

//DELETE
async function deleteEvent(event){
    console.log("delete")
    let response = await fetch(url + "/" + event._id, {
        method: "DELETE"
    })
    if (response.ok) {
        await loadEvents();
    }
}

//EDIT
async function editEvent(event){
    // take the information from the event and set them in the creation form
    document.querySelector("#name").value = event.name
    document.querySelector("#description").value = event.description
    if (event.time)
        document.querySelector("#date").value =  event.time.split("T")[0]
    document.querySelector("#price").value = event.price
    document.querySelector("#current-event").value = event._id
    document.querySelector("#create-button").value = "Update event"
    // modify the create method in order to EDIT the element instead of creating a new one!

}