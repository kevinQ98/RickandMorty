const lastEpisodes = document.getElementById("lastEpisodes");
const lblNumPage = document.getElementById("lblNumPage");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

let pageNum = 1;

// Button listeners
btnPrev.addEventListener("click", () => {
  if (pageNum > 1) {
    pageNum--;
  }
  loadLastEpisodes();
});

btnNext.addEventListener("click", () => {
  if (pageNum < 3) {
    pageNum++;
  } else {
    pageNum = 3;
  }
  loadLastEpisodes();
});

// Number Pagination
const loadNumPage = () => {
  lblNumPage.innerHTML = pageNum;
};

const loadLastEpisodes = async () => {
  try {
    lastEpisodes.innerHTML = "";
    loadNumPage();
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/?page=${pageNum}`
    );
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
  //   link.href = element.url;
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
  // Footer
  const divFooter = document.createElement("div");
  divFooter.classList = "text-body";
  divFooter.innerText = element.episode;
  // Childs
  divCont.appendChild(divContInd);
  divCont.appendChild(spanContInd);
  divCont.appendChild(divFooter);

  link.appendChild(divCont);
  link.appendChild(spanNum);

  lastEpisodes.appendChild(link);
};

loadLastEpisodes();
