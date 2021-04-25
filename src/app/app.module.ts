import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

// Services
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
// User Def Componenet
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { FooterComponent } from './footer/footer.component';
import { FavStoreComponent } from './fav-store/fav-store.component';
import { HotFlatDealsComponent } from './hot-flat-deals/hot-flat-deals.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminAddProdComponent } from './admin/admin-add-prod/admin-add-prod.component';
import { AdminAddStoreComponent } from './admin/admin-add-store/admin-add-store.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CardsComponent,
    HomeComponent,
    ExploreComponent,
    FooterComponent,
    FavStoreComponent,
    HotFlatDealsComponent,
    RegisterComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminNavComponent,
    AdminAddProdComponent,
    AdminAddStoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
