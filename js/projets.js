function genereContent() {
    document.querySelectorAll(".project-item").forEach((element) => element.remove());

    // Trier les projets
    dbProjets.sort((a, b) => {
        const endDateA = new Date(a.end_date);
        const endDateB = new Date(b.end_date);

        if (endDateA > endDateB) return -1;
        if (endDateA < endDateB) return 1;

        // Si les dates de fin sont égales, trier par date de début
        const startDateA = new Date(a.start_date);
        const startDateB = new Date(b.start_date);

        if (startDateA > startDateB) return -1;
        if (startDateA < startDateB) return 1;

        return 0;
    });

    dbProjets.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-item");
        projectDiv.id = project.id;
        if (index % 2 === 1) {
            projectDiv.classList.add("second");
        }
        let startYear = new Date(project.start_date).getFullYear();
        let endYear = new Date(project.end_date).getFullYear();
        let dateDisplay = `${startYear} - ${endYear}`;

        if (startYear === endYear) {
            dateDisplay = `${startYear}`;
        }

        if (project.end_date === "now") {
            endYear = "Aujourd'hui";
            dateDisplay = `${startYear} - ${endYear}`;
        }

        projectDiv.innerHTML = `
        <img src="${project.image}" alt="${project.titre}">
        <div class="project-item-content">
            <h2><a href="#${project.id}">${project.titre}</a></h2>
            <h2>${dateDisplay}</h2>
            <h3>${project.client}</h3>
            <p>${project.description}</p>
            <div class="project-url"></div>
<!--            <a href="${project.url}" class="btn" target="_blank">Voir le projet</a>-->
        </div>`;
        project.url.forEach((url) => {
            const urlA = document.createElement("a");
            urlA.href = url.link;
            urlA.classList.add("btn");
            urlA.target = "_blank";
            urlA.textContent = url.name;
            projectDiv.querySelector(".project-url").appendChild(urlA);
        });
        
        document.querySelector(".projects-grid").appendChild(projectDiv);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    genereContent();
});