//Peticion para obtener la data del miniback
let productos = [];
const URL_API = "http://localhost:3000/"

const getProductsApi = async (url) => {
    try {
        const { data }= await axios.get(url + "productos")
       // console.log(data)
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


//Pintar los productos dentro del contenedor
const printProducts = (container, products) => {
    //console.log(products)
    //vaciar contenedor
    container.innerHTML = "";
    //Recorrer array
    products.forEach((product) => {
        container.innerHTML += `
        <div class="card d-flex justify-content-space-between" >

       
            <img src=${product.image} "class="card-img-top " alt=${product.nombre}>
            <div class="card-body ">
                <h5 class="card-title">${product.nombre}</h5>
                
            </div>
            <di class = "button__cards">
                <button class = "cards__buttons cards__buttons--favorite" >
                    <span class="material-symbols-outlined">favorite </span>
                   
                    
                </button>
            </di>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="button__add">
               <button class= "añadir__carrito añadir__carrito--add ">Add   </button>
            </div>
       

        `
        
    });


}

// Escuchar al evento cuando se recarga la pagina y cuando suceda esto se hace un callback para que se pinten los productos
document.addEventListener ('DOMContentLoaded',  async () => {
    productos = await getProductsApi (URL_API)
    printProducts(containerCardProducts, productos )
    
})

//filtracion por categorias
//creancion del array donde se encuentran todas las categorias existentes
const categoriesProducts = [];
productos = await getProductsApi (URL_API)
productos.forEach ((item) =>{
    //si no existe el producto dentro del array categoria
    if (!categoriesProducts.includes  (item.categoria) ) {
        // entonces se pushea
        categoriesProducts.push(item.categoria)
       

    }
})
//console.log(categoriesProducts)
document.addEventListener ("click", async(event) => {
    productos = await getProductsApi (URL_API)
    console.log(productos)
    if (event.target.classList.contains("filtro__categorias")) {
        const filter = event.target.name
        console.log(filter)

        const productFilter = productos.filter((producto) => producto.categoria.includes(filter));        
        printProducts(containerCardProducts, productFilter )
        console.log(productFilter)
        

    }
    


})




// categoriesProducts.forEach ( (item) =>{
    
//     const filtro = document.getElementsByClassName (item)[0];
//     filtro.addEventListener("click", () => {
//         const productFilter =
//             item === "vegetable"
//                 ? productos
//                 : productos.filter((element) => element.categoria === item);
//                 mostrarCategorias                

//     })
//     //console.log(filtro)

// })