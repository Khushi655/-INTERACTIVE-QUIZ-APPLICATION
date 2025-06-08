const leaderboardDiv = document.getElementById("leaderboard");
const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

leaderboardDiv.innerHTML = "<ul>" +
  scores.slice(-5).reverse().map(s => `<li>${s.date} - Score: ${s.score}</li>`).join('') +
  "</ul>";
