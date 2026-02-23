import { Routes } from '@angular/router';
import { Forum } from './components/forum/forum';
import { Home } from './components/home/home';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'forum', component: Forum },
  { path: 'admin', component: Admin }
];
