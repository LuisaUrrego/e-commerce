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
//Mostrar productos enlistados en cards

// 1. Capturar el contenedor para imprimir las cards
const containerCardProducts = document.querySelector(".table")

//Pintar los productos dentro del contenedor
const printProductsCarrito = (container, products) => {
    //console.log(products)
    //vaciar contenedor
    container.innerHTML = "";
    //Recorrer array
    products.forEach((products) => {
        container.innerHTML += `
        <div class="tabla">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>${products.image}</td>
                
              </tr>
              <tr>
                <th scope="row"></th>
                <td>${products.precio}</td>
                
              </tr>
              <tr>
              <th scope="row"></th>
              <td>${products.cantidad}</td>
              
             </tr>
             <tr>
             <th scope="row"></th>
             <td>${products.precio}</td>
             
                </tr>

              <tr>
                
            </tbody>
          </table>
    

    </div>
       

        `
        
        
    });
    

}
document.addEventListener ('DOMContentLoaded',  async () => {
    productos = await getProductsApi (URL_API)
    printProducts(containerCardProducts, productos )
    
})