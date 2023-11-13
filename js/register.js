
///////////////////////////////////////////////////////////
const btn_reg = document.getElementById("btn_reg")
const formulario = document.getElementById("formulario")

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    if(formulario.passTwo.value == formulario.pass.value){

        await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "USUARIO": formulario.username.value,
                "CONTRASENA": formulario.pass.value,
                "GMAIL": formulario.email.value,
                "Cedula": '',
                "ROL": "usr"
            })
        })
        window.carrito = JSON.stringify([])
        window.name = formulario.username.value;
        window.location.href = "/html/stock.html";
    }else{
        alert('Las contraseñas no coinciden')
        formulario.username.value = "";
        formulario.email.value = "";
        formulario.pass.value = "";
        formulario.passTwo.value = "";
        return;
    }
   
})
