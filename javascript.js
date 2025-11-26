
// ABAS
const tabButtons = document.querySelectorAll('[data-tab]');
const sections = document.querySelectorAll('.section');
tabButtons.forEach(btn => {
  btn.addEventListener('click', ()=>{
    const tab = btn.dataset.tab;
    sections.forEach(sec => sec.classList.remove('active'));
    const section = document.getElementById(tab);
    section.classList.add('active');
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// CARDS animação
const cards = document.querySelectorAll('.card');
function mostrarCards() {
  cards.forEach(card => {
    const pos = card.getBoundingClientRect().top;
    const altura = window.innerHeight * 0.85;
    if(pos < altura) card.classList.add('visible');
  });
}
window.addEventListener('scroll', mostrarCards);
window.addEventListener('load', mostrarCards);

// PLAYER
const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');
const trackCover = document.getElementById('track-cover');
const timeDisplay = document.getElementById('time');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const playlist = [
{src:'musicas/musica1.mp3', img:'imagens/capa1.png', name:'B.G. The Prince Of Rap-This beat is hotWhatIs Sadness Ramzeess Remix'},
  {src:'musicas/musica2.mp3', img:'imagens/capa2.jpeg', name:'The Hitman (Extended Mix) / Ab Logic'},
  {src:'musicas/musica3.mp3', img:'imagens/capa3.jpeg', name:'B2 - Get Out Of My Case '},
  {src:'musicas/musica4.mp3', img:'imagens/capa4.jpeg', name:'House Energy Revenge'},
  {src:'musicas/musica5.mp3', img:'imagens/capa5.jpeg', name:'Get Up (Before The Night Is Over)'},
  {src:'musicas/musica6.mp3', img:'imagens/capa6.jpeg', name:'Stay Alive'},
  {src:'musicas/musica7.mp3', img:'imagens/capa7.jpeg', name:'Send Me An Angel (Interface Mix)'},
  {src:'musicas/musica8.mp3', img:'imagens/capa8.jpeg', name:'Move Your Body (X-Tended Mix)'},
  {src:'musicas/musica9.mp3', img:'imagens/capa9.jpeg', name:'Sanskriti Frequencies of Grace'},
  {src:'musicas/musica10.mp3', img:'imagens/capa10.jpeg', name:'Got Be (Another Mix) / Plus Staples'},
  {src:'musicas/musica11.mp3', img:'imagens/capa11.jpeg', name:'Go Aside Dan Morozo'},
  {src:'musicas/musica12.mp3', img:'imagens/capa12.jpeg', name:'Música 12'},
  {src:'musicas/musica13.mp3', img:'imagens/capa13.jpeg', name:'Música 13'},
  {src:'musicas/musica14.mp3', img:'imagens/capa14.jpeg', name:'Música 14'},
  {src:'musicas/musica15.mp3', img:'imagens/capa15.jpeg', name:'Música 15'}
];
let currentTrack = 0;
document.querySelectorAll('.card').forEach((card,index)=>{
  card.addEventListener('click', ()=>{
    currentTrack=index; playTrack();
  });
});
function playTrack(){
  const track = playlist[currentTrack];
  audio.src = track.src; trackCover.src = track.img;
  trackName.textContent = track.name; audio.play();
  playBtn.innerHTML='<i class="fas fa-pause"></i>';
}
playBtn.addEventListener('click', ()=>{
  if(audio.paused){ audio.play(); playBtn.innerHTML='<i class="fas fa-pause"></i>'; }
  else{ audio.pause(); playBtn.innerHTML='<i class="fas fa-play"></i>'; }
});
prevBtn.addEventListener('click', ()=>{
  currentTrack = (currentTrack-1+playlist.length)%playlist.length; playTrack();
});
nextBtn.addEventListener('click', ()=>{
  currentTrack = (currentTrack+1)%playlist.length; playTrack();
});
audio.addEventListener('ended', ()=>{
  currentTrack = (currentTrack+1)%playlist.length; playTrack();
});
audio.addEventListener('timeupdate', ()=>{
  const current = Math.floor(audio.currentTime);
  const duration = Math.floor(audio.duration)||0;
  timeDisplay.textContent = formatTime(current)+' / '+formatTime(duration);
});
function formatTime(seconds){
  const min=Math.floor(seconds/60); const sec=seconds%60;
  return `${min}:${sec<10?'0'+sec:sec}`;
}