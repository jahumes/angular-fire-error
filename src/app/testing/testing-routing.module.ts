import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from './pages/page/page.component';


const routes: Routes = [{
  path: 'page',
  component: PageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule { }
