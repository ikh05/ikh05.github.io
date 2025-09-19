
export async function fetchGitHub(type, body = {}) {
  try {
    const res = await fetch("https://github-token-ikh05.netlify.app/.netlify/functions/github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...body }) // type => "user", "repos", "file"
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

export function toggleElementVisibility(el_show, el_hidden, show = true, func = null) {
  if (show) {
    document.getElementById(el_show).classList.remove("d-none");
    document.getElementById(el_hidden).classList.add("d-none");
    if (typeof func === "function") func();
  }
}

// fungsi cek apakah semua data dalam objek sudah true
export function checkAllTrue(obj) {
  return Object.values(obj).every((value) => value === true);
}