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

const storyEnhanceStyle=document.createElement('style');
storyEnhanceStyle.textContent=`
.story-progress{position:fixed;left:0;top:0;height:3px;width:0;background:#d8c59a;z-index:260;box-shadow:0 0 14px #d8c59a88;transition:width .12s linear}.story-chapter-indicator{position:fixed;left:22px;top:50%;transform:translateY(-50%);z-index:240;display:flex;flex-direction:column;gap:8px;align-items:center;color:#f4efe6;pointer-events:none}.story-chapter-indicator .chapter-no{font:700 11px/1 Arial,sans-serif;letter-spacing:.16em;background:#063b2bd9;border:1px solid #f4efe638;border-radius:999px;padding:10px 11px;backdrop-filter:blur(10px)}.story-chapter-indicator .chapter-line{width:1px;height:54px;background:linear-gradient(#d8c59a,transparent)}.story-chapter-indicator .chapter-name{font:700 8px/1.3 Arial,sans-serif;letter-spacing:.18em;writing-mode:vertical-rl;text-transform:uppercase;background:#063b2bbd;border-radius:999px;padding:10px 7px}.story-scene{position:relative;isolation:isolate}.story-scene:before{content:"";position:absolute;inset:8vh -2vw;z-index:-1;border-radius:28px;background:linear-gradient(135deg,#ffffff78,#d8c5a430);opacity:0;transform:scale(.97);transition:opacity .7s ease,transform .9s cubic-bezier(.16,1,.3,1)}.story-scene.active-scene:before{opacity:1;transform:scale(1)}.scene-image{position:relative}.scene-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,#062c2248);pointer-events:none;opacity:.2;transition:opacity .6s ease}.story-scene.active-scene .scene-image:after{opacity:.75}.scene-copy h3{position:relative}.scene-copy h3:after{content:"";display:block;width:0;height:2px;background:#b28a4a;margin-top:22px;transition:width .9s cubic-bezier(.16,1,.3,1) .15s}.story-scene.active-scene .scene-copy h3:after{width:min(180px,42%)}.story-scene.active-scene .scene-image img{transform:translate3d(0,0,0) scale(1.075)!important;transition:transform 5s cubic-bezier(.16,1,.3,1)!important}.story-photo-hero:after{content:"SCROLL TO EXPLORE";position:absolute;right:4vw;bottom:4vh;z-index:3;font:800 8px/1 Arial,sans-serif;letter-spacing:.24em;color:#f4efe6aa;animation:storyPulse 1.8s ease-in-out infinite}.story-photo-hero:before{content:"";position:absolute;right:3.9vw;bottom:7.2vh;width:1px;height:42px;background:linear-gradient(#d8c59a,transparent);z-index:3}.story-philippines{position:relative}.story-philippines:after{content:"MANILA · MAKATI · 1997";position:absolute;right:6vw;top:8vh;font:800 9px/1 Arial,sans-serif;letter-spacing:.24em;color:#17372b73}.story-finale{position:relative;overflow:hidden}.story-finale:before{content:"";position:absolute;width:48vw;height:48vw;border:1px solid #d8c59a22;border-radius:50%;right:-15vw;top:-18vw;box-shadow:0 0 0 10vw #d8c59a08,0 0 0 20vw #d8c59a05}.story-cta{transition:transform .3s ease,color .3s ease}.story-cta:hover{transform:translateX(8px);color:#d8c59a}@keyframes storyPulse{50%{opacity:.35;transform:translateY(4px)}}
@media(max-width:850px){.story-chapter-indicator{left:10px}.story-chapter-indicator .chapter-name,.story-chapter-indicator .chapter-line{display:none}.story-chapter-indicator .chapter-no{font-size:8px;padding:8px;background:#063b2bbb}.story-photo-hero:after,.story-photo-hero:before{display:none}.story-scene:before{inset:4vh -10px;border-radius:18px}.story-philippines:after{right:20px;top:24px;font-size:7px}.story-finale:before{width:90vw;height:90vw;right:-35vw;top:-18vw}}@media(prefers-reduced-motion:reduce){.story-progress{transition:none}.story-photo-hero:after{animation:none}.story-scene:before,.scene-copy h3:after,.scene-image:after{transition:none!important}.story-scene.active-scene .scene-image img{transition:none!important}}
`;
document.head.appendChild(storyEnhanceStyle);

