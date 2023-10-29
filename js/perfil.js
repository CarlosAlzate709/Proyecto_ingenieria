const username = document.getElementById('username');
const contraseña = document.getElementById('cedula');
const correo = document.getElementById('correo');
const cedula = document.getElementById('cedula');
const mostrar_edit = document.getElementById('edit-button');
const logout_button = document.getElementById('logout-button');
const edit_profile = document.getElementById('edit-profile');
const edit_cedula = document.getElementById('edit-cedula');
const edit_username = document.getElementById('edit-username');
const edit_password = document.getElementById('edit-password');
const edit_new_password = document.getElementById('edit-new-password');

// const regex = /^[0-9]+$/;

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const contenidoResponse = await response.json();
    let position = 1;
    let passwordFound = ''

    for (let i = 0; i < contenidoResponse.length; i++) {

        if (contenidoResponse[i].USUARIO == window.name) {
            username.textContent = contenidoResponse[i].USUARIO;
            correo.textContent = contenidoResponse[i].GMAIL;
            cedula.textContent = contenidoResponse[i].CEDULA;
            position = i;
            passwordFound = contenidoResponse[i].CONTRASENA;
        }
    }

    const btn_submit = document.getElementById('btn_submit');

    btn_submit.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if ((edit_username.value == '' || null) || (edit_cedula.value == '' || null)) {
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Campos Vacios',
            })
            return false;
        }

        if (passwordFound === edit_password.value) {
            const url = 'https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac/' + position

            Swal.fire({
                title: 'Confirmar los Cambios',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then(async (result) => {

                if (result.isConfirmed) {
                    var changes = null;
                    if (edit_new_password.value != '' && edit_new_password.value != null) {
                     
                        changes = {
                            "USUARIO": edit_username.value,
                            "CONTRASENA": edit_new_password.value,
                            "CEDULA": edit_cedula.value
                        }

                    } else {
                        changes = {
                            "USUARIO": edit_username.value,
                            "CEDULA": edit_cedula.value
                        }
                    }



                    const updateData = await fetch(url, {
                        method: 'PATCH',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(changes)
                    })

                    if (updateData.status == 200) {
                        Swal.fire('Saved!', '', 'success')
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }


                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                text: 'La contraseña registrada no coincide con la ingresada',
                title: 'Error'
            })
        }




    })


});



mostrar_edit.addEventListener('click', async () => {
    if (edit_profile.style.display = "none") {
        edit_profile.style.display = "block";
    } else {
        edit_profile.style.display = "none";
    }
    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const contenidoResponse = await response.json();

    contenidoResponse.forEach(usuario => {
        if (usuario.USUARIO == window.name) {
            edit_username.value = usuario.USUARIO;
            // edit_password.value = usuario.CONTRASENA;
            // edit_new_password.value = usuario.CONTRASENA;
            edit_cedula.value = usuario.CEDULA;
        }
    });
});


logout_button.addEventListener('click', async (e) => {
    e.preventDefault()
    window.name = "";
    window.location.href = "/html/index.html";
});
