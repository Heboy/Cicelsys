/**
 * Created by Heboy on 14-1-17.
 */


function course(courseID,courseName,userID,department,note){
	this.courseID = courseID;
	this.courseName = courseName;
	this.userID = userID;
	this.department = department;
	this.note = note;
}
exports.course = course;

function chapter(courseID,chapterID,chapterName,note){
	this.courseID = courseID;
	this.chapterID = chapterID;
	this.chapterName = chapterName;
	this.note = note;
}
exports.chapter = chapter;

function period(courseID,chapterID,visits,effective,eventID){
	this.courseID = courseID;
	this.chapterID = chapterID;
	this.visits = visits;
	this.effective = effective;
	this.eventID = eventID;
}

function month(month){
	this.month = month;
}
month.prototype = month;
exports.month = month;

function season(season){
	this.season = season;
}
season.prototype = period;
exports.season = season;

function year(year){
	this.year = year;
}
year.prototype = period;
exports.year = year;
