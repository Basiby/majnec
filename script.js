// MAJNEC site interactions (v3: Discord ticket flow)
(function(){
  const $ = (sel) => document.querySelector(sel);

  // ---- CONFIG ----
  const CONFIG = {
    DISCORD_INVITE: "https://discord.gg/tYxpcnngrb",
    SERVER_ADDRESS: "XXX"
  };

  // Linky
  const contact = $("#contactLink"); if (contact) contact.href = CONFIG.DISCORD_INVITE;
  const formInline = $("#formLinkInline"); if (formInline) formInline.href = CONFIG.DISCORD_INVITE;

  // Rok do pätičky
  $("#year").textContent = new Date().getFullYear();

  // Adresa zobrazená ako XXX (privátna)
  const addrEls = ["#serverAddress"].map($);
  addrEls.forEach(el => { if (el) el.textContent = CONFIG.SERVER_ADDRESS; });

  // Dark/Light toggle s perzistenciou
  const root = document.documentElement;
  const saved = localStorage.getItem("majnec-theme");
  if(saved === "dark" || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    root.setAttribute("data-theme","dark");
  }else{
    root.setAttribute("data-theme","light");
  }
  const btn = $("#themeToggle");
  const updateIcon = () => {
    const isLight = root.getAttribute("data-theme")==="light";
    btn.querySelector(".icon-sun").style.display = isLight ? "none":"inline";
    btn.querySelector(".icon-moon").style.display = isLight ? "inline":"none";
    btn.setAttribute("aria-pressed", (!isLight).toString());
    btn.title = isLight ? "Prepnúť do tmavého režimu" : "Prepnúť do svetlého režimu";
  };
  updateIcon();
  btn.addEventListener("click", ()=>{
    const cur = root.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("majnec-theme", next);
    updateIcon();
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",(e)=>{
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:"smooth", block:"start"});
        history.pushState(null,"","#"+id);
      }
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .15});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
})();