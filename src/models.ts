

export interface Question {
    a: string,
    b: string,
    c: string,
    correcta: string,
    explicacion: string,
    img: string,
    pregunta:string
}

export interface AnsweredQuestion {
    a: string,
    b: string,
    c: string,
    correcta: string,
    explicacion: string,
    img: string,
    pregunta:string,
    selected: number,
    isCorrect: boolean,
    answered: boolean
}

export interface Test {
    points: number,
    failedPoints: number,
    passed: boolean
}