(function () {
"use strict";
const D = window.DATA;
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const app = $("#app");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- state ---------- */
const KEY = "unfazed-v1";
const defaults = { xp: 0, streak: 0, best: 0, lastDay: null, days: [], saved: [], custom: [], quiz: { right: 0, total: 0 }, arena: 0, resets: 0, today: { date: null, done: {} }, cards: {} };
let S;
try { S = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = Object.assign({}, defaults); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} renderTop(); };

const pad = n => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const yesterdayKey = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };
if (S.lastDay && S.lastDay !== dayKey() && S.lastDay !== yesterdayKey()) { S.streak = 0; }

const LEVELS = ["Rookie", "Calm Operator", "Smooth Talker", "Magnetic", "Unfazed", "Natural Leader", "Effortless", "Legend"];
const level = () => Math.floor(S.xp / 150) + 1;
const levelName = () => LEVELS[Math.min(level() - 1, LEVELS.length - 1)];
const levelPct = () => (S.xp % 150) / 150 * 100;

let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800); }
function addXP(n, msg) { const before = level(); S.xp += n; save(); if (level() > before) toast("Level up — " + levelName()); else if (msg !== false) toast("+" + n + " XP" + (msg ? " · " + msg : "")); }
function markActive() {
  const today = dayKey();
  if (S.lastDay === today) return;
  S.streak = S.lastDay === yesterdayKey() ? S.streak + 1 : 1;
  S.best = Math.max(S.best, S.streak);
  S.lastDay = today;
  if (!S.days.includes(today)) S.days.push(today);
  save();
}

function renderTop() {
  $("#topstats").innerHTML = '<span class="pill">🔥 <b>' + S.streak + '</b></span><span class="pill">Lv <b>' + level() + '</b></span>';
}

