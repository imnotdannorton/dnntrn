
  <template>
    <div id="navwrap">
      <header v-on:click="navActive = !navActive">
        <i class="fa fa-close" v-if="navActive" aria-hidden="true"></i><i class="fa fa-bars" v-else aria-hidden="true"></i><em><img v-bind:src="image"/>DAN NORTON</em>
      </header>
      <nav>
        <ul v-bind:class="{ active:navActive }">
          <li v-for='item in items'><a v-bind:href="item.link">{{item.name.toLowerCase()}}</a></li>
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
        image: ""
      }),
      methods:{
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
