const boton = document.getElementById('boton')
const table = document.getElementById('productsTable')

const socket = io()
socket.on('connect', () => {
    console.log(socket.id);
})
socket.on('msg_back', console.log)
socket.on('updatedProducts', data => {
    table.innerHTML =
        `<thead>
            <th><strong>Producto</strong></th>
            <th><strong>Descripción</strong></th>
            <th><strong>Precio</strong></th>
            <th><strong>Código</strong></t>
            <th><strong>Stock</strong></th>
            <th><strong>Categoría</strong></th>
        </thead>`;
    for (product of data) {
        let tr = document.createElement('tr')
        tr.innerHTML =
            `   <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            <td>${product.category}</td>
                        `;
        table.getElementsByTagName('tbody')[0].appendChild(tr);
    }

})

boton.addEventListener('click', () => {
    socket.emit('msg_front', 'Enviado desde el front')
})
