import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/services/auth.service';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  faXIcon = faX;
  constructor( private authService : AuthService,private formBuilder: FormBuilder,
    private toastr : ToastrService,private router: Router
   ) {}
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      // id : this.formBuilder.control("",Validators.compose([Validators.required,Validators.minLength(5)])),
      name : this.formBuilder.control('',Validators.compose([Validators.required])),
      password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      gender: this.formBuilder.control(''),
      role: this.formBuilder.control(''),
      //  isactive: this.formBuilder.control(false)

    });

  }

  proceedregister() {
    if (this.registerForm.valid) {
      this.authService.RegisterUser(this.registerForm.value).subscribe(result => {
        this.toastr.success('Please contact admin for enable access.','Registered successfully')
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }


}
