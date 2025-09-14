async function fetchGitHub(type) {
  try {
    const res = await fetch("https://github-token-ikh05.netlify.app/.netlify/functions/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }) // "user" atau "repos"
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: err.message };
  }
}

// Contoh penggunaan
(async () => {
  const user = await fetchGitHub("user");
  if (user.error) {
    document.getElementById("bio").textContent = "Gagal ambil data.";
    return;
  }

  document.getElementById("avatar").src = user.avatar_url;
  document.getElementById("name").textContent = user.name || user.login;
  document.getElementById("bio").textContent = user.bio || "Tidak ada bio.";
  document.getElementById("githubLink").href = user.html_url;
  document.getElementById("footerGithubLink").href = user.html_url;
  document.getElementById("footerGithubLink").innerHTML = `<i class="fa-brands fa-github"></i> ${user.name || user.login}`;
})();
