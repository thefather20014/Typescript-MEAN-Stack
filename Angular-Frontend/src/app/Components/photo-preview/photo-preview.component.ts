import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../Services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../../Models/photo';
import swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss']
})
export class PhotoPreviewComponent implements OnInit {

  id: string;
  photo: Photo;
  file: File;
  photoSelected: string | ArrayBuffer;
  activated: boolean = false;

  constructor(public photoService: PhotoService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.showDescription();
  }

  showDescription() {

    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.photoService.getPhoto(this.id)
        .subscribe(res => {
          console.log(res)
          this.photo = res;
        }, err => console.log(err));
    });

  }

  onPhotoSelected(event: HtmlInputEvent): void {

    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  onDelete(id: string) {

    if (confirm('Are you sure, you want to delete it?')) {
      this.photoService.deletePhoto(id)
        .subscribe(res => {
          console.log(res);
          swal.fire({
            toast: true,
            text: 'Photo Succesfully Deleted!',
            position: 'top-end',
            type: 'success',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(['/photos']);
        }, err => console.log(err));
    }
  }

  showForm() {
    this.activated = true;
  }

  putPhoto(id: string, Title: HTMLInputElement, Description: HTMLTextAreaElement) {
    this.photoService.putPhotos(id, Title, Description, this.file)
    .subscribe(res => {
      console.log(res);
      swal.fire({
        toast: true,
        text: 'Photo Succesfully Updated!',
        position: 'top-end',
        type: 'success',
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/photos']);
    }, err => console.log(err));
  }

}
