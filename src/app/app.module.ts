import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./components/app/app.component";
import { MainComponent } from "./components/main/main.component";
import { StartComponent } from "./components/start/start.component";
import { NumericDirective } from "./directives/numeric.directive";

@NgModule({
  declarations: [AppComponent, StartComponent, NumericDirective, MainComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
