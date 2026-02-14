// クイズアプリのメインロジック
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this.selectedIndexes = [];
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
        this.answerBtn = document.getElementById('answer-btn');
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
        this.setButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.startQuiz(btn.dataset.set);
            });
        });

        this.answerBtn.addEventListener('click', () => this.submitAnswer());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.retryBtn.addEventListener('click', () => this.retryQuiz());
        this.homeBtn.addEventListener('click', () => this.goHome());
    }

    startQuiz(setName) {
        this.currentSet = setName;
        this.questions = this.shuffle([...questions[setName]]);
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this.selectedIndexes = [];

        this.showScreen('quiz');
        this.showQuestion();
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
            case 'start': this.startScreen.classList.remove('hidden'); break;
            case 'quiz': this.quizScreen.classList.remove('hidden'); break;
            case 'result': this.resultScreen.classList.remove('hidden'); break;
        }
    }

    isMulti(question) {
        return Array.isArray(question.correct);
    }

    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.answered = false;
        this.selectedIndexes = [];

        // プログレスバー更新
        const progressPercent = (this.currentIndex / this.questions.length) * 100;
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
            button.innerHTML = choice;
            button.addEventListener('click', () => this.toggleChoice(index));
            this.choicesContainer.appendChild(button);
        });

        // ボタン制御
        this.answerBtn.classList.add('hidden');
        this.feedback.classList.add('hidden');
        this.nextBtn.classList.add('hidden');
    }

    toggleChoice(index) {
        if (this.answered) return;

        const question = this.questions[this.currentIndex];
        const buttons = this.choicesContainer.querySelectorAll('.choice-btn');

        if (this.isMulti(question)) {
            // 複数選択：トグル
            const pos = this.selectedIndexes.indexOf(index);
            if (pos === -1) {
                this.selectedIndexes.push(index);
                buttons[index].classList.add('selected');
            } else {
                this.selectedIndexes.splice(pos, 1);
                buttons[index].classList.remove('selected');
            }
        } else {
            // 単一選択：切り替え
            this.selectedIndexes = [index];
            buttons.forEach((btn, i) => {
                btn.classList.toggle('selected', i === index);
            });
        }

        // 1つ以上選択されたら回答ボタン表示
        if (this.selectedIndexes.length > 0) {
            this.answerBtn.classList.remove('hidden');
        } else {
            this.answerBtn.classList.add('hidden');
        }
    }

    submitAnswer() {
        if (this.answered || this.selectedIndexes.length === 0) return;
        this.answered = true;

        const question = this.questions[this.currentIndex];
        const correctIndexes = this.isMulti(question) ? question.correct : [question.correct];
        const selected = [...this.selectedIndexes].sort();
        const correct = [...correctIndexes].sort();
        const isCorrect = selected.length === correct.length &&
            selected.every((v, i) => v === correct[i]);

        // すべての選択肢を無効化＆正解/不正解表示
        const buttons = this.choicesContainer.querySelectorAll('.choice-btn');
        buttons.forEach((btn, index) => {
            btn.classList.add('disabled');
            btn.classList.remove('selected');

            if (correctIndexes.includes(index)) {
                btn.classList.add('show-correct');
            }
            if (this.selectedIndexes.includes(index) && !correctIndexes.includes(index)) {
                btn.classList.add('incorrect');
            }
            if (this.selectedIndexes.includes(index) && correctIndexes.includes(index)) {
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

        // ボタン制御
        this.answerBtn.classList.add('hidden');
        this.nextBtn.classList.remove('hidden');
        this.nextBtn.textContent = this.currentIndex < this.questions.length - 1
            ? '次の問題へ' : '結果を見る';
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
        this.progress.style.width = '100%';

        this.finalScore.textContent = this.score;
        const percentValue = Math.round((this.score / this.questions.length) * 100);
        this.percentage.textContent = percentValue;

        let message;
        if (percentValue >= 90) message = '素晴らしい！合格は間違いなし！';
        else if (percentValue >= 70) message = 'いい調子！もう少しで合格ラインです！';
        else if (percentValue >= 50) message = '頑張りましょう！復習を続けてください。';
        else message = '基礎からしっかり復習しましょう！';
        this.resultMessage.textContent = message;
    }

    retryQuiz() {
        if (this.currentSet) this.startQuiz(this.currentSet);
    }

    goHome() {
        this.showScreen('start');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
