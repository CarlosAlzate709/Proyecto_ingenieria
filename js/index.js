const button_register_login = document.getElementById('register_login');

let accounts_register = JSON.parse(localStorage.getItem('accounts_register'));
let accounts_login = [];
if(accounts_register){
    accounts_login = accounts_login.concat(accounts_register)
}else{
    accounts_login = null;
}
console.log(accounts_login);

button_register_login.addEventListener('click', function(){
    localStorage.setItem('accounts_login', JSON.stringify(accounts_login));
    window.location.href="/html/register.html";
})

const inputname_login = document.getElementById('name_login');
const inputemail_login = document.getElementById('email_login');
const inputpassword_login = document.getElementById('password_login');
const button_login = document.getElementById('login_login');
const checkeye = document.getElementById('checkeye_login');
const remember_password = document.getElementById('remember_password')

function validate_login(name, email, password){

    const user_found = accounts_login.find((account) => account.email === email);

    if(!user_found){
        alert("El email no existe")
        return false;
    }else if(user_found.password !== password){
        alert("Contraseña incorrecta")
        return false;
    }else if(user_found.name !== name){
        alert("Nombre incorrecto")
        return false;
    } else {
        return true, user_found.name;
    }
};


button_login.addEventListener('click', function(){
    name_login = inputname_login.value;
    email_login = inputemail_login.value;
    password_login = inputpassword_login.value;

    validate, username = validate_login(name_login, email_login, password_login);
    if(validate == true){
        localStorage.setItem('username', JSON.stringify(username));
        window.location.href="/html/menu.html";
    }
});

remember_password.addEventListener('click', function(){
    window.location.href='/html/recordar_contraseña.html';
});

checkeye.addEventListener('click', function () {
    if (inputpassword_login.type === 'password') {
        inputpassword_login.type = 'text';
        checkeye.textContent = 'Esconder Contraseña';
    } else {
        inputpassword_login.type = 'password';
        checkeye.textContent = 'Mostrar Contraseña';
    }
});


