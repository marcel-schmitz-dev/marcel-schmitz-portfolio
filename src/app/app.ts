import { Component } from '@angular/core';
import { PortfolioBook } from './components/portfolio-book/portfolio-book';

@Component({
  selector: 'app-root',
  imports: [PortfolioBook],
  template: '<app-portfolio-book />',
})
export class App {}
