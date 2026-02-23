import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ForumService, Post } from '../../services/forum.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  isAdmin: boolean = false;
  posts: Post[] = [];

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAdmin = user?.role === 'admin';
      
      if (!this.isAdmin) {
        // Si no es admin, redirigir a forum
        this.router.navigate(['/forum']);
      }
    });

    this.forumService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }

  deletePost(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      this.forumService.deletePost(id);
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
