import { Component } from '@angular/core';
import { Banner } from './components/banner/banner';
import { Details } from './components/details/details';
import { Calculator } from './components/calculator/calculator';
import { Content } from './components/content/content';
import { Cards } from './components/cards/cards';
import { Accesibility } from './components/accesibility/accesibility';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Banner, Details, Calculator, Content, Cards, Accesibility],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

}
