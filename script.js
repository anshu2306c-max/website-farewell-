// === CONFIG — EDIT THESE FIELDS ===
const EVENT_DATE = new Date('December 10, 2025 11:30:00 GMT+0530'); // IST
const EVENT_TIME_TEXT = '11:30 AM – 3:30 PM';
const VENUE_NAME = 'School Assembly Area <Your Campus>';

// GALLERY OPTION A: Native grid with hover-zoom (no captions)
// Paste public image FILE IDs here to enable (each file must be shared as Anyone with link -> Viewer).
// Example ID looks like: 1AbCdEfgHIJKLmNoP123...
const DRIVE_FILE_IDS = [
  // "YOUR_FILE_ID_1", "YOUR_FILE_ID_2", ...
];

// === INITIAL TEXT ===
document.querySelector('#venueText').innerHTML = VENUE_NAME;
document.querySelector('#timeText').textContent = EVENT_TIME_TEXT;
document.querySelector('#year').textContent = new Date().getFullYear();
const dateOpts = {weekday:'short', year:'numeric', month:'short', day:'numeric'};
document.querySelector('#dateText').textContent = EVENT_DATE.toLocaleDateString(undefined, dateOpts);

// Theme toggle (persist)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('farewell-theme');
if(savedTheme === 'light'){ root.classList.add('light'); }
themeToggle.addEventListener('click',()=>{
  root.classList.toggle('light');
  localStorage.setItem('farewell-theme', root.classList.contains('light') ? 'light' : 'dark');
});

// === COUNTDOWN + RUNWAY (kept) ===
const LAUNCH_DATE = new Date(EVENT_DATE.getFullYear(), EVENT_DATE.getMonth()-1, 1); // 1 month before
function tick(){
  const now = new Date();
  const diff = EVENT_DATE - now;

  if(diff <= 0){
    document.getElementById('countdown').innerHTML =
      '<div class="timebox"><div class="num">🎉</div><div class="lab">It\'s today!</div></div>';
    const fill = document.getElementById('runwayFill'); if(fill) fill.style.width = '100%';
    const plane = document.getElementById('runwayPlane'); if(plane) plane.style.left = '100%';
    const pct = document.getElementById('runwayPct'); if(pct) pct.textContent = '100%';
    return;
  }

  const s = Math.floor(diff/1000);
  const d = Math.floor(s/86400);
  const h = Math.floor((s%86400)/3600);
  const m = Math.floor((s%3600)/60);
  const sec = s%60;
  document.getElementById('d').textContent = d;
  document.getElementById('h').textContent = h;
  document.getElementById('m').textContent = m;
  document.getElementById('s').textContent = String(sec).padStart(2,'0');

  // Runway progress
  const total = Math.max(1, EVENT_DATE - LAUNCH_DATE);
  const gone = Math.max(0, Math.min(total, now - LAUNCH_DATE));
  const percent = Math.max(0, Math.min(100, Math.round((gone/total)*100)));
  const fill = document.getElementById('runwayFill'); if(fill) fill.style.width = percent + '%';
  const plane = document.getElementById('runwayPlane'); if(plane) plane.style.left = percent + '%';
  const pct = document.getElementById('runwayPct'); if(pct) pct.textContent = percent + '%';
}
tick();
setInterval(tick, 1000);

// === GALLERY: Native hover-zoom grid from Drive file IDs (optional)
(function(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  if(DRIVE_FILE_IDS.length === 0){ grid.hidden = true; return; }
  const toSrc = id => `https://drive.google.com/uc?export=view&id=${id}`;
  DRIVE_FILE_IDS.forEach(id=>{
    const img = new Image();
    img.loading = 'lazy';
    img.src = toSrc(id);
    img.alt = 'Gallery';
    grid.appendChild(img);
  });
  grid.hidden = false;
})();

