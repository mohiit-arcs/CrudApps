import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          redirectTo: 'display',
          pathMatch: 'full'
        },
        {
          path: 'display',
          component: DisplayComponent,
          pathMatch: 'full'
        },
        {
          path: 'add',
          component: AddComponent
        },
        {
          path: 'edit/:id',
          component: EditComponent
        }
      ]
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '**', // Wildcard route for unmatched routes
      redirectTo: 'login' // Redirect to LoginComponent for all unmatched routes
    }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
