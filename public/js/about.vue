
  <template>
    <div class="welcome">
      <h1 class="vibrant">About</h1>
      <p>I'm Dan Norton, a Boston area Developer and Designer.</p> 
      <p>Over my nearly 10 years of experience in Interactive Media, I have helped build ad campaigns, billboards, content management systems, mini-games, and flagship sites.</p> 
      <p>Studying Visual and Media Arts at Emerson College gave me the opportunity to dabble in design, ineractive media, photography, and well as motion graphics. The years following my 2008 graduation were spent working in Digital Out Of Home advertising, helping design rich media content for advertisers and network managers. Along the way, I worked with brands like AT&T, ESPN, Levi's, Gap, Sharpie and Paramount.</p>
      <p>In 2013, I began working in <a href="http://www.dailybreak.com" target="_blank" >Native advertisting</a> with brands like Glade, Halls, Dodge, and Sara Lee to build gamified branded experiences. After a stint as the Creative Director, I joined the development team to lead UI design and development.</p>
      <p>My sharpened front-end skills led me to <a href="http://www.spartan.com" target="_blank">Spartan Race</a>, an international Obstacle Course Race company where I am currently the in-house Web Lead.  When I'm not sitting in front of a computer, I am most likely hanging out with my wife and cat, or talking about drums somewhere.</p> 
    </div>
  </template>

  <script>
    import axios from 'axios';
    import marked from 'marked';
    export default {
      name: 'About',
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
          var index = Math.floor(Math.random()*6);
          var shade = window.palette[this.shades[index]];
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