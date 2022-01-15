// Variables

const nuevaVenta = document.getElementById("nuevaVenta");
const modalNuevaVenta = document.getElementById("modal-none");
const btnCancelar = document.getElementById("cancelarNuevaVenta");
const editarVenta = document.querySelector(".editar");
const btnCancelEdicion = document.querySelector("#cancelar-edicion");
const modalEditarVenta = document.querySelector("#modal-editar");
const eliminarVenta = document.querySelector(".eliminar");
const btnCancelVenta = document.querySelector("#cancelar-venta");
const modalEliminarVenta = document.querySelector("#modal-eliminar");

const $ = (id) => document.getElementById(id);
//const $ = (element)=> document.querySelector(element)

nuevaVenta.addEventListener("click", () => {
  modalNuevaVenta.classList.toggle("modal-none");
});

btnCancelar.addEventListener("click", () => {
  modalNuevaVenta.classList.toggle("modal-none");
});


// ABRIR MODAL EDITAR

const findId = (id)=> ventas.find(venta => venta.id == id)
const findIndexId = (id)=> ventas.findIndex(venta => venta.id == id)

const ventaEditada =(venta)=>{
  
  $('nombreVendedoraEdit').value = venta.nombreVendedora
  $('sucursalEdit').value = venta.sucursal
  $('idEdit').value = venta.id

  const day = ("0" + venta.fecha.getDate()).slice(-2)
  const month = ("0" + (venta.fecha.getMonth() + 1)).slice(-2);
  
  $('fechaEdit').value = `${venta.fecha.getFullYear()}-${month}-${day}`
 
 for (const optionDom of $('componentesEdit').options) {
   if(venta.componentes.findIndex(componente => componente == optionDom.value)!= -1){
      optionDom.selected = true
   }
 } 
  }


  const guardarEditModal =(e)=>{
   

    const nombreVendedora = $('nombreVendedoraEdit').value
    const componentes = getValuesOptions($('componentesEdit'));
    const sucursal = $('sucursalEdit').value
    const fecha =  $('fechaEdit').value
    const id = $('idEdit').value

    const indice = findIndexId(id)


    const ventasaEditar = {
      nombreVendedora,
      componentes,
      sucursal,
      fecha,
    }

    ventas[indice] = ventasaEditar
    
      //ventasPorVendedora[venta.nombreVendedora] = precioMaquina(venta.componentes)

    modalEditarVenta.classList.add("modal-none");
    updateDom() 

  }
  
$('guardarEdit').addEventListener('click', guardarEditModal)




const openEditModal =(element)=>{
  modalEditarVenta.classList.toggle("modal-none"); 
 const venta = findId(element.dataset.id);
 ventaEditada(venta)
}




const openDeleteModal=(element)=>{
    modalEliminarVenta.classList.toggle("modal-none");
    $('idEliminar').value = element.dataset.id
}

btnCancelEdicion.addEventListener("click", () => {
  modalEditarVenta.classList.toggle("modal-none");


});

// MODAL ELIMINAR VENTA

btnCancelVenta.addEventListener("click", () => {
  modalEliminarVenta.classList.toggle("modal-none");
});
const eliminarVentaSeleccionada =(id)=>{
  ventas = ventas.filter(venta => venta.id != id)
 }

$('eliminar-venta').addEventListener("click", () => {
  modalEliminarVenta.classList.toggle("modal-none");

  const id = $('idEliminar').value

  eliminarVentaSeleccionada(id)
  updateDom() 

});







// CREAR VENTA








const renderTabla = () => {
  const ventasTable = ventas.reduce((acc, venta) => {
    return (
      acc +
      ` <tr>
            <td>${venta.fecha.toLocaleString("es-AR", {
              timeZone: "UTC",
            })}     </td>
            <td>${venta.nombreVendedora}</td>
            <td>${venta.sucursal}</td>
            <td>${venta.componentes.join()}</td>
            <td>${precioMaquina(venta.componentes)}</td>
            <td>
                <i class="fas fa-pencil-alt editar" data-id="${
                    venta.id}" onclick="openEditModal(this)"></i>
                <i class="fas fa-trash-alt eliminar" data-id="${
                    venta.id}" onclick="openDeleteModal(this)"></i>
            </td>
        </tr>
       
    `
    );
  }, `<tr>
  <th>Fecha</th>
  <th>Vendedora</th>
  <th>Sucursal</th>
  <th>Componentes</th>
  <th>Precio</th>
  <th>Acciones</th>
</tr>`);

  const tablaVenta = document.querySelector("#tablaVentas");

  tablaVenta.innerHTML = ventasTable;
};



//VENTAS X SUCURSAL
const renderSucursales = () => {
  const ventasXsucursalDom = sucursales.reduce((acc, sucursal) => {
    return (
      acc +
      `
    <tr>
        <td>${sucursal}</td>
        <td>${ventasSucursal(sucursal)}</td>
    </tr>
    `
    );
  }, "");

  const tablaVentasXsucursal = document.querySelector("#tdSucursal");

  tablaVentasXsucursal.innerHTML = ventasXsucursalDom;
};

const updateDom = () => {
  $("productoEstrella").innerHTML = componenteMasVendido();
  $("vendedoraEstrella").innerHTML = vendedoraQueMasVendio();
  renderTabla();
  renderSucursales();
};
updateDom();

//PRODUCTO ESTRELLA

// VENDEDORA ESTRELLA

//AGREGAR VENTA

$("guardarNuevaVenta").addEventListener("click", () => {
  const nombreVendedora = $("agregarVendedora").value;
  const componentes = getValuesOptions($("agregarComponente"));
  const sucursal = $("agregarSucursal").value;
  const fecha = new Date($("agregarFecha").value);
  const id = Math.floor(Math.random() * 10000) + 10;

  const ventasaGuardar = {
    id,
    nombreVendedora,
    componentes,
    sucursal,
    fecha,
  };

  ventas.push(ventasaGuardar);
  console.log(ventasaGuardar);
  updateDom();
  modalNuevaVenta.classList.add("modal-none");
});

const getValuesOptions = (optionDom) => {
  const aux = [];
  for (const option of optionDom.options) {
    if (option.selected) {
      aux.push(option.value);
    }
  }
  return aux;
};
