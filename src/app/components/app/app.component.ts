import { Component } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private uploadFileService: UploadFileService){

  }
  
  public isUploadFile(file: File): void {
    // https://goload.ru/api/
    const formData = new FormData();
    formData.append('filename', file);
    this.uploadFileService.uploadFile(formData).subscribe(data => console.log(data));

    
    // fetch('https://goload.ru/api/upload.php', {
    //   method: 'POST',
    //   body: formData
    // })
      // .then(response => response.json())
      // .then(success => console.log(success))
      // .catch(error => console.log(error));
  }
}
