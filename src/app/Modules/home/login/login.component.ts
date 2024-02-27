import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/services/auth.service';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData: any;
faXIcon = faX;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
      password: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
    });
   }
  protected proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.getByCode(this.loginForm.value.userName).subscribe((data) => {
          this.userData = data;
          console.log(this.userData);
          if (this.userData.password === this.loginForm.value.password )
           {
            if (this.userData.isActive) {
              sessionStorage.setItem('userName', this.userData.id);
              sessionStorage.setItem('userRole', this.userData.role);
              this.router.navigate(['/dashboard']);
              this.toastr.success('Login successful','Login')
            } else {
              this.toastr.error('Please contact admin', 'InActive User');
            }
          }
          else {
            this.toastr.warning('Invalid username or password');
          }
        });
    }
  }

}
