import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../Models/question'
import { environment } from 'src/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  QUESTION_BASE_URL = `${environment.backend_api}/Question/`

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
    const url = `${environment.backend_api}/admin/uploadQuestions`;
    const form = new FormData();
    form.append('file', file);
    const headers = new HttpHeaders()
    headers.set('content-type', 'multipart/form-data')

    return this.http.post(url, form, { headers: headers, responseType: "blob" });
  }

  getUploadStatus():Observable<any>{
    const url = `${environment.backend_api}/admin/massiveUpload/status`
    return this.http.get<any>(url);
  }

  downloadRespDocument(uploadID:number):Observable<any>{
    const url = `${environment.backend_api}/admin/downloadFile?id=`+uploadID;
    return this.http.get(url,{responseType: "blob"});
  }

  getUserAnswer(email:string,projectId : string){
    const url = `${environment.backend_api}/admin/answer?email=`+email+"&prjID="+projectId;
    return this.http.get(url);
  }
}
