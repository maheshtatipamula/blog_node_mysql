const multer = require("multer");

// // const sharp=require("sharp")
// // const path=require("path")

// const multerStorage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,"../public/images"))
//     },
//     filename:function(req,file,cb){
// const uniqueSuffix=Date.now()+"-"+Math.round(Math.random())
// cb(null,file.filename + " -"+uniqueSuffix+".jpeg")}
// })

// const multerFilter=(req,file,cb)=>{
//     if(file.mimetype.statsWith("image")){
//         cb(null,true)
//     }else{

//         cd({
//             message:"unsupported file Format"
//         },false)
//     }
// }

// const uploadImage=multer({
//     storage:multerStorage,
//     fileFilter:multerFilter,
//     limits:{fieldSize:2000000}
// })

// module.exports={uplodImage}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
