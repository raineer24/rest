var express = require('express');

var routes = function(Book) {
	var bookRouter = express.Router();

var bookController = require ('../controllers/bookController')(Book)
bookRouter.route('/')
	.post(bookController.post)
		
	.get(bookController.get);

bookRouter.route('/Books/:bookId')	
	.get(function(req, res){
	Book.findById(req.params.bookId, function(err, book) {
			if(err)
				res.status(500).send(err);
			else
				res.json(book);
		});
	})
	.put(function(req,res) {
		Book.findById(req.params.bookId, function(err, book) {
			if(err)
				res.status(500).send(err);
			else
				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genre;
				book.read = req.body.read;
				book.save();
				res.json(book);
		});
	});

	return bookRouter;
};

module.exports = routes;