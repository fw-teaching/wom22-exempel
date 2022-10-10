/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window.
 */

getNotes = async () => {
    console.log('getNotes')
    //console.log(await window.electron.getStuffFromMain())
    //await window.electron.sendStuffToMain('Stuff from renderer')

    const notes = await window.electron.getNotes()
    console.log(notes)
}
getNotes()


document.querySelector('#btn-login').addEventListener('click', async () => {
    await window.electron.notesLogin()
})
/*
document.querySelector('#btn-test').addEventListener('click', async () => {
    await window.electron.btnClick('Clicked button!')
})
*/