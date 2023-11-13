const lbl_nombre = document.getElementById('lbl_nombre');
const input_cantidad = document.getElementById('input_cantidad');
const lbl_precio_cantidad = document.getElementById('lbl_precio_cantidad');
const btn_añadir_carrito = document.getElementById('btn_añadir_carrito');
const tbody = document.getElementById('lista_ventas');

document.addEventListener('DOMContentLoaded', async (e) => {
    const dataframe = await datos()
    if (dataframe) {
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
            td_precio.textContent = (element.Precio) * 1.29
            td_cantidad.textContent = element.Cantidad
            td_agregar.appendChild(btn_agregar)

            if(td_nombre.textContent && td_precio.textContent && td_cantidad.textContent){
                tr.appendChild(td_nombre);
                tr.appendChild(td_precio);
                tr.appendChild(td_cantidad);
                tr.appendChild(td_agregar);
                tbody.appendChild(tr);
            }
        });
    }
    const botonesAñadir = document.querySelectorAll('.btn_addItem');

    let position = 0;
    for (let i = 0; i < botonesAñadir.length; i++) {
        botonesAñadir[i].addEventListener('click', function (e) {
            e.preventDefault();
            const fila_datos = this.closest('tr');

            if (fila_datos) {

                lbl_nombre.textContent = fila_datos.querySelectorAll("td")[0].textContent

                input_cantidad.addEventListener("input", () => {

                    let cant = parseInt(input_cantidad.value)
                    let precio = parseInt(fila_datos.querySelectorAll("td")[1].textContent)

                    let operation = parseInt(cant * precio)

                    if (operation >= 0) {
                        lbl_precio_cantidad.textContent = operation
                        position = i;
                    } else {
                        lbl_precio_cantidad.textContent = 0
                    }
                })              
            }
        })

    }
    btn_añadir_carrito.addEventListener('click', async() => {
        await AñadirItem(lbl_precio_cantidad.textContent, input_cantidad.value, lbl_nombre.textContent, position);
    })
})

async function datos() {
    try {
        const data = await fetch('https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3');
        const datajson = await data.json()
        if (datajson) {
            return datajson
        }
    } catch (error) {
        console.log(`error al conectar ${error}`);
    }
}


async function AñadirItem(precio, cantidad, nombre, position) {
    let url = 'https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3/' + position
    const url_fetch = await fetch(url)
    const verficacion = await url_fetch.json()
    console.log(verficacion)
    console.log(verficacion[0].Cantidad)
    if(parseInt(input_cantidad.value) > verficacion[0].Cantidad){
        Swal.fire({
            title: "Excedida la capacidad",
            icon: "warning",
            text: "El stock no tiene la capacidad solicitada"
        })
    }else{
        if (input_cantidad.value != 0 && input_cantidad.value != null && lbl_nombre.textContent != "Nombre") {

            let json = {
                NombreProducto: nombre,
                CantComprada: cantidad,
                PrecioPagar: precio
            }
            
            console.log(json)
            try{
                const añadir = await fetch('https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Name": json.NombreProducto,
                        "Price": json.PrecioPagar,
                        "Cant": json.CantComprada
                    })
                })
    
                if (añadir.status == 200){
                    Swal.fire({
                        title: 'Agregado al carrito',
                        icon: 'sucess',
                        text: 'Producto añadido al carrito'
                    })
    
                    // setTimeout(() => {
                    //     location.reload()
                    // }, 2000);
                    input_cantidad.value = null
                    lbl_nombre.textContent = "Nombre"
                    lbl_precio_cantidad.textContent = "Precio de la cantidad"
                    operation = 0
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}