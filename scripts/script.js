//Peticion para obtener la data del miniback
let productos;



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

const getCarrito = async (url, productos) => {
    try {
        const { data }= await axios.get(url + "carrito", productos)
       // console.log(data)
        return data;

    }catch (error) {
        console.log(error);
        alert("Usuario ocurrio un error");
        return {};

    }
    

}

const postCarrito = async (url, productos) => {
    try {
        const { data }= await axios.post(url + "carrito", productos)
    // console.log(data)
        return data;

    }catch (error) {
        console.log(error);
        alert("Usuario ocurrio un error");
        return {};

    }
    

}
const getFavoritos = async (url, productos) => {
    try {
        const { data }= await axios.get(url + "favoritos", productos)
       // console.log(data)
        return data;

    }catch (error) {
        console.log(error);
        alert("Usuario ocurrio un error");
        return {};

    }
}
const postFavoritos = async (url, productos) => {
    try {
        const { data }= await axios.post(url + "favoritos", productos)
    // console.log(data)
        return data;

    }catch (error) {
        console.log(error);
        alert("Usuario ocurrio un error");
        return {};

    }
    

}

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
        <div class="card" >

       
            <img src=${product.image} class="card-img-top" alt=${product.nombre}>
            <div class="card-body ">
            <di class = "button__cards">
            <div class = "cards__buttons cards__buttons--favorite "  > 
                <span class="material-symbols-outlined favorite" data-id-favorite=${product.id} data-favorite="add" ${product.cantidad}>favorite </span>
               
                
                </div>
            </di>
                <h5 class="card-title">${product.nombre}</h5>

                
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">${product.categoria}</li>
                <li class="list-group-item">${product.peso}</li>
                <li class="list-group-item">${product.precio}</li>
            </ul>
            <div class="button__add">
                <button class= "añadir__carrito añadir__carrito--add " data-id-button=${product.id} data-button="add"  >${product.cantidad}</button>
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
    //console.log(productos)
    if (event.target.classList.contains("filtro__categorias")) {
        const filter = event.target.name
       // console.log(filter)

        const productFilter = productos.filter((producto) => producto.categoria.includes(filter));        
        printProducts(containerCardProducts, productFilter )
       // console.log(productFilter)
        

    }
    


})
// se escucha el evrnto click
document.addEventListener ("click", async (event) => {
    //controlar el click con attribute 
    const addCartId = event.target.getAttribute("data-id-button")
    const addCart = event.target.getAttribute("data-button")
   

    if (addCart) {
        //si el click existe se recupera la informacion
        const productCart = productos.find(product=> product.id == addCartId)
        const carrito = await getCarrito (URL_API)
        //Vrificar que no hayan productos repetidos en el carrito de compras por el ID
        if (carrito.find(product => product.id == addCartId)) {
            Swal.fire('¡Ya se encuentra en el carrito de compras!', 'Tu producto ya se encuentra en tu carrito de compras', 'info');
            
        }else {
            Swal.fire('¡Producto agregado al carrito!', 'Tu producto ya se encuentra en tu carrito de compras', 'info');
            await postCarrito (URL_API, productCart)

        }
        
        
        
        console.log(productCart)

        
    }
    


})

//Agregar productos a favoritos
// se escucha el evrnto click
document.addEventListener ("click", async (event) => {
    //controlar el click con attribute 
    const addFavoritesId = event.target.getAttribute("data-id-favorite")
    const addFavorites = event.target.getAttribute("data-favorite")
    console.log(addFavoritesId, addFavorites)
    if (addFavorites) {
        //si el click existe se recupera la informacion
        const productFavorite = productos.find(product=> product.id == addFavoritesId)
        const favorite = await getFavoritos (URL_API)
        //Vrificar que no hayan productos repetidos en el carrito de compras por el ID
        if (favorite.find(product => product.id == addFavoritesId)) {
            Swal.fire('¡Ya se encuentra en favoritos!', 'Tu producto ya se encuentra en favoritos', 'info');
            
        }else {
            Swal.fire('¡Producto agregado a favoritos!', 'Tu producto ya se encuentra agregado a favoritos', 'info');
            await postFavoritos (URL_API, productFavorite)

        }
        
        
        
        console.log(productFavorite)

        
    }
    


})










