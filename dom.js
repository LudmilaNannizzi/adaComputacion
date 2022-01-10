// ABRIR MODAL NUEVA VENTA

const nuevaVenta = document.getElementById('nuevaVenta')
const modalNuevaVenta = document.getElementById('modal-none')
const btnCancelar = document.getElementById('cancelarNuevaVenta')




nuevaVenta.addEventListener('click', ()=>{
    modalNuevaVenta.classList.add('mostrar')
    modalNuevaVenta.classList.remove('modal-none')
// modalNuevaVenta.classList.toggle('modal-none')
})  

btnCancelar.addEventListener('click', ()=>{
    modalNuevaVenta.classList.remove('mostrar')
    modalNuevaVenta.classList.add('modal-none')
 // modalNuevaVenta.classList.toggle('modal-none')
})

