import { Component } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';

@Component({
  selector: 'app-about-facts',
  templateUrl: './about-facts.html',
  styleUrl: './about-facts.scss',
})
export class AboutFacts {
  protected readonly facts = PORTFOLIO.aboutFacts;
}
