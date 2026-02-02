import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Header } from './components/header/header';
import { Forum } from './components/forum/forum';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Home, Header, Footer, Forum],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title:number = 27;
}