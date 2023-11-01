const lbl_total_productos = document.getElementById('lbl_total_productos');
const lbl_totalpagar = document.getElementById('lbl_totalpagar');
const input_pago = document.getElementById('input_pago');
const btn_pago = document.getElementById('btn_pago');
const tbody = document.getElementById('lista_ventas');
let carrito_compras = [];

document.addEventListener('DOMContentLoaded', async (e) => {
    const dataframe = await datos()
    let total_precio = 0
    let total_cantidad = 0
    if (dataframe) {
        dataframe.forEach(element => {
            let tr = document.createElement("tr");

            let td_nombre = document.createElement("td");
            let td_precio = document.createElement("td");
            let td_cantidad = document.createElement("td");

            if(element.Name){
                td_nombre.textContent = element.Name
                tr.appendChild(td_nombre);

                let Producto = {
                    Nombre_producto: element.Name,
                    Cantidad: element.Cant
                }
                carrito_compras.push(Producto)
            }
            if(element.Price){
                td_precio.textContent = element.Price
                tr.appendChild(td_precio);
            }
            if(element.Cant){
                td_cantidad.textContent = element.Cant
                tr.appendChild(td_cantidad);
            }
            tbody.appendChild(tr);
            if(element.Price){
                total_precio = parseInt(element.Price) + total_precio
                lbl_totalpagar.textContent = total_precio
            }
            if(element.Cant){
                total_cantidad = parseInt(element.Cant) + total_cantidad
                lbl_total_productos.textContent = total_cantidad
            }
        })
    console.log(carrito_compras)
    btn_pago.addEventListener('click', async (e) => {
        if(!input_pago.value || input_pago.value < 0){
            Swal.fire({
                title: 'No sirve',
                icon: 'warning',
                text: 'Los datos son invalidos o nulos'
            })
        }else if(input_pago.value < total_precio){
            Swal.fire({
                title: 'Valor insuficiente',
                icon: 'warning',
                text: 'Saldo insuficiente para validar la compra'
            })
        }else if(input_pago.value > total_precio){
            const url = await datos()
            let pago = url.map(item => item.Nombre)
            console.log(pago)
            console.log("comprobar");
            let consulta_posicion = await datos()
                for(let i = 0; i < consulta_posicion.length; i++){
                    for(let y = 0; y < consulta_posicion.length; y++){
                        if(consulta_posicion[i].Nombre == consulta_posicion[y].Name){
                            let resta = consulta_posicion[i].Cantidad - consulta_posicion[y].Cant
                            console.log(resta);
                            if(resta >= 0){
                                actualizacion(i, resta)
                            }
                        }
                    }
                }
            remover_carrito()
        }
    })
    }
});


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

async function actualizacion(posicion, cantidad) {
        const url_pago = `${'https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3'}/${posicion}`;
        try{
            const edit_pago = await fetch(url_pago, {
                method: 'PATCH',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Cantidad: cantidad
                }),
            })
            if (edit_pago.ok) {
                Swal.fire('Producto Comprado', '', 'success');
                setTimeout(() => {
                    location.reload();
                }, 4000);
            }
        }catch (err) {
            console.log("Error al comprar ", err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
}

async function remover_carrito(){
    const limpieza = await datos()
    for(let i = 0; i < limpieza.length; i++){
        if(limpieza[i].Name){
            const url_remover = `${'https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3'}/${i}`;
        try{
            const edit_remover = await fetch(url_remover, {
                method: 'PUT',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name: null,
                    Price: null,
                    Cant: null
                }),
            })
            if (edit_remover.ok) {
                setTimeout(() => {
                    location.reload();
                }, 4000);
            }
        }catch (err) {
            console.log("Error al remover ", err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        }
    }
}