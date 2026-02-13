// クイズアプリのメインロジック
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this.currentSet = null;

        // DOM要素
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.setButtons = document.querySelectorAll('.set-btn');
        this.questionNumber = document.getElementById('question-number');
        this.scoreDisplay = document.getElementById('score');
        this.progress = document.getElementById('progress');
        this.questionText = document.getElementById('question-text');
        this.codeBlock = document.getElementById('code-block');
        this.choicesContainer = document.getElementById('choices');
        this.feedback = document.getElementById('feedback');
        this.feedbackText = document.getElementById('feedback-text');
        this.explanation = document.getElementById('explanation');
        this.nextBtn = document.getElementById('next-btn');
        this.finalScore = document.getElementById('final-score');
        this.percentage = document.getElementById('percentage');
        this.resultMessage = document.getElementById('result-message');
        this.retryBtn = document.getElementById('retry-btn');
        this.homeBtn = document.getElementById('home-btn');

        this.initEventListeners();
    }

    initEventListeners() {
        // セットボタンのイベントリスナー
        this.setButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const setName = btn.dataset.set;
                this.startQuiz(setName);
            });
        });

        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.retryBtn.addEventListener('click', () => this.retryQuiz());
        this.homeBtn.addEventListener('click', () => this.goHome());
    }

    startQuiz(setName) {
        this.currentSet = setName;
        this.questions = this.getQuestions(setName);
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;

        this.showScreen('quiz');
        this.showQuestion();
    }

    getQuestions(setName) {
        // 指定されたセットの問題をシャッフルして返す
        const setQuestions = [...questions[setName]];
        return this.shuffle(setQuestions);
    }

    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    showScreen(screen) {
        this.startScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');

        switch (screen) {
            case 'start':
                this.startScreen.classList.remove('hidden');
                break;
            case 'quiz':
                this.quizScreen.classList.remove('hidden');
                break;
            case 'result':
                this.resultScreen.classList.remove('hidden');
                break;
        }
    }

    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.answered = false;

        // プログレスバー更新
        const progressPercent = ((this.currentIndex) / this.questions.length) * 100;
        this.progress.style.width = `${progressPercent}%`;

        // 問題情報更新
        this.questionNumber.textContent = `問題 ${this.currentIndex + 1} / ${this.questions.length}`;
        this.scoreDisplay.textContent = `正解: ${this.score}`;

        // 問題文表示
        this.questionText.textContent = question.question;

        // コードブロック表示
        if (question.code) {
            this.codeBlock.textContent = question.code;
            this.codeBlock.classList.remove('hidden');
        } else {
            this.codeBlock.classList.add('hidden');
        }

        // 選択肢を表示
        this.choicesContainer.innerHTML = '';
        question.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.choicesContainer.appendChild(button);
        });

        // フィードバックと次へボタンを隠す
        this.feedback.classList.add('hidden');
        this.nextBtn.classList.add('hidden');
    }

    selectAnswer(selectedIndex) {
        if (this.answered) return;
        this.answered = true;

        const question = this.questions[this.currentIndex];
        const isCorrect = selectedIndex === question.correct;

        // すべての選択肢を無効化
        const buttons = this.choicesContainer.querySelectorAll('.choice-btn');
        buttons.forEach((btn, index) => {
            btn.classList.add('disabled');
            if (index === question.correct) {
                btn.classList.add('show-correct');
            }
            if (index === selectedIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
            if (index === selectedIndex && isCorrect) {
                btn.classList.add('correct');
            }
        });

        // スコア更新
        if (isCorrect) {
            this.score++;
            this.scoreDisplay.textContent = `正解: ${this.score}`;
        }

        // フィードバック表示
        this.feedback.classList.remove('hidden', 'correct', 'incorrect');
        this.feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
        this.feedbackText.textContent = isCorrect ? '正解！' : '不正解...';
        this.explanation.innerHTML = question.explanation;

        // 次へボタン表示
        this.nextBtn.classList.remove('hidden');
        this.nextBtn.textContent = this.currentIndex < this.questions.length - 1
            ? '次の問題へ'
            : '結果を見る';
    }

    nextQuestion() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            this.showResult();
        } else {
            this.showQuestion();
        }
    }

    showResult() {
        this.showScreen('result');

        // プログレスバーを100%に
        this.progress.style.width = '100%';

        // スコア表示
        this.finalScore.textContent = this.score;
        const percentValue = Math.round((this.score / this.questions.length) * 100);
        this.percentage.textContent = percentValue;

        // メッセージ
        let message;
        if (percentValue >= 90) {
            message = '素晴らしい！Ruby Silverの合格は間違いなし！';
        } else if (percentValue >= 70) {
            message = 'いい調子！もう少しで合格ラインです！';
        } else if (percentValue >= 50) {
            message = '頑張りましょう！復習を続けてください。';
        } else {
            message = '基礎からしっかり復習しましょう！';
        }
        this.resultMessage.textContent = message;
    }

    retryQuiz() {
        // 同じセットでもう一度
        if (this.currentSet) {
            this.startQuiz(this.currentSet);
        }
    }

    goHome() {
        this.showScreen('start');
    }
}

// アプリ初期化
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
