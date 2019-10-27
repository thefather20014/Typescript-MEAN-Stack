import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../Interfaces/photo';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  readonly API = 'http://localhost:3000/api/photos/';
  selectedPhoto: Photo[];

  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get<Photo[]>(this.API);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.API}${id}`);
  }

  createPhotos(Title: HTMLInputElement, Description: HTMLTextAreaElement, photo: File) {
   const fd = new FormData();
   fd.append('Title', Title.value);
   fd.append('Description', Description.value);
   fd.append('image', photo);
   return this.http.post(this.API, fd);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.API}${id}`);
  }

  putPhotos(id: string, Title: HTMLInputElement, Description: HTMLTextAreaElement, photo: File) {
    const fd = new FormData();
    fd.append('Title', Title.value);
    fd.append('Description', Description.value);
    fd.append('image', photo);
    return this.http.put(`${this.API}${id}`, fd);
   }
}
