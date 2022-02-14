import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { StartComponent } from "./components/start/start.component";
import { MainGuard } from "./guards/main.guard";

const routes: Routes = [
  { path: "", redirectTo: "start", pathMatch: "full" },
  { path: "start", component: StartComponent },
  { path: "main", component: MainComponent, canActivate: [MainGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
