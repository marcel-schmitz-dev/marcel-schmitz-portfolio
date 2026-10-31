import { Component, DestroyRef, HostListener, computed, inject, signal } from '@angular/core';
import { PORTFOLIO } from '../../content/portfolio.config';
import { BookNavigation } from '../book-navigation/book-navigation';
import { PageContent } from '../page-content/page-content';
import { SiteFooter } from '../site-footer/site-footer';

type Dir = 'fwd' | 'back';

interface Turn {
  dir: Dir;
  from: number;
  to: number;
  phase: 1 | 2;
}

interface Leaf {
  key: string;
  side: 'left' | 'right';
  spread: number;
  anim: 'right-lift' | 'left-land' | 'left-lift' | 'right-land';
}

const BOOK_MIN_WIDTH = 1100;
const SAFETY_MS = 1600;

/**
 * Das Buch: Doppelseiten (spreads) werden wie echte Seiten umgeblättert.
 * Vorwärts: rechte Seite klappt zur Mitte, danach landet die neue linke Seite.
 * Rückwärts: umgekehrt. Unter 1100 px Breite werden alle Seiten untereinander gezeigt.
 */
@Component({
  selector: 'app-portfolio-book',
  imports: [BookNavigation, PageContent, SiteFooter],
  templateUrl: './portfolio-book.html',
  styleUrl: './portfolio-book.scss',
})
export class PortfolioBook {
  protected readonly bookImage = `url(${PORTFOLIO.bookImage})`;
  protected readonly labels = PORTFOLIO.nav.map((n) => n.label);
  protected readonly spreads = PORTFOLIO.nav.map((_, i) => i);

  protected readonly bookMode = signal(true);
  private readonly current = signal(0);
  private readonly turn = signal<Turn | null>(null);
  private timer: ReturnType<typeof setTimeout> | undefined;

  /** Zielseite für die Navigation (springt sofort, auch während der Animation). */
  protected readonly shown = computed(() => this.turn()?.to ?? this.current());

  protected readonly leftBase = computed(() => {
    const t = this.turn();
    return t ? (t.dir === 'fwd' ? t.from : t.to) : this.current();
  });

  protected readonly rightBase = computed(() => {
    const t = this.turn();
    return t ? (t.dir === 'fwd' ? t.to : t.from) : this.current();
  });

  protected readonly leaves = computed<Leaf[]>(() => {
    const t = this.turn();
    if (!t) return [];
    const key = `${t.dir}-${t.phase}-${t.from}-${t.to}`;
    if (t.dir === 'fwd') {
      return t.phase === 1
        ? [{ key, side: 'right', spread: t.from, anim: 'right-lift' }]
        : [{ key, side: 'left', spread: t.to, anim: 'left-land' }];
    }
    return t.phase === 1
      ? [{ key, side: 'left', spread: t.from, anim: 'left-lift' }]
      : [{ key, side: 'right', spread: t.to, anim: 'right-land' }];
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => clearTimeout(this.timer));
    if (typeof window.matchMedia !== 'function') return;

    const mq = window.matchMedia(`(min-width: ${BOOK_MIN_WIDTH}px)`);
    this.bookMode.set(mq.matches);
    const onChange = (e: MediaQueryListEvent) => this.bookMode.set(e.matches);
    mq.addEventListener('change', onChange);
    destroyRef.onDestroy(() => mq.removeEventListener('change', onChange));
  }

  protected goTo(index: number): void {
    if (!this.bookMode()) {
      document.getElementById(`spread-${index}`)?.scrollIntoView();
      return;
    }
    const from = this.current();
    if (this.turn() || index === from) return;
    this.turn.set({ dir: index > from ? 'fwd' : 'back', from, to: index, phase: 1 });
    // Sicherheitsnetz, falls ein Browser das animationend-Ereignis nicht liefert
    this.timer = setTimeout(() => this.finish(), SAFETY_MS);
  }

  protected onLeafEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget) return;
    const t = this.turn();
    if (!t) return;
    if (t.phase === 1) this.turn.set({ ...t, phase: 2 });
    else this.finish();
  }

  private finish(): void {
    clearTimeout(this.timer);
    const t = this.turn();
    if (t) this.current.set(t.to);
    this.turn.set(null);
  }

  @HostListener('window:keydown', ['$event'])
  protected onKey(event: KeyboardEvent): void {
    if (!this.bookMode() || event.altKey || event.ctrlKey || event.metaKey) return;
    const tag = (event.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const next = this.shown() + (event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0);
    if (next !== this.shown() && next >= 0 && next < this.spreads.length) this.goTo(next);
  }
}
