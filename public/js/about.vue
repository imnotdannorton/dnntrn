
  <template>
    <div class="welcome">
      <h1 class="vibrant">About</h1>
      <p>I'm Dan Norton, a Boston area Developer and Designer.</p> 
      <p>Over my nearly 10 years of experience in Interactive Media, I have helped build ad campaigns, content management systems, mini-games, and flagship sites. A  media arts background sent me on a fairly unique path, where I find myself just as comfortable pushing pixels in photoshop as writing API endpoints in Node. I am currently the in-house Web Lead at Spartan Race, an international Obstacle Course Race company. When I'm not sitting in front of a computer, I am most likely hanging out with my wife and cat, or talking about drums somehwere.</p> 
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