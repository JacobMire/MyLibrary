const express =  require('express');
const Book = require("../models/book")
const checkAuth = require("../middleware/check-auth")

const router = express.Router();

router.post('', async (req, res) => { //checkAuth
    try {
      const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        date: req.body.date,
        price: req.body.price
    });
      const savedBook = await newBook.save();
      res.json(savedBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  router.get('', (req, res, next)=> {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const bookQuery = Book.find();
    if(pageSize && currentPage){
        postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
    }
    bookQuery
      .then(documents =>{
        res.status(200).json({
            message: 'got the books', 
            books: documents
        });
    });
});




router.delete("/:id", (req, res, next)=> { //checkAuth
    try{
    Book.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "deleted in appjs"});

    });
} catch (err){
    res.status(400).json({ message: err.message });
}
});



router.put("/:id", (req, res, next) => { //checkAuth
    
    const {name,author,date,price}= req.body;
    Book.updateOne({ _id: req.params.id }, {name,author,date,price}).then(result => {
        console.log(result);
        res.status(200).json({message: "update successful"});
    });
})


module.exports = router;






