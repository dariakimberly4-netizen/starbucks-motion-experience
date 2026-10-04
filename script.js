const storyPanel=document.getElementById('storyPanel');
const storyOpen=document.getElementById('storyOpen');
const storyClose=document.getElementById('storyClose');
const river=document.getElementById('riverTrack');

const revealItems=[...document.querySelectorAll('.story-reveal')];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{root:storyPanel,threshold:.18});
revealItems.forEach(item=>revealObserver.observe(item));

function openStory(){
  storyPanel.classList.add('open');
  storyPanel.setAttribute('aria-hidden','false');
  if(river) river.style.animationPlayState='paused';
  storyPanel.scrollTop=0;
  requestAnimationFrame(()=>revealItems[0]?.classList.add('in-view'));
}

function closeStory(){
  storyPanel.classList.remove('open');
  storyPanel.setAttribute('aria-hidden','true');
  if(river) river.style.animationPlayState='running';
}

storyOpen?.addEventListener('click',openStory);
storyClose?.addEventListener('click',closeStory);

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeStory();
});