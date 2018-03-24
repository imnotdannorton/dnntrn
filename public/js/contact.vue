<template>
  <div id="contact" class="welcome">
    <h1>Get In Touch:</h1>
    <ul>
      <li><a href="mailto:%6E%6F%72%74%6F%6E%2E%64%61%6E%40%67%6D%61%69%6C%2E%63%6F%6D">I have email.</a></li>
      <li><a href="https://www.linkedin.com/in/dan-norton/">I'm on LinkedIn.</a></li>
      <li><a href="https://github.com/imnotdannorton/">I'm on GitHub.</a></li>
      <li><a href="https://twitter.com/dannorton/">I'm on Twitter.</a></li>
      <li><a href="https://instagram.com/dannorton/">I'm on Instagram.</a></li>
      <li><a href="https://open.spotify.com/user/dannorton">I'm on Spotify.</a></li>
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