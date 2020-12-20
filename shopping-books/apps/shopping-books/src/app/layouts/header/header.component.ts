import { Component } from '@angular/core';

import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'shopping-books-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
title = "supply chain";
 

  constructor(private sideNavService: SideNavService) {}

  clickMenu() { 
    this.sideNavService.toggle();
  }

}
