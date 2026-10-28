/* Tense Trainer data: the tense guide and the question bank.
   Question types:
     fill   - text has one ___ ; `answers` lists every accepted answer (write them without contractions)
     choice - text has one ___ ; `options` and the index of the correct one in `answer`
     error  - `parts` is the sentence split into tappable chunks; `wrong` is the index of the chunk with the mistake
   level: 1 = easy, 2 = medium, 3 = hard */

window.TENSES = [
  {
    id: 'present-simple', name: 'Present simple', group: 'Present',
    form: ['I / you / we / they + base verb', 'he / she / it + verb + s', 'Negative: do not / does not + base verb', 'Question: Do / Does + subject + base verb?'],
    uses: ['Habits and routines', 'Facts and general truths', 'Timetables and schedules', 'States and feelings (know, like, want)'],
    signals: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'on Mondays'],
    examples: ['She works in a bank.', 'Water boils at 100 °C.', 'The train leaves at 6:45 tomorrow.'],
    tip: 'After does / doesn’t, the verb has no -s: Does she like tea? He doesn’t watch TV.'
  },
  {
    id: 'present-continuous', name: 'Present continuous', group: 'Present',
    form: ['am / is / are + verb-ing', 'Negative: am / is / are + not + verb-ing', 'Question: Am / Is / Are + subject + verb-ing?'],
    uses: ['Actions happening now', 'Temporary situations around now', 'Fixed arrangements in the near future', 'Changing trends'],
    signals: ['now', 'right now', 'at the moment', 'today', 'this week', 'Look!', 'Listen!'],
    examples: ['The baby is sleeping.', 'I’m meeting my dentist at five tomorrow.', 'More people are working from home these days.'],
    tip: 'State verbs (know, want, like, believe, need) are not normally used in the continuous: I want a drink, not “I am wanting”.'
  },
  {
    id: 'present-perfect', name: 'Present perfect', group: 'Present',
    form: ['have / has + past participle', 'Negative: have / has + not + past participle', 'Question: Have / Has + subject + past participle?'],
    uses: ['Past actions with a result now', 'Life experience (ever, never)', 'Actions that started in the past and continue now (for, since)', 'Recent news (just, already, yet)'],
    signals: ['just', 'already', 'yet', 'ever', 'never', 'for', 'since', 'so far', 'recently', 'lately'],
    examples: ['I have lost my keys.', 'She has lived in Pune since 2018.', 'Have you ever been to Japan?'],
    tip: 'Do not use the present perfect with finished times (yesterday, last week, in 2019, two days ago). Use the past simple.'
  },
  {
    id: 'present-perfect-continuous', name: 'Present perfect continuous', group: 'Present',
    form: ['have / has + been + verb-ing', 'Negative: have / has + not + been + verb-ing', 'Question: Have / Has + subject + been + verb-ing?'],
    uses: ['Activities that started in the past and are still going (duration)', 'Recent activities with a visible result'],
    signals: ['for', 'since', 'all day', 'lately', 'recently', 'how long'],
    examples: ['I have been waiting for an hour.', 'It has been raining all morning.', 'She is tired because she has been working all day.'],
    tip: 'State verbs use the present perfect instead: We have known each other for years.'
  },
  {
    id: 'past-simple', name: 'Past simple', group: 'Past',
    form: ['verb + ed (regular) or the irregular past form', 'Negative: did not + base verb', 'Question: Did + subject + base verb?'],
    uses: ['Finished actions at a definite time', 'A sequence of past events', 'Past habits and states'],
    signals: ['yesterday', 'last week', 'two days ago', 'in 2019', 'when I was a child'],
    examples: ['I visited my grandparents last weekend.', 'She didn’t go to school yesterday.', 'We saw a great film last night.'],
    tip: 'After did / didn’t, use the base verb: Did you see it? She didn’t go.'
  },
  {
    id: 'past-continuous', name: 'Past continuous', group: 'Past',
    form: ['was / were + verb-ing', 'Negative: was / were + not + verb-ing', 'Question: Was / Were + subject + verb-ing?'],
    uses: ['An action in progress at a moment in the past', 'A longer action interrupted by a shorter one', 'Two actions happening at the same time'],
    signals: ['while', 'when', 'at 8 p.m. yesterday', 'all evening'],
    examples: ['At 8 p.m. I was watching TV.', 'They were playing cricket when it started to rain.', 'While I was cooking, he was studying.'],
    tip: 'Use was with I / he / she / it and were with you / we / they.'
  },
  {
    id: 'past-perfect', name: 'Past perfect', group: 'Past',
    form: ['had + past participle', 'Negative: had not (hadn’t) + past participle', 'Question: Had + subject + past participle?'],
    uses: ['An action completed before another past action or time', 'Reported speech about earlier events', 'Explaining the reason for a past situation'],
    signals: ['before', 'after', 'by the time', 'already', 'never … before', 'when'],
    examples: ['When I arrived, the film had already started.', 'She told me she had never seen the sea.', 'I couldn’t get in because I had forgotten my key.'],
    tip: 'Use it for the earlier of two past events. The later event is in the past simple.'
  },
  {
    id: 'past-perfect-continuous', name: 'Past perfect continuous', group: 'Past',
    form: ['had + been + verb-ing', 'Negative: had not (hadn’t) + been + verb-ing', 'Question: Had + subject + been + verb-ing?'],
    uses: ['An activity that continued up to a past moment (duration)', 'Explaining the cause of a past situation'],
    signals: ['for', 'since', 'all day', 'how long', 'before'],
    examples: ['She was tired because she had been running.', 'They had been waiting for two hours when the bus arrived.'],
    tip: 'Same idea as the present perfect continuous, but looking back from a moment in the past.'
  },
  {
    id: 'future-simple', name: 'Future simple (will)', group: 'Future',
    form: ['will + base verb', 'Negative: will not (won’t) + base verb', 'Question: Will + subject + base verb?'],
    uses: ['Decisions made at the moment of speaking', 'Predictions based on opinion (I think, probably)', 'Promises and offers', 'Facts about the future'],
    signals: ['tomorrow', 'next week', 'I think', 'probably', 'maybe', 'perhaps', 'I’m sure'],
    examples: ['I think it will rain tomorrow.', 'Don’t worry, I’ll help you.', 'I promise I’ll call you.'],
    tip: 'After if, when and as soon as, use the present simple, not will: If it rains, we will stay home.'
  },
  {
    id: 'going-to', name: 'Future with going to', group: 'Future',
    form: ['am / is / are + going to + base verb', 'Negative: am / is / are + not + going to + base verb', 'Question: Am / Is / Are + subject + going to + base verb?'],
    uses: ['Plans and intentions decided before speaking', 'Predictions based on evidence you can see now'],
    signals: ['tomorrow', 'next month', 'this weekend', 'Look!', 'I’ve decided'],
    examples: ['I’m going to visit my aunt this weekend.', 'Look at those clouds! It’s going to rain.'],
    tip: 'Do not forget am / is / are before going to.'
  },
  {
    id: 'future-continuous', name: 'Future continuous', group: 'Future',
    form: ['will + be + verb-ing', 'Negative: will not (won’t) + be + verb-ing', 'Question: Will + subject + be + verb-ing?'],
    uses: ['An action in progress at a particular time in the future', 'Polite questions about someone’s plans (Will you be using the car?)'],
    signals: ['this time tomorrow', 'at 9 p.m. tonight', 'next week at this time'],
    examples: ['This time tomorrow I’ll be lying on a beach.', 'Don’t call at eight. We’ll be having dinner.'],
    tip: 'Picture yourself in the middle of the action at that future time.'
  },
  {
    id: 'future-perfect', name: 'Future perfect', group: 'Future',
    form: ['will + have + past participle', 'Negative: will not (won’t) + have + past participle', 'Question: Will + subject + have + past participle?'],
    uses: ['An action completed before a certain time in the future', 'Duration up to a point in the future'],
    signals: ['by 2030', 'by next June', 'by the time', 'in two months'],
    examples: ['By next June I will have finished my degree.', 'By the time you get home, I’ll have cooked dinner.'],
    tip: 'Always will have, never “will has”.'
  },
  { id: 'mixed', name: 'Mixed tenses', group: 'Mixed', guide: false }
];

