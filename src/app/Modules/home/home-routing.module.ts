import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CompanyBlogComponent } from './company-blog/company-blog.component';
import { IndustriesBlogComponent } from './industries-blog/industries-blog.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'navbar',
        component: NavbarComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgotPassword',
        component:ForgotpasswordComponent,
      },
      {
        path: 'company',
        component:CompanyBlogComponent,
      },
      {
        path: 'layout',
        component: LayoutComponent,
      },
      {
        path: 'industries',
        component: IndustriesBlogComponent,
      },

      {
        path: '',
        redirectTo: 'navbar',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
