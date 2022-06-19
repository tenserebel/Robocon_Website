(function(){
    let CSS=`
    .animation--text-typing > *:after{
      display:inline-block;
      content:"|";
      box-shadow:inset 0 0 0 2em;
      opacity:.6;
      transition:margin .2s;
      animation:animation--text-typing-fade 1s linear infinite;
    }
    .animation--text-typing > *:not(:empty):after{
      margin-left:.25em;
    }
    @keyframes animation--text-typing-fade{
      0%{opacity:1}
      24%{opacity:1}
      26%{opacity:0}
      74%{opacity:0}
      76%{opacity:1}
      100%{opacity:1}
    }
    `
    let style = document.createElement("style");
    style.innerHTML = CSS;
    document.head.append(style);
  })();
  
  var nAnimations = nAnimations || (nAnimations={});
  nAnimations.TextTyping = function(el){
    var els = Array.from(el.children);
    let move=-1,i=0,textindex=0;
    var texts = els.map(e=>e.innerText);
    function remove(){
      textindex++;
      if(textindex<0) return;
      
      els[i].innerText = els[i].innerText.substr(0,els[i].innerText.length-1);
      if(els[i].innerText.length==0){
        i = (i+1)%els.length;
        move=1;
        els[i].innerText=""; 
        textindex=-30;
        select();
      }
    }
    
    function write(){
      textindex++;
      if(textindex<0) return;
      
      els[i].innerText = texts[i].substr(0 , textindex ) 
      if(els[i].innerText.length==texts[i].length){
        move=-1;
        textindex=-30;
      }
    }
    
    function select(){
      for(var j=0 ; j<els.length ; j++ ){
        els[j].style.display="none"
      }
      els[i].style.display = "block"
    }
    
    function interval(){
      if(move==-1){
        remove();
      }else{
        write();
      }
    }
    for(let el of els){
      el.style.display="none";
    }
    select();
    let inter = setInterval(e=>{ interval() },50)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    Array.from(document.querySelectorAll(".animation--text-typing")).forEach(el=>{
      nAnimations.TextTyping(el)
    })
  })