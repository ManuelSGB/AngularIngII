import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ForumService, Post } from '../../services/forum.service';
import { Login } from '../login/login';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, Login],
  templateUrl: './forum.html',
  styleUrls: ['./forum.css'],
})
export class Forum implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  posts: Post[] = [];
  newTitle: string = '';
  newMessage: string = '';
  newAuthor: string = '';

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = user !== null;
      this.isAdmin = user?.role === 'admin';
      
      if (this.isAdmin) {
        // Si es admin, redirigir a admin
        this.router.navigate(['/admin']);
      }
    });

    this.forumService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }

  submitPost(): void {
    if (!this.newTitle || !this.newMessage) {
      alert('Por favor completa el título y el mensaje');
      return;
    }

    this.forumService.addPost({
      title: this.newTitle,
      message: this.newMessage,
      author: this.newAuthor || 'Anónimo'
    });

    this.newTitle = '';
    this.newMessage = '';
    this.newAuthor = '';
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
