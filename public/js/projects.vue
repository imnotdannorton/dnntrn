<template>
  <div class="project-list">
    <i class="fa fa-close" v-if="slideshow.activeSlides.length > 0" v-on:click="clearLightbox()" aria-hidden="true"></i>
    <transition name="fade">
      <lightbox v-if="slideshow.activeSlides.length > 0" v-bind:slides="slideshow.activeSlides" v-bind:index="slideshow.activeSlideIndex"></lightbox>
    </transition>
    <h1 class="darkmuted">Projects</h1>
    <div v-for="item in sortedProjects"  class="project-holder" v-bind:class="[item.fields.slug]">
      <img v-bind:src="getHires(item.fields.images[0].fields.file.url, 1000)" />
      <h2 class="darkvibrant_bg_solid">{{item.fields.title}}</h2>
      <em class="position darkmuted">{{item.fields.position}}</em>
      <p class="project-blurb show" v-bind:class="[item.fields.slug]" v-html="markdown(trim(item.fields.description))"></p>
      <p class="darkmuted hide" v-html="markdown(item.fields.description)"></p>
      <em v-on:click="showProject(item)" class="show darkvibrant_bg_solid">Read More</em>
      <ul class="project-slides darkvibrant_bg">
        <li v-for="(image, index) in item.fields.images" v-on:click="setActiveSlide(item.fields.images, index)" v-on:mouseover="darkenBg(item, index)"  v-on:mouseleave="removeDarkenBg(index)">
          <img v-bind:src="getHires(image.fields.file.url, 150, 150)" />
          <strong>{{image.fields.title}}</strong>
        </li>
      </ul>
      <em v-on:click="hideProject(item)" class="hide darkvibrant_bg_solid">Read Less</em>
      <hr class="muted muted_bg_solid"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import marked from 'marked';
  import jquery from 'jquery';
  import lightbox from './lightbox.vue'
  // import emitter from './emitter.vue'
  export default {
    name: 'Projects',
    data: () => ({
      items: [],
      trim: function(string){
        var sentence = string.split('.');
        return sentence[0]+'. '+sentence[1]+'...';
      },
      activeProject:{
        activeSlides:[],
        activeSlideIndex: null
      },
      slideshow:{
        activeSlides:[]
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
      setActiveSlide: function(array, index){
        console.log("setting activeSlides", array, index);
        this.slideshow.activeSlides = array;
        this.slideshow.activeSlideIndex = index;
        // Vue.set(this.slideshow, 'activeSlides', array);
      },
      // closeProject
      clearLightbox: function(){
        console.log("clearingLightbox");
        this.slideshow.activeSlides = [];
        this.slideshow.activeSlideIndex = 0;
      },
      activeSlides: function(){
        return this.slideshow.activeSlides
      },
      activeSlideIndex: function(){
        return this.slideshow.activeSlideIndex
      }
    }),
    methods:{
      prevSlide: function(){
        this.activeProject.activeSlideIndex--;
      },
      nextSlide: function(){
        this.activeProject.activeSlideIndex++;
      },
      darkenBg:function(obj, index){
        // console.log(jquery('.'+obj.fields.slug+' ul.project-slides li'), index);
        // var elem = 
        // jquery('.'+obj.fields.slug+' ul.project-slides li')[index].addClass("darkvibrant_bg_solid");
      },
      removeDarkenBg:function(obj, index){
        // jquery('.'+obj.fields.slug+' ul.project-slides li')[index].removeClass("darkvibrant_bg_solid");
      },
      showProject: function(obj){
        this.activeProject = obj;
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
      }
    },
    computed:{
      sortedProjects: function(){
        return this.items.sort(function(a, b){
          return a.fields.sortIndex - b.fields.sortIndex
        })
      }
    },
    watch:{
      activeSlides: function(){
        console.log("activeSlides update: ", this.activeProject.activeSlides);
        return this.activeProject.activeSlides
      },
      // activeSlideIndex: function(){
      //   return this.activeSlideIndex
      // }
    },
    beforeMount() {
      axios.all([
        axios.get('/api/entries/project')
      ]).then(([{data: entryData}]) => {
        console.log(entryData);
        this.items = entryData.items;
      });
    },
    created(){
      // emitter.$on('closeLightbox', function(){
      //   console.log("clearLightbox")
      // });
    },
    components:{
      lightbox
    }
  };
</script>
