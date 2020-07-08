class Interfaz {

     constructor() {
          this.init();
     }
     init() {
          this.construirSelect()
     }

     construirSelect() {
          cotizador.obtenerMondeasAPI()
          .then(monedas => { //Retorna un Objeto en un Arreglo (Object.entries)

               // Crea un select de opciones
               const select = document.querySelector('#criptomoneda');
               // Itera por los resultados de la API
               for( const [key, value] of Object.entries(monedas.monedas.Data) ) {
                    //Añade el S ymbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
               }

          })
     }

     mostrarMensaje(mensaje, clases) {
          const div = document.createElement('div');
          div.className = clases;
          div.appendChild(document.createTextNode(mensaje));

          //Seleccionar mensajes
          const divMensaje = document.querySelector('.mensajes');
          divMensaje.appendChild(div);

          // Mostrar Contenido
          setTimeout( () => {
               document.querySelector('.mensajes div').remove();
          }, 3000);
     }

     // Imprime el resultado de la cotización

     mostrarResultado(resultado, moneda, crypto){
          
          // En caso de resultado anterior, ocultarlo
          const resultadoAnterior = document.querySelector('#resultado > div');

          if(resultadoAnterior) {
               resultadoAnterior.remove();
          }

          const datosMoneda = resultado[crypto][moneda]; 

          // recorte dígitos de precio
          let precio = datosMoneda.PRICE.toFixed(2),
               porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
               actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-AR');
               
          // Construir el template

          let templateHTML = `
          <div clasS="card bg-warning">
               <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p> El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de : ${precio} </p>
                    <p>Variacoón último día: % ${porcentaje} </p>
                    <p>Última Actualización: ${actualizado} </p>
                    </div>
          </div>
          `;

          this.mostrarOcultarSpinner('block'); 

          setTimeout(() =>{
               // Inserta el resultado
               document.querySelector('#resultado').innerHTML = templateHTML;

               // Oculta el spinner
               this.mostrarOcultarSpinner('none');
          }, 3000);
     }
     // Muestra un spinner de carga al enviar la cotización
     mostrarOcultarSpinner(vista) {
          const spinner = document.querySelector('.contenido-spinner');
          spinner.style.display = vista;
     }
}