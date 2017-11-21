<template>
  <div id="Not Found">
    404
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'NotFound',
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
  };
</script>