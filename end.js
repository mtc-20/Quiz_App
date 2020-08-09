const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('final-score')

const MAX_HIGH_SCORES = 5;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores)

finalScore.innerText = `Score: ${mostRecentScore}`
username.addEventListener('keyup', ()=>{
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = e => {
    // console.log("You clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(MAX_HIGH_SCORES);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(highScores);

};