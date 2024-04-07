import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CompanyBlogComponent } from './company-blog/company-blog.component';
import { IndustriesBlogComponent } from './industries-blog/industries-blog.component';
import { InteractiveDemoComponent } from './interactive-demo/interactive-demo.component';




library.add(fas);

@NgModule({
  declarations: [
    LayoutComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ForgotpasswordComponent,
    CompanyBlogComponent,
    IndustriesBlogComponent,
    InteractiveDemoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers:[AuthService]
})
export class HomeModule { }
