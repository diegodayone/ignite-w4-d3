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
    //POST the information to the endpoint
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(myEvent),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok){
        let responseJson = await response.json()
        document.querySelector("#current-events").innerHTML += `<li class="list-group-item">${myEvent.time}: ${myEvent.name} - ${myEvent.price}€</li>`

        console.log("Created!", responseJson)
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
        events.forEach(e => {
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.innerText = `${e.time}: ${e.name} - ${e.price}€`
            let editButton = document.createElement("button")
            editButton.className ="btn btn-primary"
            editButton.innerText="Edit"
            editButton.addEventListener("click", () =>  editEvent(e))
            li.appendChild(editButton)
            let deleteButton = document.createElement("button")
            deleteButton.className ="btn btn-danger"
            deleteButton.innerText = "X"
            deleteButton.addEventListener("click", () => deleteEvent(e))
            li.appendChild(deleteButton)
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
    document.querySelector("#date").value = event.time
    document.querySelector("#price").value = event.price
    // modify the create method in order to EDIT the element instead of creating a new one!

}