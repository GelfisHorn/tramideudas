import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environments';
import { AuthResponse, Usuario } from '../interfaces/interface';
import { switchMap, of, catchError, tap } from 'rxjs';
import { UserService } from 'app/core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService_ {
// url base que esta en envionment
  private baseUrl: String = environment.baseUrl;
  private _usuario!: Usuario;
  private _authenticated: boolean = false;

//
get usuario(){
    return { ...this._usuario };
}

// llamo metodo http
  constructor(private http:HttpClient, private _userService:UserService) { }

  set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

//   creo funcion recibo parametros
  login(user: string, password: string){

    // variables de url y datos de usuario que pide api
    const url = `${this.baseUrl}/auth/login`
    const body = { username:user, password:password }

    // al llamar el metodo asi se ejecuta la api
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap(res => {
            if(res.response.username === 'admin'){
                this._usuario = {
                    avatar: res.response.avatar,
                    email: res.response.email,
                    fullName:  res.response.fullname,
                    username:  res.response.username,
                }
            }
        }),
        switchMap((response:any)=>{
                // almacenar el token de acceso en el localStorage
                this.accessToken = response.accesToken;
                // establecer el indicador autenticado en verdadero
                this._authenticated = true;
                // almacenar al usuario en el servicio usuario
                this._userService.user = response

                return of(response)

        }),
        catchError(err => of(false))
      )
  }
}


