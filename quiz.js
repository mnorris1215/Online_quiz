(function() {
  var quizQuestions = [
    {
      question: "What is the most common type of star found in the Milky Way?",
      answers:["Neutron", "Red dwarf","Pulsar", "White dwarf"],
      correctAnswer: 1
    },
    {
      question: "Which NASA space flight was the last manned mission to the moon?",
      answers: ["Pioneer 4", "Apollo 18","Apollo 17","Ranger 6"],
      correctAnswer: 2
    },
    {
      question: "What has a gravitational pull so strong that light cannot escape it?",
      answers: ["black hole", "black dwarf","dark matter","Nothing"],
      correctAnswer: 0
    },
    {
      question: "How many miles is the Earth from the Sun?",
      answers: ["76 million", "3 billion", "93 million","18 billion"],
      correctAnswer: 2
    },
    {
      question: "Which gas is most abundant in stars",
      answers: ["Nitrogen", "Oxygen", "Helium","Hydrogen"],
      correctAnswer: 3
    }
  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //user selections
  var quiz = $('#quiz')//div object

  //Display the first question
  currentQuestion();

  //Next button
  $('#next').on('click', function(e){
    e.preventDefault();

  //Stop click listener during fade animation
  if(quiz.is(':animated')){
    return false;
  }
  choose();

  //User must answer every question
  if(isNaN(selections[questionCounter])){
    alert('Please make a selection.');
  }else{
    questionCounter++;
    currentQuestion();
    }
  });

  //Previous button
  $('#prev').on("click", function (e){
    e.preventDefault();

    if(quiz.is(':animated')){
      return false;
    }
    choose();
    questionCounter--;
    currentQuestion();
  });

  //Start Over button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    currentQuestion();
    $('#start').hide();
  });

  //Animates button on hover
  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  //Div that contains questions and answer selections
  function createQuestionElement(index){
    var qElement = $('<div>',{
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2');
    qElement.append(question);

    var question = $('<p>').append(quizQuestions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  //Creates the list of answers with radio buttons
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = ' ';
    for (var i=0; i<quizQuestions[index].answers.length; i++){
      item = $('<li>');
      input = '<input type="radio" name= "answer" value=' + i + ' />';
      input += quizQuestions[index].answers[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  //Pushes user selection to Array
  function choose(){
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  //Displays next element
  function currentQuestion(){
    quiz.fadeOut(function () {
      $('#question').remove();

      if(questionCounter < quizQuestions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if(!(isNaN(selections[questionCounter]))){
          $('input[value=]' +selections[questionCounter]+ ']').prop('checked', true);
        }

        //Controls display of prev button
        if(questionCounter ===1){
          $('#prev').show();
        }else if (questionCounter ===0){
          $('#prev').hide();
          $('#next').show();
        }
        }else{
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $("#start").show();
        }
    });
  }
  //Returns results
  function displayScore (){
    var score = $('<p>', {id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++){
      if(selections[i] === quizQuestions[i].correctAnswer){
        numCorrect++;
      }
    }

    score.append('You got ' +numCorrect+ " questions out of "+
                  quizQuestions.length + ' right!');
    return score;
  }

})();
