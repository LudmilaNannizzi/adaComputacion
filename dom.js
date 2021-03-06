// Variables
const btnFiltrosModal = document.getElementById("filtroVentas");
const btnFiltrosCancelar = document.getElementById("cancelar-filtro");
const filtrosModal = document.getElementById("modal-filtro");
const aplicarFiltro = document.getElementById('aplicar-filtro')
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


//--------------------------------------------Abrir modal nueva venta ------------------------- 

nuevaVenta.addEventListener("click", () => {
  modalNuevaVenta.classList.toggle("modal-none");
});

btnCancelar.addEventListener("click", () => {
  modalNuevaVenta.classList.toggle("modal-none");
});
//--------------------------------------------Abrir modal filtro------------------------- 

btnFiltrosModal.addEventListener("click", () => {
  filtrosModal.classList.toggle("modal-none");
});

btnFiltrosCancelar.addEventListener("click", () => {
  filtrosModal.classList.toggle("modal-none");
});



//------------------------------------------Auxiliares filtros id---------------------------------------------

const buscarId = (id)=> getVentas().find(venta => venta.id == id)
const buscarIndiceId = (id)=> getVentas().findIndex(venta => venta.id == id)


//-----------------------------------------Modal editar venta ------------------------------------------------

const edicionVenta =(venta)=>{
  
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


  const guardarModalEditar =(e)=>{
   

    const nombreVendedora = $('nombreVendedoraEdit').value
    const componentes = obtenerValuesOptions($('componentesEdit'));
    const sucursal = $('sucursalEdit').value
    const fecha = new Date($('fechaEdit').value) 
    const id = $('idEdit').value

    const indice = buscarIndiceId(id)


    const ventasaEditar = {
      nombreVendedora,
      componentes,
      sucursal,
      fecha,
      id
    }
   
    const ventas = getVentas()
    ventas[indice] = ventasaEditar
    setVentas(ventas)
  

    modalEditarVenta.classList.add("modal-none");
   actualizarDom() 

  }
  

  $('guardarEdit').addEventListener('click', guardarModalEditar)




const abrirModalEditar =(element)=>{
  modalEditarVenta.classList.toggle("modal-none"); 
 const venta = buscarId(element.dataset.id);
 edicionVenta(venta)
}

//-----------------------------------------------Guardar nueva venta -----------------------------------------
const obtenerValuesOptions = (optionDom) => {
  const aux = [];
  for (const option of optionDom.options) {
    if (option.selected) {
      aux.push(option.value);
    }
  }
  return aux;
};

$("guardarNuevaVenta").addEventListener("click", () => {
  const nombreVendedora = $("agregarVendedora").value;
  const componentes = obtenerValuesOptions($("agregarComponente"));
  const sucursal = $("agregarSucursal").value;
  const fecha = new Date($("agregarFecha").value);
  const id = Math.floor(Math.random() * 10000) + 10;

  const ventasAGuardar = {
    id,
    nombreVendedora,
    componentes,
    sucursal,
    fecha,
  };
  const ventas = getVentas() 

  ventas.push(ventasAGuardar);
  setVentas(ventas)
  actualizarDom();
  modalNuevaVenta.classList.add("modal-none");
});

//------------------------------------------------Modal eliminar venta----------------------------------------

const abrirModalEliminar=(element)=>{
    modalEliminarVenta.classList.toggle("modal-none");
    $('idEliminar').value = element.dataset.id
}

btnCancelEdicion.addEventListener("click", () => {
  modalEditarVenta.classList.toggle("modal-none");
});


btnCancelVenta.addEventListener("click", () => {
  modalEliminarVenta.classList.toggle("modal-none");
});


const eliminarVentaSeleccionada =(id)=>{
 const ventas = getVentas().filter(venta => venta.id != id)
  setVentas(ventas)
 }

$('eliminar-venta').addEventListener("click", () => {
  modalEliminarVenta.classList.toggle("modal-none");

  const id = $('idEliminar').value

  eliminarVentaSeleccionada(id)
  actualizarDom() 

});

//-------------------------------------------------------Renderizar tabla-------------------------------------

const renderTabla = (ventas) => {
  ventas = ventas || getVentas()


  const ventasTabla = ventas.reduce((acc, venta) => {
    console.log(venta);
    return (
      acc +
      ` <tr>
            <td>${ new Date(venta.fecha).toLocaleDateString
              ("es-AR", {
              timeZone: "UTC",
            })}     </td>
            <td>${venta.nombreVendedora}</td>
            <td>${venta.sucursal}</td>
            <td>${venta.componentes.join()}</td>
            <td>${precioMaquina(venta.componentes)}</td>
            <td>
                <i class="fas fa-pencil-alt editar" data-id="${
                    venta.id}" onclick="abrirModalEditar(this)"></i>
                <i class="fas fa-trash-alt eliminar" data-id="${
                    venta.id}" onclick="abrirModalEliminar(this)"></i>
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

  tablaVenta.innerHTML = ventasTabla;
};
//-----------------------------------------------Filtros -----------------------------------------

aplicarFiltro.addEventListener('click', renderTabla)


//------------------------------------------------- Renderizar sucursales-------------------------------------
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

//------------------------------------------------- Actualizar el DOM ----------------------------------------
const actualizarDom = () => {
  $("productoEstrella").innerHTML = componenteMasVendido();
  $("vendedoraEstrella").innerHTML = vendedoraQueMasVendio();
  renderTabla();
  renderSucursales();
  
};
actualizarDom();


//------------------------------------------------------

 const guardarModalFiltro = () => {
  const nombreVendedora = $("filtroVendedora").value;
  const componentes = $("filtroComponente").value;
  const sucursal = $("filtroSucursal").value;
  const fecha = new Date($("filtroFecha").value);


    let filtroVendedora = (filtroPorVendedora(nombreVendedora, getVentas()))
    let filtroComponente= (filtroPorComponente(componentes, filtroVendedora))
    let filtroSucursal = (filtroPorSucursal(sucursal, filtro2))
    let filtroFecha = (filtroPorFecha(fecha, filtroSucursal))

    console.log(filtroVendedora);
    console.log(filtroComponente);
    console.log(filtroSucursal);
    console.log(filtroFecha);

    const ventasaFiltrar = {
      nombreVendedora,
      componentes,
      sucursal,
      fecha,
      id
    }
   
    const ventas = getVentas()
    ventas = filtroFecha
    setVentas(ventas)
  

    $("modal-filtro").classList.add("modal-none");
    actualizarDom() 

  }
  

  $('aplicar-filtro').addEventListener('click', guardarModalFiltro)