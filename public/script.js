const noteForm = document.getElementById('noteForm');
const noteList = document.getElementById('noteList');
const errorDiv = document.getElementById('error');

let editId = null; 

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
 

  if (!title || !content) {
    errorDiv.textContent = 'Minden mező kitöltése kötelező!';
    return;
  }

  errorDiv.textContent = '';
    
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ })
    });
  

  noteForm.reset();
  loadNotes();
});

async function loadNotes() {
  noteList.innerHTML = '';
  const res = await fetch('/api/notes');
  const notes = await res.json();
  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'note-item';
    li.innerHTML = `
      <strong>${note.title} - ${note.content}</strong>
      <button onclick="editNote(${note.id})">Szerkesztés</button>
      <button onclick="deleteNote(${note.id})">Törlés</button>
    `;
    noteList.appendChild(li);
  });
}

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  loadNotes();
}

async function editNote(id) {
  const res = await fetch(`/api/nots/${id}`);
  const note = await res.json();
  document.getElementById('title').value = not.title;
  document.getElementById('content').value= not.content;
  editId = id;
}

loadNotes();