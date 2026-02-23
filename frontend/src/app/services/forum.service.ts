import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  message: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  // Datos quemados de comentarios
  private posts = new BehaviorSubject<Post[]>([
    {
      id: 1,
      title: 'Bienvenido al foro de EcoWatt',
      message: 'Comparte ideas y resuelve dudas con la comunidad',
      author: 'EcoWatt'
    },
    {
      id: 2,
      title: 'Consulta sobre eficiencia',
      message: '¿Cómo puedo mejorar la eficiencia energética en mi hogar?',
      author: 'Usuario1'
    },
    {
      id: 3,
      title: 'Buen funcionamiento',
      message: 'Excelente servicio, muy recomendado.',
      author: 'Usuario2'
    }
  ]);

  public posts$ = this.posts.asObservable();

  constructor() {}

  getPosts(): Post[] {
    return this.posts.value;
  }

  addPost(post: Omit<Post, 'id'>): void {
    const newPost: Post = {
      ...post,
      id: Math.max(...this.posts.value.map(p => p.id), 0) + 1
    };
    this.posts.next([...this.posts.value, newPost]);
  }

  deletePost(id: number): void {
    this.posts.next(this.posts.value.filter(p => p.id !== id));
  }
}
