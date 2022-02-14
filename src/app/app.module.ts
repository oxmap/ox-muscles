import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MatStepperModule } from "@angular/material/stepper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";

import { AppComponent } from "./components/app/app.component";
import { MainComponent } from "./components/main/main.component";
import { StartComponent } from "./components/start/start.component";
import { NumericDirective } from "./directives/numeric.directive";
import { ResultsComponent } from "./components/results/results.component";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NumericDirective,
    MainComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
