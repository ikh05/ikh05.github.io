async function fetchGitHub(type) {
  const res = await fetch("https://github-proxy-netlify.netlify.app/.netlify/functions/github", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }) // type = "user" atau "repos"
  });

  const data = await res.json();
  console.log(data);
}

// Contoh penggunaan:
fetchGitHub("user");  // ambil data user
fetchGitHub("repos"); // ambil repos






// // Ambil profil
// fetch(`https://github-proxy-netlify.netlify.app/.netlify/functions/github`)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
    
//     document.getElementById("avatar").src = data.avatar_url;
//     document.getElementById("name").textContent = data.name || data.login;
//     document.getElementById("bio").textContent = data.bio || "Tidak ada bio.";
//     document.getElementById("githubLink").href = data.html_url;
//   });