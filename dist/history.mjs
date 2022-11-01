var u=e=>{let t=e.match(/https:\/\/github.com\/([^\/]+\/[^\/]+)/);return t&&t[1]},h=(e,t)=>e.filter(s=>{if(!t)return !!u(s.url);let{keyword:i,type:n}=t,r=i.toLocaleLowerCase();if(i&&s.url.toLocaleLowerCase().indexOf(r)<0&&s.title.toLocaleLowerCase().indexOf(r)<0)return !1;let c=n.toLocaleLowerCase();return c==="all"?!0:!!s[c]});var d=class{values=[];selectedValue=void 0;constructor(t){this.values=t,this.selectedValue=t[0];}init(){this.container=document.createElement("ul"),this.container.id="github-history-radio";}mount(t){this.init(),this.render(),t.appendChild(this.container);}render(){this.container.innerHTML=this.values.reduce((t,s)=>t+`
    <li class='${this.selectedValue===s&&"selected"}'>${s}</li>
    `,"");}onClick(t){let s=document.getElementById(this.container.id);s.addEventListener("click",i=>{this.values.includes(i.target.innerHTML)&&(Array.from(s.getElementsByTagName("li")).forEach(n=>{n.className="";}),this.selectedValue=i.target.innerHTML,i.target.className="selected",t&&t(this.selectedValue)),i.preventDefault();},!1);}change(t){this.selectedValue=t,this.render();}};var l=class{radio=new d(["All","Issue","PR","Code","Discussions"]);data=[];keyword="";constructor(t){this.fetchData=t,this.init;}init(){this.modal=document.createElement("div"),this.modal.id="github-history-modal",this.modal.className="hide",this.modal.innerHTML=`
      <div id='github-history-modal-body'>
        <div id='github-history-header'>
          <input id='github-history-search' type='text' placeholder="type keyword" autofocus>
        </div>
        <ul id='github-history-result'>
          
        </ul>
        <div id='github-history-footer'>
        <span class='results'></span>
        </div>
      </div>
      <div id='github-history-modal-mask'></div>
    `;}mount(){this.init(),document.body.append(this.modal),this.radio.mount(document.getElementById("github-history-footer")),document.getElementById("github-history-modal-mask").addEventListener("click",()=>this.toggle()),document.getElementById("github-history-search").addEventListener("input",t=>{this.keyword=t.target.value,this.render();}),document.getElementById("github-history-result").addEventListener("click",()=>this.toggle()),this.radio.onClick(()=>this.render());}render(){let t=document.getElementById("github-history-result");t||(this.mount(),t=document.getElementById("github-history-result"));let s=h(this.data,{type:this.radio.selectedValue,keyword:this.keyword}),i=document.getElementById("github-history-footer");document.getElementById("github-history-search").focus(),t.innerHTML=s.reduce((n,r)=>n+`<a class='github-history-link' href=${r.url}><li>
      <img src='https://github.githubassets.com/favicons/favicon.png' >
      <span class='title'>${r.title}</span>
      </li></a>`,""),i.childNodes[1].innerHTML=`
    <span>Search ${this.keyword&&`'${this.keyword}'`}</span>
    <span>Results: </span>
    <span>${s.length}</span>
    `;}toggle(){document.getElementById("github-history-modal")||this.mount(),this.modal.className.indexOf("hide")>-1?this.fetchData().then(t=>{this.data=t,this.modal.className="show",this.render();}):(this.clear(),this.modal.className="hide");}contains(t){return this.modal.contains(t)}visible(){return this.modal.className.indexOf("show")>-1}clear(){this.keyword="",document.getElementById("github-history-search").value="",this.radio.change("All");}};var a=class{style=document.createElement("style");constructor(){this.style.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');
  `;}mount(){document.head.appendChild(this.style);}};var m=()=>new Promise(e=>{chrome.runtime.sendMessage({type:"history-query"},t=>{console.log(t),e(t);});}),o=new l(m),g=new a,y=()=>{chrome.runtime.onMessage.addListener(function(e,t,s){console.log(e),e.type=="history-modal"&&o.toggle();});};document.addEventListener("keydown",e=>{e.code==="Escape"&&o.visible()&&o.toggle();});document.addEventListener("click",e=>{o.visible()&&!o.contains(e.target)&&o.toggle();});y();g.mount();o.mount();
