
  <template>
    <div class="welcome">
      <h1 class="vibrant">Hi!</h1>
      <p>I'm Dan Norton, a Boston area Developer and Designer.</p> 
      <p>Thanks for stopping by, feel free to <a href="/projects">check out some projects</a> or <a href="/contact">get in touch.</a></p>

    </div>
  </template>

  <script>
    export default {
      name: 'Home'
      // data: () => ({
      //   items: [],
      // }),
      // beforeMount() {
      //   axios.all([
      //     axios.get('/api/entries/navigation'),
      //     axios.get('/api/entries/project')
      //   ]).then(([{ data: navData }, {data: entryData}]) => {
      //     this.items = navData.items[0].fields.items.items;
      //   });
      // },
      // components:{
      //   Project
      // },
    };
  </script>