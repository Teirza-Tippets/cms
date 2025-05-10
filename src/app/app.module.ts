import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppRoutingModule], // Use AppRoutingModule here
  bootstrap: [AppComponent]
})
export class AppModule {}