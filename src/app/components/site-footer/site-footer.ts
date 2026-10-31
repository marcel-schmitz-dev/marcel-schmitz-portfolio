import { Component } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly name = PORTFOLIO.name;
  protected readonly tagline = PORTFOLIO.tagline;
  protected readonly year = new Date().getFullYear();
}