// === Crew Manifest — Farewell Titles (hover tooltip)
const TITLES = [
  {name:"Adhiraj Singh", title:"🔥 The Clever Rebel", desc:"🚀Intelligent and fearless, Adhiraj breaks norms and builds new paths with style."},
  {name:"Aditya", title:"🤪 Mr. Bean", desc:"😆 Always full of life, Aditya brings smiles wherever he goes — a true mood maker!"},
  {name:"Aditya Tripathi", title:"🎓 The Scholarly Rebel", desc:"🧠 Bold in thought and rich in ideas, Aditya stands out as a thinker who dares to dream differently"},
  {name:"Adrija Majumder", title:"💃 The Dancing Queen", desc:"🎶 Her rhythm speaks louder than words — Adrija is the heartbeat of every stage she steps on."},
  {name:"Alex Mangastabam", title:"🇰🇷 Korean Athlete", desc:"💪 With unstoppable energy and dedication, Alex inspires everyone to chase their passions fearlessly."},
  {name:"Arnab Sinha", title:"☯️ Tranquil Mind", desc:"🌿 Calm, wise, and grounded — Arnab’s peaceful nature inspires balance in all."},
  {name:"Ayushmaan Datta", title:"💻 Code Commander", desc:"⚙️ Master of logic and creativity, Ayushman codes his way to innovation and success."},
  {name:"CH Sankar Mahadev", title:"🛠️ Jack of All Trades", desc:"🌈 Versatile and confident, Sankar proves that talent truly knows no limits."},
  {name:"Deepika", title:"🦋 Social Butterfly", desc:"💖 With charm and kindness, Deepika connects hearts and spreads positivity everywhere."},
  {name:"Dolly Kumari", title:"🌸 Graceful Achiever", desc:"🌼 Elegant in attitude, strong in effort — Dolly achieves success with pure grace."},
  {name:"Jitesh Pal", title:"🧠 Tech Wizard", desc:"⚙️ Always innovating, Jitesh turns technology into magic with his brilliance."},
  {name:"Kaushik Kumar Mallick", title:"😎 Comrade Cool", desc:"🧊 Cool, confident, and caring — Kaushik brings chill vibes and strong bonds everywhere."},
  {name:"Laya Botta", title:"🔥 Focused Flame", desc:"🎯 Determined and disciplined, Laya burns bright with the fire of ambition.."},
  {name:"P. L. N. Bharat Chandra", title:"🎤 Iron Orator", desc:"🔥 His voice carries power, his words inspire — Bharat is born to lead and influence."},
  {name:"Pamula Lakshmi Prasanna", title:"🎭 Versatile Virtuoso", desc:"🌟 A blend of talent and passion, Lakshmi shines bright in every role she takes."},
  {name:"Parvatam Moukthika", title:"🗣️ Eloquence Maestro", desc:"✨ Her words flow like poetry — Moutkthika’s eloquence leaves a mark on every heart."},
  {name:"Pragati Singh", title:"💃 The Glamorous Diva", desc:"💫 Stylish, confident, and strong — Pragati shines wherever she goes.."},
  {name:"Prayagraj Dakua", title:"Gifted Athlete ⚽", desc:"Energetic and determined — always giving his 100% on and off the field."},
  {name:"Priyani Tyagi", title:"Sincere & Smart Girl 📚", desc:"Focused, intelligent, and disciplined — she always leads by example."},
  {name:"Priyanshi Pandey", title:"Bubbly Performer 🌸", desc:"Her laughter is contagious and her spirit unmatchable — she brings joy everywhere."},
  {name:"R. Vishal", title:"Future Tech Genius 💻", desc:"A bright mind with a creative spark — destined to innovate and inspire."},
  {name:"Ratikanta Swain", title:"Silent Smart Achiever 🎯", desc:"Calm, focused, and dedicated — he lets his achievements speak for him."},
  {name:"Saina Saimon", title:"Soft-Spoken Star 🌷", desc:"Her gentle nature and kind heart make her truly special."},
  {name:"Sanjana Sahu", title:"Elegant Go-Getter 🌟", desc:"Confident, ambitious, and unstoppable — she achieves everything with grace."},
  {name:"Sarvoch Udeck", title:"Intelligent Sportophile 🏅", desc:"A perfect blend of brains and brawn — intelligent, athletic, and admired by all."},
  {name:"Satya Narayan Barat", title:"Warm-Hearted Buddy 🤝", desc:"Friendly, humble, and always supportive — everyone’s favorite companion."},
  {name:"Sayesha Pasrija", title:"Bold & Beautiful Performer 🌺", desc:"Charismatic and fearless — she leaves a sparkle wherever she goes."},
  {name:"Shobhit Singh", title:"Diligent Gentleman 🧠", desc:"Responsible, wise, and reliable — the true definition of hard work and integrity."},
  {name:"Sumeet Kumar", title:"Dribbler & Performer ⚡", desc:"Energetic and talented — he brings enthusiasm to every game and every moment."},
  {name:"V. Nithish Kumar", title:"Daring Conversationalist 🎤", desc:"Confident and expressive — his words always leave an impact."},
  {name:"V. Vaishnavi", title:"Dancing Queen 💃", desc:"Graceful, lively, and full of rhythm — a true queen of dance and joy."},
  {name:"Yashvi Grewal", title:"Miss Ravishing Beauty 🌼", desc:"Poised, elegant, and kind-hearted — beauty with brains and a golden soul."},
  {name:"Sonakshi", title:"Sweetheart 💗", desc:"Sweet, caring, and full of love — she makes every moment brighter with her presence."}
];

(function renderTitles(){
  const grid = document.getElementById('titlesGrid');
  TITLES.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'title-card';
    card.innerHTML = `
      <div class="t">${item.title}</div>
      <div class="tip">
        <div class="name">${item.name}</div>
        <div class="desc">${item.desc}</div>
      </div>
    `;
    grid.appendChild(card);
  });
})();

// === Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
})();
