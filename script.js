const storyPanel=document.getElementById('storyPanel');
const storyOpen=document.getElementById('storyOpen');
const storyClose=document.getElementById('storyClose');
const river=document.getElementById('riverTrack');

const openingStyle=document.createElement('style');
openingStyle.textContent=`
.story-opening{position:fixed;inset:0;z-index:300;display:none;overflow:hidden;background:#063b2b;color:#f4efe6;cursor:pointer}.story-opening.opening-active{display:block}.opening-panel{position:absolute;top:0;bottom:0;width:50%;background:#063b2b;z-index:1;transition:transform .95s cubic-bezier(.77,0,.18,1) 1.75s}.opening-left{left:0}.opening-right{right:0}.opening-center{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px}.opening-brand{font-size:9px;font-weight:900;letter-spacing:.28em;opacity:0;transform:translateY(10px);animation:openFade .55s ease .12s forwards}.opening-line{display:block;width:1px;height:0;background:#d8c59a;margin:28px 0 24px;animation:openLine .65s cubic-bezier(.16,1,.3,1) .38s forwards}.opening-center h2{margin:0;font-size:clamp(70px,13vw,190px);line-height:.74;letter-spacing:-.08em;opacity:0;transform:translateY(18px);animation:openFade .75s cubic-bezier(.16,1,.3,1) .62s forwards}.opening-center h2 em{font-family:Georgia,serif;font-weight:400;color:#d8c59a}.opening-center p{margin:28px 0 0;font-size:9px;font-weight:900;letter-spacing:.25em;opacity:0;animation:openFade .55s ease 1.02s forwards}.opening-hint{position:absolute;bottom:7vh;font-size:8px;font-weight:900;letter-spacing:.22em;opacity:0;animation:openFade .55s ease 1.18s forwards}.story-opening.opening-done .opening-left{transform:translateX(-102%)}.story-opening.opening-done .opening-right{transform:translateX(102%)}.story-opening.opening-done .opening-center{opacity:0;transition:opacity .35s ease 1.55s}@keyframes openFade{to{opacity:1;transform:none}}@keyframes openLine{to{height:92px}}@media(max-width:850px){.opening-center h2{font-size:24vw}.opening-line{margin:24px 0 20px}.opening-center p{max-width:82vw;line-height:1.7}.opening-hint{bottom:9vh}}@media(prefers-reduced-motion:reduce){.opening-brand,.opening-line,.opening-center h2,.opening-center p,.opening-hint{animation:none!important;opacity:1!important;transform:none!important}.opening-line{height:70px}.opening-panel{transition:none!important}}
`;
document.head.appendChild(openingStyle);

const opening=document.createElement('div');
opening.className='story-opening';
opening.setAttribute('aria-hidden','true');
opening.innerHTML=`
  <div class="opening-panel opening-left"></div>
  <div class="opening-panel opening-right"></div>
  <div class="opening-center">
    <span class="opening-brand">STARBUCKS® PHILIPPINES</span>
    <i class="opening-line"></i>
    <h2>OUR<br><em>STORY</em></h2>
    <p>COFFEE · PEOPLE · CONNECTION</p>
    <span class="opening-hint">TAP TO ENTER</span>
  </div>`;
storyPanel.prepend(opening);

const revealItems=[...document.querySelectorAll('.story-reveal')];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('in-view')});
},{root:storyPanel,threshold:.18});
revealItems.forEach(item=>revealObserver.observe(item));

let openingTimer;
function finishOpening(){
  clearTimeout(openingTimer);
  opening.classList.add('opening-done');
  setTimeout(()=>opening.classList.remove('opening-active','opening-done'),2800);
}
function playOpening(){
  opening.classList.remove('opening-active','opening-done');
  void opening.offsetWidth;
  opening.classList.add('opening-active');
  openingTimer=setTimeout(finishOpening,2450);
}
function openStory(){
  storyPanel.classList.add('open');
  storyPanel.setAttribute('aria-hidden','false');
  if(river) river.style.animationPlayState='paused';
  storyPanel.scrollTop=0;
  revealItems[0]?.classList.add('in-view');
  playOpening();
}
function closeStory(){
  clearTimeout(openingTimer);
  opening.classList.remove('opening-active','opening-done');
  storyPanel.classList.remove('open');
  storyPanel.setAttribute('aria-hidden','true');
  if(river) river.style.animationPlayState='running';
}
opening.addEventListener('click',finishOpening);
storyOpen?.addEventListener('click',openStory);
storyClose?.addEventListener('click',closeStory);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeStory()});