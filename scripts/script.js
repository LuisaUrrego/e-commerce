//Peticion para obtener la data del miniback
const URL_API = "http://localhost:3000/"

const getProductsApi = async (url) => {
    try {
        const { data }= await axios.get(url + "productos")
        console.log(data)
        return data;

    }catch (error) {
        console.log(error);
        alert("Usuario ocurrio un error");
        return {};

    }
    

}
getProductsApi(URL_API)

//Mostrar productos enlistados en cards
// 1. Capturar el contenedor para imprimir las cards
const containerCardProducts = document.querySelector(".container__cards")
console.log(containerCardProducts)

//Pintar los productos dentro del contenedor
const printProducts = async(container, products) => {
    console.log(products)
    //vaciar contenedor
    container.innerHTML = "";
    //Recorrer array
    products.forEach((product) => {
        container.innerHTML += `
        <div class="card  container  " >
        <div class = "row">
            <img src=${product.image} "class="card-img-top col-4 " alt=${product.nombre}>
            <div class="card-body">
                <h5 class="card-title">${product.nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>

        `
        
    });


}

// Escuchar al evento cuando se recarga la pagina y cuando suceda esto se hace un callback para que se pinten los productos
document.addEventListener ('DOMContentLoaded',  async () => {
    const productos = await getProductsApi (URL_API)
    printProducts(containerCardProducts, productos )
})