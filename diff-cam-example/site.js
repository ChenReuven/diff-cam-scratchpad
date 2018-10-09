const constantObj = constant;
const video = document.getElementById('video');
const score = document.getElementById('score');
const body = document.getElementById('body');
const sound = new Howl({
	src: ['sound-dog.mp3']
});

function initSuccess() {
	DiffCamEngine.start();
}

function initError(e) {
	alert('Something went wrong.');
	console.log("Init error:" + e);
}

function isSoundPlaying(sound) {
	return sound.playing();
}

function startTime(){
	body.classList.toggle('red');
}

function flickeringScreen() {
	const tt = setInterval(function(){ startTime() }, 200);
	setTimeout(function() { clearInterval(tt); body.classList.remove('red')}, 10000);
}

function capture(payload) {
	score.textContent = payload.score;
	const scoreResult = payload.score;
	if(scoreResult > constantObj.START_CHANGE_DETECTION_SENSITIVITY) {
		if(!isSoundPlaying(sound)) {
			sound.play();
			flickeringScreen();
		}
	}
}

DiffCamEngine.init({
	video: video,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});
