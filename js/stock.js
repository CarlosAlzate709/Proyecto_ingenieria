
const tbody = document.getElementById('stock');

document.addEventListener('DOMContentLoaded', async (e) => {

    const response = await Data();

    if (response) {
        console.log(response)
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
            iconPlus.classList.add("icon-large");

            let iconDelete = document.createElement("ion-icon");
            iconDelete.setAttribute("name", "close-circle-outline");
            iconDelete.setAttribute("style", "cursor: pointer");
            iconDelete.classList.add("icon-large");
        

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

})



async function Data() {

    try {
        const response = await fetch('https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3');
        const responseJson = await response.json();

        if (responseJson) {
            console.log('Consulta Exitosa');
            return responseJson;
        }

    } catch (err) {
        console.log('Error al cargar datos', err)
    }

}
