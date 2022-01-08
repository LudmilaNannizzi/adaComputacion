/*
  Datos Precargados
*/

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

/*
- **precioMaquina(componentes)**: recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

  ```js
  console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500'])); // 320 ($200 del monitor + $120 del motherboard)
  ```
*/
// const precioComponente = (articulo) => componentes.find(componente=> componente.item == articulo).precio;

const precioComponente = (articulo) => {
  for (const componente of articulos) {
    if (articulo == componente.item) {
      return componente.precio;
    }
  }
};

console.log(precioComponente('Monitor GPRS 3000'));
console.log(precioComponente('HDD Toyiva'));


//FORMA RESUMIDA
const precioComponente1 = (articuloABuscar) => {
  return articulos.find((articulo) => articuloABuscar == articulo.item).precio;
};


//  const prueba= [precioComponente('Monitor GPRS 3000'), precioComponente('Motherboard ASUS 1500')]

//  console.log(prueba)
//   const numeros = [12,657,123,34,5]
//   let acumulador = 0

//   for(const numero of numeros) {
//     acumulador += numero
//   }

//   console.log(acumulador)

const precioMaquina = (componentesVendidos) => {
  let total = 0;
  for (const componente of componentesVendidos) {
    total += precioComponente(componente);
  }
  return total;
};

console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500']));

/*
- **cantidadVentasComponente(componente)**: recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable `ventas`.

  ```js
  console.log(cantidadVentasComponente('Monitor ASC 543')); // 2
  ```

  */

// const cantidadVentasComponente = (articulo) =>{

// }

/*
- **cantidadVentasComponente(componente)**: recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable `ventas`.

  ```js
  
  ```
*/

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

console.log(cantidadVentasComponente('Monitor ASC 543')); // 2



const totalVentas= ( ventasFiltradas ) =>{
  let contador = 0
  for (const venta of ventasFiltradas) {
    contador += precioMaquina(venta.componentes)
  }
  return contador
}

/*
- **vendedoraDelMes(mes, anio)**, se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

  ```js
  console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)
  ```



const fecha = new Date(2019, 0, 1);

console.log(fecha.getFullYear());
console.log(fecha.getMonth());
console.log(fecha.getDay());
console.log(fecha.getDate());

const vendedoraDelMes1 = (mes, anio) => {
  // precioMaquina(componentesVendidos)
  const vendedorasComponente = [];
  for (const venta of ventas) {
    if (
      venta.fecha.getMonth() == mes - 1 &&
      venta.fecha.getFullYear() == anio
    ) {
      const indexVendedora = vendedorasComponente.findIndex(
        (i) => i.vendedora == venta.nombreVendedora
      );
      if (indexVendedora != -1) {
        vendedorasComponente[indexVendedora].totalVendido += precioMaquina1(
          venta.componentes
        );
      } else {
        vendedorasComponente.push({
          vendedora: venta.nombreVendedora,
          totalVendido: precioMaquina1(venta.componentes),
        });
      }
    }
  }
  let vendedoraEstrella = { vendedora: '', totalVendido: 0 };
  for (const vendedora of vendedorasComponente) {
    if (vendedora.totalVendido > vendedoraEstrella.totalVendido) {
      vendedoraEstrella = vendedora;
    }
  }
  return vendedoraEstrella.vendedora;
};

console.log(vendedoraDelMes1(1, 2019));





//OTRA FORMA

/*
- **vendedoraDelMes(mes, anio)**, se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

  ```js
  console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)
  ```

*/
/**
 PUNTEO

 1- Filtrar el objeto por mes y año que tenemos como parámetro
 2- Crear un objeto vacío para llenar con el nombre de la vendedora (nombre de la propiedad) y el total de lo que vendió (valor de la propiedad)
    {
      nombre : total de todas las ventas
    }

 3-
 */
const ventasPorFecha = (mes, anio)=>{
  const  ventasFiltradas = []
  for (const venta of ventas) {
    if ((mes - 1) == venta.fecha.getMonth() && anio == venta.fecha.getFullYear()) {
      ventasFiltradas.push(venta)
    }
  }
  return ventasFiltradas
}

const vendedoraDelMes = (mes, anio) => {
  
  const ventasDelMes = ventasPorFecha(mes,anio);
  const ventasPorVendedora = {}
  console.log(ventasDelMes);
  for (const venta of ventasDelMes) {
    
    if(ventasPorVendedora[venta.nombreVendedora] == undefined){
      ventasPorVendedora[venta.nombreVendedora] = precioMaquina(venta.componentes)
    }else{
      ventasPorVendedora[venta.nombreVendedora] += precioMaquina(venta.componentes)
    }
  }


  console.log(ventasPorVendedora);


  let vendedoraNombre = ""
  let vendedoraPrecio = 0
  for (const indice in ventasPorVendedora) {

      if(vendedoraPrecio <= ventasPorVendedora[indice]){
        vendedoraPrecio= ventasPorVendedora[indice]
        vendedoraNombre= indice
      }

  }

  console.log(vendedoraPrecio);
  console.log(vendedoraNombre);
  return vendedoraNombre;
};
console.log(vendedoraDelMes(1, 2019));

