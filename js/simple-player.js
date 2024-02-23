const button = document.getElementById("play-pause-button");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");

const volumeBar = document.getElementById("volume-bar");

const audio = new Audio("audio/Soft-Background-for-Interview.webm");

let seeking = false;
//event handlers
//button events
button.onclick = () => {
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
}

// audio events
audio.onloadedmetadata = function(){
    currentTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;

    // volumeBar.disabled = false;


    volumeBar.max = 1;
    volumeBar.min = 0;
    volumeBar.step = 0.1;
    // volumeBar.value = 0;
}

audio.oncanplaythrough = () => {
    seekBar.disabled = false;
    
}

audio.onplay = () => {
    button.src = "images/pause.svg"
}

audio.onpause = () => {
    button.src = "images/play.svg"
}

audio.ontimeupdate = () => {
    currentTime.innerHTML = formatTime(audio.currentTime);
    if(!seeking){
        seekBar.value = Math.floor(audio.currentTime)
    }
}

//seek bar events

seekBar.oninput = () =>{
    seeking = true;
}
seekBar.onchange = () => {
    audio.currentTime = seekBar.value;
    if(!audio.paused){
    audio.play();
    }
    seeking = false;
}

//volume bar events

volumeBar.onchange = () => {
    audio.volume = volumeBar.value;
}


// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}