const express=require("express");

const booksController=require("../controllers/books.controller");
const {authMiddleware}=require("../middleware/auth")

const router=express.Router();

router.get("/",authMiddleware,booksController.getAllBooks);
router.get("/:id",authMiddleware,booksController.getBookById);
router.post("/",authMiddleware,booksController.createBook);
router.put("/:id",authMiddleware,booksController.updateBooks);
router.delete("/:id",authMiddleware,booksController.deleteBook);


module.exports=router;