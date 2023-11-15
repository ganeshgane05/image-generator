"use strict";
const accessKey = "ixl62KlvFe4FiWSdtNrFOU_DoHCrV8QLFIBhw-920Lk";
const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchRes = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
let inputData = "";
let page = 1;
async function searchImages() {
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page === 1) {
    searchRes.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imgLink);
    searchRes.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
})
showMore.addEventListener("click", () => {
  searchImages();
})
