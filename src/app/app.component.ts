import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor() {
  }
  title = 'DossierFront';

  // selectedFile?: File;
  // retrievedImage?: any;
  // base64Data?: any;
  // retrieveResonse?: any;
  // message: string;
  // imgAdded: boolean = false;

  // onFileChange(event) {
  //   this.selectedFile = event.target.files[0];
  //   this.imgAdded = true;
  // }
  //
  // onUpload() {
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  //
  //   this.http.post('http://localhost:8080/api/photo/upload', uploadImageData, {observe: 'response'})
  //     .subscribe((response) => {
  //       if (response.status === 200) {
  //         this.message = 'Success';
  //         this.getImage();
  //       } else {
  //         this.message = 'Fail';
  //       }
  //     });
  // }
  //
  //
  // getImage() {
  //   this.http.get('http://localhost:8080/api/photo/' + this.selectedFile.name)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );
  // }
  //

}

