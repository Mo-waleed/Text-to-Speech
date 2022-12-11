const textarea = document.querySelector("textarea"),
  speechBtn = document.querySelector("button"),
  voiceList = document.querySelector("select");

// let synth = speechSynthesis;

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    // selected "Google US English" voice as a default
    let selected = voice.name === "Google US English" ? "selected" : "";
    // creating an option tag with passing voice name and voice language
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option); //inserting option tag brforrend of select tag
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utternance.voice = voice;
    }
  }
  synth.speak(utternance); //speak the Speech
}

speechBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (textarea != "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "pause speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "resume speech";
      }
      setInterval(function () {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert To Speech";
        }
      });
    } else {
      speechBtn.innerText = "Convert To Speech";
    }
  }
});
