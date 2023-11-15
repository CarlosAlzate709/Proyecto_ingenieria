
///////////////////////////////////////////////////////////
const btn_reg = document.getElementById("btn_reg")
const formulario = document.getElementById("formulario")

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const verify = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac');
    const jsonVery = await verify.json();

    let exist = jsonVery.some(item => item.GMAIL === formulario.email.value)



    if (!exist) {
        if (formulario.passTwo.value == formulario.pass.value) {

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
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Las contraseñas no coinciden',
                text: 'Intenta nuevamente',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: true,
                allowEnterKey: true
            })
            formulario.username.value = "";
            formulario.email.value = "";
            formulario.pass.value = "";
            formulario.passTwo.value = "";
            return;
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Usuario ya registrado',
            text: 'Intenta nuevamente',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true
        })
        formulario.username.value = "";
        formulario.email.value = "";
        formulario.pass.value = "";
        formulario.passTwo.value = "";
        return;
    }
})

