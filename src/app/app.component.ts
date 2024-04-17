import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './service/auth.service'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Reportes de fallas';

  isLoggedIn!: boolean;
  rolUsuario: string | null = null;
  nombreUsuario: string | null = null;


  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.userRole$.subscribe(userRole => {
      this.rolUsuario = userRole;
    });
    
    this.authService.userName$.subscribe(userName => {
      this.nombreUsuario = userName;
    });
    // this.router.navigate(['/Home']);
    // console.log(this.rolUsuario)
  }

  logout() {
    this.authService.logout();
  }

}
