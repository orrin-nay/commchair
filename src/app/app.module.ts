import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { ComponentLoginComponent } from './component-login/component-login.component';
import { MatFormFieldModule } from '@angular/material/form-field';


const MATERIAL_MODULES = [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule
];

const routes: Routes = [
  {path: '', component: AppComponent },
  {path: 'component-login/component-login.component.html', component: ComponentLoginComponent },
  {path: 'component-gallery', component: ComponentGalleryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ComponentLoginComponent
  ],
  imports: [
    MATERIAL_MODULES,
    RouterModule.forRoot(routes, {useHash: true})
  ],

  exports: [
    MATERIAL_MODULES
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
