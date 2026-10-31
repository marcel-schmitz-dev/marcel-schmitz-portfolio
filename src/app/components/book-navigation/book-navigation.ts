import { Component, input, output } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';

@Component({
  selector: 'app-book-navigation',
  templateUrl: './book-navigation.html',
  styleUrl: './book-navigation.scss',
})
export class BookNavigation {
  readonly active = input.required<number>();
  readonly select = output<number>();

  protected readonly items = PORTFOLIO.nav;
  protected readonly githubUrl = PORTFOLIO.contact.github;
}
