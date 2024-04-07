import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/services/auth.service';
import { faEye, faEyeSlash, faLock, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public signUpForm!: FormGroup;
   type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  faLockIcon = faLock;
faUserIcon = faUser;
faEyeIcon = faEye;
faEyeSlashIcon = faEyeSlash;
  faXIcon = faX;
  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router,
    private toast : NgToastService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.RegisterUser(this.signUpForm.value).subscribe(result => {
        this.toast.success({detail:"SUCCESS", summary:"User registration Success"})
        this.router.navigate(['login'])
      });
    } else {
      this.toast.warning({detail:"ERROR", summary:"Please enter valid data"})
    }
  }
  hideShowPass(){
    this.isText = !this.isText;
  }

  onClose(){
    this.router.navigate(['/navbar']);
  }
}
