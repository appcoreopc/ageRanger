import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './searchComponent/searchComponent';
import { AddPersonComponent } from './addPersonComponent/addPersonComponent';
import { ListComponent } from './listComponent/listComponent';
import { NgModule } from '@angular/core';
import { PersonService } from './services/PersonService';


const appRoutes: Routes = [
  { path: 'add', component: AddPersonComponent },
  { path: 'list', component: ListComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: ListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), HttpModule, ReactiveFormsModule, CommonModule, FormsModule
  ],
  declarations: [AddPersonComponent, SearchComponent, ListComponent],
  providers: [PersonService],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }