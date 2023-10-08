import { Answer } from "./answer";

export interface Question{
    projectId?: String,
    questionID : String,
    question :String
    options : Answer[],
    answerID: String,
    questionText? : String,
    questionNumber? : String
}