// ゲーム要素の取得
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultMessage = document.getElementById('result-message');
const playerHandElement = document.getElementById('player-hand');
const computerHandElement = document.getElementById('computer-hand');

// スコアの初期化
let playerScore = 0;
let computerScore = 0;

// 手の選択肢
const choices = ['rock', 'paper', 'scissors'];

// 絵文字のマッピング
const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// 日本語名のマッピング
const nameMap = {
    rock: 'グー',
    paper: 'パー',
    scissors: 'チョキ'
};

// 各選択ボタンにイベントリスナーを追加
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.getAttribute('data-choice');
        playGame(playerChoice);
    });
});

// リセットボタンにイベントリスナーを追加
resetBtn.addEventListener('click', resetGame);

// ゲームのメイン処理
function playGame(playerChoice) {
    // コンピューターのランダムな選択
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // 手の表示を更新
    playerHandElement.textContent = emojiMap[playerChoice];
    computerHandElement.textContent = emojiMap[computerChoice];
    
    // 勝敗判定
    const result = getResult(playerChoice, computerChoice);
    
    // スコアの更新
    if (result === 'win') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
    
    // 結果メッセージの表示
    displayResult(result, playerChoice, computerChoice);
}

// 勝敗判定のロジック
function getResult(player, computer) {
    if (player === computer) {
        return 'draw';
    }
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

// 結果メッセージの表示
function displayResult(result, playerChoice, computerChoice) {
    // 以前のクラスを削除
    resultMessage.classList.remove('win', 'lose', 'draw');
    
    let message = '';
    
    if (result === 'win') {
        message = `🎉 あなたの勝ち！ ${nameMap[playerChoice]}が${nameMap[computerChoice]}に勝ちました！`;
        resultMessage.classList.add('win');
    } else if (result === 'lose') {
        message = `😢 あなたの負け... ${nameMap[computerChoice]}が${nameMap[playerChoice]}に勝ちました。`;
        resultMessage.classList.add('lose');
    } else {
        message = `🤝 引き分け！ 両方とも${nameMap[playerChoice]}でした。`;
        resultMessage.classList.add('draw');
    }
    
    resultMessage.textContent = message;
}

// ゲームのリセット
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    playerHandElement.textContent = '?';
    computerHandElement.textContent = '?';
    resultMessage.textContent = '手を選んでください！';
    resultMessage.classList.remove('win', 'lose', 'draw');
}

// 初期メッセージ
console.log('じゃんけんゲームが読み込まれました！');
