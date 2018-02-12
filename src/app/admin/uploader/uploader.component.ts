// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-uploader',
//   templateUrl: './uploader.component.html',
//   styleUrls: ['./uploader.component.css']
// })
// export class UploaderComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Http } from '@angular/http';
 
import $ from 'jquery/dist/jquery.min';
 
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  uploadingText = 'Chọn file (chỉ chấp nhận file ảnh)';
  uploadResult: any = {
    progress: 0,
    uploadingText: this.uploadingText,
    fileUrl: null
  }
  constructor(private title: Title) { }
  ngOnInit() {
    this.title.setTitle("Angular 4 - Upload file"); 
  }
  doUploadFile() {
    this.uploadResult.progress = 0;
    this.uploadResult.fileUrl = null;
    this.uploadResult.uploadingText = this.uploadingText;
    $("#fileUploadInput").trigger("click");
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadId', "0");
      formData.append('data', file);
      
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let json = JSON.parse(xhr.response);
            let fileUrl = 'uploads/' + json.Name;
            this.uploadResult.progress = 100;
            this.uploadResult.fileUrl = fileUrl;
            this.uploadResult.uploadingText = "Hoàn thành";
 
          } else {
            console.log(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        this.uploadResult.uploadingText = "Đang tải ảnh lên...";
        let percentVal = Math.round(event.loaded / event.total * 100);
        this.uploadResult.progress = percentVal;
      };
      xhr.open('POST', "http://localhost:8888/api/upload", true);
      xhr.send(formData);
    }
  }
}