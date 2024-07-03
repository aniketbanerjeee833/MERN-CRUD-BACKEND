const multer=require("multer")

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>
    {
        const filename=`image-${Date.now()}.${file.originalname}`
        cb(null,filename)
    }
})
const filefilter=(req,file,cb)=>
{
    if(file.mimetype === "image/png" ||file.mimetype === "image/jpg" ||file.mimetype === "image/jpeg"  ){
        cb(null,true)
    }else{
        cb(null,false)
        return cb(new Error("Only .png .jpg & .jpeg formatted Allowed"))
    }
}

const upload=multer({
    storage:storage,
    filefilter:filefilter
})
module.exports=upload