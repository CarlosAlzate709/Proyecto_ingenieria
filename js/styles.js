
/////////////////////////////////////////////////////////
const showPassword = document.getElementById("pass")
const iconElement = document.getElementById("show")
const passwordTwo = document.getElementById("passTwo")
const iconElementTwo = document.getElementById("showTwo")
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////




// Mostrar y ocultar contraseña registro y login    
iconElement.addEventListener('click', function () {
    if (showPassword.type === 'password') {
        showPassword.type = 'text';
        iconElement.removeAttribute('name', 'eye-outline');
        iconElement.setAttribute('name', 'eye-off-outline');

    } else {
        showPassword.type = 'password';     
        iconElement.removeAttribute('name', 'eye-off-outline');
        iconElement.setAttribute('name', 'eye-outline');
    }

});

// Mostrar y ocultar contraseña registro
iconElementTwo.addEventListener('click', function () {
    if (passwordTwo.type === 'password') {
        passwordTwo.type = 'text';
        iconElementTwo.removeAttribute('name', 'eye-outline');
        iconElementTwo.setAttribute('name', 'eye-off-outline');

    } else {
        passwordTwo.type = 'password';     
        iconElementTwo.removeAttribute('name', 'eye-off-outline');
        iconElementTwo.setAttribute('name', 'eye-outline');
    }
});


