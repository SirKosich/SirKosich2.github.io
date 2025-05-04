const questions = [
    {
        type: "name",
        text: "Как тебя зовут?",
        input: true
    },
    {
        text: "Как бы вы предпочли есть пудинг?",
        answers: [
            "Ложкой, очевидно. Так кусочки не будут соскальзывать",
            "Вилкой! Кусочки точно не соскользнут с острых палочек",
            "И то и другое - смотря что под руку попадется"
        ]
    },
    {
        text: "Что бы вы добавили бы в ваш пудинг? Может какие нибудь фрукты или сладости, или больше предпочитаете есть в чистом виде?",
        answers: [
            "я бы добавил фрукты :)",
            "сладости, чтобы точно передоз сахара случился",
            "ничего, я думаю? пудинги и так классные",
            "сладости и фрукты сразу!"
        ]
    },
    {
        text: "Вы бы предпочли съесть свой десерт в одиночку, или в компании с кем то? Поделились бы вы вашим пудингом?",
        answers: [
            "В одиночку",
            "Я не против компании. И да, почему бы и нет, я бы дал попробовать кому-то кусочек",
            "Кто эти люди? что за компания? нет, конечно нет. это ведь мой десерт, съем его сам!"
        ]
    },
    {
        text: "С каким бы вкусом вы бы себя ассоциировали бы?",
        answers: [
            "сладкий",
            "горький",
            "кислый"
        ]
    },
    {
        text: "пудинг?",
        answers: [
            "пудинг =D",
            "пудинг?",
            "пудинг"
        ]
    },
    {
        text: "Как тебе тест? (можно выбрать несколько вариантов)",
        multiple: true,
        answers: [
            "Очень понравилось!",
            "Было забавно",
            "Слишком странные вопросы",
            "Хочу еще таких тестов!",
            "Пудинги - это жизнь"
        ]
    }
];


const puddingTypes = {
    "funny": { name: "Забавный пудинг", image: "img/test/2.png" },
    "elegant": { name: "Элегантный нарцисс пудинг", image: "img/test/1.png" },
    "puddingg": { name: "пудинг с кучей всего другого вкусного", image: "img/test/3.png" },
    "defolt_pud": { name: "дефолтный пудинг", image: "img/test/4.png" },
};

let currentQuestion = 0;
let answers = {};
let userName = "";

function initQuiz() {
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    
    questionContainer.innerHTML = `
        <div class="question">
            <h2>${question.text}</h2>
            ${question.input ? `
                <input type="text" id="name-input" placeholder="Введите ваше имя">
            ` : `
                <div class="answers">
                    ${question.answers.map((answer, i) => `
                        <label class="answer-option">
                            <input type="${question.multiple ? 'checkbox' : 'radio'}" name="answer" value="${i}">
                            ${answer}
                        </label>
                    `).join('')}
                </div>
            `}
            <button id="next-btn" ${currentQuestion === 0 && !question.input ? 'disabled' : ''}>
                ${currentQuestion === questions.length - 1 ? 'Узнать результат' : 'Далее'}
            </button>
        </div>
    `;

    document.getElementById('quiz-progress').textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
    setupEventListeners();
}

function setupEventListeners() {
    const nextBtn = document.getElementById('next-btn');
    const question = questions[currentQuestion];
    
    if (question.input) {
        const input = document.getElementById('name-input');
        input.addEventListener('input', (e) => {
            nextBtn.disabled = e.target.value.trim() === '';
        });
    } else {
        const answerOptions = document.querySelectorAll('.answer-option input');
        answerOptions.forEach(option => {
            option.addEventListener('change', () => {
                if (!question.multiple) {
                    nextBtn.disabled = false;
                } else {
                    const checked = document.querySelectorAll('.answer-option input:checked').length > 0;
                    nextBtn.disabled = !checked;
                }
            });
        });
    }
    
    nextBtn.addEventListener('click', nextQuestion);
}

