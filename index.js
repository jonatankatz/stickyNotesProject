const NOTES_DOM = {
    notes_board:document.querySelector("#tasksBoard"),
    note_name:document.querySelector("#noteName"),
    note_text:document.querySelector("#noteText"),
    note_date:document.querySelector("#dateToDo"),
    note_time:document.querySelector("#timeToDo"),
    add_button:document.querySelector("#addNoteButton"),
    reset_button:document.querySelector("#resetFormButton")
}


NOTES_DOM.add_button.addEventListener("click",saveStickyNOTE)

let arrayOfNotes ;

function draw(arr){
    clearBoard();
    for (let index = 0; index < arr.length; index++) {
      drawNote(arr[index]);
    }

}


function clearBoard(){
   NOTES_DOM.notes_board.innerHTML =  "";
}
function findIndex(arr,id) {
  
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].note_id == id) {

        return index;
      }
    }
}



function  drawNote(stickyNote){
   const { notes_board } = NOTES_DOM;
   const currentNote = getNoteUi(stickyNote)
   if (!currentNote) return;
   notes_board.append(currentNote);

}


function saveStickyNOTE() {
    
    const {
        note_name,
        note_text,
        note_date,
        note_time
    } = NOTES_DOM;

    if (!note_name.value || !note_text.value || !note_date.value || !note_time.value)  
    {alert("Please Fill All Inputs") 
    return;}

  if( validateDate(note_date.value) === false || validateTime(note_time.value,note_date.value) === false ){
      alert("Please enter date & time greatens than now") 
      return;}

let note_id = Date.now();
let completed = "sticky-note-container"

    arrayOfNotes.push (new stickyNote(    
        note_id,
        note_name.value,
        note_text.value,
        note_date.value,
        note_time.value,
        completed
    ));
   
    saveToLocalStorage("stickyNotes",arrayOfNotes);
    draw(arrayOfNotes)
    NOTES_DOM.notes_board.reset();

    }
    

    function saveToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      }

      function init() {
        arrayOfNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
        draw(arrayOfNotes);
      }
      init();

//DATE NOW GENERATOR
Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);

});
document.getElementById("dateToDo").value = new Date().toDateInputValue();
//TIME NOW  GENERATOR
Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(11,16);

});
document.getElementById("timeToDo").value = new Date().toDateInputValue();
