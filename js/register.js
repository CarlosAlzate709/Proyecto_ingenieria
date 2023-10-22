
///////////////////////////////////////////////////////////
const btn_reg = document.getElementById("btn_reg")
const formulario = document.getElementById("formulario")

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    if(formulario.passTwo.value == formulario.pass.value){

        await fetch('https://sheet.best/api/sheets/5310064d-0a65-48fb-86ee-9a36fc746601', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "USUARIO": formulario.username.value,
                "CONTRASENA": formulario.pass.value,
                "GMAIL": formulario.email.value
            })
        })
    
        window.location.href = "/html/menu.html";
    }else{
        alert('Las contraseñas no coinciden')
        formulario.username.value = "";
        formulario.email.value = "";
        formulario.pass.value = "";
        formulario.passTwo.value = "";
        return;
    }
   
})
