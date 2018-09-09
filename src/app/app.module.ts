import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ComponentGalleryComponent } from './component-gallery/component-gallery.component';
import { ComponentLoginComponent } from './component-login/component-login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentRegisterComponent } from './component-register/component-register.component';
import { MatInputModule, MatToolbarModule, MatButtonModule, MatDialogModule,
   MatTableModule, MatProgressSpinnerModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';


const MATERIAL_MODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
];

const routes: Routes = [
  {path: '', component: HomeComponentComponent },
  {path: 'login', component: ComponentLoginComponent },
  {path: 'gallery', component: ComponentGalleryComponent },
  {path: 'register', component: ComponentRegisterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ComponentLoginComponent,
    ComponentGalleryComponent,
    HomeComponentComponent,
    ComponentRegisterComponent
  ],
  imports: [
    MATERIAL_MODULES,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpClientModule
  ],

  exports: [
    MATERIAL_MODULES
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
