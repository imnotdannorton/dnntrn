
  <template>
    <nav class="darkmuted_bg">
      <ul class="lightvibrant">
        <li v-for='item in items'>{{item.name}}</li>
      </ul>
    </nav>
  </template>

  <script>
    import axios from 'axios';
    import Project from './project.vue'
    export default {
      name: 'Navigation',
      data: () => ({
        items: [],
      }),
      beforeMount() {
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
