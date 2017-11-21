<template>
  <div class="project-list">
    <h1 class="darkmuted">Projects</h1>
    <div v-for="item in items"  class="project-holder" v-bind:class="[item.fields.slug]">
      <img v-bind:src="getHires(item.fields.images[0].fields.file.url, 1000)" />
      <h2 class="darkvibrant_bg_solid">{{item.fields.title}}</h2>
      <em class="position darkmuted">{{item.fields.position}}</em>
      <p class="darkmuted" v-html="markdown(item.fields.description)"></p>
      <em v-on:click="showProject(item)" class="show">More &raquo;</em>
      <ul class="project-slides darkmuted_bg">
        <li v-for="image in item.fields.images" v-on:click="setActiveSlide(image)">
          <img v-bind:src="getHires(image.fields.file.url, 150, 150)" />
          <strong>{{image.fields.title}}</strong>
        </li>
      </ul>
      <em v-on:click="hideProject(item)" class="hide">Less</em>
      <hr class="muted muted_bg_solid"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import marked from 'marked';
  import jquery from 'jquery';
  export default {
    name: 'Projects',
    data: () => ({
      items: [],
      trim: function(string){
        var sentence = string.split('.');
        return sentence[0]+'...';
      },
      markdown: function(string){
        return marked(string);
      },
      getHires(file, w, h){
        var scale = window.devicePixelRatio;
        var width = w*scale;
        var height = h*scale;
        if(w && h){
          return file+'?fm=jpg&fl=progressive&fit=fill&w='+width+'&h='+height;
        }else if(h && !w){
          return file+'?fm=jpg&fl=progressive&h='+width;
        }else if(w && !h){
          return file+'?fm=jpg&fl=progressive&w='+width;
        }else{
          return file+'?fm=jpg&fl=progressive';
        } 
      },
      activeSlide:null
    }),
    methods:{
      showProject: function(obj){
        // show slide slides
        jquery('.'+obj.fields.slug+' ul.project-slides').addClass("active");
        // switch toggles on/off
        jquery('.'+obj.fields.slug+' .show').hide();
        jquery('.'+obj.fields.slug+' .hide').show();
      },
      hideProject: function(obj){
        jquery('.'+obj.fields.slug+' ul.project-slides.active').removeClass("active");
        jquery('.'+obj.fields.slug+' .show').show();
        jquery('.'+obj.fields.slug+' .hide').hide();
      },
      setActiveSlide: function(obj){
        this.activeSlide = obj;
      }
    },
    beforeMount() {
      axios.all([
        axios.get('/api/entries/project')
      ]).then(([{data: entryData}]) => {
        console.log(entryData);
        this.items = entryData.items;
      });
    }
  };
</script>
