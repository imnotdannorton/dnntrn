<template>
  <div class="project-single welcome">
    <i class="fa fa-close" v-if="slideshow.activeSlides.length > 0" v-on:click="clearLightbox()" aria-hidden="true"></i>
    <transition name="fade">
      <lightbox v-if="slideshow.activeSlides.length > 0" v-bind:slides="slideshow.activeSlides" v-bind:index="slideshow.activeSlideIndex"></lightbox>
    </transition>
    <div class="big_image">
      <img v-bind:src="project.bigImg" />
      <h1>{{project.title}}</h1>
    </div>
    <p class="project" v-html="project.desc"></p>
    <ul class="project-slides darkvibrant_bg">
      <li v-for="(image, index) in project.images" v-on:click="setActiveSlide(project.images, index)" v-on:mouseover="darkenBg(item, index)"  v-on:mouseleave="removeDarkenBg(index)">
        <img v-bind:src="getHires(image.fields.file.url, 150, 150)" />
        <strong>{{image.fields.title}}</strong>
      </li>
    </ul>
    <!-- <textarea>
      {{project.sampleCode}}
    </textarea> -->
  </div>
</template>

<script>
  import axios from 'axios';
  import marked from 'marked';
  import jquery from 'jquery';
  import lightbox from './lightbox.vue';
  export default {
    name: 'Project',
    data: () => ({
      project:{},
      slug:"",
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
          return file+'?fl=progressive&fit=fill&w='+width+'&h='+height;
        }else if(h && !w){
          return file+'?fl=progressive&h='+width;
        }else if(w && !h){
          return file+'?fl=progressive&w='+width;
        }else{
          return file+'?fl=progressive';
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
    components:{
      lightbox
    },
    beforeMount() {
      this.slug = window.location.pathname.split('/')[2];
      axios.all([
        axios.get('/api/projects/'+this.slug)
      ]).then(([{data: entryData}]) => {
        this.project = entryData.items[0]['fields'];
        this.project.desc = marked(this.project.description);
        this.project.bigImg = this.getHires(this.project.images[0].fields.file.url, 1000)
        console.log(this.project.images);
      });
    }
  };
</script>
