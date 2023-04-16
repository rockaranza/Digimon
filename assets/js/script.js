// Obtener el botón de "Digimon aleatorio"
const randomDigimonButton = document.getElementById('random-digimon-button');
// Obtener el botón Buscar
const searchDigimonButton = document.getElementById('search-digimon-button')

//Generar Lista
function getDigimon() {
  return fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .catch(error => console.error('Error para listado de peliculas', error));
}

function fillDigimonList(data) {
  let contenido = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Nivel</th>
        <th>Imagen</th>
      </tr>
    </thead>
  `;
  data.forEach(digimon => {
    contenido += `
      <tbody>
        <tr>
          <td><h6>${digimon.name}</h6></td>
          <td><h6>${digimon.level}</h6></td>
          <td><img src="${digimon.img}" class="digimonListImg"></td>
        </tr>
      </tbody>
    `;
  })
  digimonList.innerHTML = contenido;
}

// Invocar Funciones para llenar listado
getDigimon().then(fillDigimonList);

// Generar un Digimon de manera Aleatoria
randomDigimonButton.addEventListener('click', () => {
  // Seleccionar el modal por su ID
  const randomDigimonModal = document.getElementById('digimonModal');
  
  //Obtener un Digimon de forma aleatoria
  function getRandomDigimon(items) {
    //Generar un numero aleatorio con un máximo de elementos que trae un arreglo
    const randomIndex = Math.floor(Math.random() * items.length);
    //Regresa un elemento del arreglo, proporcionado por el indice aleatorio generado
    return items[randomIndex];
  }
  // Mostar un digimon de forma aleatoria
  function showRandomDigimon() {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(data => {
        const digimonRandom = getRandomDigimon(data);
        const card = document.getElementById("contentCard");
        card.innerHTML = `
          <h2 class="text-center my-auto">${digimonRandom.name}</h2>
          <div class="d-flex justify-content-center">
            <img src="${digimonRandom.img}" alt="">
          </div>
          <div class="text-center my-auto">
            <h4>${digimonRandom.level}</h4>
          </div>
        `;
        console.log(digimonRandom);
      })
      .catch(error => console.error('Error al obtener datos de la API', error));
  }
  showRandomDigimon();
    // Llamar a la función 'modal' de Bootstrap para abrir el modal
  $(randomDigimonModal).modal('show');
});

// Buscar Digimon con Input del NavBar
searchDigimonButton.addEventListener('click', function(event) {
  event.preventDefault();
  const searchBar = document.getElementById("input-searchBar");
  const randomDigimonModal = document.getElementById('digimonModal');

  fetch(`https://digimon-api.vercel.app/api/digimon/name/${searchBar.value}`)
    .then(response => response.json())
    .then(data => {
      const digimon = data[0];
      console.log(digimon.name)
      const card = document.getElementById("contentCard");
      card.innerHTML = `
        <h2 class="text-center my-auto">${digimon.name}</h2>
        <div class="d-flex justify-content-center">
          <img src="${digimon.img}" alt="">
        </div>
        <div class="text-center my-auto">
          <h4>${digimon.level}</h4>
        </div>
      `;
      console.log("digimonRandom");
    })
    .catch(error => console.error('Error al obtener datos de la API', error));
  
  $(randomDigimonModal).modal('show');
});
