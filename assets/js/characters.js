const lastCharacters = document.getElementById("lastCharacters");
const lblNumPage = document.getElementById("lblNumPage");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

let pageNum = 1;

// Button listeners
btnPrev.addEventListener("click", () => {
  if (pageNum > 1) {
    pageNum--;
  }
  loadLastCharacters();
});

btnNext.addEventListener("click", () => {
  if (pageNum < 42) {
    pageNum++;
  } else {
    pageNum = 42;
  }
  loadLastCharacters();
});

// Number Pagination
const loadNumPage = () => {
  lblNumPage.innerHTML = pageNum;
};
// Characters
const loadLastCharacters = async () => {
  try {
    lastCharacters.innerHTML = "";
    loadNumPage();
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNum}`
    );
    if (res.status === 200) {
      const data = await res.json();
      data.results.forEach((element) => {
        console.log(element);
        createElementCh(element);
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
