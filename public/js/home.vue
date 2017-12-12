
  <template>
    <div class="welcome">
      <!-- <img v-bind:src="image"/> -->
      <transition name="blur">
        <h1 v-if="activeHi.length > 0" class="vibrant">{{activeHi}}!</h1>
      </transition>
      <p>I'm Dan Norton, a Boston area Developer and Designer.</p> 
      <p>Thanks for stopping by! Feel free to <a href="/projects">check out some projects</a>, <a href="/about">learn a bit more about me</a>, or <a href="/contact">get in touch.</a></p>
      <!-- <div class="fs_img"></div> -->
    </div>

  </template>

  <script>
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
      }
      // components:{
      //   Project
      // },
    };
  </script>