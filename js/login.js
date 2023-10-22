
const formulario = document.getElementById("formulario")
/////////////////////////////////////////////////////////



formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const response = await fetch('https://sheet.best/api/sheets/5310064d-0a65-48fb-86ee-9a36fc746601')
    const contenidoResponse = await response.json();

    const user = formulario.inputEmail.value;
    const password = formulario.pass.value;
    let find = null;

    contenidoResponse.forEach(usuario => {
        if (usuario.GMAIL === user && usuario.CONTRASENA === password) {
            find = true;
        }
    })

    if (find) {

        Swal.fire({
            icon: 'success',
            title: 'Logueado',
            text: 'Has ingresado correctamente',
            showConfirmButton: true,
            allowOutsideClick: false, 
            allowEscapeKey: false, 
            allowEnterKey: true
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/html/menu.html";
            }
        })
        setTimeout(() => {
            window.location.href = "/html/menu.html";
          }, 2000); 

    } else {
        Swal.fire({
            icon: 'warning',
            title:'Usuario no registrado',
            text: 'Intenta nuevamente',
            showConfirmButton: true,
            allowOutsideClick: false, 
            allowEscapeKey: true, 
            allowEnterKey: true
        })         
        
        document.getElementById('inputEmail').value = "";
        document.getElementById('pass').value = "";
    }


})
