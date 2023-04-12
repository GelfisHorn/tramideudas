import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class AuthSignInComponent implements OnInit {

    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message:string } = {
        type : 'success',
        message: 'Bienvenido'
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    user = {
        email: 'admin',
        password:'1234'
    }
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ){}
    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email     : [ this.user.email, [Validators.required, Validators.email]],
            password  : [ this.user.password, Validators.required],
            rememberMe: ['']
        });
    }
    signIn(): void {
        if ( this.signInForm.invalid )
        {
            return;
        }
        this.signInForm.disable();
        this.showAlert = false;
        this._authService.signIn(this.signInForm.value)
        .subscribe(
            () => {
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);

            },
            (response) => {
                this.signInForm.enable();
                this.signInNgForm.resetForm();
                this.alert = {
                    type   : 'error',
                    message: 'Fallo de  email o password'
                };
                this.showAlert = true;
            }
        );
    }
}
