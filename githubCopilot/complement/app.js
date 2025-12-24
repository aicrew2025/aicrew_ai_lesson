// じゃんけんゲームのJavaScriptコード
document.getElementById('rock').onclick = function() {
    playGame('グー');
};

document.getElementById('paper').onclick = function() {
    playGame('パー');
};

document.getElementById('scissors').onclick = function() {
    playGame('チョキ');
};

const choices = ['グー', 'パー', 'チョキ'];

function playGame(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';

    result = determineWinner(userChoice);

    document.getElementById('result').innerText = 
        'あなたの選択: ' + userChoice + '\n' +
        'コンピュータの選択: ' + computerChoice + '\n' +
        result;
}

// 勝ち負け判定の関数
function determineWinner(userChoice) {
    const computerChoice = getComputerChoice();

    if (userChoice === computerChoice) {
        return '引き分け';
    }

    if (
        (userChoice === 'グー' && computerChoice === 'チョキ') ||
        (userChoice === 'パー' && computerChoice === 'グー') ||
        (userChoice === 'チョキ' && computerChoice === 'パー')
    ) {
        return 'ユーザーの勝ち';
    }

    return 'コンピュータの勝ち';
}

// コンピュータの選択をランダムに生成する関数
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}