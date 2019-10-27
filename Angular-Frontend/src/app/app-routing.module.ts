import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoFormComponent } from './Components/photo-form/photo-form.component';
import { PhotoListComponent } from './Components/photo-list/photo-list.component';
import { PhotoPreviewComponent } from './Components/photo-preview/photo-preview.component';


const routes: Routes = [
  { path: 'photos/new', component: PhotoFormComponent },
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/:id', component: PhotoPreviewComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/photos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
