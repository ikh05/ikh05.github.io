async function fetchGitHub(type, func = null) {
  const res = await fetch("https://github-proxy-netlify.netlify.app/.netlify/functions/github", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }) // type = "user" atau "repos"
  });

  const data = await res.json();
  if(typeof func === "function") func(data);
  console.log(data);
}

// Contoh penggunaan:
fetchGitHub("user", function(repos){
  document.getElementById("avatar").src = repos.avatar_url;
  document.getElementById("name").textContent = repos.name || repos.login;
  document.getElementById("bio").textContent = repos.bio || "Tidak ada bio.";
  document.getElementById("githubLink").href = repos.html_url;
}); 
