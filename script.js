const storyPanel=document.getElementById('storyPanel');
const storyOpen=document.getElementById('storyOpen');
const storyClose=document.getElementById('storyClose');
const river=document.getElementById('riverTrack');
const opening=document.getElementById('storyOpening');
const openingEnter=document.getElementById('openingEnter');

const openingStyle=document.createElement('style');
openingStyle.textContent=`
.story-opening{position:fixed;inset:0;z-index:300;display:none;overflow:hidden;background:#063b2b;color:#f4efe6}.story-opening.active{display:block}.opening-photo{position:absolute;inset:0;z-index:0;background:radial-gradient(circle at 50% 58%,#0b5c43 0,#063b2b 36%,#04291f 72%)}.opening-photo:before{content:"";position:absolute;left:50%;top:50%;width:min(46vw,430px);height:min(46vw,430px);transform:translate(-50%,-42%) scale(.72);background:url('assets/espresso/espresso.webp') center/contain no-repeat;mix-blend-mode:multiply;opacity:0;filter:drop-shadow(0 28px 42px #0006);animation:coffeeRise 1.05s cubic-bezier(.16,1,.3,1) .45s forwards}.opening-photo:after{content:"";position:absolute;left:50%;top:18%;width:1px;height:0;background:#d8c59a;box-shadow:0 0 18px #d8c59a99;animation:coffeeLine .75s cubic-bezier(.16,1,.3,1) .12s forwards}.opening-door{position:absolute;top:0;bottom:0;width:50.2%;background:#063b2b;z-index:2;transition:transform 1s cubic-bezier(.77,0,.18,1)}.opening-door-left{left:0}.opening-door-right{right:0}.opening-content{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px;pointer-events:none}.opening-brand{font-size:9px;font-weight:900;letter-spacing:.28em;opacity:0;transform:translateY(10px);animation:coffeeFade .5s ease .15s forwards}.opening-line{display:none}.opening-content h2{margin:clamp(250px,42vh,430px) 0 0;font-size:clamp(68px,12vw,172px);line-height:.73;letter-spacing:-.08em;opacity:0;transform:translateY(18px);animation:coffeeFade .72s cubic-bezier(.16,1,.3,1) 1s forwards}.opening-content h2 em{font-family:Georgia,serif;font-weight:400;color:#d8c59a}.opening-content p{margin:20px 0 0;font-size:9px;font-weight:900;letter-spacing:.24em;opacity:0;animation:coffeeFade .55s ease 1.35s forwards}.opening-content p:before{content:"FROM BEAN TO CUP";display:block;margin-bottom:9px;color:#d8c59a;letter-spacing:.28em}.opening-enter{pointer-events:auto;margin-top:24px;border:1px solid #f4efe699;border-radius:999px;background:#f4efe60a;color:#f4efe6;padding:12px 18px;font-size:8px;font-weight:900;letter-spacing:.18em;opacity:0;animation:coffeeFade .55s ease 1.55s forwards;cursor:pointer}.story-opening.entering .opening-door-left{transform:translateX(-102%)}.story-opening.entering .opening-door-right{transform:translateX(102%)}.story-opening.entering .opening-content{opacity:0;transition:opacity .3s ease}.story-opening.entering .opening-photo{transform:scale(1.08);opacity:0;transition:transform 1s cubic-bezier(.16,1,.3,1),opacity .75s ease .2s}@keyframes coffeeRise{to{opacity:1;transform:translate(-50%,-48%) scale(1)}}@keyframes coffeeLine{to{height:20%}}@keyframes coffeeFade{to{opacity:1;transform:none}}@media(max-width:850px){.opening-photo:before{width:62vw;height:62vw;top:43%}.opening-photo:after{top:13%}.opening-content h2{margin-top:45vh;font-size:21vw}.opening-content p{font-size:7.5px;line-height:1.6}.opening-enter{margin-top:18px}}@media(max-width:430px){.opening-photo:before{width:68vw;height:68vw;top:41%}.opening-content h2{margin-top:43vh;font-size:20vw}}@media(prefers-reduced-motion:reduce){.opening-photo:before,.opening-photo:after,.opening-brand,.opening-content h2,.opening-content p,.opening-enter{animation:none!important;opacity:1!important;transform:none!important}.opening-photo:before{transform:translate(-50%,-48%)!important}.opening-photo:after{height:20%}.opening-door{transition:none!important}}
`;
document.head.appendChild(openingStyle);

const revealItems=[...document.querySelectorAll('.story-reveal')];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in-view')});
},{root:storyPanel,threshold:.18});
revealItems.forEach(item=>revealObserver.observe(item));

let openingTimer;
function finishOpening(){
  if(!opening)return;
  clearTimeout(openingTimer);
  opening.classList.add('entering');
  setTimeout(()=>{
    opening.classList.remove('active','entering');
    opening.setAttribute('aria-hidden','true');
  },1100);
}
function playOpening(){
  if(!opening)return;
  opening.classList.remove('active','entering');
  void opening.offsetWidth;
  opening.classList.add('active');
  opening.setAttribute('aria-hidden','false');
  openingTimer=setTimeout(finishOpening,4200);
}
function openStory(){
  storyPanel.classList.add('open');
  storyPanel.setAttribute('aria-hidden','false');
  if(river)river.style.animationPlayState='paused';
  storyPanel.scrollTop=0;
  revealItems[0]?.classList.add('in-view');
  playOpening();
}
function closeStory(){
  clearTimeout(openingTimer);
  opening?.classList.remove('active','entering');
  opening?.setAttribute('aria-hidden','true');
  storyPanel.classList.remove('open');
  storyPanel.setAttribute('aria-hidden','true');
  if(river)river.style.animationPlayState='running';
}
openingEnter?.addEventListener('click',e=>{e.stopPropagation();finishOpening()});
opening?.addEventListener('click',finishOpening);
storyOpen?.addEventListener('click',openStory);
storyClose?.addEventListener('click',closeStory);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeStory()});