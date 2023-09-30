import { Answer } from "./answer";

export interface Question{
   
    projectId: String,
    QuestionImage : File,
    Options : Answer[],
    answer_id : String
}