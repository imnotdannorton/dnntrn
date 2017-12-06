
  <template>
    <div class="welcome">
      <!-- <img v-bind:src="image"/> -->
      <h1 class="vibrant">Hi!</h1>
      <p>I'm Dan Norton, a Boston area Developer and Designer.</p> 
      <p>Thanks for stopping by, feel free to <a href="/projects">check out some projects</a> or <a href="/contact">get in touch.</a></p>
    </div>
  </template>

  <script>
    export default {
      name: 'Home',
      data: () => ({
        image: ""
      }),
      beforeMount() {
        this.image = window.palette.sourceImg;
      }
      // components:{
      //   Project
      // },
    };
  </script>