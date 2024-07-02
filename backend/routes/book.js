const express =  require('express');
const Book = require("../models/book")
const checkAuth = require("../middleware/check-auth")

const router = express.Router();

router.post('', async (req, res) => { 
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



  router.get('/:id', (req, res, next) => {
    Book.findById(req.params.id).then(book => {
        if(book){
            res.status(200).json(book);
        }
        else{
            res.status(404).json({message: "post not found"});
        }
    })
})



// router.get('', async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 5;
//   const skip = (page - 1) * limit;
//   console.log("server.js")
//  const {search} = req.query;
//  console.log(search)
  
//   try {
//     const books = await Book.find({ title: { $regex: search, $options: 'i' } }).skip(skip).limit(limit);
//     console.log(books);
//     const totalBooks= await Book.countDocuments({ title: { $regex: search, $options: 'i' } });
//     console.log(books);
//     console.log(totalBooks);
//     res.json({books: documents,totalBooks});
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


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
        console.log("updated api")
        res.status(200).json({
            books: documents
        });
    });
});




router.delete("/:id", (req, res, next)=> { //checkAuth

    Book.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        if(result.deletedCount==0){
          return res.json({message: "id not found"})
        }
        res.status(200).json({message: "deleted in appjs"});

    }).catch(err=>{
    res.status(400).json({ message: err.message });
})
});



router.put("/:id", (req, res, next) => { //checkAuth
    
    const {name,author,date,price}= req.body;
    let currDate = new Date()
    newdate = new Date(date)
    console.log(currDate)
    console.log(newdate)
    if(newdate>currDate){
      // throw(err){
      //   res.status(400).json({message:"Date cannot be greater than today"})
      // }
      return res.status(400).json({message:"Date cannot be greater than today"})
    }
    Book.updateOne({ _id: req.params.id }, {name,author,date,price}).then(result => {
        console.log(result);
        res.status(200).json({message: "update successful from api"});
    })

})

module.exports = router;






