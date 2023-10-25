
const formulario = document.getElementById("formulario")
/////////////////////////////////////////////////////////
const forget = document.getElementById("forget")


formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const contenidoResponse = await response.json();

    const user = formulario.inputEmail.value;
    const password = formulario.pass.value;
    let find = null;

    contenidoResponse.forEach(usuario => {
        if (usuario.GMAIL === user && usuario.CONTRASENA === password) {
            find = true;

        } else if ((usuario.GMAIL === user && usuario.CONTRASENA != password) || (usuario.GMAIL != user && usuario.CONTRASENA === password)) {
            Swal.fire({
                icon: 'warning',
                title: 'Incorrecto',
                text: 'Intenta nuevamente',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: true
            })

            document.getElementById('inputEmail').value = "";
            document.getElementById('pass').value = "";
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
            //header('Location: ./html/menu.php');
        }, 2000);

    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Usuario no registrado',
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


forget.addEventListener('click', async (e) => {

    e.preventDefault()
    const { value: email } = await Swal.fire({
        title: 'Ingresa tu correo electrónico',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        confirmButtonColor: '#000000'
    })

    if (email) {
        // Muestra un segundo formulario
        const { value: formData } = await Swal.fire({
            title: 'Buscar Usuario',
            html:
                '<input id="usuario" class="swal2-input" placeholder="Nombre de Usuario" />' +
                '<input id="correo" class="swal2-input" placeholder="Correo Electronico" />',
            showCancelButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#000000', // Gris oscuro
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#aaa', // Gris claro
            preConfirm: () => {
                return {
                    usuario: document.getElementById('usuario').value,
                    correo: document.getElementById('correo').value,
                };
            },
        });


        const foundUser = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
        const responseJson = await foundUser.json()
        let band = null;

        if (formData && responseJson) {

            let changeUser = formData.usuario;
            let changeemail = formData.correo;
            let index = 0;


            responseJson.forEach(user => {
                
                for (let i = 0; responseJson.length; i++){
                    const user = responseJson[i];
                    
                    if (user.USUARIO === changeUser && changeemail === user.GMAIL) {
                        console.log(changeUser, changeemail)
                        band = true
                        index = i
                        break;
                    }
                }
                
                
            })

            if (band) {

                const { value: change } = await Swal.fire({
                    title: 'Buscar Usuario',
                    html:
                        '<input id="pass1" class="swal2-input" placeholder="Nueva contraseña" />' +
                        '<input id="pass2" class="swal2-input" placeholder="Confirmar contraseña" />',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#000000', // Gris oscuro
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#aaa', // Gris claro
                    preConfirm: () => {
                        return {
                            pass1: document.getElementById('pass1').value,
                            pass2: document.getElementById('pass2').value,
                        };
                    },
                });





                if (change && responseJson) {

                    let changePass = change.pass1;
                    let changePassTwo = change.pass2;


                    if (changePass == changePassTwo) {

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

                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'Las contraseñas no conciden',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: true,
                        allowEnterKey: true
                    })
                }

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Usuario no registrado',
                    text: 'Intenta nuevamente',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    allowEnterKey: true
                })
            }


        }
    }
})