import { Routes } from '@angular/router';
import { Forum } from './components/forum/forum';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'forum', component: Forum }
];
