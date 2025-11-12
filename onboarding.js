// onboarding.js
const questions = {
  you: [
    { q: "Are you Mom, Dad, or other?", type: "radio", options: ["Mom", "Dad", "Other"] },
    { q: "What should Sagey call you?", type: "text" },
    { q: "Favorite cozy phrase for teen?", type: "radio", options: ["Sweetie", "Kiddo", "Champ", "Buddy", "Sunshine", "My Star", "Sweetheart", "Other"] },
    { q: "Parenting style?", type: "slider", min: 1, max: 10, labels: ["Explainer", "Commander"] },
    { q: "Slang level with teen?", type: "radio", options: ["None", "Light", "Some", "Lots"] },
    { q: "One word for your parenting vibe?", type: "radio", options: ["Hugger", "Cheerleader", "Calm anchor", "Fun Boss", "Wise owl", "Protector", "Other"] }
  ],
  teen: [
    { q: "What should Sagey call your teen?", type: "text" },
    { q: "How old is your teen?", type: "radio", options: ["12 and under", "13", "14", "15", "16", "17", "18", "19"] },
    { q: "Gender identity?", type: "radio", options: ["Male", "Female", "Other", "Prefer Not to Say"] },
    { q: "Personality?", type: "radio", options: ["Outgoing", "Quiet", "Mixed"] },
    { q: "Triggers?", type: "radio", options: ["Public Criticism", "Comparisons", "Loud Voice", "Orders", "Early Morning", "Being Rushed", "Crowd Settings", "Phone Taken", "Chores Talk", "Other"] },
    { q: "What helps open up?", type: "radio", options: ["Private Walk", "Car Ride", "Texting First", "Food", "Later at Night", "Ask-Not-Tell", "Other"] }
  ],
  optional: [
    // 38 optional questions here (same format)
  ]
};

let current = 0;
const form = document.getElementById('onboarding-form');
const progress = document.getElementById('progress');
const currentNum = document.getElementById('current');
const totalNum = document.getElementById('total');

// Initialize
document.querySelector('.start-btn').addEventListener('click', () => {
  document.querySelector('.welcome').style.display = 'none';
  document.querySelector('#onboarding-form').style.display = 'block';
  showQuestion();
});

function showQuestion() {
  // Render logic will go here
}

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Save to Firebase + confetti
});
