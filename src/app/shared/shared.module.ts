import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './components/search-result/search-result.component';


@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchResultsComponent
  ]
})
export class SharedModule { }
