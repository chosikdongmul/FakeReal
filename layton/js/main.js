// ═══════════════════════════════════════
//  오들오들 교수와 이상한 마을 — main.js
// ═══════════════════════════════════════

// ── 게임 상태 ──────────────────────────
const STATE = {
  currentScreen: 'title',
  currentLocation: null,
  currentPuzzle: null,
  selectedChoice: null,
  hintsLeft: 3,
  solved: new Set(),
  locations: {},   // id → status 오버라이드
};

// 저장/불러오기
function saveState() {
  localStorage.setItem('layton_save', JSON.stringify({
    solved: [...STATE.solved],
    hintsLeft: STATE.hintsLeft,
    locations: STATE.locations,
  }));
}
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('layton_save') || '{}');
    if (s.solved)    STATE.solved = new Set(s.solved);
    if (s.hintsLeft !== undefined) STATE.hintsLeft = s.hintsLeft;
    if (s.locations) STATE.locations = s.locations;
  } catch(e) {}
}

// ── 화면 전환 ──────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  STATE.currentScreen = id;

  const bottomNav = document.getElementById('bottom-nav');
  bottomNav.classList.toggle('visible', id === 'map');

  const hudHintBtn = document.getElementById('hud-hint-btn');
  hudHintBtn.style.display = id === 'puzzle' ? '' : 'none';
}

function goToMap() {
  renderMap();
  showScreen('map');
}

function goToScene(locationId) {
  const loc = locationId
    ? GAME_DATA.locations.find(l => l.id === locationId)
    : STATE.currentLocation;
  if (!loc) return;
  STATE.currentLocation = loc;

  // 이미지
  const img = document.getElementById('scene-img');
  if (loc.image) { img.src = loc.image; img.style.display = ''; }
  else img.style.display = 'none';

  document.getElementById('scene-location-tag').textContent = loc.name;

  // 대화 렌더
  const area = document.getElementById('scene-dialogue-area');
  area.innerHTML = '';
  loc.intro.forEach((line, i) => {
    const char = GAME_DATA.characters[line.char] || GAME_DATA.characters.npc;
    const isRight = line.char === 'luke';
    const el = document.createElement('div');
    el.className = 'dialogue-line fade-up' + (isRight ? ' right' : '');
    el.style.animationDelay = (i * 0.12) + 's';
    el.style.opacity = '0';
    el.innerHTML = `
      <div class="dialogue-avatar">${char.emoji}</div>
      <div class="dialogue-bubble">
        <div class="dialogue-speaker" style="color:${char.color}">${char.name}</div>
        ${esc(line.text)}
      </div>`;
    area.appendChild(el);
  });

  // 이미 풀었으면 버튼 텍스트 변경
  const btn = document.getElementById('scene-puzzle-btn');
  const isSolved = STATE.solved.has(loc.puzzleId);
  btn.textContent = isSolved ? '✓ 해결된 사건' : '수수께끼 풀기 →';
  btn.disabled = isSolved;
  btn.style.opacity = isSolved ? '0.5' : '';

  showScreen('scene');
}

function goToPuzzle() {
  const loc = STATE.currentLocation;
  if (!loc) return;
  const puzzle = GAME_DATA.puzzles[loc.puzzleId];
  if (!puzzle) return;
  STATE.currentPuzzle = puzzle;
  STATE.selectedChoice = null;

  document.getElementById('puzzle-number').textContent = `수수께끼 #${puzzle.number}`;
  document.getElementById('puzzle-title').textContent = puzzle.title;
  document.getElementById('puzzle-desc').textContent = puzzle.description;
  document.getElementById('puzzle-hint-left').textContent = STATE.hintsLeft;
  document.getElementById('hud-hints').textContent = STATE.hintsLeft;

  // 입력 렌더
  const area = document.getElementById('puzzle-input-area');
  area.innerHTML = '';

  if (puzzle.type === 'choice') {
    puzzle.choices.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'puzzle-choice fade-up';
      el.style.animationDelay = (i * 0.07) + 's';
      el.style.opacity = '0';
      el.innerHTML = `
        <div class="puzzle-choice-num">${i + 1}</div>
        <div class="puzzle-choice-text">${esc(c)}</div>`;
      el.addEventListener('click', () => selectChoice(i, el));
      area.appendChild(el);
    });
  } else {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'puzzle-text-input';
    input.placeholder = '답을 입력하세요...';
    input.addEventListener('input', () => {
      STATE.selectedChoice = input.value.trim();
    });
    area.appendChild(input);
    setTimeout(() => input.focus(), 300);
  }

  document.getElementById('puzzle-submit-btn').disabled = false;
  showScreen('puzzle');
}

function goToScene_back() {
  showScreen('scene');
}

// ── 퍼즐 로직 ──────────────────────────
function selectChoice(idx, el) {
  document.querySelectorAll('.puzzle-choice').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  STATE.selectedChoice = idx;
}

function submitPuzzle() {
  const puzzle = STATE.currentPuzzle;
  if (!puzzle) return;
  if (STATE.selectedChoice === null || STATE.selectedChoice === '') return;

  let correct = false;
  if (puzzle.type === 'choice') {
    correct = STATE.selectedChoice === puzzle.answer;
  } else {
    correct = STATE.selectedChoice.trim() === String(puzzle.answer).trim();
  }

  // 정답/오답 피드백
  if (puzzle.type === 'choice') {
    const choices = document.querySelectorAll('.puzzle-choice');
    choices[puzzle.answer].classList.add('correct');
    if (!correct && STATE.selectedChoice !== null) {
      choices[STATE.selectedChoice].classList.add('wrong');
    }
  }

  document.getElementById('puzzle-submit-btn').disabled = true;

  setTimeout(() => showResult(correct, puzzle), 600);
}