/*
 **ventasMes(mes, anio)**: Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

  ```js
  console.log(ventasMes(1, 2019)); // 1250
  ```
 */

  const ventasMes = (mes, anio) =>{
    let contador = 0
    for (const venta of ventasPorFecha(mes, anio)) {
      contador += precioMaquina(venta.componentes)
    }
    return contador
  }
  console.log(ventasMes(1, 2019));

  /*
  **ventasVendedora(nombre)**: Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
   ```js
  console.log(ventasVendedora('Grace')); // 900
  ```
  */

  const ventasVendedora = (nombre) =>{
  

    let filtroVendedora = ventas.filter(venta => venta.nombreVendedora == nombre)

    return totalVentas(filtroVendedora)
  }

  console.log(ventasVendedora('Grace'));

  /*
  **componenteMasVendido()**: Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función `cantidadVentasComponente`

  ```js
  console.log(componenteMasVendido()); // Monitor GPRS 3000
  ```
  */
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
 console.log(componenteMasVendido());

 /*
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

console.log(cantidadVentasComponente('Monitor ASC 543'));
 */

/*
const ventasDelMes = ventasPorFecha(mes,anio);
  const ventasPorVendedora = {}
  console.log(ventasDelMes);
  for (const venta of ventasDelMes) {
    
    if(ventasPorVendedora[venta.nombreVendedora] == undefined){
      ventasPorVendedora[venta.nombreVendedora] = precioMaquina(venta.componentes)
    }else{
      ventasPorVendedora[venta.nombreVendedora] += precioMaquina(venta.componentes)
    }
  }


*/

/*
 **huboVentas(mes, anio)**: que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

  ```js
  console.log(huboVentas(3, 2019)); // false
  ```
*/

const huboVentas = (mes, anio) =>{
  return ventasPorFecha(mes, anio).length >= 1
}
console.log(huboVentas(3, 2019))


/*
Crear la función **ventasSucursal(sucursal)**, que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

  ```js
  console.log(ventasSucursal('Centro')); // 990
  ```
1) Se recorre el array de objetos 
2) Se crea un acumulador
3)Si ventas.sucursal es igual al parametro se suma el precioMaquina de la venta al acc

  */
/*
const ventasSucursal = (sucursal) =>{

  let totalDeVentas = 0

  for (const venta of ventas) {
    if (venta.sucursal == sucursal) {
      totalDeVentas += precioMaquina(venta.componentes)
    }
  }
  return totalDeVentas
}

console.log(ventasSucursal('Centro'));

/*
- Crear la función **sucursalDelMes(mes, anio)**, que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

  ```js
  console.log(sucursalDelMes(1, 2019)); // "Centro"
  ```
  1) Recorrer el array de ventas
  2) Crear un objeto donde se tomela sucursal como nombre de la propiedad y el total de la venta como valor de la misma
  3) para el punto 2 se debe tener en cuenta que si la propiedad es undefined se cree y ademas +=preciomaquina
  4) crear un acumulador
  5) a traves de otro for, recorrer el objeto creado y sumarlo a un acc para poder scaar el más grande
  
   ventasPorFecha(mes, anio)
  */
/*
  const sucursalDelMes = (mes, anio) =>{

    const ventasDelMes = ventasPorFecha(mes,anio);
    const ventasXsucursal = {};
    for (const venta of  ventasDelMes) {
      if(ventasXsucursal[venta.sucursal] == undefined){
        ventasXsucursal[venta.sucursal] = precioMaquina(venta.componentes)
      }else{
        ventasXsucursal[venta.sucursal] += precioMaquina(venta.componentes)
      }
    }
    console.log(ventasXsucursal);

    let nombreSucursal = ''
    let totalVendido = 0

    for (const indice in ventasXsucursal) {
      if(totalVendido <= ventasXsucursal[indice]){
        totalVendido = ventasXsucursal[indice]
        nombreSucursal= indice
      }
    }

    return nombreSucursal

  }
  console.log(sucursalDelMes(1, 2019));
*/

/*- Crear la función **ventasSucursal(sucursal)**, que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

  ```js
  console.log(ventasSucursal('Centro')); // 990
  ```
  */
  
  const ventasSucursal = (sucursalPar) =>{

    let filtroSucursal = ventas.filter(venta =>venta.sucursal == sucursalPar)
    console.log(filtroSucursal);

    return totalVentas(filtroSucursal)

  }
  console.log(ventasSucursal('Centro')); 

  /*
- Crear la función **sucursalDelMes(mes, anio)**, que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función `precioMaquina`. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

  */
const sucursalDelMes = (mes, anio)=>{
  const ventasDelMes = ventasPorFecha(mes,anio);
  const ventasPorSucursal = {}

  console.log(ventasDelMes);
  
  for (const venta of ventasDelMes) {
    
    if(ventasPorSucursal[venta.sucursal] == undefined){
      console.log(venta.sucursal);
      ventasPorSucursal[venta.sucursal] = precioMaquina(venta.componentes)
    }else{
      ventasPorSucursal[venta.sucursal] += precioMaquina(venta.componentes)
    }
  }


  console.log(ventasPorSucursal);


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

console.log(sucursalDelMes(1, 2019));



