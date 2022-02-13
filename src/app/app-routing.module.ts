import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartComponent } from "./components/start.component";

const routes: Routes = [
  { path: "", redirectTo: "start", pathMatch: "full" },
  { path: "start", component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
