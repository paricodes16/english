/* Tense Trainer — vanilla JavaScript, no dependencies. Needs data.js. */
'use strict';

// ---- engine start ----------------------------------------------------------
// Turns an answer into a comparable form: lower case, contractions expanded,
// no end punctuation, no leading subject pronoun ("she's lived" -> "has lived").
function normalize(raw) {
  let s = String(raw).toLowerCase().replace(/[’‘`]/g, "'").trim();
  s = s.replace(/^["“”]+/, '').replace(/[.!?,;:"“”]+$/, '');
  s = s
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/n't\b/g, ' not')
    .replace(/'ll\b/g, ' will')
    .replace(/'ve\b/g, ' have')
    .replace(/'re\b/g, ' are')
    .replace(/'m\b/g, ' am')
    .replace(/'d\b/g, ' had')
    .replace(/'s not\b/g, ' is not')
    .replace(/'s (\w+)/g, (m, w) => (/ing$/.test(w) ? ' is ' : ' has ') + w);
  s = s.replace(/\s+/g, ' ').trim();
  s = s.replace(/^(i|you|he|she|it|we|they) /, '');
  return s;
}

function checkFill(input, answers) {
  const n = normalize(input);
  return n !== '' && answers.some(a => normalize(a) === n);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function filterQuestions(all, o) {
  return all.filter(q =>
    (o.type === 'mixed' || q.type === o.type) &&
    (o.tense === 'all' || q.tense === o.tense) &&
    (o.level === 0 || q.level === o.level));
}

function pickQuestions(all, o) {
  return shuffle(filterQuestions(all, o).slice()).slice(0, o.count);
}
// ---- engine end ------------------------------------------------------------

if (typeof document !== 'undefined') {
  const TENSES = window.TENSES, QUESTIONS = window.QUESTIONS;
  const TENSE_NAME = Object.fromEntries(TENSES.map(t => [t.id, t.name]));
  const TYPE_LABEL = { fill: 'Fill in the blank', choice: 'Choose the answer', error: 'Spot the error' };
  const LEVEL_NAME = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };

  const settings = { type: 'mixed', tense: 'all', level: 0, count: 10 };
  let session = null;   // { questions, index, score, results, answered, current }

  // ----- Saved progress -----
  const KEY = 'tense-trainer-progress-v1';
  let progress = loadProgress();
  function loadProgress() {
    try {
      const p = JSON.parse(localStorage.getItem(KEY));
      if (p && p.byTense) return p;
    } catch (e) { /* no saved data */ }
    return { byTense: {} };
  }
  function saveProgress() {
    try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) { /* storage unavailable */ }
  }
  function record(tense, ok) {
    const t = progress.byTense[tense] || (progress.byTense[tense] = { a: 0, c: 0 });
    t.a++;
    if (ok) t.c++;
    saveProgress();
  }

  // ----- Views -----
  const views = { home: $('viewHome'), quiz: $('viewQuiz'), results: $('viewResults'), guide: $('viewGuide') };
  function show(name) {
    Object.entries(views).forEach(([k, v]) => { v.hidden = k !== name; });
    $('tabPractice').setAttribute('aria-pressed', String(name !== 'guide'));
    $('tabGuide').setAttribute('aria-pressed', String(name === 'guide'));
    window.scrollTo(0, 0);
  }

  // ----- Setup screen -----
  function makeSeg(container, options, key) {
    options.forEach(o => {
      const b = el('button', '', o.label);
      b.type = 'button';
      b.addEventListener('click', () => { settings[key] = o.value; syncSetup(); });
      container.append(b);
    });
  }
  const TYPE_OPTS = [
    { value: 'mixed', label: 'Mixed' },
    { value: 'fill', label: 'Fill in the blank' },
    { value: 'choice', label: 'Choose the answer' },
    { value: 'error', label: 'Spot the error' }
  ];
  const LEVEL_OPTS = [
    { value: 0, label: 'All levels' },
    { value: 1, label: 'Easy' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'Hard' }
  ];
  const COUNT_OPTS = [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }];

  makeSeg($('segType'), TYPE_OPTS, 'type');
  makeSeg($('segLevel'), LEVEL_OPTS, 'level');
  makeSeg($('segCount'), COUNT_OPTS, 'count');

  const tenseSelect = $('tenseSelect');
  tenseSelect.append(new Option('All tenses', 'all'));
  TENSES.forEach(t => tenseSelect.append(new Option(t.name, t.id)));
  tenseSelect.addEventListener('change', () => { settings.tense = tenseSelect.value; syncSetup(); });

  function syncSetup() {
    const mark = (container, opts, key) =>
      [...container.children].forEach((b, i) => b.setAttribute('aria-pressed', String(opts[i].value === settings[key])));
    mark($('segType'), TYPE_OPTS, 'type');
    mark($('segLevel'), LEVEL_OPTS, 'level');
    mark($('segCount'), COUNT_OPTS, 'count');
    tenseSelect.value = settings.tense;

    const n = filterQuestions(QUESTIONS, settings).length;
    $('startBtn').disabled = n === 0;
    $('matchInfo').textContent = n === 0
      ? 'No questions match these settings. Try another level or type.'
      : `${n} question${n === 1 ? '' : 's'} match${n === 1 ? 'es' : ''}` +
        (n < settings.count ? `, so this session will have ${n}.` : '.');
  }

  // ----- Progress display -----
  function accuracy(t) { return t && t.a ? t.c / t.a : null; }

  function renderProgress() {
    const list = $('progressList');
    list.textContent = '';
    TENSES.forEach(t => {
      const s = progress.byTense[t.id];
      const acc = accuracy(s);
      const row = el('div', 'p-row');
      row.append(el('span', '', t.name));
      const bar = el('div', 'p-bar');
      const fill = el('div', 'p-fill' + (acc === null ? '' : acc >= 0.8 ? ' good' : acc < 0.5 ? ' low' : ''));
      fill.style.width = acc === null ? '0%' : Math.round(acc * 100) + '%';
      bar.append(fill);
      row.append(bar, el('span', 'p-num', acc === null ? 'Not tried' : `${Math.round(acc * 100)}% (${s.c}/${s.a})`));
      list.append(row);
    });
  }

  $('weakBtn').addEventListener('click', () => {
    let worst = null;
    TENSES.forEach(t => {
      const s = progress.byTense[t.id];
      if (s && s.a >= 3 && (worst === null || accuracy(s) < accuracy(progress.byTense[worst]))) worst = t.id;
    });
    if (!worst) {
      $('weakMsg').textContent = 'Answer at least 3 questions in a tense first, then I can tell which one needs most work.';
      return;
    }
    settings.tense = worst;
    syncSetup();
    $('weakMsg').textContent = `Your weakest tense so far is ${TENSE_NAME[worst]}. It is now selected above.`;
  });

  $('resetBtn').addEventListener('click', () => {
    if (!window.confirm('Delete all saved progress?')) return;
    progress = { byTense: {} };
    saveProgress();
    renderProgress();
    $('weakMsg').textContent = '';
  });

  // ----- Quiz -----
  function startSession(questions) {
    session = { questions, index: 0, score: 0, results: [], answered: false, current: null };
    show('quiz');
    showQuestion();
  }

  $('startBtn').addEventListener('click', () => {
    const qs = pickQuestions(QUESTIONS, settings);
    if (qs.length) startSession(qs);
  });

  $('quitBtn').addEventListener('click', () => { session = null; goHome(); });

  function goHome() {
    renderProgress();
    syncSetup();
    show('home');
  }

  function showQuestion() {
    const q = session.questions[session.index];
    session.answered = false;
    session.current = { q };
    $('qCount').textContent = `Question ${session.index + 1} of ${session.questions.length}`;
    $('qScore').textContent = `Score ${session.score}`;
    $('meterFill').style.width = (session.index / session.questions.length * 100) + '%';
    $('qType').textContent = TYPE_LABEL[q.type];
    $('qCard').dataset.qid = q.id;
    $('feedback').hidden = true;
    $('feedback').textContent = '';
    $('nextBtn').hidden = true;
    $('checkBtn').hidden = q.type !== 'fill';
    const body = $('qBody');
    body.textContent = '';
    if (q.type === 'fill') renderFill(q, body);
    else if (q.type === 'choice') renderChoice(q, body);
    else renderError(q, body);
  }

  function renderFill(q, body) {
    const [before, after] = q.text.split('___');
    const p = el('p', 'qtext');
    const input = el('input', 'blank');
    input.type = 'text';
    input.autocomplete = 'off';
    input.autocapitalize = 'none';
    input.spellcheck = false;
    input.setAttribute('aria-label', 'Your answer');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); submitFill(); }
    });
    p.append(before, input, after);
    body.append(p, el('p', 'instr', 'Type the correct form of the verb in brackets. Contractions are fine.'));
    session.current.input = input;
    setTimeout(() => input.focus(), 0);
  }

  function submitFill() {
    if (session.answered) return;
    const { q, input } = session.current;
    if (!input.value.trim()) { input.focus(); return; }
    const ok = checkFill(input.value, q.answers);
    input.disabled = true;
    input.classList.add(ok ? 'ok' : 'bad');
    finish(q, ok, input.value.trim());
  }
  $('checkBtn').addEventListener('click', submitFill);

  function renderChoice(q, body) {
    const [before, after] = q.text.split('___');
    const p = el('p', 'qtext');
    p.append(before, el('span', 'gap'), after);
    const opts = shuffle(q.options.map((t, i) => ({ t, ok: i === q.answer })));
    const wrap = el('div', 'options');
    opts.forEach((o, i) => {
      const b = el('button', 'opt');
      b.type = 'button';
      b.append(el('span', 'k', 'ABCD'[i]), document.createTextNode(o.t));
      b.addEventListener('click', () => pickOption(i));
      wrap.append(b);
    });
    body.append(p, wrap);
    session.current.opts = opts;
    session.current.optBtns = [...wrap.children];
  }

  function pickOption(i) {
    if (session.answered) return;
    const { q, opts, optBtns } = session.current;
    const ok = opts[i].ok;
    optBtns.forEach((b, k) => {
      b.disabled = true;
      if (opts[k].ok) b.classList.add('ok');
    });
    if (!ok) optBtns[i].classList.add('bad');
    finish(q, ok, opts[i].t);
  }

  function renderError(q, body) {
    body.append(el('p', 'instr', 'One part of this sentence has a mistake. Tap it.'));
    const wrap = el('div', 'chips');
    q.parts.forEach((part, i) => {
      const b = el('button', 'chip', part);
      b.type = 'button';
      b.addEventListener('click', () => pickChip(i));
      wrap.append(b);
    });
    body.append(wrap);
    session.current.chips = [...wrap.children];
  }

  function pickChip(i) {
    if (session.answered) return;
    const { q, chips } = session.current;
    const ok = i === q.wrong;
    chips.forEach((b, k) => {
      b.disabled = true;
      if (k === q.wrong) b.classList.add('ok');
    });
    if (!ok) chips[i].classList.add('bad');
    finish(q, ok, q.parts[i]);
  }

  function fullSentence(q, given, ok) {
    if (q.type === 'error') return q.correction;
    if (q.type === 'choice') return q.text.replace('___', q.options[q.answer]);
    const fillWith = ok ? given : q.answers[0];
    return q.text.replace(/___\s*\([^)]*\)/, fillWith).replace('___', fillWith);
  }

  function finish(q, ok, given) {
    session.answered = true;
    if (ok) session.score++;
    session.results.push({ q, ok, given });
    record(q.tense, ok);

    $('qScore').textContent = `Score ${session.score}`;
    $('meterFill').style.width = ((session.index + 1) / session.questions.length * 100) + '%';

    const fb = $('feedback');
    fb.className = 'feedback' + (ok ? '' : ' wrong');
    fb.textContent = '';
    fb.append(el('p', 'status', ok ? 'Correct!' : 'Not quite.'));

    if (!ok && q.type === 'fill') {
      fb.append(el('p', '', `Your answer: ${given}`));
      fb.append(el('p', '', `Correct answer: ${q.answers.join(' or ')}`));
    }
    const sentence = el('p');
    sentence.append(el('strong', '', q.type === 'error' ? 'Corrected sentence: ' : 'Full sentence: '),
      document.createTextNode(fullSentence(q, given, ok)));
    fb.append(sentence, el('p', '', q.explain), el('span', 'tense-chip', `Tense: ${TENSE_NAME[q.tense]}`));
    fb.hidden = false;

    $('checkBtn').hidden = true;
    const next = $('nextBtn');
    next.hidden = false;
    next.textContent = session.index + 1 < session.questions.length ? 'Next' : 'See results';
    next.focus();
  }

  function next() {
    if (!session || !session.answered) return;
    session.index++;
    if (session.index < session.questions.length) showQuestion();
    else showResults();
  }
  $('nextBtn').addEventListener('click', next);

  document.addEventListener('keydown', e => {
    if (views.quiz.hidden || !session) return;
    if (e.key === 'Enter' && session.answered && document.activeElement !== $('nextBtn')) {
      e.preventDefault();
      next();
    } else if (!session.answered && session.current.opts && /^[1-4]$/.test(e.key) && +e.key <= session.current.opts.length) {
      pickOption(+e.key - 1);
    }
  });

  // ----- Results -----
  function showResults() {
    const total = session.questions.length;
    const pct = Math.round(session.score / total * 100);
    $('resScore').textContent = `${session.score} / ${total}`;
    $('resMsg').textContent =
      pct >= 90 ? 'Excellent work!' :
      pct >= 70 ? 'Good job. Keep going.' :
      pct >= 50 ? 'Getting there. The tense guide can help with the ones you missed.' :
                  'Keep practising. Read the tense guide, then try again.';

    const by = {};
    session.results.forEach(r => {
      const b = by[r.q.tense] || (by[r.q.tense] = { c: 0, a: 0 });
      b.a++;
      if (r.ok) b.c++;
    });
    const bd = $('resBreakdown');
    bd.textContent = '';
    Object.entries(by).forEach(([id, b]) => {
      const row = el('div');
      row.append(el('span', '', TENSE_NAME[id]), el('span', '', `${b.c} / ${b.a}`));
      bd.append(row);
    });

    const wrong = session.results.filter(r => !r.ok);
    $('mistakesCard').hidden = wrong.length === 0;
    $('retryBtn').hidden = wrong.length === 0;
    const list = $('mistakes');
    list.textContent = '';
    wrong.forEach(r => {
      const m = el('div', 'mistake');
      m.append(el('p', 'm-type', `${TYPE_LABEL[r.q.type]}, ${TENSE_NAME[r.q.tense]}`));
      m.append(el('p', 'm-sentence', fullSentence(r.q, r.given, false)));
      m.append(el('p', 'yours', `You ${r.q.type === 'error' ? 'picked' : 'answered'}: ${r.given}`));
      m.append(el('p', '', r.q.explain));
      list.append(m);
    });

    $('meterFill').style.width = '100%';
    show('results');
  }

  $('againBtn').addEventListener('click', () => {
    const qs = pickQuestions(QUESTIONS, settings);
    if (qs.length) startSession(qs);
  });
  $('retryBtn').addEventListener('click', () => {
    const wrongQs = shuffle(session.results.filter(r => !r.ok).map(r => r.q));
    if (wrongQs.length) startSession(wrongQs);
  });
  $('homeBtn').addEventListener('click', () => { session = null; goHome(); });

  // ----- Guide -----
  function buildGuide() {
    const list = $('guideList');
    ['Present', 'Past', 'Future'].forEach(group => {
      list.append(el('p', 'g-group', group));
      TENSES.filter(t => t.group === group).forEach(t => {
        const d = el('details', 'tense');
        d.append(el('summary', '', t.name));
        const body = el('div', 't-body');

        body.append(el('h4', '', 'How to form it'));
        const form = el('div', 't-form');
        t.form.forEach(line => form.append(el('div', '', line)));
        body.append(form);

        body.append(el('h4', '', 'When to use it'));
        const ul = el('ul');
        t.uses.forEach(u => ul.append(el('li', '', u)));
        body.append(ul);

        body.append(el('h4', '', 'Words that often go with it'));
        const sig = el('div', 'signals');
        t.signals.forEach(s => sig.append(el('span', '', s)));
        body.append(sig);

        body.append(el('h4', '', 'Examples'));
        const ex = el('ul');
        t.examples.forEach(s => ex.append(el('li', 't-ex', s)));
        body.append(ex);

        if (t.tip) body.append(el('p', 't-tip', t.tip));

        const btn = el('button', 'btn', `Practise ${t.name.toLowerCase()}`);
        btn.type = 'button';
        btn.addEventListener('click', () => {
          settings.tense = t.id;
          goHome();
        });
        body.append(btn);

        d.append(body);
        list.append(d);
      });
    });
  }

  // ----- Navigation and start -----
  $('tabPractice').addEventListener('click', () => {
    if (session && !views.quiz.hidden) return;
    if (!views.results.hidden) return;
    goHome();
  });
  $('tabGuide').addEventListener('click', () => show('guide'));

  buildGuide();
  goHome();
}
