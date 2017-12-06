import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import jquery from 'jquery';
import Navigation from './nav.vue';
import Contact from './contact.vue';
import Home from './home.vue';
import Projects from './projects.vue';
import Project from './project.vue';
import NotFound from './notfound.vue';
import about from './about.vue';
import experience from './experience.vue'



var routesArray = [
	{ path: '/', component: Vue.component(Home)},
	{ path: '/contact', component: Vue.component(Contact) },
	{ path: '/projects', component: Vue.component(Projects) },
	{ path: '/about', component: Vue.component(about) },
	{ path: '/experience', component: Vue.component(experience) },
	{ path: '/projects/:slug', component: Vue.component(Project) },
	{ path: '/oops', component: Vue.component(NotFound) }
];

var routes = {
	'/': Home,
	'/contact': Contact ,
	'/projects': Projects ,
	'/project': Project ,
	'/about': about,
	'/experience': experience,
	'/oops': NotFound 
};

const router = new VueRouter({
	routes:routesArray,
	mode: 'history',
});
const emitter = new Vue();
// var NotFound = {template: '<p>OOps!</p>'};
Vue.use(VueRouter);
// jquery('nav em').on('click', function(event){
// 	jquery('#app-nav ul').toggleClass('active');
// });
var swatchlength = document.getElementsByClassName('swatch').length
var expandText = function(){
	var index = Math.floor(Math.random()*swatchlength);
	// document.getElementsByClassName('swatch active').removeClass('expand');
	var exp = document.getElementsByClassName('swatch expand')
	if(exp.length > 0){
		exp[0].classList.remove('expand');
	}
	// exp.classList.remove('expand');
	document.getElementsByClassName('swatch')[index].className += ' expand';
}
expandText();
var expandTime = setInterval(expandText, 5000);

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
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
});
const app = new Vue({
	render (h) { return h(Navigation) }
}).$mount('#app-nav');