import {Component} from 'angular2/core';
import {LoginCmp, ProfileCmp, RegisterCmp, Profile, ProfileService, BaseHttpService} from 'angular2-auth-component/index';

import {DfDataCmp} from 'angular2-data-component/index';
 
@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [DfDataCmp],
  providers: [BaseHttpService, ProfileService]
})

export class HomeCmp {
	profile: Profile = new Profile();

	constructor(private profileService: ProfileService) {
		var self = this;
		this.profileService
			.get()
			.subscribe((data) => {
				self.profile = data;
			});
	}
}
