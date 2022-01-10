// ABRIR MODAL NUEVA VENTA

const nuevaVenta = document.getElementById('nuevaVenta')
const modalNuevaVenta = document.getElementById('modal-none')
const btnCancelar = document.getElementById('cancelarNuevaVenta')






nuevaVenta.addEventListener('click', ()=>{
    //modalNuevaVenta.classList.add('mostrar')
    //modalNuevaVenta.classList.remove('modal-none')
    modalNuevaVenta.classList.toggle('modal-none')
})  

btnCancelar.addEventListener('click', ()=>{
    //modalNuevaVenta.classList.remove('mostrar')
    //modalNuevaVenta.classList.add('modal-none')
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