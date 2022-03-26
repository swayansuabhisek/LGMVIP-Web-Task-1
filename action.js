function header() {
    const dateHeader = document.getElementById("date");
    const taskCount = document.getElementById("task-count");
  
    let storage = JSON.parse(localStorage.getItem("todolist"));
    storage = storage ? storage : [];
  
    dateHeader.innerHTML = moment(new Date()).format("ddd, DD MMM YYYY");
    taskCount.innerHTML = `${storage.length} Tasks`;
  }
  
  function listSection() {
    let storage = JSON.parse(localStorage.getItem("todolist"));
    // if there is no item in localstorage, initialize new object array
    storage = storage ? storage : [];
  
    let list = document.getElementById("list");
    list.innerHTML = "";
  
    // create a div element with class name 'cards'
    function cardElements(id, title, createdAt, resolved) {
      // set time with momentjs
      const time = moment(createdAt).locale("en-US").fromNow();
  
      return `
        <div class="cards ${resolved ? "resolved" : null}">
          <button
            class="fas fa-check btn resolved-btn ${resolved ? "active" : null}"
            value=${id}
          ></button>
          <div class="cards-info">
            <h3 class="task">${title}</h3>
            <p class="time">${time}</p>
          </div>
          <button value=${id} class="fas fa-times btn delete-btn"></button>
        </div>
      `;
    }
  
    storage.reverse().map((elem) => {
      list.innerHTML += cardElements(
        elem.id,
        elem.title,
        elem.createdAt,
        elem.resolved
      );
    });
  
    listAction();
  }
  
  function listAction() {
    const deleteBtn = document.querySelectorAll(".cards .delete-btn");
    const resolvedBtn = document.querySelectorAll(".cards .resolved-btn");
  

    function deleteList(listID) {
      let storage = JSON.parse(localStorage.getItem("todolist"));

      storage = storage ? storage : [];
  
      const res = storage.filter((elem) => {
        return elem.id !== listID;
      });
  
      localStorage.setItem("todolist", JSON.stringify(res));
    }
  
    function resolvedList(listID) {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      // if there is no item in localstorage, initialize new object array
      storage = storage ? storage : [];
      // find todolist data then change property value 'resolved' to 'true'
      storage.map((elem) => {
        if (elem.id === listID) {
          if (elem.resolved === true) {
            elem.resolved = false;
          } else {
            elem.resolved = true;
          }
        }
      });
  
      localStorage.setItem("todolist", JSON.stringify(storage));
    }
  
    deleteBtn.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        deleteList(event.target.value);
  
        // update data
        listSection();
        header();
      });
    });
  
    resolvedBtn.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        resolvedList(event.target.value);
  
        // update data
        listSection();
      });
    });
  }
  
  (function () {
    const inputField = document.getElementsByClassName("form-control")[0];
    const addBtn = document.getElementsByClassName("add-btn")[0];
  
    // read user typing
    inputField.addEventListener("keyup", (event) => {
      inputField.value = event.target.value;
    });
  
    function handleSubmit() {
      let storage = JSON.parse(localStorage.getItem("todolist"));
      // if there is no item in localstorage, initialize new object array
      storage = storage ? storage : [];
  
      // create unique ID for each list
      const listID = [];
      const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for (let i = 0; i < 10; i++) {
        listID[i] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }
  
      if (inputField.value.length > 0) {
        // insert new data into storage array object
        storage.push({
          id: listID.join(""),
          title: inputField.value,
          createdAt: new Date(),
          resolved: false
        });
  
        // update local storage with new data
        localStorage.setItem("todolist", JSON.stringify(storage));
  
        listSection();
        header();
        inputField.value = "";
      }
    }
  
    inputField.onkeypress = (event) =>
      event.keyCode === 13 ? handleSubmit() : null;
    addBtn.onclick = () => handleSubmit();
  })();
  
  window.onload = () => {
    let storage = JSON.parse(localStorage.getItem('todolist'));
    // if there is no item in localstorage, initialize new object array
    storage = storage ? storage : [];
    const defaultDate = new Date('Mon Jan 01 2022 04:43:51 GMT-0800');
    
    header();
    listSection();
  }
  