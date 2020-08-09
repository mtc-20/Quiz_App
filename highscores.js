const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// console.log(highScores)
// console.log(
//     highScores.map(score => {
//         return `<li class="high-score">${score.name} - ${score.score}</li>`;
//     })
// )

highScoresList.innerHTML = 
    highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");

