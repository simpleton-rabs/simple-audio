// variables linking to HTML elements
const button = document.getElementById("play-pause-button");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");

// Variable added to link to volume bar
const volumeBar = document.getElementById("volume-bar");

//does not matter if volume bar is enabled before track loads
volumeBar.max = 1;
volumeBar.min = 0;
//smaller steps more accurate
volumeBar.step = 0.01;
//full volume default on load
volumeBar.value = 1;

//add collection with different tracks
const trackOption = document.getElementsByClassName("track-options");

//index of selected track and set selected colour
let selected = 0;
const selectedColour = "gray";

// set default track on load and set selected option on track menu
const audio = new Audio(trackOption[selected].dataset.track);
trackOption[selected].style.backgroundColor = selectedColour;

//boolean set to false - not seeking
let seeking = false;

//event handlers

//button events
//if button clicked when playing or paused
button.onclick = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

//for loop for event listeners if track option selected
for (i = 0; i < trackOption.length; i++) {
    trackOption[i].onclick = trackClick
}

// audio events
//when track loads
audio.onloadedmetadata = function () {
    currentTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
}

//when track loads we can play and seek bar can be active
audio.oncanplaythrough = () => {
    seekBar.disabled = false;
}

//when audio plays buttons shows pause
audio.onplay = () => {
    button.src = "images/pause.svg"
}

// when audion pauses button shows play
audio.onpause = () => {
    button.src = "images/play.svg"
}

//time as track plays
audio.ontimeupdate = () => {
    currentTime.innerHTML = formatTime(audio.currentTime);
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime)
    }
}

//seek bar events

seekBar.oninput = () => {
    seeking = true;
}
seekBar.onchange = () => {
    audio.currentTime = seekBar.value;
    if (!audio.paused) {
        audio.play();
    }
    seeking = false;
}

//volume bar events

volumeBar.onchange = () => {
    audio.volume = volumeBar.value;
}

//function for if track option clicked
function trackClick(event) {
    // variable to be set to integer of track selection via function returnIndex 
    let newSelected = returnIndex(this);
    // if new selected track isn't current selected track
    if (newSelected != selected) {
        // set selected track number to new one
        selected = newSelected
        //call function to set selected track colour
        setSelectionColour(this)
    }
    //update src to be new track selection and play - defaults from time 00:00
    audio.src = this.dataset.track;
    audio.play();
}

//function to return integer to index current track and check correct
function returnIndex(trackOptions) {
    for (i = 0; i < trackOption.length; i++) {
        if (trackOption[i] == trackOptions) {
            // console.log(i)
            return i
        }
    }
    console.warn("ITEM NOT FOUND")
    return -1
}

//function to set selected track option colour
function setSelectionColour(trackOptions) {
    for (i = 0; i < trackOption.length; i++)
        // if selected track matches track-options than this is selection to be updated
        if (trackOption[i] == trackOptions) {
            // set selection colour
            trackOption[i].style.backgroundColor = selectedColour
        } else {
            //else remove selection colour
            trackOption[i].style.backgroundColor = ""
        }
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