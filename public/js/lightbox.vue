<template>
	<div class="project-overlay" v-if="slidesList.length >= 1">
    <!-- <span>{{slidesList}}</span> -->
    <div id="project-detail" v-if="slidesList.length >= 1">
      <!-- <i class="fa fa-close" v-on:click="closeProject()" aria-hidden="true"></i> -->
      <div class="arrow-wrap">
        <div class="previous-slide" v-if="slidesIndex > 0" v-on:click="prevSlide()" ><i class="fa fa-angle-left" aria-hidden="true"></i></div>
        <div class="next-slide" v-if="slidesIndex < slidesList.length-1" v-on:click="nextSlide()"><i class="fa fa-angle-right" aria-hidden="true"></i></div>
      </div>
      <div class="detail-image">
        <img v-if="slidesList" v-bind:src="slidesList[slidesIndex].fields.file.url"/>
        <p v-if="slidesList">{{slidesList[slidesIndex].fields.description}}</p>
      </div>
      
    </div>
   </div>
</template>
<script>
	// import emitter from './emitter.vue'
	export default {
    name: 'lightbox',
    data: function(){
    	return{
    		slidesList:this.slides, 
      	slidesIndex:this.index
    	}
    },
    props:['slides', 'index'],
    methods:{
    	closeProject: function(){
    		this.slidesList = [];
    		console.log("clicked close");
        this.$emit('closeLightbox');
      },
      prevSlide: function(){
        this.slidesIndex--;
      },
      nextSlide: function(){
        this.slidesIndex++;
      }
    },
    computed:{
    	// closeProject: function(){
     //    this.activeSlides = false;
     //    this.activeSlideIndex = false;
     //  },
      // prevSlide: function(){
      //   this.activeProject.activeSlideIndex--;
      // },
      // nextSlide: function(){
      //   this.activeProject.activeSlideIndex++;
      // }
      // toggleNav: function(){
      //   jquery('#navwrap header').on('click', function(event){
      //     console.log(this.navActive, event.target);
      //     if(this.navActive === false){
      //       jquery('#navwrap ul').addClass('active');  
      //       this.navActive = true;
      //     }else{
      //       jquery('#navwrap ul').removeClass('active');
      //       this.navActive = false;
      //     }
      //   });
      // }
    }
  };
</script>