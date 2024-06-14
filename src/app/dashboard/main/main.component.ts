import { Component, OnInit } from '@angular/core';
import { TestsService } from '../../tests.service';
import { AnsweredQuestion, Question, Test } from '../../../models';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

 questions: Question[] = [];
 answeredQuestions: AnsweredQuestion[] = null;
 currentQuestion: AnsweredQuestion = null;
 doneQuestions: AnsweredQuestion[] = [];
 imagePath: string;
 currentIndex: number;
 failedQuestions: AnsweredQuestion[] = [];
 failedPoints: number = 0;
 points: number = 0;
 intentos : number = 3;
 errorMode: boolean = false;
 userTests: Test[] = []


constructor(private testService: TestsService){

}


next(){
  this.markQuestionAsDone()
  this.currentIndex ++
  this.currentQuestion = this.answeredQuestions[this.currentIndex];
  this.updateImagePath();
  
}


studentWon():boolean{
  const totalQuestions = this.answeredQuestions.length;
  const correctAnswers = this.points;
  const maxAllowedFails = 3; 
  
  const passed = correctAnswers >= (totalQuestions - maxAllowedFails) && this.failedPoints <= maxAllowedFails;

  return passed;
}


before(){
  if(this.currentIndex == 0){
    return
  }
  this.currentIndex --
  this.currentQuestion = this.answeredQuestions[this.currentIndex]
  this.updateImagePath();
  
}

check(answer: number){
  console.log(answer)
  let arr = this.currentQuestion.correcta.split(' ');
  this.currentQuestion.selected = answer
  this.currentQuestion.isCorrect = parseInt(arr[answer]) === 1;
    if (this.currentQuestion.isCorrect) {
  
      if(this.errorMode){
        this.deleteFromFailedQuestion();
      }
    } else {
      
    }
    this.currentQuestion.answered = true;
   this.markQuestionAsDone()
}

markQuestionAsDone(){
  if(!this.currentQuestion){
    return false
  };

  const foundQuestion = this.doneQuestions.find(q => q.pregunta == this.currentQuestion.pregunta)

  if(foundQuestion){
    return;
  }

  this.doneQuestions.push(this.currentQuestion);

  if(!this.currentQuestion.isCorrect && this.currentQuestion.answered){
    this.addToFailedQuestions()
  }else if(this.currentQuestion.isCorrect && this.currentQuestion.answered){
    this.points ++
  }
  
}


addToFailedQuestions(){
  this.failedQuestions.push(this.currentQuestion)
  this.failedPoints ++
  localStorage.setItem('failedQuestions', JSON.stringify(this.failedQuestions))
}

deleteFromFailedQuestion(){
  this.failedQuestions = this.failedQuestions.filter(q => q.pregunta !== this.currentQuestion.pregunta);
  localStorage.setItem("failedQuestions",JSON.stringify(this.failedQuestions))
}

isCorrectAnswer(): boolean {
  return this.currentQuestion.isCorrect 
}


isLastQuestion(): boolean {
  return this.currentIndex === this.answeredQuestions.length - 1;
}

isFirstQuestion(): boolean{
  return this.currentIndex === 0
}


redirect(index: number) {
  this.currentQuestion = this.answeredQuestions[index];
}

init(isFailedQuestionTest: boolean){
  this.clear()
  this.errorMode = isFailedQuestionTest;
  this.getFailedQuestions()
  this.getTests();

  if(!isFailedQuestionTest){
    this.questions = this.testService.getRandomQuestionForATest();
    if (this.questions.length > 0) {
  
      this.answeredQuestions = this.questions.map(question => ({
        ...question,
        selected: undefined,
        isCorrect: undefined,
        answered: false
      }));
      
    }
  }else{

    if (this.failedQuestions.length > 0) {
      this.answeredQuestions = this.failedQuestions.map(question => ({
        ...question,
        selected: undefined,
        isCorrect: undefined,
        answered: false
      }) )
    }else{
      alert("Aun no tienes preguntas fallidas!")
      this.clear()
      this.errorMode = false
      return
    }
   
  }
  
  console.log("ola")
  this.currentIndex = 0;
  this.currentQuestion = this.answeredQuestions[this.currentIndex];
  this.updateImagePath();

}


saveTest(){
  const newTest : Test = {
    points : this.points,
    failedPoints : this.failedPoints,
    passed: this.studentWon()
  }

  this.userTests.push(newTest)
  localStorage.setItem('userTests', JSON.stringify(this.userTests ))
  alert("test guardado!")
  this.clear()
}


getTests(){
  const userTests = localStorage.getItem("userTests");
  if(userTests){
    this.userTests  = JSON.parse(userTests)
  }
}

clear(){

  this.questions = [];
  this.answeredQuestions = [];
  this.doneQuestions = []
  this.imagePath = null;
  this.currentIndex = 0
  this.failedQuestions = []
  this.failedPoints = 0
  this.points  = 0
  this.intentos = 0
  this.errorMode = false
  this.currentQuestion = null
}

getFailedQuestions(){
  const storedFailedQuestions = localStorage.getItem("failedQuestions");
  if(storedFailedQuestions){
    this.failedQuestions = JSON.parse(storedFailedQuestions)
  }
}

ngOnInit(): void {
  this.init(false)
}


  private updateImagePath (): void {
    if(this.currentQuestion && this.currentQuestion.img){
      this.imagePath = `assets/images/A1/${this.currentQuestion.img}`;
    }
  }


  
NextQuestion(){
  this.currentQuestion = this.currentQuestion
}


}


