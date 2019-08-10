const NOTES_DOM = {
    notes_board: document.querySelector("#tasksBoard"),
    note_name: document.querySelector("#noteName"),
    note_text: document.querySelector("#noteText"),
    note_date: document.querySelector("#dateToDo"),
    note_time: document.querySelector("#timeToDo"),
    add_button: document.querySelector("#addNoteButton"),
    reset_button: document.querySelector("#resetFormButton")
}

NOTES_DOM.add_button.addEventListener("click", saveStickyNOTE)

let arrayOfNotes = [];

function getSelectedValue() {
    let sortByVal = document.querySelector("#sortBy").value
    sortBy(sortByVal, arrayOfNotes)
}




// drawing functions
function draw(arr) {
    console.log(arr)
    clearBoard();
    for (let index = 0; index < arr.length; index++) {
        drawNote(arr[index]);
    }

}


function clearBoard() {
    NOTES_DOM.notes_board.innerHTML = "";
}

function findIndex(arr, id) {

    for (let index = 0; index < arr.length; index++) {
        if (arr[index].note_id == id) {

            return index;
        }
    }
}



function drawNote(stickyNote) {
    const {
        notes_board
    } = NOTES_DOM;
    const currentNote = getNoteUi(stickyNote)
    let currentid = currentNote.id.slice(0, 10)
    let currenTime = Date.now().toString().slice(0, 10)
    if (!currentNote) return;

    if (currentid === currenTime) {
        $(currentNote).hide().appendTo(notes_board).fadeIn(1000);

    }
    notes_board.append(currentNote);

}

// main function save sticky note
function saveStickyNOTE() {

    const {
        note_name,
        note_text,
        note_date,
        note_time
    } = NOTES_DOM;




    // validate that all inputs are filled
    if (!note_name.value || !note_text.value || !note_date.value || !note_time.value) {
        alert("Please Fill All Inputs")
        return;
    }


    // date regex validation

    const dateValidationResult = dateRegexValidate(note_date.value)
    const timeValidationResult = timeRegexValidate(note_time.value)
    if (!dateValidationResult) {
        alert("Date is not valid")
        return;
    }
    if (!timeValidationResult) {
        alert("Time is not valid")
        return;
    }

    // validate that the due date and time is greatens than now

    if (validateDate(note_date.value) === false || validateTime(note_time.value, note_date.value) === false) {
        console.log()
        alert("Please enter date & time greatens than now")
        return;
    }

    let note_id = Date.now();
    let completed = false;
    let dateYear = note_date.value.slice(0, 4);
    let dateMonth = note_date.value.slice(5, 7);
    let dateDay = note_date.value.slice(8, 10);
    let note_dateInput = (dateDay + "-" + dateMonth + "-" + dateYear)

    arrayOfNotes.push(new stickyNote(
        note_id,
        note_name.value,
        note_text.value,
        note_dateInput,
        note_time.value,
        completed,
    ));

    saveToLocalStorage("stickyNotes", arrayOfNotes);
    draw(arrayOfNotes)
    NOTES_DOM.notes_board.reset();

}

// validation functions
function dateRegexValidate(date) {
    let dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    return dateRegex.test(date)
}

function timeRegexValidate(time) {
    let timeRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/
    return timeRegex.test(time)
}

function validateTime(note_time, note_date) {
    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(11, 16);

    });
    let timeNow = new Date().toDateInputValue();
    timeNow = timeNow.replace(":", '')
    timeNow = Number(timeNow)

    let Itime = note_time
    Itime = Itime.replace(":", '')
    Itime = Number(Itime)

    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);


    });

    let dateNow = new Date().toDateInputValue();
    dateNow = dateNow.replace("-", '')
    dateNow = dateNow.replace("-", '')
    dateNow = Number(dateNow)

    let Idate = note_date
    Idate = Idate.replace("-", '')
    Idate = Idate.replace("-", '')
    Idate = Number(Idate)

    if (Idate === dateNow && Itime < timeNow) {
        return false;
    }


}

function validateDate(note_date) {
    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);


    });

    let dateNow = new Date().toDateInputValue();
    dateNow = dateNow.replace("-", '')
    dateNow = dateNow.replace("-", '')
    dateNow = Number(dateNow)

    let Idate = note_date
    Idate = Idate.replace("-", '')
    Idate = Idate.replace("-", '')
    Idate = Number(Idate)

    if (Idate < dateNow) {
        return false;
    }
}
// local storage functions 

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function init() {
    arrayOfNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    draw(arrayOfNotes);
}
init();

function sortBy(value, arr) {
    switch (value) {
        case ("All"):
            draw(arr);
            break;
        case ("ToDo"):
            sortToDo(arr)
            break;
        case ("Today"):
            sortToday(arr)
            break;
        case ("Completed"):
            sortCompleted(arr)
            break;

    }
}

function sortToday(arr) {
    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);

        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });
    clearBoard()
    for (let index = 0; index < arr.length; index++) {
        let dateNow = new Date().toDateInputValue();
        let dateYear = dateNow.slice(0, 4);
        let dateMonth = dateNow.slice(5, 7);
        let dateDay = dateNow.slice(8, 10);
        dateNow = (dateDay + dateMonth + dateYear)
        dateNow = Number(dateNow)
        console.log(dateNow)
        let currentNote = arr[index]
        let Idate = currentNote.note_date
        Idate = Idate.replace("-", '')
        Idate = Idate.replace("-", '')
        Idate = Number(Idate)
        console.log(Idate)
        if (Idate === dateNow) {

            drawNote(arr[index])
        } else {
            clearBoard()
        }
    }

}

function sortCompleted(arr) {
    clearBoard()
    for (let index = 0; index < arr.length; index++) {
        let currentNote = arr[index]
        let completed = currentNote.completed
        console.log(completed)
        if (completed) {

            console.log(arr[index])
            drawNote(arr[index])

        }
    }
}

function sortToDo(arr) {
    clearBoard()
    for (let index = 0; index < arr.length; index++) {
        let currentNote = arr[index]
        let completed = currentNote.completed
        console.log(completed)
        if (!completed) {

            console.log(arr[index])
            drawNote(arr[index])

        }
    }
}
//DATE NOW GENERATOR
Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);

    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);

});
document.getElementById("dateToDo").value = new Date().toDateInputValue();
//TIME NOW  GENERATOR
Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(11, 16);

});
document.getElementById("timeToDo").value = new Date().toDateInputValue();