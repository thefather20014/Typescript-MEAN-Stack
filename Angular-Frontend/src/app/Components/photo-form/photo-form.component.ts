import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhotoService } from '../../Services/photo.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  file: File;
  photoSelected: string | ArrayBuffer;

  constructor(public photoService: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent): void {

    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(Title: HTMLInputElement, Description: HTMLTextAreaElement) {

    this.photoService.createPhotos(Title, Description, this.file)
    .subscribe(res => {
      console.log(res);
      swal.fire({
        toast: true,
        text: 'Photo Succesfully Saved!',
        position: 'top-end',
        type: 'success',
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/photo']);
    }, err => console.log(err));
  }

}
