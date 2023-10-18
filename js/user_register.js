const inputname_register = document.getElementById('name_register');
const inputemail_register = document.getElementById('email_register');
const inputpassword_register = document.getElementById('password_register');
const inputpassword_register_verify = document.getElementById('password_register_verify')
const button_register = document.getElementById('signup_register');
const checkeye = document.getElementById('checkeye_register');
const checkeye2 = document.getElementById('checkeye2_register');

let accounts_login = JSON.parse(localStorage.getItem('accounts_login'));
let accounts_register = [];

if(accounts_login){
    accounts_register = accounts_register.concat(accounts_login);
}
console.log(accounts_register);



function verify_account(name, email, password){

    const ExistsAccount = accounts_register.find((account) => account.email === email);

    if(inputname_register.value == "" && inputemail_register.value == "" && inputpassword_register.value == "" && inputpassword_register_verify.value == ""){
        alert("Existen campos vacios");
        return;
    }

    if(ExistsAccount){
        alert("Ya hay una cuenta existente con este email")
        return;
    }

    const new_account = {name, email, password};
    accounts_register.push(new_account);
    console.log(accounts_register)
    localStorage.setItem('accounts_register', JSON.stringify(accounts_register));
    window.location.href="/html/index.html";
}

button_register.addEventListener('click', function(){
    const name_register = inputname_register.value;
    const email_register = inputemail_register.value;
    const password_register = inputpassword_register.value;
    const password_register_verify = inputpassword_register_verify.value;

    if(password_register == password_register_verify){
        verify_account(name_register, email_register, password_register);

        inputname_register.value = "";
        inputemail_register.value = "";
        inputpassword_register.value = "";
        inputpassword_register_verify.value = "";

    }else{
        alert("Los campos de contraseña no coinciden")
    }
})

checkeye.addEventListener('click', function () {
    if (inputpassword_register.type === 'password') {
        inputpassword_register.type = 'text';
        checkeye.textContent = 'Esconder Contraseña';
    } else {
        inputpassword_register.type = 'password';
        checkeye.textContent = 'Mostrar Contraseña';
    }
});

checkeye2.addEventListener('click', function () {
    if (inputpassword_register_verify.type === 'password') {
        inputpassword_register_verify.type = 'text';
        checkeye2.textContent = 'Esconder Contraseña Verificada';
    } else {
        inputpassword_register_verify.type = 'password';
        checkeye2.textContent = 'Mostrar Contraseña Verificada';
    }
});



