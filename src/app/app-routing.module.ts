import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from "./views/login/login.component";
import { EditTaskComponent } from './views/edit-task/edit-task.component';
import { AuditComponent } from './views/audit/audit.component';

const routes: Routes = [
  {path:'' , redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'edit-task', component: EditTaskComponent},
  {path:'audit', component: AuditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, EditTaskComponent, AuditComponent]
