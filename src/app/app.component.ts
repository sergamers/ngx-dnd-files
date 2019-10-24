import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isUploadFile(file: File): void {
    // https://goload.ru/api/
    const formData = new FormData();
    formData.append('filename', file);
    fetch('https://goload.ru/api/upload.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(success => console.log(success))
      .catch(error => console.log(error));
  }
}
