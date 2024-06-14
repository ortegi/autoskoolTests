import { Injectable } from '@angular/core';
import { data1 } from '../shared/A1.js' 
import { Question } from '../models.js';


@Injectable({
  providedIn: 'root'
})
export class TestsService {
  http: any;

  protected  questions: Question[] = this.convertToQuestions(data1);


  private convertToQuestions(data: any[]): Question[] {
    return data.map(item => ({
      a: item.a,
      b: item.b,
      c: item.c,
      correcta: item.correcta,
      explicacion: item.explicacion,
      img: item.img,
      pregunta: item.pregunta
    }));
  }
  

  public getContent(){
    return this.questions
  }


  public getRandomQuestion(){
    return this.questions[Math.floor(Math.random() * this.questions.length)]
  }

  public getRandomQuestionForATest(){

    let questions = data1.sort(() => Math.random() - 0.5)

    return questions.slice(0,40);
  }

  constructor()
   {

   }


}
