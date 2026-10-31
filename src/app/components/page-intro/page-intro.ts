import { Component, computed, input } from '@angular/core';
import { IntroKind, PORTFOLIO } from '../../content/portfolio.config';

/** Schmale linke Seite der inneren Doppelseiten: Titel, Einleitung, bei „Kontakt“ die Links. */
@Component({
  selector: 'app-page-intro',
  templateUrl: './page-intro.html',
  styleUrl: './page-intro.scss',
})
export class PageIntro {
  readonly kind = input.required<IntroKind>();
  protected readonly intro = computed(() => PORTFOLIO.intros[this.kind()]);
  protected readonly c = PORTFOLIO.contact;
}
