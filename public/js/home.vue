
  <template>
    <div class="welcome home">
      <!-- <img v-bind:src="image"/> -->
      <transition name="blur">
        <h1 v-if="activeHi" class="vibrant hello">{{activeHi}}!</h1>
      </transition>
      <p>I'm Dan Norton, a Boston area Developer and Designer.</p>
      <p>It's been a while since I made a site update, so I decided to experiment with VueJS, Contentful, and Node to put this all together.</p> 
      <p>Thanks for stopping by! Feel free to <a href="/projects">check out some projects,</a> <a href="/about">learn a bit more about me,</a> or <a href="/contact">get in touch.</a></p>
      <!-- <div class="fs_img"></div> -->
    </div>

  </template>

  <script>
    import axios from 'axios';
    import jquery from 'jquery';
    export default {
      name: 'Home',
      data: () => ({
        image: "",
        activeHi: false,
        salutations:[
          'BONJOUR',
          'HOLA',
          'HALLO',
          'GUTEN TAG',
          'CIAO',
          'OLÀ',
          'NAMASTE',
          'SALAAM',
          'ZDRAS-TVUY-TE',
          'KONNICHIWA',
          'AHN-YOUNG-HA-SE-YO',
          'JAMBO',
          'HABARI',
          'NI HAU',
          'NAY HOH',
          'HI',
          'HELLO',
          'AHOY HOY',
          'GOOD DAY',
          'AHOY',
          'ALOHA',
          'BUENOS DIAS'
        ]
      }),
      methods:{
        aloha: function(){
          var length = this.salutations.length;
          var index = Math.floor(Math.random()*length);
          return this.salutations[index];
        },
        updateSalutation: function(){
          this.activeHi = false;
          this.activeHi = this.aloha();
        }
      },
      beforeMount() {
        this.image = window.palette.sourceImg;
        this.updateSalutation();
        var updateText = setInterval(this.updateSalutation, 5000);
        // axios.all([
        //   axios.get('/api/latest')
        // ]).then(([{ data: spotifyData }]) => {
        //   console.log(spotifyData);
        // });
      }
      // components:{
      //   Project
      // },
    };
  </script>