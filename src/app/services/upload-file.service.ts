import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) {}
  
    public uploadFile(body): Observable<any> {
      return this.http.post('https://goload.ru/api/upload.php', body);
    }
}
