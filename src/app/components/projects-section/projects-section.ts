import { Component } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-projects-section',
  imports: [ProjectCard],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
})
export class ProjectsSection {
  protected readonly projects = PORTFOLIO.projects;
}
