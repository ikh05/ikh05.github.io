// Ganti dengan username GitHub-mu
const username = "ikh05";


// Ambil profil
fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").textContent = data.name || data.login;
    document.getElementById("bio").textContent = data.bio || "Tidak ada bio.";
    document.getElementById("githubLink").href = data.html_url;
  });

// Ambil repositori publik
fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    const repoList = document.getElementById("repoList");
    repos.forEach(repo => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || "Tanpa deskripsi."}</p>
            <a href="${repo.html_url}" target="_blank" class="btn btn-outline-dark">Lihat Repo</a>
          </div>
        </div>
      `;
      repoList.appendChild(col);
    });
  });
