<template>
  <div id="Contact">
    <h1>Get In Touch:</h1>
    <ul>
      <li><a href="https://www.linkedin.com/in/dan-norton/">I'm on LinkedIn.</a></li>
      <li><a href="https://github.com/imnotdannorton/">I'm on GitHub.</a></li>
      <li><a href="mailto:norton.dan@gmail.com">I have email.</a></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Contact',
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