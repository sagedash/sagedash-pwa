// onboarding.js
const questions = [
  // Parent Required (6)
  { q: "Are you Mom, Dad, or other?", type: "radio", options: ["Mom", "Dad", "Other"] },
  { q: "What should Sagey call you?", type: "text" },
  { q: "Favorite cozy phrase for teen?", type: "radio", options: ["Sweetie", "Kiddo", "Champ", "Buddy", "Sunshine", "My Star", "Sweetheart", "Other"] },
  { q: "Parenting style?", type: "slider", min: 1, max: 10, labels: ["Explainer", "Commander"] },
  { q: "Slang level with teen?", type: "radio", options: ["None", "Light", "Some", "Lots"] },
  { q: "One word for your parenting vibe?", type: "radio", options: ["Hugger", "Cheerleader", "Calm anchor", "Fun Boss", "Wise owl", "Protector", "Other"] },
  // Teen Required (6)
  { q: "What should Sagey call your teen?", type: "text" },
  { q: "How old is your teen?", type: "radio", options: ["12 and under", "13", "14", "15", "16", "17", "18", "19"] },
  { q: "Gender identity?", type: "radio", options: ["Male", "Female", "Other", "Prefer Not to Say"] },
  { q: "Personality?", type: "radio", options: ["Outgoing", "Quiet", "Mixed"] },
  { q: "Triggers?", type: "radio", options: ["Public Criticism", "Comparisons", "Loud Voice", "Orders", "Early Morning", "Being Rushed", "Crowd Settings", "Phone Taken", "Chores Talk", "Other"] },
  { q: "What helps open up?", type: "radio", options: ["Private Walk", "Car Ride", "Texting First", "Food", "Later at Night", "Ask-Not-Tell", "Other"] }
];

let current = 0;
const form = document.getElementById('onboarding-form');
const progress = document.getElementById('progress');
const currentNum = document.getElementById('current');
const totalNum = document.getElementById('total');
const total = questions.length;

totalNum.textContent = total;

document.querySelector('.start-btn').addEventListener('click', () => {
  document.querySelector('.welcome').style.display = 'none';
  document.querySelector('#onboarding-form').style.display = 'block';
  showQuestion();
});

function showQuestion() {
  const q = questions[current];
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `<h2>${current < 6 ? 'About You' : 'About Your Teen'}</h2>
                   <p>${current < 6 ? 'Tell me how you naturally talk and parent. Quick and easy.' : 'A few basics so I can match their vibe.'}</p>
                   <p>${q.q}</p>`;

  if (q.type === 'radio') {
    const options = q.options.map(o => `<div class="option" data-value="${o}">${o}</div>`).join('');
    div.innerHTML += `<div class="options">${options}</div>`;
  } else if (q.type === 'text') {
    div.innerHTML += `<input type="text" class="text-input" placeholder="Type here">`;
  } else if (q.type === 'slider') {
    div.innerHTML += `<div class="slider-container">
      <input type="range" min="${q.min}" max="${q.max}" value="5" class="slider">
      <div class="slider-labels">
        <span>${q.labels[0]}</span>
        <span>${q.labels[1]}</span>
      </div>
    </div>`;
  }

  form.innerHTML = '';
  form.appendChild(div);

  const width = ((current + 1) / total) * 100;
  progress.style.width = width + '%';
  currentNum.textContent = current + 1;

  // Next/Back buttons
  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  buttons.innerHTML = `<button type="button" class="secondary" id="back-btn">Back</button>
                       <button type="button" class="primary" id="next-btn">Next</button>`;
  form.appendChild(buttons);

  document.getElementById('back-btn').onclick = () => {
    if (current > 0) current--;
    showQuestion();
  };
  document.getElementById('next-btn').onclick = () => {
    if (current < total - 1) current++;
    else complete();
    showQuestion();
  };
}

function complete() {
  form.innerHTML = '<h2>Complete!</h2><p>You earned +6 dashes!</p>';
  // Confetti + save to Firebase
}

// Init
showQuestion();
