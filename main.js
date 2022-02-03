const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.audio-container');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const singer = document.querySelector('.singer');
const song = document.querySelector('.song');
const picturePlayer = document.querySelector('.name-song');
const container = document.querySelector('.container');
const currentTimeDiv = document.querySelector('.currentTime');
const durationDiv = document.querySelector('.duration');

const arrSongs = [
    {sing: 1, singer: 'Beyonce',song: 'Don\'t Hurt Yourself', img:'/assets/img/lemonade.png'},
    {sing: 2, singer: 'Dua Lipa',song: 'Don\'t Start Now', img:'/assets/img/dontstartnow.png'}]
let currentSong = 0;
let x = 0;
let triggerMouse = false;

function setCurrentSingerAndSong() {
    const durationTime = Math.floor(audio.duration)
    let hoursDuration = Math.floor(durationTime / 60 / 60);
    let minutesDuration = Math.floor(durationTime / 60) - (hoursDuration * 60);
    let secondsDuration = durationTime % 60;
    singer.textContent = arrSongs[currentSong].singer
    song.textContent = arrSongs[currentSong].song
    picturePlayer.style.backgroundImage = `url('${arrSongs[currentSong].img}')`
    picturePlayer.style.backgroundSize = 'cover'
    container.style.backgroundImage = `url('${arrSongs[currentSong].img}')`
    container.style.backgroundSize = 'cover'
    durationDiv.textContent = `${minutesDuration} : ${secondsDuration}`
    currentTimeDiv.textContent = '0 : 00'

}
window.onload = () => {
    setCurrentSingerAndSong()
}

nextBtn.addEventListener('click',()=>{
    currentSong++
    if(currentSong > arrSongs.length -1){
        currentSong = 0;
    }
    setCurrentSingerAndSong()
    audio.src = `/assets/sounds/${arrSongs[currentSong].sing}.mp3`
    audio.currentTime = 0;
    audio.play();
    singer.textContent = arrSongs[currentSong].singer
    song.textContent = arrSongs[currentSong].song
    playBtn.style.display= 'none'
    pauseBtn.style.display= 'block'
})

prevBtn.addEventListener('click',()=>{
    currentSong--
    if(currentSong < 0){
        currentSong = arrSongs.length -1;
    }
    setCurrentSingerAndSong()
    audio.src = `/assets/sounds/${arrSongs[currentSong].sing}.mp3`
    audio.currentTime = 0;
    audio.play();
    playBtn.style.display= 'none'
    pauseBtn.style.display= 'block'
})

function playAudio(currentTime) {
    audio.currentTime = currentTime || 0;
    audio.play();
    playBtn.style.display= 'none'
    pauseBtn.style.display= 'block'
}

function pauseAudio() {
    audio.pause();
    playBtn.style.display= 'block'
    pauseBtn.style.display= 'none'
}

function progressSong(e) {
    const {duration,currentTime} = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.left = `${progressPercent}%`


    const time = Math.floor(currentTime)
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) - (hours * 60);
    let seconds = time % 60;
    const currentSecond = seconds < 10 ? `0${seconds}`: seconds

    currentTimeDiv.textContent = `${minutes} : ${currentSecond}`

}
audio.addEventListener('timeupdate',progressSong)

function setProgressSong(e) {
    if(triggerMouse || e.type === "click"){
        const width = this.clientWidth;
        const positionX = e.offsetX;
        x = positionX;
        const duration = audio.duration;
        audio.currentTime = (positionX/ width) * duration;

    }

}


progressContainer.addEventListener('mousemove',setProgressSong)
progressContainer.addEventListener('click',setProgressSong)
progressContainer.addEventListener('mousedown',()=>{
    triggerMouse = true;
})
progressContainer.addEventListener('mouseup',()=>{
    triggerMouse = false;
})

playBtn.addEventListener('click', ()=>{
    const time = (x/progressContainer.clientWidth) * audio.duration
    playAudio(time)
});
pauseBtn.addEventListener('click', pauseAudio);
