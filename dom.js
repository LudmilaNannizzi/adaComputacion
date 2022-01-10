// ABRIR MODAL NUEVA VENTA

const nuevaVenta = document.getElementById('nuevaVenta')
const modalNuevaVenta = document.getElementById('modal-madre')
const btnCancelar = document.getElementById('cancelarNuevaVenta')




nuevaVenta.addEventListener('click', ()=>{
    modalNuevaVenta.classList.add('mostrar')
    modalNuevaVenta.classList.remove('modal-madre')

})

btnCancelar.addEventListener('click', ()=>{
    modalNuevaVenta.classList.remove('mostrar')
    modalNuevaVenta.classList.add('modal-madre')
})