/* ---------- utils ---------- */
function seeded(seed) { let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return function () { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(arr, rnd = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const catName = id => (D.CATS.find(c => c.id === id) || {}).name || id;
const locName = id => { const l = D.LOCATIONS.find(x => x.id === id); if (l) return l.name; return ({ tests: "Tests & Banter", logistics: "Logistics", chemistry: "Chemistry", frame: "Frame" })[id] || id; };
const isSaved = text => S.saved.some(x => x.text === text);
function toggleSave(text, src) {
  const i = S.saved.findIndex(x => x.text === text);
  if (i >= 0) { S.saved.splice(i, 1); toast("Removed from Vault"); } else { S.saved.unshift({ text, src, at: Date.now() }); toast("Saved to Vault"); }
  save();
}
const bookmarkSVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
function saveBtn(text, src) { return '<button class="save' + (isSaved(text) ? " on" : "") + '" data-save="' + esc(text) + '" data-src="' + esc(src) + '" aria-label="Save">' + bookmarkSVG + '</button>'; }
function bindSaves(root) {
  $$("[data-save]", root).forEach(b => b.addEventListener("click", e => { e.stopPropagation(); toggleSave(b.dataset.save, b.dataset.src); b.classList.toggle("on", isSaved(b.dataset.save)); }));
}

/* ---------- components ---------- */
function flashHTML(u, idx) {
  return '<div class="card flash" data-flash="' + idx + '">' +
    '<div class="row"><span class="tag">' + esc(D.CATS.find(c => c.id === u.c).short) + '</span><span class="spacer"></span>' + saveBtn(u.good, "Flirt & Lead · " + catName(u.c)) + '</div>' +
    '<div class="sit" style="margin-top:10px">' + esc(u.s) + '</div>' +
    '<div class="bad"><span class="lbl">Try-hard</span>' + esc(u.bad) + '</div>' +
    '<div class="reveal"' + (u._open ? "" : ' hidden') + '><div class="good"><span class="lbl">High-value</span>' + esc(u.good) + '</div><p class="why"><b>Why it works · </b>' + esc(u.w) + '</p></div>' +
    (u._open ? "" : '<div class="reveal-hint">Tap to reveal the high-value move →</div>') +
    '</div>';
}
function bindFlash(root, onReveal) {
  $$("[data-flash]", root).forEach(card => card.addEventListener("click", () => {
    const r = $(".reveal", card); if (!r.hidden) return;
    r.hidden = false; const h = $(".reveal-hint", card); if (h) h.remove();
    if (onReveal) onReveal(card.dataset.flash);
  }));
}

function quizHTML(q, id) {
  const opts = shuffle(q.a);
  return '<div class="card quiz" data-quiz="' + id + '">' +
    '<span class="tag ghost">' + esc(locName(q.loc)) + '</span>' +
    '<div class="q-s">' + esc(q.s) + '</div><div class="opts">' +
    opts.map(o => '<button class="opt" data-ok="' + o.ok + '">' + esc(o.t) + '</button>').join("") +
    '</div><div class="fb-slot"></div></div>';
}
function bindQuiz(el, q, onAnswer) {
  const box = $(".opts", el);
  $$(".opt", el).forEach(b => b.addEventListener("click", () => {
    if (box.classList.contains("locked")) return;
    box.classList.add("locked");
    const ok = b.dataset.ok === "1";
    $$(".opt", el).forEach(o => { if (o.dataset.ok === "1") o.classList.add("right"); else if (o === b) o.classList.add("wrong"); else o.classList.add("faded"); });
    $(".fb-slot", el).innerHTML = '<div class="fb ' + (ok ? "ok" : "no") + ' fade"><b>' + (ok ? "Smooth. That's the move." : "Not quite — here's the high-value play.") + '</b>' + esc(q.w) + '</div>';
    S.quiz.total++; if (ok) S.quiz.right++; save();
    if (onAnswer) onAnswer(ok);
  }));
}

/* ---------- TODAY ---------- */
function todayPlan() {
  const rnd = seeded("unfazed-" + dayKey());
  return {
    frame: shuffle(D.FRAMES, rnd)[0],
    cards: shuffle(D.UPGRADES, rnd).slice(0, 2),
    quizzes: shuffle(D.QUIZ, rnd).slice(0, 3),
    prompt: shuffle(D.PROMPTS, rnd)[0],
    mission: shuffle(D.MISSIONS, rnd)[0]
  };
}
const STEP_XP = { frame: 10, card0: 10, card1: 10, q0: 15, q1: 15, q2: 15, prompt: 20, mission: 25 };
function stepDone(k) {
  if (S.today.date !== dayKey()) S.today = { date: dayKey(), done: {} };
  if (S.today.done[k]) return;
  S.today.done[k] = true;
  addXP(STEP_XP[k]);
  const all = Object.keys(STEP_XP).every(x => S.today.done[x]);
  if (all) { markActive(); addXP(50, "Workout complete"); }
  save();
  return all;
}
function updateMarks() {
  $$("[data-keys]").forEach(el => { if (el.dataset.keys.split(",").every(k => S.today.done[k])) { el.classList.add("done"); const n = $(".step-n", el); if (n) n.textContent = "✓"; } });
}
function renderToday() {
  if (S.today.date !== dayKey()) { S.today = { date: dayKey(), done: {} }; save(); }
  const P = todayPlan(); const done = S.today.done;
  const total = Object.keys(STEP_XP).length; const n = Object.keys(STEP_XP).filter(k => done[k]).length;
  const dateStr = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  const st = (k, num, title, xp) => '<div class="step-h"><div class="step-n">' + (done[k] ? "✓" : num) + '</div><div class="step-t">' + title + '</div><div class="step-xp">+' + xp + ' XP</div></div>';
  app.innerHTML =
    '<section class="hero fade"><div class="eyebrow">' + dateStr + ' · Daily workout</div><h1>Calm. Playful. <em>Decisive.</em></h1>' +
    '<p class="lede">Five minutes to sharpen your frame, your banter and your lead. Same guy in every room.</p>' +
    '<div class="stats"><div class="stat"><div class="n">' + S.streak + '</div><div class="l">Day streak</div></div><div class="stat"><div class="n">' + S.xp + '</div><div class="l">Total XP</div></div><div class="stat"><div class="n">' + level() + '</div><div class="l">' + esc(levelName()) + '</div></div></div>' +
    '<div style="margin-top:14px" class="row small muted"><span>Today ' + n + '/' + total + '</span><span class="spacer"></span><span>Next level ' + Math.round(levelPct()) + '%</span></div><div class="bar" style="margin-top:6px"><i style="width:' + (n / total * 100) + '%"></i></div></section>' +
    (n === total ? '<div class="card complete fade"><div class="big">🥃</div><h2>Workout complete.</h2><p class="muted" style="margin-top:6px">Streak: ' + S.streak + ' days. Now go use it in the real world — the mission is the only rep that really counts.</p></div>' : "") +
    '<div class="steps section">' +
    // frame
    '<div class="card step' + (done.frame ? " done" : "") + '" data-keys="frame">' + st("frame", 1, "Mindset · Frame check", 10) +
      '<h3>' + esc(P.frame.t) + '</h3><p class="muted" style="margin-top:8px">' + esc(P.frame.b) + '</p><div class="frame-q">' + esc(P.frame.q) + '</div>' +
      (done.frame ? "" : '<button class="btn sm" style="margin-top:14px" data-step="frame">I own this frame</button>') + '</div>' +
    // cards
    '<div class="step' + (done.card0 && done.card1 ? " done" : "") + '" data-keys="card0,card1"><div class="card" style="padding-bottom:6px">' + st("cards", 2, "Try-hard vs. High-value", 20) + '<p class="small muted" style="margin:-4px 0 12px">Read the try-hard line. Say your upgrade out loud. Then tap to reveal.</p></div>' +
      P.cards.map((c, i) => flashHTML(Object.assign({}, c, { _open: done["card" + i] }), i)).join("") + '</div>' +
    // quizzes
    '<div class="step' + (done.q0 && done.q1 && done.q2 ? " done" : "") + '" data-keys="q0,q1,q2"><div class="card" style="padding-bottom:6px">' + st("q", 3, "Real-world scenarios", 45) + '<p class="small muted" style="margin:-4px 0 12px">Pick the move a calm, high-value man makes.</p></div>' +
      P.quizzes.map((q, i) => done["q" + i] ? '<div class="card"><span class="tag ghost">' + esc(locName(q.loc)) + '</span><div class="q-s">' + esc(q.s) + '</div><div class="fb ok"><b>Answered ✓</b>' + esc(q.w) + '</div></div>' : quizHTML(q, i)).join("") + '</div>' +
    // prompt
    '<div class="card step' + (done.prompt ? " done" : "") + '">' + st("prompt", 4, "Rapid-fire delivery · 30s", 20) +
      '<span class="tag">' + esc(P.prompt.tag) + '</span><div class="q-s">' + esc(P.prompt.scene) + '</div><p class="small muted">Hint: ' + esc(P.prompt.hint) + '</p>' +
      '<div id="mini-timer" class="row" style="margin-top:14px">' + (done.prompt ? '<span class="tag">Delivered ✓</span>' : '<button class="btn sm" id="mini-go">Start 30-second timer</button><a class="btn sm ghost" href="#practice">Full arena</a>') + '</div></div>' +
    // mission
    '<div class="card step' + (done.mission ? " done" : "") + '">' + st("mission", 5, "Real-world micro-mission", 25) +
      '<p class="quote">' + esc(P.mission) + '</p>' +
      (done.mission ? '<p class="small muted" style="margin-top:10px">Mission accepted. Report back to yourself tonight.</p>' : '<button class="btn sm" style="margin-top:14px" data-step="mission">Mission accepted</button>') + '</div>' +
    '</div>';

  $$("[data-step]").forEach(b => b.addEventListener("click", () => { stepDone(b.dataset.step); renderToday(); }));
  bindSaves(app);
  bindFlash(app, i => { if (stepDone("card" + i)) setTimeout(renderToday, 1400); else updateMarks(); });
  $$("[data-quiz]").forEach(el => { const i = +el.dataset.quiz; bindQuiz(el, P.quizzes[i], () => { if (stepDone("q" + i)) setTimeout(renderToday, 2600); else updateMarks(); }); });
  const go = $("#mini-go");
  if (go) go.addEventListener("click", () => {
    let t = 30; const box = $("#mini-timer");
    const tick = () => { box.innerHTML = '<span class="pill">🎙️ Speak now · <b>' + t + 's</b></span><button class="btn sm ghost" id="mini-stop">Done</button>'; $("#mini-stop").onclick = finish; };
    const finish = () => { clearInterval(timer); stepDone("prompt"); renderToday(); };
    tick(); const timer = setInterval(() => { t--; if (t <= 0) finish(); else if (location.hash.replace("#", "") === "today" || location.hash === "") tick(); else clearInterval(timer); }, 1000);
  });
}

/* ---------- LOCATIONS ---------- */
function renderLocations(id) {
  const L = D.LOCATIONS.find(l => l.id === id);
  if (!L) {
    app.innerHTML = '<section class="hero fade"><div class="eyebrow">Playbooks</div><h1>Every room is <em>your room.</em></h1><p class="lede">Five real-world settings. Frame, timing, openers, banter pivots, green vs. red lights and clean exits — all calibrated, never pushy.</p></section>' +
      '<div class="grid two">' + D.LOCATIONS.map(l => '<a class="card loc-card fade" href="#locations/' + l.id + '"><div class="loc-ico">' + l.icon + '</div><div><h3>' + esc(l.name) + '</h3><p class="small muted">' + esc(l.tag) + '</p></div><span class="chev">›</span></a>').join("") + '</div>' +
      '<div class="card section"><div class="eyebrow">Universal rule</div><p style="margin-top:8px">Open naturally → banter → read the lights → <b>plan or clean exit</b>. Green lights get a lead. Red lights get a warm goodbye. Both are wins — your time stays valuable.</p></div>';
    return;
  }
  const quizzes = D.QUIZ.filter(q => q.loc === L.id);
  app.innerHTML = '<a class="back" href="#locations">‹ All locations</a>' +
    '<section class="hero fade"><div class="eyebrow">' + L.icon + ' Playbook</div><h1>' + esc(L.name) + '</h1><p class="lede">' + esc(L.tag) + '</p></section>' +
    '<div class="card"><div class="eyebrow">Key frame</div><p class="quote" style="margin-top:8px">' + esc(L.frame) + '</p></div>' +
    '<div class="card"><div class="eyebrow">Timing & calibration</div><ul class="list" style="margin-top:6px">' + L.timing.map(t => '<li>' + esc(t) + '</li>').join("") + '</ul></div>' +
    '<div class="card"><div class="eyebrow">Openers</div>' + L.openers.map(o => '<div class="opener"><div style="flex:1"><span class="tag ghost">' + esc(o.type) + '</span><p>' + esc(o.line) + '</p></div>' + saveBtn(o.line, L.name + " · " + o.type + " opener") + '</div>').join("") + '</div>' +
    '<div class="card"><div class="eyebrow">Banter pivots</div><ul class="list" style="margin-top:6px">' + L.pivots.map(t => '<li>' + esc(t) + '</li>').join("") + '</ul></div>' +
    '<div class="grid two" style="margin-top:12px"><div class="card" style="margin:0"><div class="eyebrow" style="color:var(--green)">Green lights</div><ul class="list g" style="margin-top:6px">' + L.green.map(t => '<li>' + esc(t) + '</li>').join("") + '</ul></div>' +
    '<div class="card" style="margin:0"><div class="eyebrow" style="color:var(--red)">Red lights</div><ul class="list r" style="margin-top:6px">' + L.red.map(t => '<li>' + esc(t) + '</li>').join("") + '</ul></div></div>' +
    '<div class="card"><div class="eyebrow">Clean exits & closes</div><ul class="list" style="margin-top:6px">' + L.exits.map(t => '<li>' + esc(t) + '</li>').join("") + '</ul></div>' +
    (quizzes.length ? '<div class="section"><div class="section-h"><h2>Test yourself</h2><span class="tag">' + quizzes.length + ' scenarios</span></div>' + quizzes.map((q, i) => quizHTML(q, i)).join("") + '</div>' : "");
  bindSaves(app);
  $$("[data-quiz]").forEach(el => bindQuiz(el, quizzes[+el.dataset.quiz], ok => { if (ok) addXP(5); }));
}

/* ---------- FLIRT & LEAD ---------- */
let flirtMode = "library", libCat = "all", libQ = "", simLoc = "all", simQueue = [], simIdx = 0, simScore = 0;
function renderFlirt() {
  app.innerHTML = '<section class="hero fade"><div class="eyebrow">Flirt & Lead</div><h1>Upgrade every <em>line.</em></h1><p class="lede">' + D.UPGRADES.length + ' try-hard vs. high-value upgrades and ' + D.QUIZ.length + ' scenario drills with instant coaching.</p></section>' +
    '<div class="seg"><button data-mode="library" class="' + (flirtMode === "library" ? "on" : "") + '">Library</button><button data-mode="sim" class="' + (flirtMode === "sim" ? "on" : "") + '">Simulator</button></div><div id="flirt-body"></div>';
  $$("[data-mode]").forEach(b => b.addEventListener("click", () => { flirtMode = b.dataset.mode; renderFlirt(); }));
  if (flirtMode === "library") renderLibrary(); else renderSim();
}
function renderLibrary() {
  const body = $("#flirt-body");
  body.innerHTML = '<input class="search" id="lib-q" type="search" placeholder="Search lines, situations, tests…" value="' + esc(libQ) + '">' +
    '<div class="chips"><button class="chip' + (libCat === "all" ? " on" : "") + '" data-cat="all">All</button>' + D.CATS.map(c => '<button class="chip' + (libCat === c.id ? " on" : "") + '" data-cat="' + c.id + '">' + esc(c.name) + '</button>').join("") + '</div><div id="lib-list" style="margin-top:12px"></div>';
  const list = () => {
    const q = libQ.trim().toLowerCase();
    const items = D.UPGRADES.filter(u => (libCat === "all" || u.c === libCat) && (!q || (u.s + " " + u.bad + " " + u.good + " " + u.w).toLowerCase().includes(q)));
    $("#lib-list").innerHTML = items.length ? '<p class="small muted" style="margin-bottom:10px">' + items.length + ' upgrades · tap a card to reveal</p>' + items.map((u, i) => flashHTML(u, D.UPGRADES.indexOf(u))).join("") : '<div class="empty">No matches. Try "test", "number", "kiss"…</div>';
    bindSaves($("#lib-list"));
    bindFlash($("#lib-list"), i => { S.cards[i] = 1; save(); });
  };
  $("#lib-q").addEventListener("input", e => { libQ = e.target.value; list(); });
  $$("[data-cat]").forEach(b => b.addEventListener("click", () => { libCat = b.dataset.cat; $$("[data-cat]").forEach(x => x.classList.toggle("on", x === b)); list(); }));
  list();
}
const SIM_FILTERS = [["all", "All"], ["gym", "Gym"], ["grocery", "Grocery & Shops"], ["street", "Street"], ["cafe", "Cafés"], ["bar", "Bars"], ["tests", "Tests & Banter"], ["logistics", "Logistics"], ["chemistry", "Chemistry"], ["frame", "Frame"]];
function newSim() { simQueue = shuffle(D.QUIZ.filter(q => simLoc === "all" || q.loc === simLoc)); simIdx = 0; simScore = 0; }
function renderSim() {
  if (!simQueue.length) newSim();
  const body = $("#flirt-body");
  const chips = '<div class="chips">' + SIM_FILTERS.map(f => '<button class="chip' + (simLoc === f[0] ? " on" : "") + '" data-loc="' + f[0] + '">' + f[1] + '</button>').join("") + '</div>';
  if (simIdx >= simQueue.length) {
    const pct = Math.round(simScore / simQueue.length * 100);
    body.innerHTML = chips + '<div class="card complete section fade"><div class="big">' + (pct >= 80 ? "🥂" : "🎯") + '</div><h2>' + simScore + ' / ' + simQueue.length + '</h2><p class="muted" style="margin-top:6px">' + (pct >= 80 ? "Smooth operator. Your instincts are calibrated." : "Good reps. Read the coaching, then run it again.") + '</p><button class="btn" style="margin-top:16px" id="sim-again">Run it again</button></div>';
    $("#sim-again").onclick = () => { newSim(); renderSim(); };
  } else {
    const q = simQueue[simIdx];
    body.innerHTML = chips + '<div class="row small muted" style="margin:14px 0 6px"><span>Scenario ' + (simIdx + 1) + ' of ' + simQueue.length + '</span><span class="spacer"></span><span>Score ' + simScore + '</span></div><div class="bar" style="margin-bottom:12px"><i style="width:' + (simIdx / simQueue.length * 100) + '%"></i></div>' + quizHTML(q, 0) + '<div id="sim-next"></div>';
    bindQuiz($("[data-quiz]", body), q, ok => {
      if (ok) { simScore++; addXP(5, false); }
      $("#sim-next").innerHTML = '<button class="btn block" style="margin-top:12px" id="sim-n">' + (simIdx + 1 >= simQueue.length ? "See results" : "Next scenario →") + '</button>';
      $("#sim-n").onclick = () => { simIdx++; renderSim(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    });
  }
  $$("[data-loc]", body).forEach(b => b.addEventListener("click", () => { simLoc = b.dataset.loc; newSim(); renderSim(); }));
}

/* ---------- PRACTICE ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let arena = { phase: "idle", prompt: null, t: 0, timer: null, rec: null, text: "", interim: "", startedAt: 0, useMic: false };
function stopArena() { clearInterval(arena.timer); arena.timer = null; if (arena.rec) { try { arena.rec.onend = null; arena.rec.stop(); } catch (e) {} arena.rec = null; } }
function ringHTML(num, sub, frac) { const C = 2 * Math.PI * 76; return '<div class="ring"><svg viewBox="0 0 170 170"><circle class="t" cx="85" cy="85" r="76"/><circle class="p" cx="85" cy="85" r="76" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - frac)) + '"/></svg><div class="num">' + num + '</div><div class="sub">' + sub + '</div></div>'; }
function analyze(text, secs) {
  const lower = " " + text.toLowerCase().replace(/[^\w\s']/g, " ").replace(/\s+/g, " ") + " ";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const found = {}; let fillers = 0;
  D.FILLERS.forEach(f => { const m = lower.split(" " + f + " ").length - 1; if (m) { found[f] = m; fillers += m; } });
  const wpm = secs > 0 ? Math.round(words / secs * 60) : 0;
  return { words, wpm, fillers, found };
}
function highlight(text) { let h = esc(text); D.FILLERS.forEach(f => { h = h.replace(new RegExp("\\b(" + f.replace(/ /g, "\\s") + ")\\b", "gi"), "<mark>$1</mark>"); }); return h; }
function renderPractice() {
  const P = arena.prompt;
  if (arena.phase === "idle" || !P) {
    app.innerHTML = '<section class="hero fade"><div class="eyebrow">Practice</div><h1>Opener & Banter <em>Arena.</em></h1><p class="lede">A random real-world moment. Five seconds to lock in your calm frame. Then say your line out loud — slow, warm, decisive.</p></section>' +
      '<div class="card arena"><div class="eyebrow">' + D.PROMPTS.length + ' scenarios · gym · shops · street · cafés · bars · tests · logistics</div><p class="scene">Ready when you are.</p><p class="muted small">Tip: stand up, shoulders down, smile slightly before you speak.</p>' +
      (SR ? '<label class="toggle" style="margin-top:16px"><input type="checkbox" id="mic"' + (arena.useMic ? " checked" : "") + '> Live transcript & filler-word feedback (mic)</label>' : '<p class="small muted" style="margin-top:14px">Live transcript isn\'t supported in this browser — timer & self-check still work. (Chrome / Safari support it.)</p>') +
      '<div style="margin-top:18px"><button class="btn" id="arena-go">Draw a scenario</button></div></div>' +
      '<div class="card"><div class="eyebrow">Arena stats</div><p style="margin-top:6px">' + S.arena + ' rounds delivered. Each round +20 XP.</p></div>';
    const mic = $("#mic"); if (mic) mic.onchange = () => { arena.useMic = mic.checked; };
    $("#arena-go").onclick = startArena;
    return;
  }
  if (arena.phase === "frame") {
    app.innerHTML = '<div class="card arena fade"><span class="tag">' + esc(P.tag) + '</span><p class="scene">' + esc(P.scene) + '</p><p class="muted small">Hint: ' + esc(P.hint) + '</p>' + ringHTML(arena.t, "Lock frame", arena.t / 5) + '<p class="muted">Breathe. Slow eyes. You have options.</p><button class="btn ghost sm" style="margin-top:14px" id="skip">Skip to speaking</button></div>';
    $("#skip").onclick = () => { arena.t = 0; nextPhase(); };
    return;
  }
  if (arena.phase === "speak") {
    app.innerHTML = '<div class="card arena"><span class="tag">' + esc(P.tag) + '</span><p class="scene">' + esc(P.scene) + '</p>' + ringHTML(arena.t, "Speak", arena.t / P.sec) +
      (arena.rec ? '<div class="transcript" id="tr">' + (highlight(arena.text) + ' <span class="muted">' + esc(arena.interim) + '</span>') + '</div>' : '<p class="muted">Say it out loud. Slow. Smile.</p>') +
      '<button class="btn" style="margin-top:16px" id="done">I delivered it</button></div>';
    $("#done").onclick = () => { arena.t = 0; nextPhase(); };
    return;
  }
  if (arena.phase === "review") {
    const secs = Math.max(1, (arena.endedAt - arena.startedAt) / 1000);
    const a = analyze(arena.text, secs);
    const pace = !a.words ? "" : a.wpm < 110 ? "Slow & grounded — great for presence." : a.wpm <= 160 ? "Relaxed conversational pace. Good." : "A bit fast — slow down 20%. Hurry reads as nervous.";
    app.innerHTML = '<section class="hero fade"><div class="eyebrow">Round review</div><h2>' + esc(P.scene) + '</h2></section>' +
      (arena.text ? '<div class="card"><div class="eyebrow">What you said</div><div class="transcript">' + highlight(arena.text) + '</div>' +
        '<div class="stats"><div class="stat"><div class="n">' + a.words + '</div><div class="l">Words</div></div><div class="stat"><div class="n">' + a.wpm + '</div><div class="l">WPM</div></div><div class="stat"><div class="n">' + a.fillers + '</div><div class="l">Fillers</div></div></div>' +
        '<p class="small muted" style="margin-top:12px">' + pace + (a.fillers ? " Fillers: " + Object.entries(a.found).map(([k, v]) => '"' + k + '" ×' + v).join(", ") + ". Replace them with a calm pause." : " Zero fillers — clean delivery.") + (a.found.sorry ? " Never apologize for approaching." : "") + '</p></div>' : "") +
      '<div class="card"><div class="eyebrow">Self-check</div>' +
      ["Calm, slow voice — no rushing", "No apology, no asking permission", "Playful or warm — not try-hard", "Didn't compliment looks alone", "Ended with a lead (plan, question or clean exit)"].map((c, i) => '<label class="check"><input type="checkbox" data-c="' + i + '"><span>' + c + '</span></label>').join("") +
      '<div class="divider"></div><p class="small muted">Model answer direction: ' + esc(P.hint) + '</p>' +
      '<div class="row" style="margin-top:16px"><button class="btn" id="again">Next scenario</button><button class="btn ghost" id="redo">Retry this one</button></div></div>';
    $("#again").onclick = startArena;
    $("#redo").onclick = () => startArena(P);
  }
}
function startArena(p) {
  stopArena();
  arena.prompt = (p && p.scene) ? p : D.PROMPTS[Math.floor(Math.random() * D.PROMPTS.length)];
  arena.phase = "frame"; arena.t = 5; arena.text = ""; arena.interim = "";
  renderPractice();
  arena.timer = setInterval(() => { arena.t--; if (arena.t <= 0) nextPhase(); else updateRing(5); }, 1000);
}
function updateRing(total) {
  const ring = $(".ring"); if (!ring) return;
  const C = 2 * Math.PI * 76; $(".num", ring).textContent = arena.t; $(".p", ring).setAttribute("stroke-dashoffset", C * (1 - arena.t / total));
}
function nextPhase() {
  clearInterval(arena.timer);
  if (arena.phase === "frame") {
    arena.phase = "speak"; arena.t = arena.prompt.sec; arena.startedAt = Date.now();
    if (SR && arena.useMic) {
      try {
        const r = new SR(); r.lang = "en-US"; r.continuous = true; r.interimResults = true;
        r.onresult = e => { let fin = "", int = ""; for (let i = 0; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript + " "; else int += e.results[i][0].transcript; } arena.text = fin.trim(); arena.interim = int; const tr = $("#tr"); if (tr) tr.innerHTML = highlight(arena.text) + ' <span class="muted">' + esc(int) + '</span>'; };
        r.onerror = () => {}; r.onend = () => { if (arena.phase === "speak" && arena.rec) { try { r.start(); } catch (e) {} } };
        r.start(); arena.rec = r;
      } catch (e) { arena.rec = null; }
    }
    renderPractice();
    arena.timer = setInterval(() => { arena.t--; if (arena.t <= 0) nextPhase(); else updateRing(arena.prompt.sec); }, 1000);
  } else if (arena.phase === "speak") {
    arena.endedAt = Date.now();
    if (arena.interim) arena.text = (arena.text + " " + arena.interim).trim();
    stopArena(); arena.phase = "review"; S.arena++; save(); addXP(20, "Round delivered");
    renderPractice();
  }
}

/* ---------- VAULT ---------- */
let resetIdx = -1, resetTimer = null, resetT = 0;
function renderVault() {
  const acc = S.quiz.total ? Math.round(S.quiz.right / S.quiz.total * 100) : 0;
  app.innerHTML = '<section class="hero fade"><div class="eyebrow">Vault</div><h1>Your <em>arsenal.</em></h1><p class="lede">Pre-game reset, saved lines, your personal cheat sheet and progress.</p></section>' +
    '<div class="card" id="reset"><div class="row"><div><div class="eyebrow">60 seconds</div><h3 style="margin-top:4px">Pre-Game Mindset Reset</h3></div><span class="spacer"></span><button class="btn sm" id="reset-go">' + (resetIdx >= 0 ? "Restart" : "Start") + '</button></div><div style="margin-top:10px">' +
      D.RESET.map((r, i) => '<div class="reset-step' + (i === resetIdx ? " active" : i < resetIdx ? " past" : "") + '"><div class="n">' + (i + 1) + '</div><div><b>' + esc(r.t) + '</b>' + (i === resetIdx ? ' <span class="tag" style="margin-left:6px">' + resetT + 's</span>' : "") + '<p class="small muted">' + esc(r.d) + '</p></div></div>').join("") + '</div></div>' +
    '<div class="section"><div class="section-h"><h2>Saved lines</h2><span class="tag">' + S.saved.length + '</span></div>' +
      (S.saved.length ? '<div class="card">' + S.saved.map((s, i) => '<div class="opener"><div style="flex:1"><span class="tag ghost">' + esc(s.src || "Saved") + '</span><p>' + esc(s.text) + '</p></div><button class="del" data-unsave="' + i + '" aria-label="Remove">×</button></div>').join("") + '</div>' : '<div class="empty">Tap the bookmark on any opener or upgrade to save it here.</div>') + '</div>' +
    '<div class="section"><div class="section-h"><h2>Cheat sheet</h2><span class="tag">' + S.custom.length + '</span></div><div class="card"><textarea id="cust" rows="2" placeholder="Add your own opener, tease or close…"></textarea><div class="row" style="margin-top:10px"><select id="cust-tag" style="padding:10px 12px;border-radius:12px;background:var(--bg2);border:1px solid var(--line)"><option>Opener</option><option>Tease</option><option>Test reply</option><option>Close</option><option>Text</option><option>Mindset</option></select><span class="spacer"></span><button class="btn sm" id="cust-add">Add line</button></div>' +
      (S.custom.length ? '<div class="divider"></div>' + S.custom.map((c, i) => '<div class="opener"><div style="flex:1"><span class="tag ghost">' + esc(c.tag) + '</span><p>' + esc(c.text) + '</p></div><button class="del" data-cdel="' + i + '" aria-label="Delete">×</button></div>').join("") : "") + '</div></div>' +
    '<div class="section"><div class="section-h"><h2>Progress</h2></div><div class="stats" style="margin-top:0"><div class="stat"><div class="n">' + S.streak + '</div><div class="l">Streak</div></div><div class="stat"><div class="n">' + S.best + '</div><div class="l">Best streak</div></div><div class="stat"><div class="n">' + S.days.length + '</div><div class="l">Workouts</div></div><div class="stat"><div class="n">' + S.xp + '</div><div class="l">XP · Lv ' + level() + '</div></div><div class="stat"><div class="n">' + acc + '%</div><div class="l">Quiz accuracy</div></div><div class="stat"><div class="n">' + S.arena + '</div><div class="l">Arena rounds</div></div></div>' +
      '<div class="card" style="margin-top:12px"><div class="row small"><b>' + esc(levelName()) + '</b><span class="spacer"></span><span class="muted">' + (S.xp % 150) + ' / 150 XP</span></div><div class="bar" style="margin-top:8px"><i style="width:' + levelPct() + '%"></i></div></div></div>' +
    '<div class="section card"><div class="eyebrow">Add to Home Screen</div><ol class="ol"><li><b>iPhone:</b> open this page in Safari → tap Share → <b>Add to Home Screen</b>.</li><li><b>Android:</b> Chrome menu ⋮ → <b>Install app</b>.</li><li>Progress saves on this device only (localStorage).</li></ol><div class="divider"></div><button class="btn ghost sm" id="wipe">Reset all progress</button></div>';
  $("#reset-go").onclick = runReset;
  $$("[data-unsave]").forEach(b => b.onclick = () => { S.saved.splice(+b.dataset.unsave, 1); save(); renderVault(); });
  $$("[data-cdel]").forEach(b => b.onclick = () => { S.custom.splice(+b.dataset.cdel, 1); save(); renderVault(); });
  $("#cust-add").onclick = () => { const v = $("#cust").value.trim(); if (!v) return; S.custom.unshift({ text: v, tag: $("#cust-tag").value, at: Date.now() }); save(); toast("Added to cheat sheet"); renderVault(); };
  $("#wipe").onclick = () => { if (confirm("Reset all progress, saved lines and cheat sheet?")) { S = JSON.parse(JSON.stringify(defaults)); save(); renderVault(); } };
}
function runReset() {
  clearInterval(resetTimer); resetIdx = 0; resetT = D.RESET[0].s; renderVault();
  resetTimer = setInterval(() => {
    if (route().tab !== "vault") { clearInterval(resetTimer); resetIdx = -1; return; }
    resetT--;
    if (resetT <= 0) { resetIdx++; if (resetIdx >= D.RESET.length) { clearInterval(resetTimer); resetIdx = -1; S.resets++; save(); addXP(10, "Frame reset"); renderVault(); return; } resetT = D.RESET[resetIdx].s; }
    renderVault();
  }, 1000);
}

/* ---------- router ---------- */
function route() { const h = (location.hash || "#today").slice(1).split("/"); return { tab: h[0] || "today", sub: h[1] }; }
function render() {
  const r = route();
  if (r.tab !== "practice") { stopArena(); if (arena.phase !== "review") arena.phase = "idle"; }
  $$("[data-tab]").forEach(a => a.classList.toggle("on", a.dataset.tab === r.tab));
  if (r.tab === "locations") renderLocations(r.sub);
  else if (r.tab === "flirt") renderFlirt();
  else if (r.tab === "practice") renderPractice();
  else if (r.tab === "vault") renderVault();
  else renderToday();
}
window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
renderTop(); render();
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
