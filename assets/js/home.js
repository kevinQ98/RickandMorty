const lastEpisodes = document.getElementById("lastEpisodes");
const lastCharacters = document.getElementById("lastCharacters");

const loadLastEpisodes = async () => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/?page=3`);
    if (res.status === 200) {
      const data = await res.json();
      //   console.log(data.results);
      data.results.forEach((element) => {
        // console.log(element);
        createElement(element);
      });
    } else {
      console.log("Something wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};

const createElement = (element) => {
  const link = document.createElement("a");
  link.id = element.id;
  // link.href = element.url;
  link.classList =
    "list-group-item list-group-item-action bg-success bg-gradient d-flex justify-content-between align-items-start mb-2";
  // Inside Link
  const divCont = document.createElement("div");
  divCont.classList = "ms-2 me-auto text-white";
  const divContInd = document.createElement("div");
  divContInd.classList = "fw-bold pe-2 mb-2";
  divContInd.innerText = element.name;
  const spanContInd = document.createElement("span");
  spanContInd.innerText = "Air Date: " + element.air_date;
  const spanNum = document.createElement("span");
  spanNum.classList = "badge bg-primary rounded-pill";
  spanNum.innerText = "Characters seen: " + element.characters.length;
  // Childs
  divCont.appendChild(divContInd);
  divCont.appendChild(spanContInd);

  link.appendChild(divCont);
  link.appendChild(spanNum);

  lastEpisodes.appendChild(link);
};

loadLastEpisodes();

// Characters
const loadLastCharacters = async () => {
  try {
    var numPageR = randomNumInt(1, 42);
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${numPageR}`
    );
    if (res.status === 200) {
      const data = await res.json();
      // console.log(data.results);
      var cont = 0;
      data.results.forEach((element) => {
        if (cont >= 5) {
          return false;
        } else {
          // console.log(element);
          createElementCh(element);
          cont++;
        }
      });
    } else {
      console.log("Something wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};

const createElementCh = (element) => {
  var colorStatus = "";
  if (element.status === "Alive") {
    colorStatus = "#75FF33";
  }
  if (element.status === "Dead") {
    colorStatus = "#C70039";
  }
  if (element.status === "unknown") {
    colorStatus = "#262929";
  }
  lastCharacters.innerHTML += `<div class="card mb-3 bg-success bg-gradient text-white mx-2" style="max-width: 800px">
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src="${element.image}"
        class="img-fluid rounded-start"
        alt="..."
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <ul class="list-group ">
          <li class="list-group-item bg-transparent text-white border-dark">${element.species}</li>
          <li class="list-group-item bg-transparent text-white border-dark">Origin Location: ${element.origin.name}</li>
          <li class="list-group-item bg-transparent text-white border-dark">
            Last Known Location: ${element.location.name}
          </li>
        </ul>
        <p class="card-text ps-2 mt-4">
          <i
            class="bi bi-circle-fill pe-1"
            style="color: ${colorStatus}"
          ></i>
          <small class="text-white">${element.status}</small>
        </p>
      </div>
    </div>
  </div>
</div>`;
};

loadLastCharacters();

function randomNumInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
