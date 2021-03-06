import { Component, OnInit, Input } from '@angular/core';
import { Categories, Navigation } from '../project/shared/model';
import { ProjectFilterService } from '../project/shared/project-filter.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	private activeFilter: Categories;
	@Input() navigationItems: Navigation;

	constructor(private router: Router, private projectFilterService: ProjectFilterService) {}

	ngOnInit() {
		this.projectFilterService.filterChanged().subscribe((x: Categories) => {
			this.activeFilter = x;
		});
	}

	filter(category: Categories) {
		this.logNavigation(category);
		this.navigateToPage(category);
	}

	isActive(category: Categories) {
		return this.activeFilter === category;
	}

	logNavigation(category: Categories) {
		ga('send', {
			hitType: 'event',
			eventCategory: 'Navigation',
			eventAction: 'Click',
			eventLabel: category
		});
	}

	navigateToPage(category: Categories) {
		if (category === Categories.Contact) {
			this.activeFilter = category;
			this.router.navigate(['/contact']);
		} else {
			this.router.navigate(['/projects'], { queryParams: { category: category } });
		}
	}
}
