import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchValue = '';

  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  constructor(private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchValue = this.searchService.currentSearch;
  }

  onSearch() {
    this.searchService.setSearch(this.searchValue.trim());
    this.router.navigate(['/catalog']);
  }

  clearSearch() {
    this.searchValue = '';
    this.searchService.clearSearch();
    this.router.navigate(['/catalog']);
  }

}
