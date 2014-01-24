/**
 * Created by Heboy on 14-1-17.
 */
var chapterModel = require('../../model/chapter');

exports.getChapters = function (req, res) {
	var courseObj = {
		courseID: req.params.courseID
	}
	var chapter = new chapterModel.chapter(courseObj);
	chapter.databaseInit();
	chapter.getChapters(function (status, msg) {
		res.json(status, msg);
		chapter.databaseEnd();
	});
}

exports.addChapter = function (req, res) {
	var courseObj = {
		chapterName: req.body.chapterName,
		courseID: req.body.courseID,
		note: req.body.note
	}

	var chapter = new chapterModel.chapter(courseObj);
	chapter.databaseInit();
	chapter.addChapter(function (status, msg) {
		res.json(status, msg);
		chapter.databaseEnd();
	});
}

exports.updateChapterInfo = function (req, res) {
	var chapterObj = {
		chapterID: req.body.chapterID,
		chapterName: req.body.chapterName,
		courseID: req.body.courseID,
		note: req.body.note
	}

	if (chapterObj.chapterName || chapterObj.note) {
		var chapter = new chapterModel.chapter(chapterObj);
		chapter.databaseInit();
		chapter.updateChapter(function (status, msg) {
			res.json(status, msg);
			chapter.databaseEnd();
		})
	}
	else {
		res.json(404, {result: false, msg: '无更新值'});
	}
}

exports.deleteChapter = function (req, res) {
	var chapterObj = {
		chapterID: req.params.chapterID
	}

	var chapter = new chapterModel.chapter(chapterObj);
	chapter.databaseInit();
	chapter.deleteChapter(function (status, msg) {
		res.json(status, msg);
		chapter.databaseEnd();
	});
}