function nextQuestion() {
    const question = questions[currentQuestion];
    
    if (question.input) {
        userName = document.getElementById('name-input').value.trim();
    } else {
        const selected = Array.from(document.querySelectorAll('.answer-option input:checked')).map(el => el.value);
        answers[`q${currentQuestion}`] = selected;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function determinePuddingType() {
    // Система баллов для типизации))
    const scores = {
        funny: 0,
        elegant: 0,
        puddingg: 0,
        defolt_pud: 0
    };

    // Начисление баллов
    if (answers.q1) { // Как едите пудинг?
        if (answers.q1.includes('0')) scores.funny += 2; // Ложкой
        if (answers.q1.includes('1')) scores.elegant += 3; // Вилкой
        if (answers.q1.includes('2')) scores.defolt_pud += 1; // И то и другое
    }

    if (answers.q2) { // Что добавите в пудинг?
        if (answers.q2.includes('0')) scores.elegant += 2; // Фрукты
        if (answers.q2.includes('1')) scores.funny += 3; // Сладости
        if (answers.q2.includes('2')) scores.defolt_pud += 2; // Ничего
        if (answers.q2.includes('3')) scores.puddingg += 4; // И то и другое
    }

    if (answers.q3) { // Поделитесь пудингом?
        if (answers.q3.includes('0')) scores.defolt_pud += 3; // В одиночку
        if (answers.q3.includes('1')) scores.puddingg += 2; // В компании
        if (answers.q3.includes('2')) scores.funny += 1; // Ни за что!
    }

    if (answers.q4) { // Ассоциация по вкусу
        if (answers.q4.includes('0')) scores.puddingg += 2; // Сладкий
        if (answers.q4.includes('1')) scores.elegant += 1; // Горький
        if (answers.q4.includes('2')) scores.funny += 3; // Кислый
    }

    if (answers.q5) { // Реакция на "пудинг?"
        if (answers.q5.includes('0')) scores.funny += 4; // "=D"
        if (answers.q5.includes('1')) scores.elegant += 1; // "?"
        if (answers.q5.includes('2')) scores.defolt_pud += 2; // Просто "пудинг"
    }

    
    let maxScore = 0;
    let resultType = 'defolt_pud'; // По умолчанию
    
    for (const type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = type;
        }
    }

    return puddingTypes[resultType];
}

function getPuddingDescription(puddingType) {
    const descriptions = {
        "funny": "Ты - веселый и жизнерадостный пудинг! Всегда поднимаешь настроение и любишь приключения. Твой девиз: 'Жизнь слишком коротка для скучных десертов!'",
        "elegant": "Ты - утонченный и изысканный пудинг. Ценишь красоту и гармонию во всем. Ты предпочитаешь классику и изящество во всех проявлениях.",
        "puddingg": "Ты - пудинг-праздник! Сочетаешь в себе все самое вкусное и интересное. Твой девиз: 'Чем больше добавок - тем лучше!'",
        "defolt_pud": "Ты - классический пудинг. Надежный, предсказуемый и всегда вкусный. Ты не любишь излишеств и ценишь простые вещи."
    };
    return descriptions[puddingType] || "Ты - особенный пудинг! Такого еще не было!";
}

function showResult() {
    const puddingType = determinePuddingType();
    const resultContainer = document.getElementById('result-container');
    
    resultContainer.innerHTML = `
        <h2>${userName}, ты - ${puddingType.name}!</h2>
        <img src="${puddingType.image}" alt="${puddingType.name}" class="result-image">
        <p>${getPuddingDescription(puddingType)}</p>
        <button id="feedback-btn">Оставить отзыв о тесте</button>
    `;
    
    document.getElementById('question-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    document.getElementById('feedback-btn').addEventListener('click', showFeedback);
}

function showFeedback() {
    const feedbackContainer = document.getElementById('feedback-container');
    const lastQuestion = questions[questions.length - 1];
    
    feedbackContainer.innerHTML = `
        <h3>${lastQuestion.text}</h3>
        <div class="feedback-options">
            ${lastQuestion.answers.map((answer, i) => `
                <label class="feedback-option">
                    <input type="checkbox" name="feedback" value="${i}">
                    ${answer}
                </label>
            `).join('')}
        </div>
        <button id="submit-feedback">Отправить отзыв</button>
        <div id="thank-you" class="hidden">Спасибо за отзыв! ❤️</div>
    `;
    
    document.getElementById('result-container').classList.add('hidden');
    feedbackContainer.classList.remove('hidden');
    
    document.getElementById('submit-feedback').addEventListener('click', () => {
        const selected = Array.from(document.querySelectorAll('input[name="feedback"]:checked')).map(el => el.value);
        if (selected.length > 0) {
            document.getElementById('thank-you').classList.remove('hidden');
            setTimeout(() => {
                feedbackContainer.classList.add('hidden');
            }, 2000);
        }
    });
}


document.addEventListener('DOMContentLoaded', initQuiz);