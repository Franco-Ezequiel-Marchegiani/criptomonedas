const cotizador = new API('7165b099de9c235d485e099abf1fd15d0cb4f09d23cd4238582ad8166de3c124');
const ui = new Interfaz(); // Se instancia / vincula los archivos, este vendría siendo el "padre", ya que recibe información de los hijos



// Leer el formulario

const formulario = document.querySelector('#formulario');

// Eventlistener

formulario.addEventListener('submit', (e) => {
     e.preventDefault();

     // Lectura de moneda seleccionada
     const monedaSelect = document.querySelector('#moneda');
     const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

     // Lectura de criptomoneda seleccionada
     const criptoMonedaSelect = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

     // Comprobar que ambos campos estén seleccionados
     if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
          // Lanza una alerta de error
          ui.mostrarMensaje('Ambos Campos son Obligatorios','alert bg-danger text-center');
     } else {
          // Todo en orden, consulta la API
          cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
               .then(data => {
                    ui.mostrarResultado(data.resultado.RAW,monedaSeleccionada,criptoMonedaSeleccionada);
               })
     }
     
})