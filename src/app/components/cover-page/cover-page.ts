import { Component } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';

@Component({
  selector: 'app-cover-page',
  templateUrl: './cover-page.html',
  styleUrl: './cover-page.scss',
})
export class CoverPage {
  protected readonly p = PORTFOLIO;
}
