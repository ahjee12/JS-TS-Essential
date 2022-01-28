import {RouteInfo} from '../types'
import View from './view.js'


export default class Router { 
    routeTable: RouteInfo[];
    defaultRoute: RouteInfo | null;
  
    constructor() {
      //app.ts에서 처럼 router. 쩜 하고 setDefaultPage로 접근하는 게 아니라
      // 
      window.addEventListener('hashchange', this.route.bind(this));
  
      this.routeTable = [];
      this.defaultRoute = null;
    }
    
    setDefaultPage(page: View): void {
      this.defaultRoute = { path: '', page };
    }
  
    addRoutePath(path: string, page: View): void {
      this.routeTable.push({ path, page });
    }
  
    route() {
      const routePath = location.hash;
  
      if (routePath === '' && this.defaultRoute) {
        this.defaultRoute.page.render();
      }
      //
      for (const routeInfo of this.routeTable) {
        if (routePath.indexOf(routeInfo.path) >= 0) {
          routeInfo.page.render();
          break;
        }
      }
    }
  }