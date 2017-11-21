<template>
  <div class="project-single">
    <h2>Project</h2>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Project',
    data: () => ({
      items: [],
      slug:""
    }),
    props:['slug'],
    beforeMount() {
      axios.all([
        axios.get('/api/projects/'+slug)
      ]).then(([{data: entryData}]) => {
        console.log(entryData);
        this.items = entryData.items[0].fields.items.items;
      });
    }
  };
</script>
