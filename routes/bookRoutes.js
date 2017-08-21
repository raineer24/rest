var express = require('express');

var routes = function(Book) {
	var bookRouter = express.Router();

var bookController = require ('../controllers/bookController')(Book)
bookRouter.route('/')
	.post(bookController.post)
		
	.get(bookController.get);

bookRouter.use('/:bookId', function(req,res,next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('no book found');
            }
        });
    });

//endshere
bookRouter.route('/:bookId')	
	.get(function(req, res){

		var returnBook = req.book.toJSON();

		returnBook.links = {};
		var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
		returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
		res.json(returnBook);
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