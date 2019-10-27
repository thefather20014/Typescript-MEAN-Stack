import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../Services/photo.service';
import { Photo } from '../../Interfaces/photo';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  constructor(public photoService: PhotoService, private router: Router) {
    this.getArticles();
  }

  ngOnInit() {
  }

  getArticles() {
   this.photoService.getPhotos()
   .subscribe(data => {
    this.photoService.selectedPhoto = data;
    console.log(data);
    });
  }

  previewCard(id: string) {
    this.router.navigate([`/photos/${id}`]);
  }

  showModal() {
    swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            swal.showValidationMessage(
              `Request failed: ${error}`
            );
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }

  searchByTitle(Title: HTMLInputElement) {
   console.log(Title.value);
  }

}
