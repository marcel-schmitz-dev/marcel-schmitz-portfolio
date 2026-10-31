import { Component, output } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.html',
  styleUrl: './hero-page.scss',
})
export class HeroPage {
  protected readonly p = PORTFOLIO;
  /** Wird vom Buch ausgewertet: blättert zur Seite „About“. */
  readonly more = output<void>();
}
