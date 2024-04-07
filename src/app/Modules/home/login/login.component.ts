import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/services/auth.service';
import { faEye , faEyeSlash, faLock, faUser, faX} from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  type: string = 'password';
faLockIcon = faLock;
faUserIcon = faUser;
faEyeIcon = faEye;
faEyeSlashIcon = faEyeSlash;
//faXIcon = faX;
isText: boolean = false;
eyeIcon: string = 'fa-eye-slash';
  userData: any;
faXIcon = faX;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: NgToastService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  protected onSubmit() {
    if (this.loginForm.valid) {
      this.authService.getByCode(this.loginForm.value.username).subscribe((data) => {
          this.userData = data;
          console.log(data);
          if (this.userData.password === this.loginForm.value.password )
           {
            if (this.userData.isActive) {
              sessionStorage.setItem('username', this.userData.id);
              sessionStorage.setItem('userRole', this.userData.role);
              this.router.navigate(['/dashboard']);
              this.toastr.success({detail:"SUCCESS", summary:'Login Successfull', duration: 5000});
            } else {

              this.toastr.warning({detail:"InActive User", summary: 'Please contact admin', duration: 5000});
            }
          }
          else {
            this.toastr.warning({detail:'ERROR', summary:'Invalid username or password'});
          }
        });
    }
  }




hideShowPass() {
  this.isText = !this.isText;
}

onClose(){
  this.router.navigate(['/navbar']);
}
}
