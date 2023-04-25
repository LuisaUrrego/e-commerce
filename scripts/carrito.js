//Peticion para obtener la data del miniback
 let products;
 const URL_API = "http://localhost:3000/"

const getCarrito = async (url) => {
  try {
      const { data }= await axios.get(url + "carrito")
     // console.log(data)
      return data;

  }catch (error) {
      console.log(error);
      alert("Usuario ocurrio un error");
      return {};

  }
  

}
const deleteCarrito = async (url, id) => {
  try {
      const { data }= await axios.delete(url+"carrito/"+id)
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
const containerCardProducts = document.querySelector(".productos__pintados")

//Pintar los productos dentro del contenedor
const printProductsCarrito = (container, products) => {
  //console.log(products)
  //vaciar contenedor
  container.innerHTML = "";
    //Recorrer array
  products.forEach((product) => {
  container.innerHTML += `
   
    <div class="card  bg-light  container" style="max-width: 1000px; ">
      <div class="row g-0">
        <div class="col-md-1">
          <img src= ${product.image} class="img-fluid rounded-start aling-items-center" alt=${product.nombre}>
        </div>
          <div class="col-md-4 btn-group-vertical">
            <div class="card-body d-flex justify-content-space-between">
              <h5 class="card-title col-7">${product.nombre}</h5>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="card-title">Price</h5>
                  <p class="card-text">${product.precio}</p>
         
                </div>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="card-title ">Qty</h5>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle " viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/><p class="card-text">${0}</p>
                </svg>
         
                </div>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="card-title">Total</h5>
                  <p class="card-text">${product.precio}</p>
         
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <h5 class="card-title">Action</h5>
                  <a href="#" class="card-link">Save for later</a>
                  <a href="#" "class="card-link text-danger" data-id-eliminar=${product.id} data-eliminar="add" >Remove</a>
         
                </div>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </div>
    
    
       

  `
  });
    

}
document.addEventListener ('DOMContentLoaded', async () => {
    products = await getCarrito(URL_API)
    printProductsCarrito(containerCardProducts,products)
    
})

// se escucha el evrnto click
document.addEventListener ("click", async (event) => {
  //controlar el click con attribute 
  const eliminarId = event.target.getAttribute("data-id-eliminar")
  const eliminar = event.target.getAttribute("data-eliminar")
  console.log(eliminarId, eliminar)

  if (eliminar) {
    await deleteCarrito(URL_API, eliminarId)
    Swal.fire('¡Producto eliminado exitosamente!', 'Tu producto ya se encuentra eliminado', 'success');
        
   }
})


