document.getElementById("year").textContent = new Date().getFullYear();

// NEW: Mobile Navigation Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const allLinks = document.querySelectorAll('.nav-links a');

    // Toggle menu visibility
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon to X when open
        navToggle.innerHTML = navLinks.classList.contains('active') ? '&#x2715;' : '&#9776;';
    });

    // Close menu when a link is clicked
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '&#9776;';
            }
        });
    });
});
// END NEW: Mobile Navigation Toggle Logic

new Typed('#typed-text',{
  strings:[
    "Full-Stack Web Developer",
    "JavaScript Enthusiast",
    "MERN Stack Creator",
    "Building Modern Web Experiences",
    "Turning Ideas into Web Apps"
  ],
  typeSpeed:60, backSpeed:40, loop:true
});

AOS.init({duration:1200, once:true});

// Fetch GitHub Projects
async function fetchRepos() {
  const repoList = document.getElementById("repo-list");
  const toggleBtn = document.getElementById("toggle-projects-btn");
  let showAll = false; // tracks toggle state

  try {
    const res = await fetch("https://api.github.com/users/krishna-kankotiya/repos");
    const data = await res.json();

    // Sort by recently updated
    const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Initial main projects
    const mainProjects = ["AMS", "budget-buddy", "Google-Clone"];
    const createCards = (projects) => projects.map(r => `
      <div class="project-card">
        <h4>${r.name}</h4>
        <div class="project-links">
          <a href="${r.html_url}" target="_blank" class="project-btn">Code (GitHub)</a>
          <a href="https://${r.owner.login}.github.io/${r.name}" target="_blank" class="project-btn live">Live Demo</a>
        </div>
      </div>
    `).join("");

    // Show main projects first
    repoList.innerHTML = createCards(sorted.filter(r => mainProjects.includes(r.name)));

    toggleBtn.addEventListener("click", () => {
      showAll = !showAll;
      if (showAll) {
        // Show all repos
        repoList.innerHTML = createCards(sorted);
        toggleBtn.textContent = "View Less Projects";
      } else {
        // Show only main projects
        repoList.innerHTML = createCards(sorted.filter(r => mainProjects.includes(r.name)));
        toggleBtn.textContent = "View More Projects";
      }
    });

  } catch (err) {
    repoList.innerHTML = "<p>Error loading repositories.</p>";
  }
}

fetchRepos();

// GSAP Scroll Animations
gsap.utils.toArray(".certificate-card").forEach((card, i)=>{
  gsap.from(card,{
    scrollTrigger:{trigger:card,start:"top 80%"},
    opacity:0,
    y:50,
    duration:0.8,
    delay:i*0.2,
    ease:"power2.out"
  });
});