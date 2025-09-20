import {fetchGitHub, toggleElementVisibility, checkAllTrue } from './functions.js';
import {getContrastColor} from './luminance.js';

function parseSocialBadges(markdown) {
  const regex = /\[!\[(.*?)\]\((.*?)\)\]\((.*?)\)/g;
  const result = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const sosial_media = match[1];
    const badgeUrl = match[2];
    const link = match[3];

    // Ambil warna dari badge URL (setelah '-%23...')
    let colorMatch = badgeUrl.match(/-.*?%23([0-9A-Fa-f]{6})/);
    let color = colorMatch ? `#${colorMatch[1]}` : null;

    result.push({ sosial_media, link, color });
  }

  return result;
}



const end_loading = {
  social_media: false,
  user: false,
  avatar: false,
};


async function showProfil() {
  if (checkAllTrue(end_loading)) {
    toggleElementVisibility("trueProfil", "profilPlaceholder", true, () => {
      document.getElementById("profilPlaceholder").remove();
      document.getElementById("trueProfil").setAttribute("aria-hidden", "false");
    });
  }
}


export async function updateUser() {
  document.getElementById("avatar").onload = function () {
    end_loading.avatar = true;
    showProfil();
  };
  const user = await fetchGitHub("user");
  if (user.error) {
    document.getElementById("bio").textContent = "Gagal ambil data.";
    return;
  }
  console.log(user);

  const avatar = document.getElementById("avatar");
  avatar.src = user.avatar_url;
  avatar.alt = `Foto profil ${user.name || user.login}`;

  document.getElementById("name").textContent = user.name || user.login;
  document.getElementById("bio").textContent = user.bio || "Tidak ada bio.";
  const footerLink = document.getElementById("footerGithubLink");
  footerLink.href = user.html_url;
  footerLink.innerHTML = `<i class="fa-brands fa-github" aria-hidden="true"></i> ${user.name || user.login}`;
  footerLink.setAttribute("aria-label", `Profil GitHub ${user.name || user.login}`);

  end_loading.user = true;
  showProfil();
}

export async function updateSocialMedia() {
  const file = await fetchGitHub("file", {
    path: "README.md",
    repo: "ikh05",
  });
  if (file.error) {
    console.error("Gagal ambil file:", file.error);
    return;
  }

  const readmeContent = file.content;
  const social_media = readmeContent.split("Connect with me")[1].split("##")[0].trim();
  const list_sosial_media = parseSocialBadges(social_media);

  // GitHub default button
  document.getElementById("socialMedia").innerHTML += `
    <a href="https://github.com/ikh05"
       id="githubLink"
       class="btn btn-dark col-auto"
       target="_blank"
       rel="noopener noreferrer"
       role="link"
       aria-label="Kunjungi profil GitHub Muhammad Ikhsan">
       <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub
    </a>`;

  // Tambahkan sosial media lain
  list_sosial_media.forEach((sm) => {
    const textColor = getContrastColor(sm.color) === "black" ? "black" : "white";

    console.log(sm, textColor);
    
    document.getElementById("socialMedia").innerHTML += `
      <a href="${sm.link}"
         class="btn col-auto shadow"
         target="_blank"
         rel="noopener noreferrer"
         role="link"
         btn-color="${sm.color}"
         aria-label="Kunjungi profil ${sm.sosial_media} Muhammad Ikhsan"
         style="background-color: ${sm.color}; color: ${textColor};">
         <i class="fa-brands fa-${sm.sosial_media.toLowerCase()}" aria-hidden="true"></i>
         ${sm.sosial_media}
      </a>
    `;
  });

  end_loading.social_media = true;
  showProfil();
}