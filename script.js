const storyPanel=document.getElementById('storyPanel');
const storyOpen=document.getElementById('storyOpen');
const storyClose=document.getElementById('storyClose');
const river=document.getElementById('riverTrack');

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
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{root:storyPanel,threshold:.18});
revealItems.forEach(item=>revealObserver.observe(item));

let openingTimer;
function finishOpening(){
  clearTimeout(openingTimer);
  opening.classList.add('opening-done');
  setTimeout(()=>opening.classList.remove('opening-active','opening-done'),800);
}

function playOpening(){
  opening.classList.remove('opening-active','opening-done');
  void opening.offsetWidth;
  opening.classList.add('opening-active');
  openingTimer=setTimeout(finishOpening,2800);
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

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeStory();
});