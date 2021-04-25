import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { CardsComponent } from '../app/cards/cards.component';
import { HomeComponent } from '../app/home/home.component';
import { ExploreComponent } from '../app/explore/explore.component';
import { RegisterComponent } from '../app/register/register.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAddProdComponent } from './admin/admin-add-prod/admin-add-prod.component';
import { AdminAddStoreComponent } from './admin/admin-add-store/admin-add-store.component';
import { AuthGuard } from './admin/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'explore/:store',
    component: ExploreComponent,
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/product',
    component: AdminAddProdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/store',
    component: AdminAddStoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/store:id',
    component: AdminAddStoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
