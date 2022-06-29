// creating an array and passing the number, questions, options, and answers
let questions = [
  {
    numb: 1, 
    question: "Commanly used data types DO not include: ",
    answer: "3. alerts",
    options: [
      "1. strings", 
      "2. booleans", 
      "3. alerts", 
      "4. numbers"
    ]
  },
  {
    numb: 2, 
    question: "The condition in an if/else statement is enclosed with ___________. ",
    answer: "3. paranthesis",
    options: [
      "1. quotes", 
      "2. curly brackets", 
      "3. paranthesis", 
      "4. square brackets"
    ]
  },
  {
    numb: 3, 
    question: "Arrays in JavaScript can be used to store _________. ",
    answer: "4. all of the above" ,
    options: [
      "1. numbers and string", 
      "2. other arrays", 
      "3. booleans", 
      "4. all of the above"
    ]
  },
  {
    numb: 4, 
    question: "How do you declare a JavaScript variable? ",
    answer: "2. var catName" ,
    options: [
      "1. variable catName", 
      "2. var catName", 
      "3. v catName", 
      "4. None of these"
    ]
  },
  {
    numb: 5, 
    question: "Who invented JavaScript? ",
    answer: "4. Brendan Eich" ,
    options: [
      "1. Pinar Aktas", 
      "2. Dan Gross", 
      "3. Ross", 
      "4. Brendan Eich"
    ]
  }
];

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    startTimer(30); //calling startTimer function
    queCounter(1);
}

let que_count = 0;
let que_numb = 1;
var ans;

const goBack_quiz = result_box.querySelector(".buttons .goBack");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

goBack_quiz.onclick = ()=>{
  window.location.reload(); //reload the current window
}

const bottom_ques_counter = document.querySelector("footer .total_que");

function nextQue(){  
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        queCounter(que_numb);
        showQuetions(que_count); //calling showQestions function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
    }else{
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
     
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
          ans = "Correct!";
          nextQue();
    }
    else{
        ans = "Wrong!";
        nextQue();
    }
}

function showResult(){
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if(time < 9){ //if timer is less than 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if(time < 0){ //if timer is less than 0
          clearInterval(counter); //clear counter
          timeText.textContent = "Time Off"; //change the time text to time off
          showResult();
      }
  }
}

//this function shows us footer part of question pages.
function queCounter(index){
if (que_count ==0){
      let totalQueCounTag = '<span><p>'+"" +'</p> </span>';
      bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
  }   //creating a new span tag and passing the question number and total question
else {
  let totalQueCounTag = '<span><p>'+ ans +'</p> </span>';
  bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
 } 
}