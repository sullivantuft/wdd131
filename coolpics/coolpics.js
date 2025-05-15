
const menuButton = document.querySelector(".menu-button");
const navList = document.querySelector(".nav-list");

menuButton.addEventListener("click", () => {
  navList.classList.toggle("hide");
  });

function handleResize(){
  const menu = document.querySelector(".menu-button");
  if(window.innerWidth > 1000){
    menu.classList.remove("hide");
  }
  else{
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);

const modal = document.createElement('dialog');
modal.innerHTML = `
  <img src="" alt="">
  <button class="close-viewer" aria-label="Close viewer">X</button>
`;

document.body.appendChild(modal);

const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

function viewerTemplate(imageUrl, altText) {
  modalImage.setAttribute('src', imageUrl);
  modalImage.setAttribute('alt', altText);
}

closeButton.addEventListener('click', () =>{
  modal.close();
});

modal.addEventListener('click', (event) =>{
  if(event.target === modal){
    modal.close();
  }
});

document.querySelector('.gallery').addEventListener('click', (event) => {
  const clicked = event.target.closest('img');
  if (!clicked){
    return;
  } 

  const src = clicked.getAttribute('src');
  const alt = clicked.getAttribute('alt');
  const fullSrc = src.split('-')[0] + '-full.jpeg';

  viewerTemplate(fullSrc, alt); 
  modal.showModal();
});
