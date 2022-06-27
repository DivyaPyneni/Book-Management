const BooksModel=require("../models/BooksModel");
const mongoose=require("mongoose");
const { isValidObjectId } = require("mongoose");



const {
    isValid,
    isValidString,
    isValidObject,
  } = require("../validators");

const getAllBooks=async(req,res)=>{
    //const data=req.body;
    console.log("hi.....");
    const response={
        success:true,
        code:200,
        message:"Feched All the items successfully",
        error:null,
        data:null,
        resource:req.originalUrl
    }
    
    try {
      const allBooks=await BooksModel.find({isDeleted:false,userId:res.locals.userid});  
          response.data={allBooks};

          return res.send(response);
          
    } catch (error) {
        response.success=false;
        response.code=400;
        response.message="Cannot find Books";
        response.error=error;
        return res.send(response);
    }
}




//========================================================

const getBookById = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid Book id",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
  try {
    const book = await BooksModel.findOne({ _id: id, isDeleted: false });
    console.log(book);
    if (!book) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Invalid request, book item does not exist",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    if (book.userId.toString() !== res.locals.userid) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: "Invalid request, forbidden",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    return res.status(200).json({
      success: true,
      code: 200,
      message: "Book details",
      data: { book },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
};



//====================================================================
const createBook= async(req,res)=>{
    const data=req.body;
    console.log(data);
    const response={
        success:true,
        code:200,
        message:"Created Book successfully",
        error:null,
        data:null,
        resource:req.originalUrl
    }
    if (!isValid(data) && !isValidObject(data)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid request data";
        return res.status(400).json(response);
      }
      if (
        !isValid(data.title) ||
        (isValid(data.title) && !isValidString(data.title))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Book Title is required";
        response.error = "Invalid request data.Book Title is required";
        return res.status(400).json(response);
      }
      /*if (
        !isValid(data.userid) ||
        (isValid(data.userid) && !isValidString(data.userid))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. UserId is required";
        response.error = "Invalid request data. UserId is required";
        return res.status(400).json(response);
      }
      try {
        const checksId=await UserModel.findOne({_id: data.userid}) ;
        //console.log(checksId._id);
        if(!checksId._id){
            response.success = false;
            response.code = 400;
            response.message = `Invalid request data. ${data.userId} is not registered. Please SignUp...`;
            response.error = "Invalid request data. UserId is required";
            return res.status(400).json(response);
        }
     } catch (error) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. UserId is not registered.";
        response.error = error;
        return res.status(400).json(response);
      }
      */
     

     if (
        !isValid(data.category) ||
        (isValid(data.category) && !isValidString(data.category))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. Category is required";
        response.error = "Invalid request data. Category is required";
        return res.status(400).json(response);
      }

console.log(res.locals.userid);


const finalData={
    title:data.title,
    userId:res.locals.userid,
    brief:data.brief,
    category:data.category,
    subCategory:data.subCategory,
}

    try {
      console.log("Hello")
        const created=new BooksModel(finalData);
        await created.save();
       console.log(created);
        response.data = { books: created };
        return res.status(200).json(response);
        
    } catch (error) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.";
        response.error = error;
        return res.status(400).json(response);
        
    }


}
//===================================================================

const updateBooks=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data=req.body;
    const response={
        success:true,
        code:200,
        message:"Updated Book successfully",
        error:null,
        data:null,
        resource:req.originalUrl
    }
    if (!isValid(data) && !isValidObject(data)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid request data";
        return res.status(400).json(response);
      }
      if ( (isValid(data.title) && !isValidString(data.title))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. Name is required";
        response.error = "Invalid request data. Name is required";
        return res.status(400).json(response);
      }

      if ((isValid(data.category) && !isValidString(data.category))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. Category is required";
        response.error = "Invalid request data. Category is required";
        return res.status(400).json(response);
      }
      if ((isValid(data.brief) && !isValidString(data.brief))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. Category is required";
        response.error = "Invalid request data. Category is required";
        return res.status(400).json(response);
      }
      if(isValid(data.isDeleted) && ( typeof data.isDeleted !=="boolean")){
        response.success=false;
        response.code=400;
        response.message="isDeleted cannot null and its type should be Boolean";
        response.error="isDeleted cannot null and its type should be Boolean ";
        return res.status(400).json(response)
    }


     try {
      const found=await BooksModel.findOne({_id:id});
      if(found.isDeleted===true){
        response.success=false;
        response.code=400;
        response.message="record is no longer avialable";
        response.error='Deleted Record cannot be updated'
        return res.status(400).json(response)

      }
      else{
        const founded= await BooksModel.updateOne({_id:id},{$set:data},{new:true});
        response.data=founded;
        return res.status(200).json(response);   
      }

    }
      catch (error) {
        response.success=false;
        response.code=400;
        response.message="Book id does not exist";
        response.error=error;
        return res.status(400).json(response)
         
     }

}

//======================================================================
const deleteBook=async(req,res)=>{
    const id=req.params.id;
    const response={
        success:true,
        code:200,
        message:"Deleted a Book Successfully",
        error:null,
        data:null
    }
    try {
        const found=await BooksModel.findOne({id});
        console.log(found);
        if(found){
            const delBook= await BooksModel.updateOne({_id:id},{$set:{isDeleted:true}});
            response.data=delBook;
        }
            else{
                response.success=false;
                response.code=400;
                response.message="Book id does not exist";
                response.error="Book id does not exist";
                return res.status(400).json(response)
            }
        return res.status(200).json(response);
        
    } catch (error) {
        response.success=false,
        response.code=400;
        response.message="Invalid..";
        response.error=error;
        return res.status(400).json(response);
        
    }

}





module.exports={getAllBooks,createBook,updateBooks,deleteBook,getBookById};