window.QUESTIONS = (function () {
  const Q = [];
  const fill   = (tense, level, text, answers, explain) => Q.push({ type: 'fill', tense, level, text, answers, explain });
  const choice = (tense, level, text, options, answer, explain) => Q.push({ type: 'choice', tense, level, text, options, answer, explain });
  const error  = (tense, level, parts, wrong, correction, explain) => Q.push({ type: 'error', tense, level, parts, wrong, correction, explain });

  // ---------------- Present simple ----------------
  let T = 'present-simple';
  fill(T, 1, 'She ___ (work) in a bank. She starts at nine every morning.', ['works'],
    'A routine or a permanent situation uses the present simple. With she / he / it, add -s to the verb.');
  fill(T, 1, 'My brothers ___ (not / like) spicy food.', ['do not like'],
    'Make the present simple negative with do not (don’t) or does not (doesn’t) plus the base verb. “Brothers” is plural, so use do.');
  fill(T, 1, 'Water ___ (boil) at 100 degrees Celsius.', ['boils'],
    'General truths and scientific facts use the present simple. Water is “it”, so add -s.');
  fill(T, 2, 'The train to Mumbai ___ (leave) at 6:45 tomorrow morning.', ['leaves'],
    'We use the present simple for timetables and schedules, even when they refer to the future.');
  fill(T, 1, 'He ___ (not / watch) TV on weekdays.', ['does not watch'],
    'With he / she / it, use does not (doesn’t) plus the base verb: doesn’t watch, not “doesn’t watches”.');
  choice(T, 1, 'Ravi usually ___ coffee in the morning.', ['drinks', 'is drinking', 'drank', 'has drunk'], 0,
    '“Usually” signals a habit, so use the present simple. Add -s for Ravi (he).');
  choice(T, 1, 'How often ___ you visit your grandparents?', ['do', 'are', 'did', 'have'], 0,
    'Present simple questions start with do / does. “How often” asks about habits.');
  choice(T, 1, 'The sun ___ in the east.', ['rises', 'is rising', 'rose', 'has risen'], 0,
    'Something that is always true uses the present simple.');
  error(T, 1, ['My sister', 'go', 'to college', 'by bus.'], 1, 'My sister goes to college by bus.',
    'With he / she / it (my sister = she), the present simple verb takes -s: goes.');
  error(T, 1, ['Does', 'she', 'likes', 'tea?'], 2, 'Does she like tea?',
    'After does, use the base verb. The -s is already in “does”.');
  error(T, 2, ['I', 'am knowing', 'the answer', 'to that question.'], 1, 'I know the answer to that question.',
    'State verbs like know, like, want and believe are not normally used in the continuous. Use the present simple.');

  // ---------------- Present continuous ----------------
  T = 'present-continuous';
  fill(T, 1, 'Be quiet! The baby ___ (sleep).', ['is sleeping'],
    'An action happening right now uses am / is / are + verb-ing. “Be quiet!” tells us it is happening now.');
  fill(T, 1, 'Look! It ___ (rain) again.', ['is raining'],
    '“Look!” points to something happening now. Use is + raining.');
  fill(T, 2, 'I ___ (meet) my dentist at 5 o’clock tomorrow.', ['am meeting'],
    'The present continuous can describe a fixed arrangement in the future.');
  fill(T, 1, 'They ___ (not / study) at the moment. They are watching a film.', ['are not studying'],
    'Negative: am / is / are + not + verb-ing. “Aren’t studying” and “are not studying” are both correct.');
  fill(T, 2, 'More and more people ___ (work) from home these days.', ['are working'],
    'The present continuous describes temporary situations and changing trends around now.');
  choice(T, 1, 'Listen! Someone ___ at the door.', ['knocks', 'is knocking', 'knocked', 'has knocked'], 1,
    '“Listen!” signals something happening right now, so use the present continuous.');
  choice(T, 2, 'She ___ a new course this month, so she is very busy.', ['takes', 'is taking', 'took', 'has taken'], 1,
    '“This month” describes a temporary situation around now, so use the present continuous.');
  choice(T, 1, 'He ___ his homework right now.', ['does', 'is doing', 'did', 'has done'], 1,
    '“Right now” means the action is in progress: is doing.');
  error(T, 1, ['She', 'is work', 'in the garden', 'right now.'], 1, 'She is working in the garden right now.',
    'After am / is / are, the verb needs -ing: is working.');
  error(T, 2, ['I', 'am wanting', 'a glass of water.'], 1, 'I want a glass of water.',
    'Want is a state verb, so we don’t normally use it in the continuous.');
  error(T, 1, ['Look!', 'The children', 'plays', 'in the garden.'], 2, 'Look! The children are playing in the garden.',
    '“Look!” tells us the action is happening now, so use are playing. “Children” is plural.');

  // ---------------- Present perfect ----------------
  T = 'present-perfect';
  fill(T, 1, 'I ___ (lose) my keys. Can you help me look for them?', ['have lost'],
    'A past action with a result that matters now uses have / has + past participle. The keys are still missing now.');
  fill(T, 2, 'She ___ (live) in Pune since 2018.', ['has lived', 'has been living'],
    'Something that started in the past and continues now uses the present perfect with since or for. The present perfect continuous (has been living) is also correct.');
  fill(T, 1, 'We ___ (not / see) that film yet.', ['have not seen'],
    'Use have / has + not + past participle with “yet”. Seen is the past participle of see.');
  fill(T, 1, 'He ___ (just / finish) his exam.', ['has just finished'],
    '“Just” goes between has and the past participle: has just finished.');
  fill(T, 2, 'This is the best meal I ___ (ever / eat).', ['have ever eaten'],
    'After superlatives (the best, the worst), we usually use the present perfect with ever. Eaten is the past participle of eat.');
  choice(T, 2, 'I ___ to Japan three times so far.', ['have been', 'went', 'was', 'had been'], 0,
    '“So far” links the past to now, so use the present perfect.');
  choice(T, 2, 'She ___ here for ten years.', ['works', 'has worked', 'is working', 'worked'], 1,
    '“For ten years” with a situation that is still true now needs the present perfect.');
  choice(T, 1, 'Have you finished your homework ___?', ['yet', 'yesterday', 'ago', 'last night'], 0,
    '“Yet” is used in present perfect questions. Yesterday, ago and last night need the past simple.');
  error(T, 2, ['I', 'have seen', 'him', 'yesterday.'], 1, 'I saw him yesterday.',
    '“Yesterday” is a finished time, so use the past simple, not the present perfect.');
  error(T, 1, ['She', 'have', 'lived', 'here', 'since 2015.'], 1, 'She has lived here since 2015.',
    'Use has (not have) with she / he / it.');
  error(T, 2, ['They', 'are here', 'since Monday.'], 1, 'They have been here since Monday.',
    'With since, use the present perfect: have been, not are.');

  // ---------------- Present perfect continuous ----------------
  T = 'present-perfect-continuous';
  fill(T, 2, 'I ___ (wait) for you for an hour!', ['have been waiting'],
    'An activity that started in the past and is still going, with its duration, uses have / has been + verb-ing.');
  fill(T, 2, 'She is tired because she ___ (work) all day.', ['has been working'],
    'We use the present perfect continuous to explain a present situation (tired) by a recent activity (working).');
  fill(T, 2, 'It ___ (rain) all morning, so the ground is wet.', ['has been raining'],
    'The wet ground is a visible result of an activity that has been going on: has been raining.');
  fill(T, 2, 'They ___ (not / sleep) well recently.', ['have not been sleeping'],
    'Negative: have / has + not + been + verb-ing. “Recently” signals the present perfect continuous.');
  fill(T, 2, 'My hands are covered in paint because I ___ (paint) the fence.', ['have been painting'],
    'A visible result now (paint on your hands) of a recent activity: have been painting.');
  choice(T, 2, 'How long ___ English?', ['do you learn', 'have you been learning', 'did you learn', 'are you learning'], 1,
    '“How long” asks about duration up to now, so use have you been learning.');
  choice(T, 2, 'She ___ since 8 a.m., so she needs a break.', ['studies', 'has been studying', 'is studying', 'studied'], 1,
    '“Since 8 a.m.” with an activity that is still true now needs the present perfect continuous.');
  choice(T, 2, 'I’m exhausted. I ___ all day.', ['have been cleaning', 'cleaned', 'was cleaning', 'am cleaning'], 0,
    '“All day” up to now, with a present result (exhausted): have been cleaning.');
  error(T, 2, ['I', 'am waiting', 'here', 'for two hours.'], 1, 'I have been waiting here for two hours.',
    '“For two hours” shows duration up to now, so use have been waiting, not the present continuous.');
  error(T, 2, ['She', 'has been study', 'since morning.'], 1, 'She has been studying since morning.',
    'After has been, use verb-ing: studying.');
  error(T, 3, ['We', 'have been knowing', 'each other', 'for years.'], 1, 'We have known each other for years.',
    'Know is a state verb and is not used in continuous tenses. Use the present perfect: have known.');

  // ---------------- Past simple ----------------
  T = 'past-simple';
  fill(T, 1, 'I ___ (visit) my grandparents last weekend.', ['visited'],
    'A finished time (last weekend) needs the past simple. Regular verbs add -ed.');
  fill(T, 1, 'She ___ (not / go) to school yesterday because she was ill.', ['did not go'],
    'Negative: did not (didn’t) + base verb. Don’t put the verb in the past again: didn’t go, not “didn’t went”.');
  fill(T, 1, 'They ___ (buy) a new car two years ago.', ['bought'],
    '“Ago” needs the past simple. Buy is irregular: buy → bought.');
  fill(T, 1, 'We ___ (see) a great film last night.', ['saw'],
    '“Last night” is a finished time. See is irregular: see → saw.');
  fill(T, 1, 'The meeting ___ (start) at ten and finished at noon.', ['started'],
    'A finished event with a known time uses the past simple.');
  choice(T, 1, 'I ___ him at the station yesterday.', ['see', 'saw', 'have seen', 'was seeing'], 1,
    '“Yesterday” is a finished time, so use the past simple: saw.');
  choice(T, 1, 'Did you ___ the email I sent?', ['got', 'get', 'gets', 'getting'], 1,
    'After did, use the base verb: get.');
  choice(T, 1, 'She ___ to Paris in 2019.', ['has moved', 'moved', 'was moving', 'moves'], 1,
    '“In 2019” is a finished time, so use the past simple.');
  error(T, 1, ['I', 'goed', 'to the market', 'yesterday.'], 1, 'I went to the market yesterday.',
    'Go is irregular: go → went (not “goed”).');
  error(T, 1, ['Did', 'you', 'saw', 'the match', 'last night?'], 2, 'Did you see the match last night?',
    'After did, use the base verb: see.');
  error(T, 1, ['She', 'didn’t went', 'to work', 'on Monday.'], 1, 'She didn’t go to work on Monday.',
    'After didn’t, use the base verb: go.');

  // ---------------- Past continuous ----------------
  T = 'past-continuous';
  fill(T, 1, 'At 8 p.m. yesterday, I ___ (watch) TV.', ['was watching'],
    'An action in progress at a specific moment in the past uses was / were + verb-ing.');
  fill(T, 1, 'They ___ (play) cricket when it started to rain.', ['were playing'],
    'A longer action in progress (were playing) is interrupted by a shorter one (started).');
  fill(T, 1, 'She ___ (not / listen) when the teacher asked the question.', ['was not listening'],
    'Negative: was / were + not + verb-ing. “Wasn’t listening” is also correct.');
  fill(T, 1, 'While I ___ (cook) dinner, the phone rang.', ['was cooking'],
    '“While” introduces the longer action in progress.');
  fill(T, 2, 'I ___ (walk) home when I met an old friend.', ['was walking'],
    'The walking was in progress when the shorter action (met) happened.');
  choice(T, 1, 'I ___ a book when the lights went out.', ['read', 'was reading', 'have read', 'am reading'], 1,
    'A longer action in progress (reading) was interrupted by a shorter one (the lights went out).');
  choice(T, 2, 'While she ___, he was cooking dinner.', ['studied', 'was studying', 'has studied', 'studies'], 1,
    'Two actions happening at the same time in the past can both use the past continuous.');
  choice(T, 1, 'Sam ___ his bike when he fell.', ['rode', 'was riding', 'has ridden', 'rides'], 1,
    'He was in the middle of riding when the shorter event (he fell) happened.');
  error(T, 1, ['I', 'was watch', 'TV', 'when she called.'], 1, 'I was watching TV when she called.',
    'After was / were, the verb needs -ing: watching.');
  error(T, 2, ['While', 'I walked', 'home,', 'I saw an accident.'], 1, 'While I was walking home, I saw an accident.',
    '“While” is followed by a longer action in progress, so use the past continuous.');
  error(T, 1, ['They', 'was playing', 'football', 'at four o’clock.'], 1, 'They were playing football at four o’clock.',
    '“They” is plural, so use were, not was.');

  // ---------------- Past perfect ----------------
  T = 'past-perfect';
  fill(T, 2, 'When I arrived, the film ___ (already / start).', ['had already started'],
    'The film started first, then I arrived. Use had + past participle for the earlier past action.');
  fill(T, 2, 'She told me she ___ (never / see) the sea before.', ['had never seen'],
    'In reported speech, the present perfect (has never seen) moves back to the past perfect (had never seen).');
  fill(T, 2, 'After he ___ (finish) his homework, he went out to play.', ['had finished'],
    'Finishing the homework came before going out, so use the past perfect for the earlier action.');
  fill(T, 2, 'I couldn’t get in because I ___ (forget) my key.', ['had forgotten'],
    'Forgetting the key happened before the moment you couldn’t get in. Forgotten is the past participle of forget.');
  fill(T, 2, 'By the time the police arrived, the thief ___ (escape).', ['had escaped'],
    '“By the time” + past simple signals that the other action was already finished: had escaped.');
  choice(T, 2, 'By the time we got to the cinema, the film ___.', ['started', 'had started', 'has started', 'was starting'], 1,
    'The film started before we arrived, so use the past perfect.');
  choice(T, 2, 'She ___ her lunch before she left home.', ['had eaten', 'has eaten', 'was eating', 'eats'], 0,
    'Eating came before leaving, so the earlier action uses the past perfect.');
  choice(T, 3, 'I didn’t recognise him because he ___ a lot.', ['changes', 'had changed', 'has changed', 'is changing'], 1,
    'The change happened before the moment you saw him, so use the past perfect.');
  error(T, 2, ['When I arrived,', 'she', 'already left.'], 2, 'When I arrived, she had already left.',
    'The leaving happened before I arrived, so use the past perfect: had already left.');
  error(T, 3, ['He said that', 'he has never', 'been to London', 'before.'], 1, 'He said that he had never been to London before.',
    'After “said that” (past), the present perfect becomes the past perfect: had never been.');
  error(T, 2, ['After she had finished her work,', 'she has gone', 'home.'], 1, 'After she had finished her work, she went home.',
    'Both actions are in the past. The earlier one is the past perfect and the later one is the past simple: she went home.');

  // ---------------- Past perfect continuous ----------------
  T = 'past-perfect-continuous';
  fill(T, 3, 'She was tired because she ___ (run) for an hour.', ['had been running'],
    'An activity that continued up to a past moment and explains a past situation uses had been + verb-ing.');
  fill(T, 3, 'The ground was wet. It ___ (rain) all night.', ['had been raining'],
    'The rain went on before the past moment we are describing (the wet ground): had been raining.');
  fill(T, 3, 'They ___ (wait) for two hours when the bus finally arrived.', ['had been waiting'],
    'Duration of an activity before a past event: had been waiting.');
  fill(T, 3, 'I ___ (work) there for five years before I got promoted.', ['had been working', 'had worked'],
    'Duration before a past event. Both had been working and had worked are correct.');
  fill(T, 3, 'He ___ (not / sleep) well, so he looked terrible.', ['had not been sleeping'],
    'Negative: had not (hadn’t) been + verb-ing.');
  choice(T, 3, 'Her eyes were red. She ___.', ['cries', 'had been crying', 'has been crying', 'is cried'], 1,
    'The crying went on before the moment described (her eyes were red), so use the past perfect continuous.');
  choice(T, 3, 'We ___ for an hour when the teacher finally arrived.', ['waited', 'had been waiting', 'have been waiting', 'are waiting'], 1,
    'Duration before a past event (the teacher arrived): had been waiting.');
  choice(T, 3, 'Tom ___ the guitar for years before he joined the band.', ['has been playing', 'had been playing', 'is playing', 'plays'], 1,
    'The playing continued up to a past moment (joined the band): had been playing.');
  error(T, 3, ['She was tired', 'because she', 'has been running', 'for an hour.'], 2, 'She was tired because she had been running for an hour.',
    'The sentence is about the past, so use had been, not has been.');
  error(T, 3, ['I', 'had been wait', 'for an hour', 'when he arrived.'], 1, 'I had been waiting for an hour when he arrived.',
    'After had been, use verb-ing: waiting.');
  error(T, 3, ['They', 'had been knowing', 'each other', 'for years.'], 1, 'They had known each other for years.',
    'Know is a state verb and is not used in continuous tenses. Use the past perfect: had known.');

  // ---------------- Future simple ----------------
  T = 'future-simple';
  fill(T, 1, 'I think it ___ (rain) tomorrow.', ['will rain'],
    'A prediction based on opinion (“I think”) uses will + base verb.');
  fill(T, 1, 'Don’t worry. I ___ (help) you with your bags.', ['will help'],
    'Offers and spontaneous decisions use will.');
  fill(T, 1, 'She ___ (not / pass) the exam if she doesn’t study.', ['will not pass'],
    'Negative: will not (won’t) + base verb.');
  fill(T, 1, 'Maybe they ___ (come) to the party.', ['will come'],
    '“Maybe” shows an uncertain prediction about the future, so use will.');
  fill(T, 1, 'I promise I ___ (call) you tonight.', ['will call'],
    'Promises use will.');
  choice(T, 1, 'The phone is ringing. I ___ it.', ['answer', 'will answer', 'am answering', 'answered'], 1,
    'A decision made at the moment of speaking uses will.');
  choice(T, 1, 'I think the team ___ the match.', ['wins', 'will win', 'is winning', 'won'], 1,
    '“I think” introduces a prediction, so use will.');
  choice(T, 1, 'I’m sure you ___ the exam.', ['pass', 'will pass', 'are passing', 'passed'], 1,
    '“I’m sure” introduces a prediction about the future: will pass.');
  error(T, 1, ['I', 'will to', 'call you', 'tomorrow.'], 1, 'I will call you tomorrow.',
    'After will, use the base verb without to.');
  error(T, 2, ['If it', 'will rain', 'tomorrow,', 'we will stay home.'], 1, 'If it rains tomorrow, we will stay home.',
    'After if, use the present simple for a future possibility, not will.');
  error(T, 1, ['She', 'will goes', 'to Delhi', 'next week.'], 1, 'She will go to Delhi next week.',
    'After will, always use the base verb. There is no -s, even for she.');

  // ---------------- Going to ----------------
  T = 'going-to';
  fill(T, 2, 'Look at those clouds! It ___ (rain).', ['is going to rain'],
    'A prediction based on evidence you can see now uses be going to.');
  fill(T, 1, 'I ___ (visit) my aunt this weekend. I’ve already bought the ticket.', ['am going to visit'],
    'A plan made before speaking uses be going to.');
  fill(T, 2, 'She ___ (not / attend) the meeting. She has already told us.', ['is not going to attend'],
    'Negative: am / is / are + not + going to + base verb.');
  fill(T, 1, 'We ___ (move) to a new flat next month.', ['are going to move'],
    'An intention or plan for the future uses be going to.');
  fill(T, 2, 'He is driving too fast. He ___ (crash)!', ['is going to crash'],
    'You can see the danger now, so the prediction is based on evidence: is going to crash.');
  choice(T, 1, 'I’ve decided. I ___ a new phone.', ['buy', 'am going to buy', 'bought', 'have bought'], 1,
    '“I’ve decided” shows a plan made before speaking, so use be going to.');
  choice(T, 2, 'Watch out! You ___ that glass.', ['drop', 'are going to drop', 'have dropped', 'dropped'], 1,
    'You can see it about to happen, so use be going to.');
  choice(T, 1, '“Why are you buying paint?” “Because we ___ the kitchen.”', ['paint', 'are going to paint', 'painted', 'have painted'], 1,
    'The paint was bought for a plan we already have: are going to paint.');
  error(T, 1, ['I', 'going to', 'visit', 'my uncle', 'tomorrow.'], 1, 'I am going to visit my uncle tomorrow.',
    'Be going to needs am / is / are before going.');
  error(T, 1, ['She', 'is going', 'to buys', 'a new bike.'], 2, 'She is going to buy a new bike.',
    'After going to, use the base verb: buy.');
  error(T, 1, ['They', 'are going to', 'arrived', 'tomorrow.'], 2, 'They are going to arrive tomorrow.',
    'After going to, use the base verb: arrive.');

  // ---------------- Future continuous ----------------
  T = 'future-continuous';
  fill(T, 2, 'This time tomorrow, I ___ (lie) on a beach.', ['will be lying'],
    'An action in progress at a specific future time uses will be + verb-ing.');
  fill(T, 2, 'At 9 p.m. tonight, she ___ (study) for her exam.', ['will be studying'],
    'She will be in the middle of studying at that time: will be studying.');
  fill(T, 2, 'Don’t call at 8. We ___ (have) dinner.', ['will be having'],
    'We will be in the middle of dinner at that time: will be having.');
  fill(T, 2, 'Next week at this time, they ___ (travel) to Goa.', ['will be travelling', 'will be traveling'],
    '“At this time” next week points to an action in progress: will be travelling. Both spellings are correct.');
  fill(T, 3, 'I ___ (not / work) tomorrow, so we can meet.', ['will not be working'],
    'Negative: will not (won’t) be + verb-ing.');
  choice(T, 2, 'This time next week, I ___ around Paris.', ['will walk', 'will be walking', 'am walking', 'walked'], 1,
    '“This time next week” points to an action in progress at that future moment.');
  choice(T, 2, 'Don’t phone at six. I ___ dinner then.', ['will cook', 'will be cooking', 'cook', 'have cooked'], 1,
    'I will be in the middle of cooking at six: will be cooking.');
  choice(T, 2, 'At midnight tonight, we ___ on the train.', ['sleep', 'will be sleeping', 'have slept', 'slept'], 1,
    'An action in progress at a specific future time (midnight tonight): will be sleeping.');
  error(T, 2, ['This time tomorrow,', 'I will be', 'lie', 'on the beach.'], 2, 'This time tomorrow, I will be lying on the beach.',
    'After will be, use verb-ing: lying.');
  error(T, 2, ['She', 'will working', 'at 9 p.m.', 'tonight.'], 1, 'She will be working at 9 p.m. tonight.',
    'The future continuous needs will be + verb-ing.');
  error(T, 2, ['At noon tomorrow,', 'we will be', 'travelled', 'to Delhi.'], 2, 'At noon tomorrow, we will be travelling to Delhi.',
    'After will be, use verb-ing, not the past form.');

  // ---------------- Future perfect ----------------
  T = 'future-perfect';
  fill(T, 2, 'By next June, I ___ (finish) my degree.', ['will have finished'],
    'An action completed before a future time (by next June) uses will have + past participle.');
  fill(T, 2, 'By 2030, they ___ (build) a new bridge.', ['will have built'],
    'Build is irregular: build → built. The bridge will be finished before 2030.');
  fill(T, 3, 'She ___ (not / arrive) by six, so don’t wait.', ['will not have arrived'],
    'Negative: will not (won’t) have + past participle.');
  fill(T, 2, 'By the time you get home, I ___ (cook) dinner.', ['will have cooked'],
    'The cooking will be completed before you get home: will have cooked.');
  fill(T, 3, 'In two months, he ___ (live) here for ten years.', ['will have lived', 'will have been living'],
    'Duration up to a future point. Both will have lived and will have been living are correct.');
  choice(T, 2, 'By 2030, I ___ here for twenty years.', ['will live', 'will have lived', 'live', 'lived'], 1,
    'Duration up to a future point (2030) uses the future perfect: will have lived.');
  choice(T, 2, 'By the time we arrive, the show ___.', ['will have started', 'will start', 'starts', 'started'], 0,
    '“By the time we arrive” means the show will already be underway: will have started.');
  choice(T, 2, 'By the time you read this, I ___ the country.', ['will have left', 'will leave', 'have left', 'leave'], 0,
    'The leaving will be completed before you read this: will have left.');
  error(T, 2, ['By 2030,', 'she will have', 'finish', 'her studies.'], 2, 'By 2030, she will have finished her studies.',
    'After will have, use the past participle: finished.');
  error(T, 2, ['By the time you arrive,', 'I will have cook', 'dinner.'], 1, 'By the time you arrive, I will have cooked dinner.',
    'After will have, use the past participle: cooked.');
  error(T, 2, ['By next year,', 'we will has', 'moved', 'to a new city.'], 1, 'By next year, we will have moved to a new city.',
    'Use will have, never will has.');

  // ---------------- Mixed tenses ----------------
  T = 'mixed';
  fill(T, 2, 'I ___ (live) in Mumbai for five years, and I still live there.', ['have lived', 'have been living'],
    '“Still live there” means the situation continues now, so use the present perfect (or the present perfect continuous).');
  fill(T, 2, 'I ___ (live) in Mumbai for five years, but then I moved to Pune.', ['lived'],
    'The period is finished (then I moved), so use the past simple.');
  fill(T, 2, 'When I ___ (walk) to work, it started to rain.', ['was walking'],
    'A longer action in progress (walking) is interrupted by a shorter one (it started to rain).');
  fill(T, 2, 'She ___ (already / leave) when I called her.', ['had already left'],
    'The leaving happened before I called, so use the past perfect.');
  fill(T, 1, 'I ___ (see) that film last week. It was great.', ['saw'],
    '“Last week” is a finished time, so use the past simple.');
  fill(T, 1, 'They ___ (not / finish) the project yet.', ['have not finished'],
    '“Yet” signals the present perfect: have not (haven’t) finished.');
  fill(T, 2, 'This time next year, I ___ (study) in Canada.', ['will be studying'],
    '“This time next year” points to an action in progress in the future: will be studying.');
  choice(T, 1, 'I ___ my homework yet.', ['do not finish', 'have not finished', 'did not finished', 'am not finishing'], 1,
    '“Yet” signals the present perfect: have not finished.');
  choice(T, 2, 'When the teacher came in, the students ___.', ['were talking', 'has talked', 'talk', 'are talking'], 0,
    'The talking was in progress when the shorter action (the teacher came in) happened: were talking.');
  choice(T, 1, 'I ___ to Paris last summer.', ['have been', 'went', 'have gone', 'was going'], 1,
    '“Last summer” is a finished time, so use the past simple: went.');
  error(T, 2, ['I', 'am living', 'in Delhi', 'since 2020.'], 1, 'I have lived in Delhi since 2020.',
    'With since, use the present perfect (have lived) or the present perfect continuous (have been living), not the present continuous.');
  error(T, 1, ['Yesterday', 'I have bought', 'a new phone.'], 1, 'Yesterday I bought a new phone.',
    '“Yesterday” is a finished time, so use the past simple: bought.');
  error(T, 2, ['When I was a child,', 'I have played', 'cricket every day.'], 1, 'When I was a child, I played cricket every day.',
    '“When I was a child” is a finished period, so use the past simple: played.');

  const counts = {};
  Q.forEach(q => { counts[q.tense] = (counts[q.tense] || 0) + 1; q.id = q.tense + '-' + counts[q.tense]; });
  return Q;
})();
