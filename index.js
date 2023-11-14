const menuBar = document.querySelector(".menu-bar");
const navBar = document.querySelector("nav");
const workNav = document.querySelectorAll(".work-section-select span");
const resultContainer = document.querySelector(".result-work-section");

menuBar.addEventListener("click", () => {
  navBar.classList.toggle("show-menu");
});

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function getResult(text) {
  resultContainer.innerHTML = "";
  fetchData().then((result) => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].type === text) {
        createCardResult(result[i]);
      }
      if (text === "all") {
        createCardResult(result[i]);
      }
    }
  });
}

function createCardResult(item) {
  resultContainer.insertAdjacentHTML(
    "afterbegin",
    ` 
   <div class='project-card'>
    <div class='project-img'>
    <a href=${item.image}><img src=${item.image} alt=${item.project}></a>
    </div>
   <div class='project-text'>
   <h1>${item.project}</h1>
   <p>${item.desc}</p>
   </div>
  </div>
 `
  );
}

workNav.forEach((nav) => {
  nav.addEventListener("click", () => {
   getResult(nav.id);
  });
});
