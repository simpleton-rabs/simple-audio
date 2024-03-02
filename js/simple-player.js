// variables linking to HTML elements
const button = document.getElementById("play-pause-button");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
// Variable added to link to volume bar
const volumeBar = document.getElementById("volume-bar");

// const songOne = document.getElementById("track-one");
// const songTwo = document.getElementById("track-two");
// const songThree = document.getElementById("track-three");

//collection with different tracks
const trackOption = document.getElementsByClassName("track-option");

//index of selected track
let selected = 0;
const selectedColour = "gray";
// const audio = new Audio("audio/Soft-Background-for-Interview.webm");

// set default track on load
const audio = new Audio(trackOption[selected].dataset.track);
trackOption[selected].style.backgroundColor = selectedColour;

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

// songOne.onclick = () => {
//     if(audio.play){
//         audio.pause();
//         audio.src = songOne.dataset.song;
//     }
// }
// songTwo.onclick = () => {
//     if(audio.play){
//         audio.pause();
//         audio.src = songTwo.dataset.song;
//     }
// }
// songThree.onclick = () => {
//     if(audio.play){
//         audio.pause();
//         audio.src = songThree.dataset.song;
//     }
// }

for (i = 0; i < trackOption.length; i++){
    trackOption[i].onclick = trackClick
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
    volumeBar.value = 1;
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

function trackClick(event){
//     // set selection on track menu bar change button colour
    let newSelected = returnIndex(this);
    if (newSelected != selected){
        selected = newSelected
        console.warn(selected)

    }

//change track src to selected - stops play and seek defaults to 0:00 but button needs to be reset
    audio.src = this.dataset.track;
    button.src = "images/play.svg";
}

function returnIndex(trackOption){
    for(i=0; i < trackOption.length; i++){
        if (trackOption[i] == trackOption){
            console.log(i)
        return i   
        } else{
            console.warn("ITEM NOT FOUND")
            return -1
    } 
    }
}

// trackOption[i].style.backgroundColor = selectedColour
// else{
//     trackOption[i].style.backgroundColor = "none"
// }
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