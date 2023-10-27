
const tbody = document.getElementById('stock');


document.addEventListener('DOMContentLoaded', async (e) => {

    const response = await Data();

    if (response) {

        response.forEach(element => {

            let tr = document.createElement("tr");
            let td_nombre = document.createElement("td");
            let td_precio = document.createElement("td");
            let td_cantidad = document.createElement("td");

            td_nombre.textContent = element.Nombre
            td_precio.textContent = "$ " + element.Precio
            td_cantidad.textContent = element.Cantidad

            let iconPlus = document.createElement("ion-icon");
            iconPlus.setAttribute("name", "create-outline");
            iconPlus.setAttribute("style", "cursor: pointer");
            iconPlus.classList.add("icon-large", "btn_editar");


            let iconDelete = document.createElement("ion-icon");
            iconDelete.setAttribute("name", "close-circle-outline");
            iconDelete.setAttribute("style", "cursor: pointer");
            iconDelete.classList.add("icon-large", "btn_eliminar");


            let iconContainer = document.createElement("div");
            iconContainer.appendChild(iconPlus);
            iconContainer.appendChild(iconDelete);
            let td_icons = document.createElement("td");
            td_icons.appendChild(iconContainer);

            tr.appendChild(td_nombre);
            tr.appendChild(td_precio);
            tr.appendChild(td_cantidad);
            tr.appendChild(td_icons);
            tbody.appendChild(tr);
        })
    }

    ///////////// Eliminar item de stock ///////////////////////

    const botonesEliminar = document.querySelectorAll('.btn_eliminar');

    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener('click', function (e) {
            const filaAEliminar = this.closest('tr');
            if (filaAEliminar) {
                console.log(i)
                Swal.fire({
                    title: '¿Estás seguro de eliminarlo?',
                    text: "No podrás revertir este proceso",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminalo'
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        let url = `${'https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3'}/${i}`
                        const responseDelete = await fetch(url, {
                            method: "DELETE"
                        })
                        if (responseDelete.ok) {
                            Swal.fire(
                                'Borrado!',
                                'Este elemento ha sido eliminado',
                                'success'

                            )
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        }

                    }
                })
            }
        })
    }


    ////////////////////// Editar item de stock //////////////////////////

    const editarItems = document.querySelectorAll('.btn_editar')

    for (let i = 0; i < editarItems.length; i++) {
        editarItems[i].addEventListener('click', function (e) {

            const edit = this.closest('tr');
            if (edit) {

                Swal.fire({
                    title: 'Editar Producto',
                    html:
                        `<input id="Nombre" class="swal2-input" placeholder="Nombre" value="${response[i].Nombre}">` +
                        `<input id="Precio" class="swal2-input" placeholder="Precio" value="${response[i].Precio}">` +
                        `<input id="Cantidad" class="swal2-input" placeholder="Cantidad" type="number" value="${response[i].Cantidad}">`,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar Cambios',
                    cancelButtonText: 'Cancelar',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const Nombre = document.getElementById('Nombre').value;
                        const Cantidad = document.getElementById('Cantidad').value;
                        const Precio = document.getElementById('Precio').value;


                        return { Nombre, Cantidad, Precio };
                    },
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        Swal.fire({
                            title: 'Guardando Cambios',
                            html: 'Por favor espere...',
                            timer: 2000,
                            timerProgressBar: true,
                            onBeforeOpen: () => {
                                Swal.showLoading();
                            },
                            allowOutsideClick: false,
                        }).then(async () => {
                            const Nombre = result.value.Nombre;
                            const Cantidad = result.value.Cantidad;
                            const Precio = result.value.Precio;
                            const url = `${'https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3'}/${i}`
                            try {
                                const editData = await fetch(url, {
                                    method: 'PUT',
                                    mode: "cors",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        Nombre: Nombre,
                                        Cantidad: Cantidad,
                                        Precio: Precio
                                    }),
                                })

                                if (editData.ok) {
                                    Swal.fire('Cambios Guardados', '', 'success');
                                    setTimeout(() => {
                                        location.reload();
                                    }, 4000);
                                }
                            } catch (err) {
                                console.log("Error al actualizar ", err)
                                Swal.close();
                            }
                        })

                    }
                });
            }
        })
    }
})



async function Data() {

    try {
        const response = await fetch('https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3');
        const responseJson = await response.json();

        if (responseJson) {
            return responseJson;
        }

    } catch (err) {
        console.log('Error al cargar datos', err)
    }

}


