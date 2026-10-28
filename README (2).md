# English

Interactive lessons for practising English. Everything runs in the browser: no frameworks, no build step, no account.

## Lessons

| Lesson | Page |
| --- | --- |
| Tense Trainer: 12 tenses, three question types, tense guide | `tense-trainer/` |

## Folder layout

```
index.html          home page listing the lessons
home.css            styles for the home page
tense-trainer/
  index.html        the lesson page
  style.css         styles
  script.js         the app
  data.js           the tense guide and the questions
```

## Add a new lesson

1. Create a new folder, for example `articles/`, with its own `index.html` and any CSS or JavaScript it needs.
2. In the root `index.html`, add another `<li>` with a link to the new folder, copying the Tense Trainer one.
3. In the new lesson's page, add `<a class="back" href="../">&larr; All English lessons</a>` near the top so people can get back.

## Play locally

Open `index.html` in a modern browser.

## Deploy with GitHub Pages

1. Push these files to a public GitHub repository named `english`.
2. Go to **Settings, then Pages**.
3. Set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.
4. After a minute, the home page is live at `https://<your-username>.github.io/english/` and Tense Trainer is at `.../english/tense-trainer/`.
