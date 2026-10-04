const storyPanel=document.getElementById('storyPanel');
const storyOpen=document.getElementById('storyOpen');
const storyClose=document.getElementById('storyClose');
const river=document.getElementById('riverTrack');

function openStory(){
  storyPanel.classList.add('open');
  storyPanel.setAttribute('aria-hidden','false');
  if(river) river.style.animationPlayState='paused';
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