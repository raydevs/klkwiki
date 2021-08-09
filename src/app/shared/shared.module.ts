import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './components/search-result/search-result.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SearchService } from '../search/search.service';
import { STORAGE_PROVIDERS } from './storage.service';
import { windowProvider, WindowToken } from './window';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    SearchResultsComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    SearchResultsComponent,
    ThemeToggleComponent
  ],
  providers: [
    SearchService,
    STORAGE_PROVIDERS,
    { provide: WindowToken, useFactory: windowProvider },
  ],
})
export class SharedModule { }
