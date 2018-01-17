$(document).ready(function() {
    var quizContainer = $('#quiz');
    var resultsContainer = $('#result');
    var options = document.getElementById('answers');
    var ansDiv = $('#answers');
    var inputType = document.createElement('input');
    var inputDiv = $('#input');
    var timerDiv = $('#mytimer').hide();
    var showImage = $('#image');
    var restart = $('#restart').hide();
    var ans = $('#correctAnswer').hide();
    var wrg = $('#wrongAnswer').hide();
    var unAns = $('#unAnswered').hide();
    var finalImage = $('#mmImage').hide();
    var setCheck;
    var remainingTime;
    var intervalId;
    var numOfCorrect = 0;
    var numOfWrong = 0;
    var numOfUnanswered = 0;
    var answer;
    var image;
    var i;


    //JSON data about questions and answers
    var myQuestions = [{
            question: "Which Disney character sings the song 'Be Prepared'?",
            answer: ["The Princess and the Frog - Tiana", "Scar - Lion king ", "Frozen - Elsa", "Toy Story- Sheriff Woody"],
            correctAnswer: "Scar - Lion king ",
            image: "assets/images/lion.gif",

        },
        {
            question: "What Disney film released in 2010 retells the classic fairytale Rapunzel?",
            answer: ["Alice in wonderland", "Tangled Ever After", "Tangled", "The princess and the frog"],
            correctAnswer: "Tangled",
            image: "assets/images/tangled.gif"
        },
        {
            question: "What puts Snow White into a deep sleep?",
            answer: ["A poisoned milk", "A poisoned Apple", "A poisoned smell", "A poisoned water"],
            correctAnswer: "A poisoned Apple",
            image: "assets/images/apple.gif"
        },
        {
            question: "What does Woody from Toy Story have in his boot?",
            answer: ["A lizard", "A snake", "A rock", "A toy"],
            correctAnswer: "A snake",
            image: "assets/images/snake.png"
        },
        {
            question: "What is the name of Donald Duck's Disney partner, who wore a red dress?",
            answer: ["Super Duck", "Daisy Duck", "Steamer Duck", "Minnie Duck"],
            correctAnswer: "Daisy Duck",
            image: "assets/images/daisy.gif"
        }
    ]

    //building quiz for each questions 
    function buildQuiz(i) {
        if (i === 5) {
            ansDiv.hide();
            quizContainer.hide();
            $('#gameOver').html("Awesome!! Game Over!!");
            finalImage.show();
            ans.show().html("No of Correct Answers: " + numOfCorrect);
            wrg.show().html("No of Wrong Answers: " + numOfWrong);
            unAns.show().html("No of UnAnswered: " + numOfUnanswered);
            restart.show();
        }
        console.log("Question index : " + i);
        $('#quiz').html(myQuestions[i].question);
        console.log(myQuestions[i].question);

        for (var j = 0; j < myQuestions[i].answer.length; j++) {
            inputType.className = ('select');
            inputType.type = "radio";
            inputType.name = "form1";
            inputType.value = myQuestions[i].answer[j];
            options.appendChild(inputType);
            options.innerHTML += myQuestions[i].answer[j] + "<br>";
            console.log(myQuestions[i].answer[j]);
        }
        startTimer();
        answer = myQuestions[i].correctAnswer;
        image = myQuestions[i].image;
        console.log(answer);

        $('.select').on("click", function() {
            if (setCheck != this) {
                setCheck = this;
            } else {
                this.checked = false;
            }

            if (this.value === myQuestions[i].correctAnswer) {
                resultsContainer.text("You got a correct answer. Good Job!!");
                numOfCorrect++;
            } else {
                resultsContainer.text("Oops!! Sorry, you lost it");
                $('#printAnswer').text("The Correct Answer was: " + myQuestions[i].correctAnswer);
                numOfWrong++;
            }
            $('#printTime').text("Time Remaining: " + remainingTime + " Seconds");
            showImage.html("<img src=" + myQuestions[i].image + " width='250px' height='250px'>");
            stopTimer();
            runAnsTimer(i);
        });

    }

    function decrementTimer() {
        remainingTime--;
        timerDiv.show().html("Your Timer - 00: " + remainingTime);
        if (remainingTime === 0) {
            stopTimer();
            showImage.html("<img src=" + image + " width='250px' height='250px'>");
            $('#printTime').text("Time Remaining: " + remainingTime + " Seconds");
            resultsContainer.text("Oops!! Sorry, time out.");
            $('#printAnswer').text("The Correct Answer was: " + answer);
            numOfUnanswered++;
            runAnsTimer(i);

        }
    }

    function startTimer() {
        timer = setInterval(decrementTimer, 1000);
        remainingTime = 61;

    }

    function stopTimer() {
        clearInterval(timer);
        quizContainer.empty();
        ansDiv.empty();
        inputDiv.empty();
        timerDiv.hide();
    }

    function runAnsTimer(index) {
        if (index < 5) {
            index++;
            setTimeout(function() {
                showImage.empty();
                resultsContainer.empty();
                $('#printTime').empty();
                $('#printAnswer').empty();
                buildQuiz(index);
            }, 5000);
        }
    }

    $('#start').on("click", function() {
        $('.remove').remove();
        $('#music').remove();
        buildQuiz(0);
    });

    restart.on("click", function() {
        location.reload();
    });
});