import Vue from 'vue';
// import VueRouter from 'vue-router';
import axios from 'axios';
import jquery from 'jquery';
import Navigation from './nav.vue';
import Contact from './contact.vue';
import Home from './home.vue';
import Projects from './projects.vue';
import Project from './project.vue';
import NotFound from './notfound.vue';



var routesArray = [
	{ path: '/', component: Home},
	{ path: '/contact', component: Contact },
	{ path: '/projects', component: Projects },
	{ path: '/project', component: Project },
	{ path: '/oops', component: NotFound }
];

var routes = {
	'/': Home,
	'/contact': Contact ,
	'/projects': Projects ,
	'/project': Project ,
	'/oops': NotFound 
};

// const router = new VueRouter({
// 	routesArray
// });
// var NotFound = {template: '<p>OOps!</p>'};
// Vue.use(VueRouter);
jquery('nav em').on('click', function(event){
	jquery('#app-nav ul').toggleClass('active');
});
new Vue({
  el: '#app-root',

  data: {
    currentRoute: window.location.pathname
  },
  // render(createElement) {
 	// 	return createElement(Navigation);
  // },
  computed: {
    ViewComponent () {
    	console.log(this.currentRoute, Project);
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
});
// const app = new Vue({
// 	routes:routesArray,
// 	mode: 'history',
// 	render (h) { return h(Home) }
// }).$mount('#app-root');