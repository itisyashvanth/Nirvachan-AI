
// STATE
let currentPersona = null;
let completedMissions = new Set();
let chatHistory = [];

// INIT
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  animateVoterCount();
});

function createParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*4}s;opacity:${Math.random()*0.5}`;
    c.appendChild(p);
  }
}

function animateVoterCount() {
  const el = document.getElementById('voter-count');
  if (!el) return;
  let v = 0; const target = 97.8;
  const t = setInterval(() => {
    v += 1.5;
    if (v >= target) { v = target; clearInterval(t); }
    el.textContent = v.toFixed(1);
  }, 30);
}

function animateCounters() {
  document.querySelectorAll('.infog-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let v = 0;
    const step = target / 60;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { v = target; clearInterval(t); }
      el.textContent = Math.floor(v);
    }, 25);
  });
}

// PERSONA
function selectPersona(persona) {
  currentPersona = persona;
  document.querySelectorAll('.persona-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('persona-' + persona);
  if (card) card.classList.add('selected');
  setTimeout(() => {
    const landingEl = document.getElementById('landing'); if(landingEl) landingEl.style.display = 'none';
    document.getElementById('main-app').classList.remove('hidden');
    applyPersona(persona);
    switchTab('home');
    setTimeout(animateCounters, 500);
  }, 400);
}

function applyPersona(p) {
  const data = PERSONAS[p];
  if (!data) return;
  const greet = document.getElementById('hero-greeting');
  if (greet) greet.textContent = data.greeting;
  const badge = document.getElementById('persona-badge');
  if (badge) badge.classList.remove('hidden');
  const icon = document.getElementById('persona-badge-icon');
  if (icon) icon.textContent = data.icon + ' ';
  const txt = document.getElementById('persona-badge-text');
  if (txt) txt.textContent = data.label;
  const sub = document.getElementById('journey-subtitle');
  if (sub) {
    const subs = {
      'first-time': 'Your complete path from eligibility to casting your first vote.',
      'returning': 'Stay updated, verify your details, and vote confidently.',
      'nri': 'Understand your voting rights as an overseas Indian citizen.',
      'student': 'Explore the architecture of Indian democracy from scratch.'
    };
    sub.textContent = subs[p] || '';
  }
  renderSuggestedQuestions(p);
  addAIMessage(getWelcomeMessage(p));
}

function getWelcomeMessage(p) {
  const msgs = {
    'first-time': "🗳️ Welcome! I'm Nirvachan, your election guide. As a first-time voter, I'll walk you through everything — from checking eligibility to pressing that EVM button on polling day. What would you like to know first?",
    'returning': "🇮🇳 Welcome back! I'm Nirvachan. Let's make sure your voter details are current and you're ready for the next election. Ask me anything!",
    'nri': "✈️ Namaste! I'm Nirvachan. Voting as an NRI has specific rules — I'll explain Form 6A, constituency registration, and what to expect when you travel back to vote.",
    'student': "📚 Hello! I'm Nirvachan. Let's explore India's democratic architecture — EVMs, FPTP, ECI powers, delimitation, and more. What fascinates you most?"
  };
  return msgs[p] || "👋 Hello! I'm Nirvachan, your AI guide to Indian elections. Ask me anything!";
}

function resetPersona() {
  currentPersona = null;
  chatHistory = [];
  completedMissions.clear();
  document.getElementById('main-app').classList.add('hidden');
  const landing = document.getElementById('landing');
  if (landing) landing.style.display = '';
  document.getElementById('chat-messages').innerHTML = '';
}

function goHome() { switchTab('home'); }

// TABS
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const sec = document.getElementById('section-' + tab);
  if (sec) sec.classList.add('active');
  const btn = document.getElementById('tab-' + tab);
  if (btn) btn.classList.add('active');
  if (tab === 'journey') renderMissions();
  if (tab === 'timeline') loadTimeline('lok-sabha');
  if (tab === 'guide') renderGuideCards();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// MISSIONS
function renderMissions() {
  const p = currentPersona || 'first-time';
  const list = MISSIONS[p] || [];
  const container = document.getElementById('missions-container');
  if (!container) return;
  const unlocked = completedMissions.size;
  container.innerHTML = list.map((m, i) => {
    let status = 'locked';
    if (completedMissions.has(m.id)) status = 'completed';
    else if (i === 0 || completedMissions.has(list[i-1]?.id)) status = 'active';
    const badge = status === 'completed' ? '✓ Done' : status === 'active' ? 'Start →' : '🔒 Locked';
    return `<div class="mission-item ${status}" onclick="${status !== 'locked' ? `completeMission('${m.id}', '${p}', ${i})` : ''}" id="mission-${m.id}">
      <div class="mission-num">${status === 'completed' ? '✓' : i+1}</div>
      <div class="mission-body">
        <div class="mission-title">${m.icon} ${m.title}</div>
        <div class="mission-desc">${m.desc}</div>
      </div>
      <div class="mission-badge">${badge}</div>
    </div>`;
  }).join('');
  const pct = list.length ? (completedMissions.size / list.length * 100) : 0;
  const fill = document.getElementById('journey-progress-fill');
  if (fill) fill.style.width = pct + '%';
}

function completeMission(id, persona, idx) {
  completedMissions.add(id);
  renderMissions();
  openMission(id);
}

// MISSION MODAL
function openMission(id) {
  const data = MISSION_DETAILS[id];
  if (!data) return;
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;
  content.innerHTML = `
    <div class="modal-header-icon">${data.icon}</div>
    <div class="modal-title">${data.title}</div>
    <div class="modal-subtitle">${data.subtitle}</div>
    <div class="modal-steps">
      ${data.steps.map((s,i) => `<div class="step-item">
        <div class="step-num">${i+1}</div>
        <div class="step-body">
          <div class="step-title">${s.title}</div>
          <div class="step-detail">${s.detail}</div>
        </div>
      </div>`).join('')}
    </div>
    <a href="https://voters.eci.gov.in" target="_blank" class="link-btn">Visit ECI Portal →</a>`;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeMissionModal(e) {
  if (!e || e.target === document.getElementById('modal-overlay') || !e.target) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// TIMELINE
function loadTimeline(type) {
  ['lok-sabha','vidhan-sabha','presidential'].forEach(t => {
    const btn = document.getElementById('tl-' + t.replace('lok-sabha','lok').replace('vidhan-sabha','vidhan').replace('presidential','pres'));
    if (btn) btn.classList.toggle('active', t === type);
  });
  const data = TIMELINES[type] || [];
  const wrap = document.getElementById('timeline-wrapper');
  if (!wrap) return;
  let lastPhase = '';
  wrap.innerHTML = data.map(item => {
    let header = '';
    if (item.phase !== lastPhase) { header = `<div class="tl-phase-header">${item.phase}</div>`; lastPhase = item.phase; }
    return `${header}<div class="tl-item">
      <div class="tl-dot ${item.status}"></div>
      <div class="tl-label">${item.tag}</div>
      <div class="tl-title">${item.title}</div>
      <div class="tl-desc">${item.desc}</div>
      ${item.status==='active'?'<span class="tl-tag">⚡ In Progress</span>':item.status==='done'?'<span class="tl-tag" style="background:rgba(19,136,8,0.15);color:#138808">✓ Complete</span>':''}
    </div>`;
  }).join('');
}

// GUIDE
function renderGuideCards() {
  const grid = document.getElementById('guide-grid');
  if (!grid) return;
  grid.classList.remove('hidden');
  const panel = document.getElementById('guide-panel');
  if (panel) panel.classList.add('hidden');
  grid.innerHTML = GUIDES.map(g => `
    <div class="guide-card" onclick="openGuidePanel('${g.id}')" id="gcard-${g.id}">
      <div class="guide-card-icon">${g.icon}</div>
      <div class="guide-card-tag">${g.tag}</div>
      <div class="guide-card-title">${g.title}</div>
      <div class="guide-card-preview">${g.preview}</div>
      <div class="guide-card-read">Read Full Explainer →</div>
    </div>`).join('');
}

function openGuidePanel(id) {
  const data = GUIDE_CONTENT[id];
  if (!data) return;
  document.getElementById('guide-grid').classList.add('hidden');
  const panel = document.getElementById('guide-panel');
  const content = document.getElementById('panel-content');
  panel.classList.remove('hidden');
  content.innerHTML = `<h2>${data.icon} ${data.title}</h2>${data.body}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeGuidePanel() { renderGuideCards(); }

