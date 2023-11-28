import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapitalsComponent } from './components/capitals/capitals.component';
import { CapitalComponent } from './components/capital/capital.component';

const routes: Routes = [
  { path: 'capitals', component: CapitalsComponent },
  { path: 'capital', component: CapitalComponent },
  { path: '', redirectTo: '/capital', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
