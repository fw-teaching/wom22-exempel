/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window.
 */
getNotes = async () => {
    console.log('getNotes')
    const notes = await window.electron.getNotes()
    console.log(notes)

    let notesHTML = "";
    for (const note of notes) {
        notesHTML += `
            <div class="note">${note.text}</div>
        `;
    }

    document.querySelector('#notes').innerHTML = notesHTML;

}
getNotes()


document.querySelector('#btn-login').addEventListener('click', async () => {
    document.querySelector('#msg').innerText = ''
    const login_failed = await window.electron.notesLogin({
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    })
    if (login_failed) {
        document.querySelector('#msg').innerText = login_failed.msg
        return 
    }

    getNotes()
})
