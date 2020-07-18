window.onload = function () {
    const Start = document.getElementById("start");
    const quiz = document.getElementById("quiz");
    const question = document.getElementById("question");
    const qImg = document.getElementById("qImg");
    const optionA = document.getElementById("A");
    const optionB = document.getElementById("B");
    const optionC = document.getElementById("C");
    const optionD = document.getElementById("D");
    const counter = document.getElementById("counter");
    const progress = document.getElementById("progress");
    const scoreDiv = document.getElementById("score_container");
    const timeGauge = document.getElementById("timeGauge");
    const resetButton = document.getElementById("resetButton");

    let questions = [
        {
            question: "The Rowlatt Act was passed in:",
            optionA: "A. 1905",
            optionB: "B. 1913",
            optionC: "C. 1919",
            optionD: "D. 1925",
            correctAnswer: 'C'
        },
        {
            question: "The East India Assosiation was set up in:",
            optionA: "A. 1866",
            optionB: "B. 1857",
            optionC: "C. 1836",
            optionD: "D. 1885",
            correctAnswer: 'A'
        },
        {
            question: " Who called Subhash Chandra Bose as Desh Nayak?",
            optionA: "A. Lala Lajpat   Rai",
            optionB: "B. Rabindranath Tagore",
            optionC: "C. Mahatma     Gandhi",
            optionD: "D. Bal Gangadhar Tilak ",
            correctAnswer: 'B'
        },
        {
            question: "Who called Government India Act 1935 a Charter of Slavery? ",
            optionA: "A. Mahatma      Gandhi",
            optionB: "B. Subhash Chandra Bose",
            optionC: "C. Sardar Vallabh Bhai Patel",
            optionD: "D. Pt. Jawaharlal Nehru",
            correctAnswer: 'D'
        },
        {
            question: "The Indian National Congress passes the Quit India Resolution at:",
            optionA: "A. Wardha Session, 1942",
            optionB: "B. Bombay Session, 1934",
            optionC: "C. Tripura Session, 1939",
            optionD: "D. Ramgarh Session, 1940",
            correctAnswer: 'A'
        }
    ];

    let current_ques_index = 0;
    const last_ques_index = questions.length - 1;
    let count = 0;
    let score = 0;
    let TIMER;
    const quesTime = 2;
    const gaugeWidth = 150;
    let gaugeUnit = gaugeWidth/quesTime;


    function renderQuestion() {
        let q = questions[current_ques_index];
        question.innerHTML = "<p>" + q.question + "<\p>";
        qImg.innerHTML = "<img src = \"https://image.shutterstock.com/image-vector/quiz-comic-pop-art-style-260nw-1506580442.jpg\">";
        optionA.innerHTML = q.optionA;
        optionB.innerHTML = q.optionB;
        optionC.innerHTML = q.optionC;
        optionD.innerHTML = q.optionD;

    }

    Start.addEventListener("click", startQuiz);


    function startQuiz() {
        Start.style.display = "none";
        quiz.style.display = "block";
        renderQuestion();
        renderProgress();
        renderCounter();
        TIMER = setInterval(renderCounter, 1000);
    }

    function renderProgress() {
        for (let qindex = 0; qindex <= last_ques_index; qindex++) {
            progress.innerHTML += '<div class="prog" id= '+ qindex +'></div>';
        }
    }

    function renderCounter() {
        if(count <= quesTime) {
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count++;
        }
        else{
            count = 0;
            answerIsWrong();
            if(current_ques_index < last_ques_index) {
                current_ques_index++;
                renderQuestion();
            }
            else{
                clearInterval(TIMER);
                scoreRender();
            }
        }
    }
    
    function checkAnswer(answer) {
        if(answer==questions[current_ques_index].correctAnswer) {
            score++;
            answerIsCorrect();
        }
        else{
            answerIsWrong();
        }
        count = 0;
        if(current_ques_index < last_ques_index) {
            current_ques_index++;
            renderQuestion();
        }
        else{
            clearInterval(TIMER);
            scoreRender();
        }
    }

    function answerIsCorrect() {
        document.getElementById(current_ques_index).style.backgroundColor = "green";
    }

    function answerIsWrong() {
        document.getElementById(current_ques_index).style.backgroundColor = "red";
    }

    function scoreRender() {
        
        quiz.style.display="none";
        scoreDiv.style.display = "block";
        const scorePercent = Math.round(100 * (score / (questions.length)));
        scoreDiv.innerHTML = "<p>Your score is: " + scorePercent + "%</p>";
        resetButton.addEventListener("click", resetQuiz);

    }

    // function resetQuiz() {
    //     progress = document.getElementById("progress");
    //     count = 0;
    //     score = 0;
    //     current_ques_index = 0;
    // }
}
