import { Component } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';

@Component({
  selector: 'app-skills-grid',
  templateUrl: './skills-grid.html',
  styleUrl: './skills-grid.scss',
})
export class SkillsGrid {
  protected readonly skills = PORTFOLIO.skills;
}
