// ABRIR MODAL NUEVA VENTA

const nuevaVenta = document.getElementById('nuevaVenta')
const modalNuevaVenta = document.getElementById('modal-none')
const btnCancelar = document.getElementById('cancelarNuevaVenta')

const $ = (id) => document.getElementById(id)


nuevaVenta.addEventListener('click', ()=>{
    modalNuevaVenta.classList.toggle('modal-none')
})  

btnCancelar.addEventListener('click', ()=>{
    modalNuevaVenta.classList.toggle('modal-none')
})

// ABRIR MODAL EDITAR

const editarVenta = document.querySelector('.editar')
const btnCancelEdicion = document.querySelector('#cancelar-edicion')
const modalEditarVenta = document.querySelector('#modal-editar')

editarVenta.addEventListener('click',()=>{
    modalEditarVenta.classList.toggle('modal-none')
})
btnCancelEdicion.addEventListener('click', ()=>{
    modalEditarVenta.classList.toggle('modal-none')
})


// MODAL ELIMINAR VENTA

const eliminarVenta = document.querySelector('.eliminar')
const btnCancelVenta = document.querySelector('#cancelar-venta')
const modalEliminarVenta = document.querySelector('#modal-eliminar')

eliminarVenta.addEventListener('click',()=>{
    modalEliminarVenta.classList.toggle('modal-none')
})

btnCancelVenta.addEventListener('click',()=>{
    modalEliminarVenta.classList.toggle('modal-none')
})

// CREAR VENTA

const renderTabla = ()=>{
    const ventasTable = ventas.reduce((acc, venta)=>{
    return acc + ` 
    <tr>
    <td>${venta.fecha.toLocaleString('es-AR', {
        timeZone: 'UTC'
    })}</td>
    <td>${venta.nombreVendedora}</td>
    <td>${venta.sucursal}</td>
    <td>${venta.componentes.join()}</td>
    <td>${precioMaquina(venta.componentes)}</td>
    <td>
      <i class="fas fa-pencil-alt editar"></i>
      <i class="fas fa-trash-alt eliminar"></i>
    </td>
    </tr>
    `
},'')
console.log(ventasTable);

const tablaVenta = document.querySelector('#tablaVentas')

tablaVenta.innerHTML = ventasTable
}

renderTabla()



//VENTAS X SUCURSAL
const renderSucursales = () =>{
    const ventasXsucursalDom = sucursales.reduce((acc, sucursal) =>{
    return acc + `
    <tr>
        <td>${sucursal}</td>
        <td>${ventasSucursal(sucursal)}</td>
    </tr>
    `
}, '')

const tablaVentasXsucursal = document.querySelector('#tdSucursal')

tablaVentasXsucursal.innerHTML = ventasXsucursalDom
}

renderSucursales()



//PRODUCTO ESTRELLA
 
   $('productoEstrella').innerHTML = componenteMasVendido()

// VENDEDORA ESTRELLA 

 $('vendedoraEstrella').innerHTML = vendedoraQueMasVendio()


 //AGREGAR VENTA

 $('guardarNuevaVenta').addEventListener('click', ()=>{
   const nombreVendedora = $('agregarVendedora').value
   const componentes = getValuesOptions($('agregarComponente'))
   const sucursal = $('agregarSucursal').value
   const fecha = new Date ($('agregarFecha').value)
   const id = Math.ceil(Math.random * 10000)

    const ventasaGuardar = {
        id, nombreVendedora, componentes, sucursal, fecha
    }

    ventas.push(ventasaGuardar)
    console.log(ventasaGuardar);
    renderTabla()
    modalNuevaVenta.classList.add('modal-none')

 })


const getValuesOptions = (optionDom)=>{
    const aux = []
  for (const option of optionDom.options) {
    if (option.selected) {
      aux.push(option.value);
    }
  } 
  return aux 
}
 
