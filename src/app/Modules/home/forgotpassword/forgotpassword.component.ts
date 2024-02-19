import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  forgotpassForm!: FormGroup;
  userData: any;
  faXIcon = faX;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.forgotpassForm = this.formBuilder.group({
      email: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
    });
   }
 
}