// CHAT
function renderSuggestedQuestions(p) {
  const chips = {
    'first-time': ['How do I register to vote?','What ID do I need on polling day?','How does an EVM work?','What is NOTA?'],
    'returning': ['How do I update my address?','Where is my polling booth?','What is Model Code of Conduct?','How are votes counted?'],
    'nri': ['Can NRIs vote from abroad?','What is Form 6A?','Do I need to travel to India to vote?','What documents do I need?'],
    'student': ['How does FPTP work?','What are ECI\'s powers?','Why are elections held in phases?','What is delimitation?']
  };
  const container = document.getElementById('sq-chips');
  if (!container) return;
  const qs = chips[p] || chips['first-time'];
  container.innerHTML = qs.map(q => `<button class="sq-chip" onclick="quickQuestion('${q}')">${q}</button>`).join('');
}

function quickQuestion(q) {
  document.getElementById('chat-input').value = q;
  sendMessage();
}

function addUserMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.innerHTML = `<div class="msg-bubble">${escHtml(text)}</div><div class="msg-time">${getTime()}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addAIMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.innerHTML = `<div class="msg-bubble">${text.replace(/\n/g,'<br>')}</div><div class="msg-time">Nirvachan · ${getTime()}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-bubble typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addUserMessage(text);
  const sq = document.getElementById('suggested-questions');
  if (sq) sq.style.display = 'none';
  showTyping();
  setTimeout(() => {
    hideTyping();
    const resp = getAIResponse(text);
    addAIMessage(resp);
  }, 800 + Math.random() * 600);
}

