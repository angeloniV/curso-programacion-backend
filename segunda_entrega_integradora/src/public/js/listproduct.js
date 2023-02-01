function buscarProducto(){
    let category = document.getElementById("categoria").value != null ? document.getElementById("categoria").value : '';
    let status = document.getElementById("status").value != null ? document.getElementById("status").value : '';

    let params = category != '' ? "category=" + category + "&" : '';
    params += "status=" + status;

    window.location.replace("http://localhost:8080/products/list?" + params);
}
