function botonEncriptar() {
  if (guardarTexto()) {
      window.location.href = 'about.html?accion=encriptar';
  }
}

function botonDesencriptar() {
  if (guardarTexto()) {
      window.location.href = 'about.html?accion=desencriptar';
  }
}

function guardarTexto() {
  let textoRecibido = document.getElementById('valorUsuario').value.trim();
  
  if (textoRecibido === '') {
      alert('No hay texto para encriptar');
      return false;
  } else {
      console.log('Texto recibido:', textoRecibido);
      sessionStorage.setItem("guardarTexto", textoRecibido);
      return true;
  }
}

window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const accion = params.get('accion');
  
  let texto = sessionStorage.getItem("guardarTexto");

  if (!texto) {
      console.error('No se encontró texto para procesar');
      return;
  }

  if (accion === 'encriptar') {
      let resultado = texto.replace(/[aeiou]/gi, function (vocal) {
          switch (vocal.toLowerCase()) {
              case 'e': return 'enter';
              case 'i': return 'imes';
              case 'a': return 'ai';
              case 'o': return 'ober';
              case 'u': return 'ufat';
              default: return vocal;
          }
      });
      console.log('Texto encriptado:', resultado);
      mostrarResultado(resultado);
      mostrarTexto(texto);
  } else if (accion === 'desencriptar') {
      let resultado = texto.replace(/enter|imes|ai|ober|ufat/gi, function (cambio) {
          switch (cambio.toLowerCase()) {
              case 'enter': return 'e';
              case 'imes': return 'i';
              case 'ai': return 'a';
              case 'ober': return 'o';
              case 'ufat': return 'u';
              default: return cambio;
          }
      });
      console.log('Texto desencriptado:', resultado);
      mostrarResultado(resultado);
      mostrarTexto(texto);
  }
}
function mostrarTexto(texto) {
  let elementoHTML = document.querySelector('.textarea1');
  
  if (elementoHTML) {
      elementoHTML.value = texto;
  } else {
      console.error('No se encontró el elemento para mostrar el resultado');
  }
}

function mostrarResultado(resultado) {
  let elementoHTML = document.querySelector('.textarea2');
  
  if (elementoHTML) {
      elementoHTML.value = resultado;
  } else {
      console.error('No se encontró el elemento para mostrar el resultado');
  }
}

async function copiarTexto() {
  try {
      let textoParaCopiar = document.querySelector('.textarea2').value;
      
      if (textoParaCopiar) {
          await navigator.clipboard.writeText(textoParaCopiar);
          console.log('Texto copiado al portapapeles');
      } else {
          console.error('No hay texto para copiar');
      }
  } catch (err) {
      console.error('Error al copiar el texto:', err);
  }
}
