const lbl_nombre = document.getElementById('lbl_nombre');
const input_cantidad = document.getElementById('input_cantidad');
const lbl_precio_cantidad= document.getElementById('lbl_precio_cantidad');
const btn_añadir_carrito = document.getElementById('btn_añadir_carrito');
const tbody = document.getElementById('lista_ventas');

document.addEventListener('DOMContentLoaded', async (e) => {
    const dataframe = await datos()
    if(dataframe){
        dataframe.forEach(element => {
            let tr = document.createElement("tr");

            let td_nombre = document.createElement("td");
            let td_precio = document.createElement("td");
            let td_cantidad = document.createElement("td");
            let td_agregar = document.createElement("td");

            let btn_agregar = document.createElement("ion-icon");
            btn_agregar.setAttribute("name", "add-circle-outline");
            btn_agregar.setAttribute("style", "cursor: pointer");
            btn_agregar.classList.add("icon-large", "btn_addItem")


            td_nombre.textContent = element.Nombre
            td_precio.textContent = element.Precio
            td_cantidad.textContent = element.Cantidad
            td_agregar.appendChild(btn_agregar)
           

            tr.appendChild(td_nombre);
            tr.appendChild(td_precio);
            tr.appendChild(td_cantidad);
            tr.appendChild(td_agregar);
            tbody.appendChild(tr);
        });
    }
})

async function datos(){
    try{
        const data = await fetch('https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3');
        const datajson = await data.json()
        if(datajson){
            return datajson
        }
    }catch(error){
        console.log(`error al conectar ${error}`);
    }
}