function showResult(correct, puzzle) {
  const overlay = document.getElementById('result-overlay');
  const icon = document.getElementById('result-icon');
  const label = document.getElementById('result-label');
  const msg = document.getElementById('result-message');
  const btn = document.getElementById('result-next-btn');

  if (correct) {
    icon.textContent = '🎩';
    label.className = 'result-label correct';
    label.textContent = '정답입니다!';
    msg.textContent = puzzle.correctMsg;
    btn.textContent = '계속하기';

    // 풀이 기록
    STATE.solved.add(puzzle.id);
    // 다음 장소 잠금 해제
    if (puzzle.unlocks) {
      STATE.locations[puzzle.unlocks] = 'unlocked';
    }
    updateHUD();
    saveState();
  } else {
    icon.textContent = '❌';
    label.className = 'result-label wrong';
    label.textContent = '틀렸습니다';
    msg.textContent = puzzle.wrongMsg;
    btn.textContent = '다시 시도';
  }

  overlay.classList.add('show');
}

function closeResult() {
  const overlay = document.getElementById('result-overlay');
  overlay.classList.remove('show');

  // 정답이었으면 맵으로, 오답이면 퍼즐 유지
  if (STATE.solved.has(STATE.currentPuzzle?.id)) {
    goToMap();
  } else {
    // 선택 초기화
    document.querySelectorAll('.puzzle-choice').forEach(c => {
      c.classList.remove('selected', 'correct', 'wrong');
    });
    STATE.selectedChoice = null;
    document.getElementById('puzzle-submit-btn').disabled = false;
  }
}

// ── 힌트 ───────────────────────────────
function showHint() {
  if (STATE.currentScreen !== 'puzzle') return;
  const puzzle = STATE.currentPuzzle;
  if (!puzzle) return;

  const hintIdx = Math.max(0, 2 - STATE.hintsLeft);
  const hintText = puzzle.hints?.[hintIdx] || '더 이상 힌트가 없습니다.';

  if (STATE.hintsLeft > 0) {
    STATE.hintsLeft--;
    document.getElementById('puzzle-hint-left').textContent = STATE.hintsLeft;
    document.getElementById('hud-hints').textContent = STATE.hintsLeft;
    saveState();
  }

  document.getElementById('hint-text').textContent = hintText;
  document.getElementById('hint-overlay').classList.add('show');
}

function closeHint() {
  document.getElementById('hint-overlay').classList.remove('show');
}

// ── 맵 렌더링 ──────────────────────────
function renderMap() {
  const area = document.getElementById('map-area');
  area.innerHTML = '';

  const locs = GAME_DATA.locations.map(l => ({
    ...l,
    status: STATE.locations[l.id] ?? l.status,
    solved: STATE.solved.has(l.puzzleId),
  }));

  // 연결선 (순서대로 연결)
  for (let i = 0; i < locs.length - 1; i++) {
    const a = locs[i], b = locs[i + 1];
    drawPath(area, a, b);
  }

  // 노드
  locs.forEach(loc => {
    const node = document.createElement('div');
    node.className = 'map-node' + (loc.solved ? ' solved' : '') + (loc.status === 'locked' ? ' locked' : '');
    node.style.left = loc.x + '%';
    node.style.top  = loc.y + '%';
    node.style.transform = 'translate(-50%, -50%)';

    node.innerHTML = `
      <div class="map-node-circle ${loc.status !== 'locked' && !loc.solved ? 'pulse' : ''}">${loc.emoji}</div>
      <div class="map-node-label">${loc.name}</div>`;

    if (loc.status !== 'locked') {
      node.addEventListener('click', () => goToScene(loc.id));
    }
    area.appendChild(node);
  });

  updateHUD();
  const total = GAME_DATA.locations.length;
  const solved = STATE.solved.size;
  document.getElementById('map-progress').textContent = `${solved} / ${total} 해결`;
  document.getElementById('map-total-count').textContent = total;
}

function drawPath(area, a, b) {
  // 두 노드 사이 직선 (CSS transform으로)
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  const path = document.createElement('div');
  path.className = 'map-path';
  path.style.left   = a.x + '%';
  path.style.top    = a.y + '%';
  path.style.width  = len + '%';
  path.style.transform = `translateY(-50%) rotate(${angle}deg)`;
  area.appendChild(path);
}

// ── 탭 전환 ────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.bottom-nav-tab').forEach(t => t.classList.remove('active'));
  event.currentTarget.classList.add('active');
  // 탭별 화면은 추후 구현
  if (tab === 'map') goToMap();
}

// ── HUD 업데이트 ───────────────────────
function updateHUD() {
  document.getElementById('hud-solved').textContent = STATE.solved.size;
  document.getElementById('hud-total').textContent = GAME_DATA.locations.length;
  document.getElementById('hud-hints').textContent = STATE.hintsLeft;
}

// ── 유틸 ───────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// ── 시작 ───────────────────────────────
function init() {
  loadState();
  updateHUD();
  document.getElementById('hud-hint-btn').style.display = 'none';
  showScreen('title');
}

document.addEventListener('DOMContentLoaded', init);
