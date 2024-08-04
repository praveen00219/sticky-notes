document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.getElementById("notes-container");
  const addNoteButton = document.getElementById("add-note");
  const noteContent = document.getElementById("note-content");
  const bgColorPicker = document.getElementById("bg-color-picker");
  const fontColorPicker = document.getElementById("font-color-picker");
  const boldTextButton = document.getElementById("bold-text");
  let dragNote = null;
  let isBold = false;

  // boldTextButton.addEventListener("click", function () {
  //   isBold = !isBold;
  //   boldTextButton.classList.toggle("btn-primary", isBold);
  //   boldTextButton.classList.toggle("btn-secondary", !isBold);
  // });

  addNoteButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (noteContent.value.trim() === "") {
      alert("Please enter some text for the note.");
      return;
    }

    // Create the note element
    const note = document.createElement("div");
    note.className = "note bg-yellow-300 shadow-lg rounded p-4";
    note.style.backgroundColor = bgColorPicker.value;
    note.style.color = fontColorPicker.value;
    // note.style.fontWeight = isBold ? "bold" : "normal";
    note.draggable = true;
    note.innerHTML = `
            <div class="flex justify-between p-1 ">
                <p>${noteContent.value}</p>
                <button class="delete-note btn btn-xs border py-1 px-2 shadow-lg rounded-lg text-black bg-red-600 hover:bg-800">X</button>
            </div>
        `;
    notesContainer.appendChild(note);
    noteContent.value = "";

    // Add animations
    note.classList.add("animate-add");

    setTimeout(() => note.classList.remove("animate-add"), 300);

    // Add drag and drop event listeners
    note.addEventListener("dragstart", function (e) {
      dragNote = note;
      setTimeout(() => (note.style.display = "none"), 0);
    });

    note.addEventListener("dragend", function (e) {
      setTimeout(() => {
        dragNote.style.display = "block";
        dragNote = null;
      }, 0);
    });

    notesContainer.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    notesContainer.addEventListener("drop", function (e) {
      if (dragNote) {
        notesContainer.appendChild(dragNote);
      }
    });

    // Delete note
    note.querySelector(".delete-note").addEventListener("click", function () {
      note.classList.add("animate-remove");
      setTimeout(() => notesContainer.removeChild(note), 300);
    });
  });
});
