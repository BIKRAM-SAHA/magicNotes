

showNotes();

//if addnote clicked add it to localstorage and show updated notes

let addNoteButton = document.getElementById('addNote');
addNoteButton.addEventListener("click", function(e){
    let newNote = document.getElementById("noteText");        //save written notes in textbox to newNote object
    let addedNotes=localStorage.getItem("notes");           //fectch already added notes from the localstorage
    if (addedNotes == null){
        notesObj = [];                                         //if no addedNotes is found then declare notesObj object as null array
    }
    else{
        notesObj=JSON.parse(addedNotes);                    //if already added notes found then declare notesObj as array containing those notes
    };
    notesObj.push(newNote.value);                         //push new note to the array of already added notes ie notesObj
    localStorage.setItem("notes",JSON.stringify(notesObj)); //commit new array of added notes to the localstorage
    newNote.value="";                                       //reset the innerText value of textarea to null
    showNotes();                                            //show updated notes
})


//declaring showNotes function
function showNotes(){
    let addedNotes=localStorage.getItem("notes");           //fectch already added notes from the localstorage
    if (addedNotes==null){
        notesObj=[];                                         //if no addedNotes is found then declare notesObj object as null array
    }
    else{
        notesObj=JSON.parse(addedNotes);                    //if already added notes found then declare notesObj as array containing those notes
    };
    let html='';                                            //blank string
    notesObj.forEach(function(element, index){            //looping through each note inside notesObj with index=index of note; element= test inside the note
        html+= `
                <div class="note">
                    <h4>Note ${index+1}</h4>                
                    <pre>${element}</pre>
                    <button id="${index}" onclick="dltNote(this.id)">Delete Note</button>
                </div>
                `;
    });
    let notesSection= document.getElementById("Notes");
    if (notesObj==0){
        notesSection.innerHTML='<p>No notes added yet. Use "Add Note".</p>';
    }else{
        notesSection.innerHTML=html;
    }

}



// if delete button pressed on any note dltNote() fucntion called

function dltNote(index) {
    let addedNotes=localStorage.getItem("notes");           //fetch already added notes from the localstorage
    
    notesObj=JSON.parse(addedNotes);                    //if already added notes found then declare notesObj as array containing those notes
    
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj)); //commit new array of notes to the localstorage
    showNotes();
}

// search funtionality

search=document.getElementById("search");                   //grabbing whole search section
search.addEventListener("input",function(){

    let searchTxt=document.getElementById("searchBox").value; //decaring searchTxt having value of text searched
    let noteCollection=Array.from(document.getElementsByClassName("note")); //declaring noteCollection as the array of all notes
    noteCollection.forEach(function(element){                               // looping through eaach particular note from the collectio of all notes
        let noteTxt=element.getElementsByTagName("pre")[0].innerText; //declaring noteTxt with valur of text inside the particular note
        if (noteTxt.includes(searchTxt)){
        }else{
            element.style.display="none"; //if noteTxt includes searchTxt then show otherwise hide
        }
    })

})
