import { Injectable } from '@angular/core';
import { AppliedTheme, appliedThemeRules } from './themes/AppliedTheme';
import { Theme } from './themes/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _loadedPromise: Promise<void>;
  private _isLoaded = false;
  constructor() {
    this.initialize();
    const links = document.head.querySelectorAll('link');
    if (links.length === 0) {
      this._isLoaded = true;
      this._loadedPromise = Promise.resolve();
    } else {
      console.log(links);
      this._loadedPromise = new Promise(async resolve => {
        await Promise.all(Array.from(links)
          .filter(link => link.rel === 'stylesheet')
          .map(link => new Promise<void>(res => {
            console.log(link);
            if (Array.from(document.styleSheets).findIndex(_ => _.href === link.href) < 0) {
              link.addEventListener('load', () => {
                res();
              });
            } else {
              res();
            }
          })));
        this._isLoaded = true;
        this.initialize();
        resolve();
      });
    }
  }

  public async rootTheme(): Promise<AppliedTheme> {
    await this.loaded;
    return AppliedTheme.forRoot();
  }

  public async elementTheme(elm: HTMLElement): Promise<AppliedTheme> {
    await this.loaded;
    return AppliedTheme.forElement(elm);
  }

  public async selectorTheme(selector: string): Promise<AppliedTheme> {
    await this.loaded;
    return AppliedTheme.forSelector(selector);
  }

  public async theme(name: string): Promise<Theme> {
    await this.loaded;
    return Theme.get(name);
  }

  private get loaded(): Promise<void> {
    return this._loadedPromise;
  }

  private get isLoaded(): boolean {
    return this._isLoaded;
  }

  private initialize(): void {
    appliedThemeRules.toArray().forEach(r => {
      const sel = r.selectorText.split(':root')?.[1]?.trim() || null;
      const appliedTheme = sel === null ? AppliedTheme.forRoot() : AppliedTheme.forSelector(sel);
      console.log(appliedTheme);
    });

  }
}
