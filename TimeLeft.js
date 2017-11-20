"use strict";
// Syntax, you should write in! For instance, "<value> hour and <value> min and <value> sec".
const TimeCount = "0 hour and 0 min and 10 sec";

// I know there is a better way to do this I am new to regex and forced to do it tedious way.
let ExtractHour = / hour and \d+ min and \d+ sec/;
let ExtractSec = /\d+ hour and \d+ min and \b/;
let ExtractMin = /\d+ hour and /;

let Hour = "";
let Minutes = "";
let DiscardSec = "";
let DiscardMin = "";
let Second = "";

// Welcome to hell.
const EnglishToJS = () => {
	Hour = TimeCount.split(ExtractHour);
	DiscardMin = TimeCount.split(ExtractMin);
	Minutes = DiscardMin[1];
	Minutes = DiscardMin[1].split(" min");
	DiscardSec = TimeCount.split(ExtractSec);
	Second = DiscardSec[1].split(" sec");
	console.log("Got minutes,", Minutes[0]);
	console.log("Got Seconds,", Second[0]);
	console.log("Got hours", Hour[0]);
};
// Worst part is GONE yes GoNe forever
EnglishToJS();

let SecondHolder = Second[0];
let SecNum = Math.floor(SecondHolder);
let MinutesHolder = 60 * Minutes[0];
let HoursHolder = Hour[0] * 3600;

// Convert time to usable format
let Conversion = MinutesHolder + HoursHolder + SecNum;

const generateTimeleft = s => {
	let hour = Math.floor(s / 3600);
	let min = Math.floor((s - hour * 3600) / 60);
	let sec = s - hour * 3600 - min * 60;

	min = (min < 10 ? "0" : "") + min;
	hour = (hour < 10 ? "0" : "") + hour;
	sec = (sec < 10 ? "0" : "") + sec;

	return hour + ":" + min + ":" + sec;
};

let counter = 0;

const TimeUp = () => {
	console.log("00:00:00");
	console.log("Time is up!");
	try {
		process.exit();
	} catch(e){
		clearInterval(Interval);
	}
};

const Interval = setInterval(() => {
	if (Conversion == counter) {
		TimeUp();
		return;
	}
	console.log(generateTimeleft(Conversion - counter++));
}, 1E3);