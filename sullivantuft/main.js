import { projects } from "./projects.js";

const randomIndex = Math.floor(Math.random() * projects.length);
const spotlightProject = projects.splice(randomIndex, 1)[0];


function getYouTubeEmbedUrl(url) {
    const videoId = url.includes("youtu.be/")
        ? url.split("youtu.be/")[1]
        : url.split("v=")[1];
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

//render spotlight project
function renderSpotlightProject(project, containerId){

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const projectHTML = `
        <div class="project">
        <h3>${project.title}</h3>
        <iframe
            width="560"
            height="315"
            src="${getYouTubeEmbedUrl(project.url)}"
            frameborder="0"
            allowfullscreen
            title="Demo video showing ${project.title} project features">
        </iframe>
        <p>${project.subtitle}</p>
        <div class="project-description" style="display:none;">
            ${project.description}
        </div>
        <button class="show-more-btn">Show More</button>
        </div>
    `;
  container.innerHTML = projectHTML;
}
function renderProjects(projects) {
  const container = document.getElementById("all-projects-container");
  container.innerHTML = "";

  projects.forEach(project => {
    const projectHTML = `
      <div class="project">
        <h3>${project.title}</h3>
        <iframe
          width="560"
          height="315"
          src="${getYouTubeEmbedUrl(project.url)}"
          frameborder="0"
          allowfullscreen
          title="Demo video showing ${project.title} project features">
        </iframe>
        <p>${project.subtitle}</p>
        <div class="project-description" style="display:none;">
          ${project.description}
        </div>
        <button class="show-more-btn">Show More</button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", projectHTML);
  });
}

function addShowMoreListeners(){
    const buttons = document.querySelectorAll(".show-more-btn");

    buttons.forEach(button =>{
        button.addEventListener("click", () =>{
            const description = button.previousElementSibling;

            if(description.style.display === "none"){
                description.style.display = "block";
                button.textContent = "Show Less";
            } 
            else{
                description.style.display = "none";
                button.textContent = "Show More";
            }
        });
    });
}




renderSpotlightProject(spotlightProject, "spotlight-container");
renderProjects(projects)
addShowMoreListeners();