class API {
     constructor(apikey) {
          this.apikey = apikey;
     }
     // Obtiene todas las monedas
     async obtenerMondeasAPI() {
          const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

          // fetch a la API
          const urlObtenerMondeas = await fetch(url);

          // Respuesta en json
          const monedas = await urlObtenerMondeas.json();
          console.log(monedas);
          return {
               monedas
          }
     }

     async obtenerValores(moneda, criptomondea) {
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomondea}&tsyms=${moneda}&api_key=${this.apikey}`;

          // Consultar en rest API
          const urlConvertir = await fetch(url);

          const resultado = await urlConvertir.json();

          return {
               resultado
          }
     }
}