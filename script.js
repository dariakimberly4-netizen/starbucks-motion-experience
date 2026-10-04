const drinks=[...document.querySelectorAll('.drink')];
const track=document.getElementById('track');
const selector=document.getElementById('selector');
const ghostName=document.getElementById('ghostName');
const productDescription=document.getElementById('productDescription');
const count=document.getElementById('count');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let index=0;
let timer=null;
let dragStart=0;
let dragging=false;

function buildSelector(){
  drinks.forEach((drink,i)=>{
    const button=document.createElement('button');
    button.type='button';
    button.setAttribute('aria-label',`Show ${drink.dataset.name}`);
    button.addEventListener('click',()=>setSlide(i,true));
    selector.appendChild(button);
  });
}

function classForOffset(offset){
  if(offset===0)return 'is-active';
  if(offset===-1||offset===drinks.length-1)return 'is-prev';
  if(offset===1||offset===-(drinks.length-1))return 'is-next';
  return offset<0?'is-far-prev':'is-far-next';
}

function setSlide(next,userAction=false){
  index=(next+drinks.length)%drinks.length;
  drinks.forEach((drink,i)=>{
    const raw=i-index;
    let offset=raw;
    if(raw>drinks.length/2)offset=raw-drinks.length;
    if(raw<-drinks.length/2)offset=raw+drinks.length;
    drink.className=`drink ${classForOffset(offset)}`;
  });
  [...selector.children].forEach((b,i)=>b.classList.toggle('active',i===index));
  const current=drinks[index];
  ghostName.style.opacity='0';
  ghostName.style.transform='translateX(28px)';
  setTimeout(()=>{
    ghostName.textContent=current.dataset.name.toUpperCase();
    ghostName.style.opacity='1';
    ghostName.style.transform='translateX(0)';
  },150);
  productDescription.textContent=current.dataset.description;
  count.textContent=`${String(index+1).padStart(2,'0')} / ${String(drinks.length).padStart(2,'0')}`;
  if(userAction)restartAuto();
}

function startAuto(){
  if(reduced)return;
  clearInterval(timer);
  timer=setInterval(()=>setSlide(index+1),4200);
}
function stopAuto(){clearInterval(timer)}
function restartAuto(){stopAuto();startAuto()}

document.getElementById('prev').addEventListener('click',()=>setSlide(index-1,true));
document.getElementById('next').addEventListener('click',()=>setSlide(index+1,true));

track.addEventListener('pointerdown',e=>{
  dragging=true;
  dragStart=e.clientX;
  track.setPointerCapture?.(e.pointerId);
  stopAuto();
});
track.addEventListener('pointerup',e=>{
  if(!dragging)return;
  dragging=false;
  const distance=e.clientX-dragStart;
  if(Math.abs(distance)>45)setSlide(index+(distance<0?1:-1));
  startAuto();
});
track.addEventListener('pointercancel',()=>{dragging=false;startAuto()});
track.addEventListener('mouseenter',stopAuto);
track.addEventListener('mouseleave',startAuto);

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight')setSlide(index+1,true);
  if(e.key==='ArrowLeft')setSlide(index-1,true);
  if(e.key==='Escape')closeStory();
});

const storyPanel=document.getElementById('storyPanel');
function openStory(){storyPanel.classList.add('open');storyPanel.setAttribute('aria-hidden','false');stopAuto();}
function closeStory(){storyPanel.classList.remove('open');storyPanel.setAttribute('aria-hidden','true');startAuto();}
document.getElementById('storyOpen').addEventListener('click',openStory);
document.getElementById('storyClose').addEventListener('click',closeStory);

buildSelector();
setSlide(0);
startAuto();