const toggle = document.querySelector(".toggle")
const menuDashboard = document.querySelector(".menu-dashboard")
const iconoMenu = toggle.querySelector("i")
const enlacesMenu = document.querySelectorAll(".enlace")
const enlaceStock = document.getElementById("btn_stock")
const enlaceAnalitica = document.getElementById("btn_analitica")
const nombre_usuario = document.getElementById("Nombre_usuario")
const menu_pago = document.getElementById('span_menu_pago');
const usuarios = document.getElementById('span_usuarios');
const Stock = document.getElementById('span_stock');
const ventas = document.getElementById('span_ventas');
const analitica = document.getElementById('span_analitica');

nombre_usuario.textContent = window.name;

document.addEventListener('DOMContentLoaded', async (e) => {
    const response = await fetch('https://sheet.best/api/sheets/de2d3102-bc15-4ca8-b80d-fad7f0333bac')
    const contenidoResponse = await response.json();

    for (let i = 0; i < contenidoResponse.length; i++) {

        if (contenidoResponse[i].USUARIO == window.name) {
            if(contenidoResponse[i].ROL == "adm"){
                console.log("administrador");
                enlaceStock.style.display = 'block';
                enlaceAnalitica.style.display = 'block';
            }else if(contenidoResponse[i].ROL == "usr"){
                console.log("usuario");
                enlaceStock.style.display = 'none';
                enlaceAnalitica.style.display = 'none';
            }else{
                enlaceStock.style.display = 'none';
                enlaceAnalitica.style.display = 'none';
            }
        }
    }
})

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

menu_pago.addEventListener('click', async (e) => {
    window.location.href = "/html/menu.html";
})

ventas.addEventListener('click', async (e) => {
    window.location.href = "/html/ventas.html";
})

Stock.addEventListener('click', ()=>{
    window.location.href = "/html/stock.html";
})

usuarios.addEventListener('click', ()=>{
    window.location.href = "/html/perfil.html"
})

enlaceAnalitica.addEventListener('click', ()=>{
    window.location.href = "/html/analiticas.html"
})