const toggle = document.querySelector(".toggle")
const menuDashboard = document.querySelector(".menu-dashboard")
const iconoMenu = toggle.querySelector("i")
const enlacesMenu = document.querySelectorAll(".enlace")
const nombre_usuario = document.getElementById("Nombre_usuario")

let account = JSON.parse(localStorage.getItem('username'));
console.log(account)

toggle.addEventListener("click", () => {
    menuDashboard.classList.toggle("open")

    if(iconoMenu.classList.contains("bx-menu")){
        iconoMenu.classList.replace("bx-menu", "bx-x")
    }else {
        iconoMenu.classList.replace("bx-x", "bx-menu")
    }
})

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open")
        iconoMenu.classList.replace("bx-menu", "bx-x")
    })
})

const menu_pago = document.getElementById('span_menu_pago');
const usuarios = document.getElementById('span_usuarios');
const Stock = document.getElementById('span_stock');
const ventas = document.getElementById('span_ventas');
const analitica = document.getElementById('span_analitica');

menu_pago.addEventListener('click', async (e) => {
    window.location.href = "/html/menu.html";
})

ventas.addEventListener('click', async (e) => {
    window.location.href = "/html/ventas.html";
})