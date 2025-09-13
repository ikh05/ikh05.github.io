


// Ambil profil
fetch(`https://github-proxy-netlify.netlify.app/.netlify/functions/github`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").textContent = data.name || data.login;
    document.getElementById("bio").textContent = data.bio || "Tidak ada bio.";
    document.getElementById("githubLink").href = data.html_url;
  });