// DATOS

const vendedoras = ['Ada', 'Grace', 'Hedy', 'Sheryl'];

const ventas = [
  // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
  {
    id: 1,
    fecha: new Date(2019, 1, 4),
    nombreVendedora: 'Grace',
    sucursal: 'Centro',
    componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500'],
  },
  {
    id: 2,
    fecha: new Date(2019, 0, 1),
    nombreVendedora: 'Ada',
    sucursal: 'Centro',
    componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500'],
  },
  {
    id: 3,
    fecha: new Date(2019, 0, 2),
    nombreVendedora: 'Grace',
    sucursal: 'Caballito',
    componentes: ['Monitor ASC 543', 'Motherboard MZI'],
  },
  {
    id: 4,
    fecha: new Date(2019, 0, 10),
    nombreVendedora: 'Ada',
    sucursal: 'Centro',
    componentes: ['Monitor ASC 543', 'Motherboard ASUS 1200'],
  },
  {
    id: 5,
    fecha: new Date(2019, 0, 12),
    nombreVendedora: 'Grace',
    sucursal: 'Caballito',
    componentes: [
      'Monitor GPRS 3000',
      'Motherboard ASUS 1200',
      'Monitor GPRS 3000',
      'Motherboard ASUS 1500',
    ],
  },
];

const articulos = [
  { item: 'Monitor GPRS 3000', precio: 200 },
  { item: 'Motherboard ASUS 1500', precio: 120 },
  { item: 'Monitor ASC 543', precio: 250 },
  { item: 'Motherboard ASUS 1200', precio: 100 },
  { item: 'Motherboard MZI', precio: 30 },
  { item: 'HDD Toyiva', precio: 90 },
  { item: 'HDD Wezter Dishital', precio: 75 },
  { item: 'RAM Quinston', precio: 110 },
  { item: 'RAM Quinston Fury', precio: 230 },
];

const sucursales = ['Centro', 'Caballito'];


// FUNCIONES PARA REUTILIZAR

const precioComponente = (articulo) => {
    for (const componente of articulos) {
      if (articulo == componente.item) {
        return componente.precio;
      }
    }
  };

  const precioMaquina = (componentesVendidos) => {
    let total = 0;
    for (const componente of componentesVendidos) {
      total += precioComponente(componente);
    }
    return total;
  };
  
  const totalVentas= ( ventasFiltradas ) =>{
    let contador = 0
    for (const venta of ventasFiltradas) {
      contador += precioMaquina(venta.componentes)
    }
    return contador
  }

  const ventasPorFecha = (mes, anio)=>{
    const  ventasFiltradas = []
    for (const venta of ventas) {
      if ((mes - 1) == venta.fecha.getMonth() && anio == venta.fecha.getFullYear()) {
        ventasFiltradas.push(venta)
      }
    }
    return ventasFiltradas
  }

  // RESOLUCION


  cantidadVentasComponente = (componente) => {
    let contador = 0;
    for (const venta of ventas) {
      for (const componenteVendido of venta.componentes) {
        if (componenteVendido == componente) {
          contador++;
        }
      }
    }
    return contador;
  };
  
 
  



  const vendedoraDelMes = (mes, anio) => {
  
    const ventasDelMes = ventasPorFecha(mes,anio);
    const ventasPorVendedora = {}
    for (const venta of ventasDelMes) {
      
      if(ventasPorVendedora[venta.nombreVendedora] == undefined){
        ventasPorVendedora[venta.nombreVendedora] = precioMaquina(venta.componentes)
      }else{
        ventasPorVendedora[venta.nombreVendedora] += precioMaquina(venta.componentes)
      }
    }
  
  
    let vendedoraNombre = ""
    let vendedoraPrecio = 0
    for (const indice in ventasPorVendedora) {
  
        if(vendedoraPrecio <= ventasPorVendedora[indice]){
          vendedoraPrecio= ventasPorVendedora[indice]
          vendedoraNombre= indice
        }
  
    }
    return vendedoraNombre;
  };

  const ventasMes = (mes, anio) =>{
    let contador = 0
    for (const venta of ventasPorFecha(mes, anio)) {
      contador += precioMaquina(venta.componentes)
    }
    return contador
  }


  const ventasVendedora = (nombre) =>{
    let filtroVendedora = ventas.filter(venta => venta.nombreVendedora == nombre)
    return totalVentas(filtroVendedora)
  }


  const componenteMasVendido = ()=>{
    let acc = 0
    let articulosMV = ''
   
    for (const articulo of articulos) {
      if (acc < cantidadVentasComponente(articulo.item)) {
        acc =  cantidadVentasComponente(articulo.item)
        articulosMV = articulo.item
      }
    }
    return articulosMV
  }

  const huboVentas = (mes, anio) =>{
    return ventasPorFecha(mes, anio).length >= 1
  }


  
  const ventasSucursal = (sucursalPar) =>{
    let filtroSucursal = ventas.filter(venta =>venta.sucursal == sucursalPar)

    return totalVentas(filtroSucursal)
  }



  const sucursalDelMes = (mes, anio)=>{
    const ventasDelMes = ventasPorFecha(mes,anio);
    const ventasPorSucursal = {}
    
    for (const venta of ventasDelMes) {
      
      if(ventasPorSucursal[venta.sucursal] == undefined){
        ventasPorSucursal[venta.sucursal] = precioMaquina(venta.componentes)
      }else{
        ventasPorSucursal[venta.sucursal] += precioMaquina(venta.componentes)
      }
    }
  
  
    let sucursalNombre = ""
    let sucursalPrecio = 0
    
    for (const indice in ventasPorSucursal) {
  
        if(sucursalPrecio <= ventasPorSucursal[indice]){
          sucursalPrecio= ventasPorSucursal[indice]
          sucursalNombre= indice
        }
  
    }
  
    console.log(sucursalNombre);
    console.log(sucursalPrecio);
    return sucursalNombre;
  
  }

  /*
    const componenteMasVendido = ()=>{
        let acc = 0
        let articulosMV = ''
      
        for (const articulo of articulos) {
          if (acc < cantidadVentasComponente(articulo.item)) {
            acc =  cantidadVentasComponente(articulo.item)
            articulosMV = articulo.item
          }
        }
        return articulosMV
      }
 
*/
    const vendedoraQueMasVendio  = () =>{
      let acc = 0
      let vendedoraMV = ''

      for (const vendedora of vendedoras) {
        if (acc < ventasVendedora(vendedora)) {
            acc = ventasVendedora(vendedora)
            vendedoraMV = vendedora
        }
      }
      return vendedoraMV
    } 
    console.log(vendedoraQueMasVendio());