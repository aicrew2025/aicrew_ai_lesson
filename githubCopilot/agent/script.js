document.addEventListener('DOMContentLoaded', ()=>{
    const choices = ['グー','チョキ','パー'];
    const buttons = document.querySelectorAll('.choice');
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('game-result');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const resetBtn = document.getElementById('reset');

    let playerScore = 0;
    let computerScore = 0;

    buttons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            clearActive();
            btn.classList.add('active');
            const playerChoice = btn.getAttribute('data-choice');
            const computerChoice = choices[Math.floor(Math.random()*choices.length)];
            const result = getResult(playerChoice, computerChoice);

            playerChoiceDisplay.textContent = `あなた: ${playerChoice}`;
            computerChoiceDisplay.textContent = `コンピュータ: ${computerChoice}`;

            if(result === '勝ち'){
                playerScore++;
                resultDisplay.textContent = '結果: 勝ち';
                resultDisplay.className = 'badge win';
                spawnConfetti();
            } else if(result === '負け'){
                computerScore++;
                resultDisplay.textContent = '結果: 負け';
                resultDisplay.className = 'badge lose';
            } else {
                resultDisplay.textContent = '結果: 引き分け';
                resultDisplay.className = 'badge draw';
            }

            updateScores();
        });
    });

    resetBtn.addEventListener('click', ()=>{
        playerScore = 0; computerScore = 0; updateScores();
        playerChoiceDisplay.textContent = 'あなた: —';
        computerChoiceDisplay.textContent = 'コンピュータ: —';
        resultDisplay.textContent = '結果: —';
        resultDisplay.className = 'badge';
        clearActive();
    });

    function updateScores(){
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
    }

    function clearActive(){
        buttons.forEach(b=>b.classList.remove('active'));
    }

    function getResult(player, computer){
        if(player === computer) return '引き分け';
        if((player==='グー' && computer==='チョキ') || (player==='チョキ' && computer==='パー') || (player==='パー' && computer==='グー')) return '勝ち';
        return '負け';
    }

    function spawnConfetti(){
        const colors = ['#FF5C7C','#FFD166','#7C5CFF','#00D4FF','#2EE6A6'];
        for(let i=0;i<14;i++){
            const el = document.createElement('div');
            el.className = 'confetti';
            el.style.background = colors[Math.floor(Math.random()*colors.length)];
            el.style.left = (50 + (Math.random()*160-80)) + '%';
            el.style.top = (30 + Math.random()*20) + '%';
            el.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
            el.style.animation = `confetti-pop ${0.9 + Math.random()*0.8}s cubic-bezier(.2,.8,.2,1)`;
            document.body.appendChild(el);
            setTimeout(()=>el.remove(), 1600);
        }
    }
});