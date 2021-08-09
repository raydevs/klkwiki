import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorage } from '../../storage.service';

export const storageKey = 'app-theme';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html'
})
export class ThemeToggleComponent implements OnInit {
  isDark = false;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(LocalStorage) private storage: Storage) {
    this.initializeThemeFromPreferences();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.updateRenderedTheme();
  }

  private initializeThemeFromPreferences(): void {
    // Check whether there's an explicit preference in localStorage.
    const storedPreference = this.storage.getItem(storageKey);

    // If we do have a preference in localStorage, use that. Otherwise,
    // initialize based on the prefers-color-scheme media query.
    if (storedPreference) {
      this.isDark = storedPreference === 'true';
    } else {
      this.isDark = matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }

    const initialTheme = this.document.querySelector('#app-initial-theme');
    if (initialTheme) {
      // todo(aleksanderbodurri): change to initialTheme.remove() when ie support is dropped
      initialTheme.parentElement?.removeChild(initialTheme);
    }

    const themeLink = this.document.createElement('link');
    themeLink.id = 'app-custom-theme';
    themeLink.rel = 'stylesheet';
    themeLink.href = `${this.getThemeName()}-theme.css`;
    this.document.head.appendChild(themeLink);
  }

  ngOnInit(): void {
  }

  getThemeName(): string {
    return this.isDark ? 'dark' : 'light';
  }

  getToggleLabel(): string {
    return `Switch to ${this.isDark ? 'light' : 'dark'} mode`;
  }

  private updateRenderedTheme(): void {
    // If we're calling this method, the user has explicitly interacted with the theme toggle.
    const customLinkElement = this.document.getElementById('app-custom-theme') as HTMLLinkElement | null;
    if (customLinkElement) {
      customLinkElement.href = `${this.getThemeName()}-theme.css`;
    }

    this.storage.setItem(storageKey, String(this.isDark));
  }

}
