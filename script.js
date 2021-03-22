const img=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music=document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

const songs= [
   
    {
        name:'song1',
        displayName:'Wish You Were Here',
        art:'Pink Floyd',
    },

    {
        name:'song2',
        displayName:'Where Did You Sleep Last Night',
        art:'Nirvana',
    },
    {
        name:'song3',
        displayName:'Dark Necessities',
        art:'Red Hot Chili Peppers',
    },
    {
        name:'song4',
        displayName:'Imagination',
        art:'Foster The People',
    },
    {
        name:'song5',
        displayName:'Birds',
        art:'Coldplay',
    },
    {
        name:'song6',
        displayName:'It Was Always You',
        art:'Maroon 5',
    },
    {
        name:'song7',
        displayName:'Payphone',
        art:'Maroon 5',
    },
    {
        name:'song8',
        displayName:'Hardest To Love',
        art:'The Weeknd',
    },
    {
        name:'song9',
        displayName:'Level Of Concern',
        art:'Twenty One Pilots',
    },
    {
        name:'song10',
        displayName:'Kaisey Jiyun',
        art:'The Local Train',
    },
    {
        name:'song11',
        displayName:'Aakhri Salaam',
        art:'The Local Train',
    }
];



let isplaying=false;
function playsong(){
    isplaying=true;
    playBtn.classList.replace('fa-play-circle','fa-pause-circle');
    playBtn.setAttribute('title','Pause');
music.play();

}
function pausesong(){
    isplaying=false;
    playBtn.classList.replace('fa-pause-circle','fa-play-circle');
    playBtn.setAttribute('title','Play');
    music.pause();
}



playBtn.addEventListener('click',() =>(isplaying?pausesong():playsong()));


function loadSong(song){
title.textContent=song.displayName;
artist.textContent=song.art;
music.src=`music/${song.name}.mp3`;
img.src=`img/${song.name}.jpg`;

}
function prevSong(){
    songIndex--;
    if(songIndex<0)
    {songIndex=songs.length-1;}
    loadSong(songs[songIndex]);
    playsong();
}

function nextSong(){
    songIndex++;
    if(songIndex==songs.length)
    {songIndex=0;}
    loadSong(songs[songIndex]);
    playsong();
}
let songIndex=0;
loadSong(songs[songIndex]);
function updateProgressBar(e){
if(isplaying)
{
    const{duration,currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration) * 100;
    progress.style.width=`${progressPercent}%`;

    const durationminutes=Math.floor(duration/60);
    
    let durationseconds=Math.floor(duration%60);
    if(durationseconds<10){
        durationseconds=`0${durationseconds}`;
    }
    if(durationseconds){
        durationEl.textContent=`${durationminutes}:${durationseconds}`;
    }

    const currentTimeminutes=Math.floor(currentTime/60);
    
    let currentTimeseconds=Math.floor(currentTime%60);
    if(currentTimeseconds<10){
       currentTimeseconds=`0${currentTimeseconds}`;
    }
    currentTimeEl.textContent=`${currentTimeminutes}:${currentTimeseconds}`;
    
}

}

function setProgressBar(e){
const width=this.clientWidth;
const clickX=e.offsetX;
const {duration}=music; 
music.currentTime=(clickX / width) * duration;



}

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);