function handleChatKeydown(e) {
  if (e.key === 'Enter') sendMessage();
}

function clearChat() {
  document.getElementById('chat-messages').innerHTML = '';
  const sq = document.getElementById('suggested-questions');
  if (sq) sq.style.display = 'flex';
  if (currentPersona) addAIMessage(getWelcomeMessage(currentPersona));
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
}

function escHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// LANDING PAGE FUNCTIONS
function toggleLearn(id){
  const el = document.getElementById('lce-' + id);
  if (!el) { console.warn('toggleLearn: element not found: lce-' + id); return; }
  const cardTop = el.previousElementSibling;
  const btn = cardTop ? cardTop.querySelector('.lcc-learn') : null;
  const isHidden = el.classList.contains('hidden');
  // Close all first
  document.querySelectorAll('.lcc-expand').forEach(e => e.classList.add('hidden'));
  document.querySelectorAll('.lcc-learn').forEach(b => { b.textContent = 'Learn More ▾'; });
  if (isHidden) {
    el.classList.remove('hidden');
    if (btn) btn.textContent = 'Close ▴';
    setTimeout(() => el.scrollIntoView({behavior:'smooth', block:'nearest'}), 50);
  }
}

function beginJourney(persona){
  currentPersona = persona;
  const landing = document.getElementById('landing');
  const app = document.getElementById('main-app');
  if (landing) landing.style.display = 'none';
  if (app) app.classList.remove('hidden');
  applyPersona(persona);
  switchTab('home');
  window.scrollTo({top:0, behavior:'smooth'});
}

function goHome(){
  document.getElementById('main-app').classList.add('hidden');
  document.getElementById('landing').style.display='';
  window.scrollTo({top:0,behavior:'smooth'});
}
