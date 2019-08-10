// Function constructor  sticky note
function stickyNote(id, name, text, date, time, completed) {
    this.note_id = id,
        this.note_name = name;
    this.note_text = text;
    this.note_date = date;
    this.note_time = time;
    this.completed = completed;

}
// sticky note Ui
function getNoteUi(stickyNote) {
    const {
        note_id,
        note_name,
        note_text,
        note_date,
        note_time,
        completed
    } = stickyNote

    // completed boolean statement
    let mainDivComplete = "sticky-note-container"
    let completeIcon = "fas fa-check-square"
    if (completed === true) {
        mainDivComplete = "completed"
        completeIcon = "fas fa-trash-restore"

    }

    const note_mainDiv = document.createElement("div")
    note_mainDiv.classList.add(mainDivComplete, "mr-4")
    note_mainDiv.id = note_id
    note_mainDiv.addEventListener("mouseover", visibleBtn)
    note_mainDiv.addEventListener("mouseout", invisibleBtn)

    const note_secDiv = document.createElement("div");
    note_secDiv.id = "note";
    note_secDiv.className = "secDivNote";

    const note_buttons = document.createElement("div");
    note_buttons.id = "buttonsDiv"
    note_buttons.classList.add("note-buttons", "invisible")

    const complete_button = document.createElement("button")
    complete_button.id = "completeBtn"
    complete_button.style.outline = "none";
    complete_button.className = "my-button ml-1";
    complete_button.addEventListener("click", completeHandler)

    const complete_icon = document.createElement("i");
    complete_icon.className = completeIcon;

    const delete_button = document.createElement("button");
    delete_button.id = "deleteBtn";
    delete_button.style.outline = "none";
    delete_button.className = "my-button float-right mr-1";
    delete_button.addEventListener("click", deleteHandler)

    const delete_icon = document.createElement("i");
    delete_icon.className = "fas fa-window-close";

    const date_div = document.createElement("div");
    date_div.className = "due-date-note";

    const date_span = document.createElement("span");
    date_span.innerText = "Date : " + note_date;

    const time_div = document.createElement("div");
    time_div.className = "due-time-note"

    const time_span = document.createElement("div");
    time_span.innerText = "Time : " + note_time

    const note_name_cont = document.createElement("div");
    note_name_cont.className = "name-note-container";

    const note_name_title = document.createElement("h6");
    note_name_title.innerText = note_name;

    const note_text_cont = document.createElement("div");
    note_text_cont.className = "text-note-container";

    const note_text_p = document.createElement("p");
    note_text_p.innerText = note_text;

    note_mainDiv.append(note_secDiv)
    note_secDiv.append(note_buttons, date_div, time_div, note_name_cont, note_text_cont)
    note_buttons.append(complete_button, delete_button)
    complete_button.append(complete_icon)
    delete_button.append(delete_icon)
    date_div.append(date_span)
    time_div.append(time_span)
    note_name_cont.append(note_name)
    note_text_cont.append(note_text)
    return note_mainDiv;

}

// sticky note Ui functions
function invisibleBtn() {
    let buttonsDiv = this.querySelector("#buttonsDiv")
    buttonsDiv.classList.add("invisible")
    buttonsDiv.classList.remove("visible")
}

function visibleBtn() {
    let buttonsDiv = this.querySelector("#buttonsDiv")
    buttonsDiv.classList.add("visible")
    buttonsDiv.classList.remove("invisible")

}

// buttons functions
function completeHandler() {
    let thisId = this.parentElement.parentElement.parentElement.id
    completeNote(thisId)

}

function completeNote(id) {
    const index = findIndex(arrayOfNotes, id);
    if (id === undefined) return;
    if (arrayOfNotes[index].completed === false) {
        arrayOfNotes[index].completed = true;
    } else {
        arrayOfNotes[index].completed = false;
    }
    saveToLocalStorage("stickyNotes", arrayOfNotes);
    draw(arrayOfNotes);
}

function deleteHandler() {
    deleteNote(this.parentElement.parentElement.parentElement.id)
}

function deleteNote(id) {
    const index = findIndex(arrayOfNotes, id);

    if (id === undefined) return;
    arrayOfNotes.splice(index, 1);
    saveToLocalStorage("stickyNotes", arrayOfNotes);
    draw(arrayOfNotes);

}