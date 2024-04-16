import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './landing/pricing/pricing.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PlansMembershipComponent } from './plans-membership/plans-membership.component';
import { ChatComponent } from './chat/chat.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'jobs',
        loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
      },
      {
        path: 'manage-coins',
        loadChildren: () =>
          import('./manage-coins/manage-coins.module').then(
            (m) => m.ManageCoinsModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'advance-table',
        loadChildren: () =>
          import('./advance-table/advance-table.module').then(
            (m) => m.AdvanceTableModule
          ),
      },

      {
        path: 'candidates',
        loadChildren: () =>
          import('./candidates/candidate.module').then(
            (m) => m.CandidateModule
          ),
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          ),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'plans-membership',
        component: PlansMembershipComponent,
      },

      {
        path: 'transaction-history',
        component: TransactionHistoryComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
    ],
  },

  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'newAuthentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./new-authentication/new-authentication.module').then(
        (m) => m.NewAuthenticationModule
      ),
  },
  {
    path: 'landing',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
