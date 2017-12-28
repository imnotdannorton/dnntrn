
  <template>
    <div id="navwrap">
      <header v-on:click="navActive = !navActive">
        <i class="fa fa-close" v-if="navActive" aria-hidden="true"></i><i class="fa fa-bars" v-else aria-hidden="true"></i><em><img v-bind:src="image"/>DAN NORTON</em>
        <ul class="desktop">
          <a v-bind:href="item.link" v-bind:class="{active:isActive(item.link)}" v-for='item in items'><li>{{item.name.toLowerCase()}}</li></a>
        </ul>
      </header>
      <nav class="mobile">
        <ul v-bind:class="{ active:navActive }">
          <a v-bind:href="item.link" v-for='item in items' v-bind:class="{active:isActive(item.link)}"><li>{{item.name.toLowerCase()}}</li></a>
        </ul>
      </nav>
    </div>
  </template>

  <script>
    import axios from 'axios';
    import Project from './project.vue'
    import jquery from 'jquery';
    export default {
      name: 'Navigation',
      data: () => ({
        items: [],
        navActive: false,
        image: "",
        desktop: function(){
          if(window.innerWidth <= 800 && window.innerHeight <= 600) {
           return false;
         } else {
           return true;
         }
        },
        activePath: function(){
          return window.location.pathname;
        }
      }),
      methods:{
        isActive: function(string){
          // console.log("path:", window.location.pathname, string, window.location.pathname.indexOf(string.replace('/', '')));
          if(string == '/projects'){
            string = '/project'
          }
          if(string == '/' && window.location.pathname === '/'){
            return true
          }else if(string == '/' && window.location.pathname !== '/'){
            return false
          }else{
            return window.location.pathname.indexOf(string.replace('/', '')) > -1
          }
          // return window.location.pathname.indexOf(string.replace('/', '')) > -1
        }
        // desktop: function(){
        //   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
        //    return false;
        //  } else {
        //    return true;
        //  }
        // }
        // toggleNav: function(){
        //   jquery('#navwrap header').on('click', function(event){
        //     console.log(this.navActive, event.target);
        //     if(this.navActive === false){
        //       jquery('#navwrap ul').addClass('active');  
        //       this.navActive = true;
        //     }else{
        //       jquery('#navwrap ul').removeClass('active');
        //       this.navActive = false;
        //     }
        //   });
        // }
      },
      beforeMount() {
        this.image = window.palette.sourceImg;
        axios.all([
          axios.get('/api/entries/navigation'),
          axios.get('/api/entries/project')
        ]).then(([{ data: navData }, {data: entryData}]) => {
          this.items = navData.items[0].fields.items.items;
        });
      },
      components:{
        Project
      },
    };
  </script>
