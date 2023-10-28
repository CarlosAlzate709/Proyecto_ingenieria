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
const btn_submit = document.getElementById('btn_submit');
const regex = /^[0-9]+$/;

document.addEventListener('DOMContentLoaded', async() =>{
    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const contenidoResponse = await response.json();

    contenidoResponse.forEach(usuario => {
        if(usuario.USUARIO == window.name){
            username.textContent = usuario.USUARIO;
            correo.textContent = usuario.GMAIL;
            cedula.textContent = usuario.CEDULA;
        }
    });
});

logout_button.addEventListener('click', async() => {
    window.name = "";
    window.location.href = "/html/index.html";
});

mostrar_edit.addEventListener('click', async() =>{
    if(edit_profile.style.display = "none"){
        edit_profile.style.display = "block";
    }else{
        edit_profile.style.display = "none";
    }
    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const contenidoResponse = await response.json();

    contenidoResponse.forEach(usuario => {
        if(usuario.USUARIO == window.name){
            edit_username.value = usuario.USUARIO;
            edit_password.value = usuario.CONTRASENA;
            edit_new_password.value = usuario.CONTRASENA;
            edit_cedula.value = usuario.CEDULA;
        }
    });
});

btn_submit.addEventListener('click', async () => {
    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const responseJson = await response.json();

    responseJson.forEach(usuario => {

        for(let i = 0; responseJson.length; i++){
            const cambio_usuario = responseJson[i];
            if(usuario.USUARIO == window.name){
                band = true
                index = i
                break;
            }
        }
    })

    if(band){
        const { value: change } = await Swal.fire({
            title: 'Cambio credenciales',
            html:
                '<input id="pass1" class="swal2-input" type="password" placeholder="Nueva contraseña" />' +
                '<input id="pass2" class="swal2-input" type="password" placeholder="Confirmar contraseña" />',
            showCancelButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#000000', // Gris oscuro
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#aaa', // Gris claro
            preConfirm: () => {
                return {
                    user: edit_username.value,
                    pass1: edit_password.value,
                    pass2: edit_new_password.value,
                    ced: edit_cedula.value
                };
            },
        });

        if (change && responseJson){
            let changePass = change.pass1;
            let changePassTwo = change.pass2;
            let changeUser = user;
            let changeCed = ced;
    
            if(changePass == changePassTwo){
                let url = 'https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac/'+index;
                const update = await fetch(url, {
                    method: 'PATCH',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "CONTRASENA": changePass,
                    })
                })
    
                if (update.status == 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Logueado',
                        text: 'Has ingresado correctamente',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: true
                    })
                }
            }
        }
    }
});
