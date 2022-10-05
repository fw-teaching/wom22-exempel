/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window.
 */

(async () => {
    console.log(await window.exposed.getStuffFromMain())
    
    await window.exposed.sendStuffToMain('Stuff from renderer')
})()

document.querySelector('#btn-test').addEventListener('click', async () => {
    await window.exposed.btnClick('Clicked button!')
})