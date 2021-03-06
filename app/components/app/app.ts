import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {
  Router,
  RouteConfig,
  ROUTER_DIRECTIVES,
  Location
} from 'angular2/router';

import {LoginCmp, ProfileCmp, RegisterCmp, Profile, ProfileService, BaseHttpService} from 'angular2-auth-component/index';

import {HomeCmp} from '../home/home';


@Component({
  selector: 'app',
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  providers: [BaseHttpService, ProfileService]
})
@RouteConfig([
  { path: '/home', component: HomeCmp, as: 'Home' },
  { path: '/profile', component: ProfileCmp, as: 'Profile' },
  { path: '/login', component: LoginCmp, as: 'Login' },
  { path: '/register', component: RegisterCmp, as: 'Register' }
])
export class AppCmp {

  hideHeader: boolean = false;
  profile: Profile = new Profile();
  showDd: Boolean = false;

  constructor (private httpService: BaseHttpService, private _router:Router, private profileService: ProfileService, private location: Location) {
    var self = this;

    if (!this.location.path()) {
      this._router.navigate(['/Home']);
    }
    
    _router.subscribe((path) => {
      if (path === 'login' || path === 'register') {
        self.hideHeader = true;
      } else {
        self.hideHeader = false;
      }
    });

    ProfileService.$$profileUpdated.subscribe((profile) => {
      self.profile = profile;
    });
  }

  logout () {
    this.httpService.http._defaultOptions.headers.set('X-Dreamfactory-Session-Token', '');
    localStorage.setItem('session_token', '');
    this._router.navigate(['Login']);
  }

  toggleDd () {
    this.showDd = !this.showDd;
  }
}
