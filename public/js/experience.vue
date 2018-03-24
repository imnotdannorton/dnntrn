
  <template>
    <div class="welcome">
      <!-- <h1 class="vibrant">Experience</h1> -->
      <div align="center">
        <h2 class="darkvibrant_bg_solid">CV</h2>
      </div>
      <div  v-for="item in sortedProjects" class="position">
        <h2>{{item.fields.organization}} <em>{{item.fields.position}}</em><small>{{item.fields.dates}}</small></h2>
        <small>{{item.fields.location}}</small>
        <p class="darkmuted" v-html="markdown(item.fields.description)"></p>
        <p class="darkmuted achievements-list" v-bind:style="{'border-color':activeColor()}" v-html="markdown(item.fields.achievementsList)"></p>
      </div>
      <hr class="muted muted_bg_solid"/>
      
      <div class="position">
        
        <h2>Education</h2>
        <h3>Emerson College - <em>B.A. Visual and Media Arts</em><small class="dates">Sep, 2004 - Dec, 2007</small></h3>
        <small>Boston, MA</small>
        <p class="darkmuted achievements-list" v-bind:style="{'border-color':activeColor()}">
          <ul>
            <li>Focus in New Media</li>
            <li>Minor in Photography</li>
            <li>Graduated in 3.5 years</li>
          </ul>
        </p>
      </div>
      <hr class="muted muted_bg_solid"/>
      <div class="position technical">
        <h2>Technical Proficiencies</h2>
        <p class="darkmuted achievements-list" v-bind:style="{'border-color':activeColor()}">
          <ul>
            <li class="header"><strong>Development Languages</strong></li>
            <li>JavaScript (JQuery, NodeJS, AngularJS, Express, VueJS, CoffeeScript)</li>
            <li>SASS/CSS</li>
            <li>HTML</li>
            <li>JADE</li>
            <li>ActionScript3</li>
            <li>PHP</li>
          </ul>
          <ul class="right">
            <li class="header"><strong>Technologies</strong></li>
            <li>AWS</li>
            <li>Heroku</li>
            <li>Grunt</li>
            <li>NPM</li>
            <li>SOAP/REST Web Services</li>
            <li class="header"><strong>Software</strong></li>
            <li>Photoshop</li>
            <li>Illustrator</li>
            <li>After Effects</li>
          </ul>
        </p>
      </div>
      <hr class="muted muted_bg_solid"/>
      <div align="center">
        <a href="/images/DN_Resume_2017.pdf" target="_blank">DOWNLOAD
        </a>
      </div>
      <hr class="muted muted_bg_solid"/>
    </div>
  </template>

  <script>
    import axios from 'axios';
    import marked from 'marked';
    export default {
      name: 'experience',
      data: () => ({
        positions: [],
        shades:["Vibrant","Muted","DarkVibrant","DarkMuted","LightVibrant","LightMuted"],
        markdown: function(string){
          return marked(string);
        }
      }),
      computed:{
        sortedProjects: function(){
          return this.positions.sort(function(a, b){
            return a.fields.sortIndex - b.fields.sortIndex
          });
        }
      },
      methods:{
        activeColor:function(index){
          var index = Math.floor(Math.random()*5);
          var shade = window.palette[this.shades[index]] ||  window.palette["Vibrant"];
          var rgb = shade['_rgb'][0]+','+shade['_rgb'][1]+','+shade['_rgb'][2];
          return 'rgb('+rgb+')';
        } 
      },
      beforeMount() {
        axios.all([
          axios.get('/api/entries/position')
        ]).then(([{ data: posData }]) => {
          console.log(posData);
          this.positions = posData.items;
          
        });
      }
      // components:{
      //   Project
      // },
    };
  </script>