const progress=document.createElement('div');
progress.className='story-progress';
storyPanel?.appendChild(progress);
const chapterIndicator=document.createElement('div');
chapterIndicator.className='story-chapter-indicator';
chapterIndicator.innerHTML='<span class="chapter-no">01</span><span class="chapter-line"></span><span class="chapter-name">THE BEAN</span>';
storyPanel?.appendChild(chapterIndicator);

const revealItems=[...document.querySelectorAll('.story-reveal')];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in-view')});
},{root:storyPanel,threshold:.18});
revealItems.forEach(item=>revealObserver.observe(item));

const storyScenes=[...document.querySelectorAll('.story-scene')];
const chapterNames=['THE BEAN','THE CRAFT','THE PEOPLE','THE THIRD PLACE'];
const sceneObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      storyScenes.forEach(s=>s.classList.remove('active-scene'));
      entry.target.classList.add('active-scene');
      const i=storyScenes.indexOf(entry.target);
      const no=chapterIndicator?.querySelector('.chapter-no');
      const name=chapterIndicator?.querySelector('.chapter-name');
      if(no)no.textContent=String(i+1).padStart(2,'0');
      if(name)name.textContent=chapterNames[i]||'OUR STORY';
    }
  });
},{root:storyPanel,threshold:.52});
storyScenes.forEach(scene=>sceneObserver.observe(scene));

const motionImages=[...document.querySelectorAll('.scene-image img')];
const heroImage=document.querySelector('.story-photo-hero>img');
const heroCopy=document.querySelector('.story-hero-copy');
const philYear=document.querySelector('.philippines-year');
let rafPending=false;

function updateStoryMotion(){
  rafPending=false;
  if(!storyPanel.classList.contains('open'))return;
  const max=storyPanel.scrollHeight-storyPanel.clientHeight;
  const pct=max>0?(storyPanel.scrollTop/max)*100:0;
  if(progress)progress.style.width=`${pct}%`;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const panelRect=storyPanel.getBoundingClientRect();
  const viewportH=panelRect.height||window.innerHeight;

  if(heroImage){
    const y=Math.min(storyPanel.scrollTop,viewportH);
    heroImage.style.transform=`scale(${1.02+y/viewportH*0.05}) translate3d(0,${y*0.075}px,0)`;
  }
  if(heroCopy){
    const y=Math.min(storyPanel.scrollTop,viewportH);
    heroCopy.style.transform=`translate3d(0,${y*-0.05}px,0)`;
  }

  motionImages.forEach((img,index)=>{
    if(img.closest('.story-scene')?.classList.contains('active-scene'))return;
    const box=img.parentElement.getBoundingClientRect();
    const center=box.top+box.height/2-panelRect.top;
    const progressValue=(center-viewportH/2)/viewportH;
    const drift=Math.max(-1,Math.min(1,progressValue))*30;
    const dir=index%2===0?1:-1;
    img.style.transform=`translate3d(0,${drift*dir}px,0) scale(1.055)`;
  });

  if(philYear){
    const box=philYear.parentElement.getBoundingClientRect();
    const progressValue=(box.top-panelRect.top)/viewportH;
    const shift=Math.max(-38,Math.min(38,progressValue*42));
    philYear.style.transform=`translate3d(${shift}px,0,0)`;
  }
}

storyPanel?.addEventListener('scroll',()=>{
  if(!rafPending){rafPending=true;requestAnimationFrame(updateStoryMotion)}
},{passive:true});

let openingTimer;
function finishOpening(){
  if(!opening)return;
  clearTimeout(openingTimer);
  opening.classList.add('entering');
  setTimeout(()=>{
    opening.classList.remove('active','entering');
    opening.setAttribute('aria-hidden','true');
    requestAnimationFrame(updateStoryMotion);
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
  if(progress)progress.style.width='0%';
  revealItems[0]?.classList.add('in-view');
  requestAnimationFrame(updateStoryMotion);
  playOpening();
}
function closeStory(){
  clearTimeout(openingTimer);
  opening?.classList.remove('active','entering');
  opening?.setAttribute('aria-hidden','true');
  storyPanel.classList.remove('open');
  storyPanel.setAttribute('aria-hidden','true');
  storyScenes.forEach(s=>s.classList.remove('active-scene'));
  if(river)river.style.animationPlayState='running';
}
openingEnter?.addEventListener('click',e=>{e.stopPropagation();finishOpening()});
opening?.addEventListener('click',finishOpening);
storyOpen?.addEventListener('click',openStory);
storyClose?.addEventListener('click',closeStory);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeStory()});