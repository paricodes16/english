# Tense Trainer

Practise English tenses with fill-in-the-blank, multiple choice and spot-the-error questions.

- 145 questions covering 12 tenses, plus a mixed set
- Instant feedback with an explanation for every question
- Choose the question type, tense, level and session length
- Results screen with a retry-your-mistakes option
- A tense guide with forms, uses, signal words and examples
- Progress per tense saved in the browser

## Files

```
index.html   the page
style.css    styles
script.js    the app: answer checking, progress, screens
data.js      the tense guide and all the questions
```

## Add or change questions

Open `data.js` and add a line in the right section:

```js
fill(T, 1, 'She ___ (work) in a bank.', ['works'], 'Explanation shown after the answer.');
choice(T, 1, 'I ___ him yesterday.', ['see', 'saw', 'have seen', 'was seeing'], 1, 'Explanation.');
error(T, 1, ['I', 'goed', 'to school', 'yesterday.'], 1, 'I went to school yesterday.', 'Explanation.');
```

- `1` is the level (1 easy, 2 medium, 3 hard).
- For `fill`, write every accepted answer without contractions, for example `'do not like'`. The app also accepts `don't like`, and answers with or without the subject.
- For `choice`, the number after the options is the position of the correct one, starting at 0.
- For `error`, split the sentence into chunks, give the number of the chunk with the mistake (starting at 0), then the corrected sentence.
