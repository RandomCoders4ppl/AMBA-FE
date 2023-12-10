import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../Models/question'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  QUESTION_BASE_URL = "http://localhost:8080/Question/"

  constructor(private http: HttpClient) { }


  postNewQuestion(url: string, question: FormData): Observable<any> {
    const headers = new HttpHeaders()
    headers.set('content-type', 'multipart/form-data')
    return this.http.post<any>(url, question, { headers: headers });
  }

  getAllQuestionByProject(UUID: string, page: number): Observable<any> {
    const url = this.QUESTION_BASE_URL + UUID + "/all?page=" + page;
    return this.http.get<Question>(url);
  }

  subQuestionAnswer(UUID: String, answer_index: number): Observable<any> {
    const url = this.QUESTION_BASE_URL + UUID + "/submit?answerId=" + answer_index;
    return this.http.put<any>(url, { "answerId": answer_index });
  }

  uploadQuestions(file: File): Observable<any> {
    const url = "http://localhost:8080/admin/uploadQuestions";
    const form = new FormData();
    form.append('file', file);
    const headers = new HttpHeaders()
    headers.set('content-type', 'multipart/form-data')

    return this.http.post(url, form, { headers: headers, responseType: "blob" });
  }
}
