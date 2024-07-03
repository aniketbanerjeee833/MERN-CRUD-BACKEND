const User=require("../models/UserModel")
const moment=require("moment")

// register user
const userRegister=async(req,res)=>
{

const file=req.file.filename;
const{fname,lname,email,mobile,location,gender,status}=req.body

if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
    res.status(401).json({success:false,msg:"All Inputs is required"})
}
try{
    const preUser=await User.findOne({email:email})
    if(preUser){
        res.status(401).json({success:false,msg:"already exists"})
    }
    else{
        const dateCreated=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        const userData = new User({
            fname, lname, email, mobile, gender, location, status, profile: file, dateCreated
        });
       await userData.save()
        res.status(200).json({success:true,userData})
    }

}catch(error)
{
    console.log(error)
    res.status(400).json({success:false,error})
}
}


//get user

const userGet=async(req,res)=>
{
    const search=req.query.search||""
    const gender=req.query.gender||""
    const status=req.query.status||""
    const sort=req.query.sort||""
    const page = req.query.page || 1;
    const ITEM_PER_PAGE=4;
  

  
    const query = {
        fname: { $regex: search, $options: "i" }
    }

    if (gender !== "All") {
        query.gender = gender
    }

    if (status !== "All") {
        query.status = status
    }

    try{
        const skip = (page - 1) * ITEM_PER_PAGE  
        const count=await User.countDocuments(query)

        const userData=await User.find(query).sort({dateCreated:sort==="new"?-1:1}).limit(ITEM_PER_PAGE).skip(skip);
        const pageCount = Math.ceil(count/ITEM_PER_PAGE);
        // console.log(userData);

        res.status(200).json({success:true, Pagination:{count,pageCount },userData})
    }catch(error)
    {
        res.status(400).json({success:false,error}) 
  
    }
}

//get single user
const singleUserGet = async (req, res) => {

    const { id } = req.params;

    try {
        const userData = await User.findById({ _id: id });
      
        res.status(200).json({success:true,userData})
    } catch (error) {
       
        res.status(401).json({success:false,error})
    }
}


//allow edit for that single user
const userEdit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateUser = await User.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, location, status, profile: file, dateUpdated
        }, {
            new: true
        });

        await updateUser.save();
        res.status(200).json({success:true,updateUser});
    } catch (error) {
        res.status(401).json(error)
    }
}
    //deleteuser
    const userDelete=async(req,res)=>
    {

        const {id}=req.params
        try{
            const deletedUser=await User.findByIdAndDelete({_id:id})
            res.status(200).json({success:true,deletedUser})
        }catch(error)
        {
            res.status(401).json({success:false,error})   
        }
    } 

        //UPDATE STATUS AT THE FRONTEND WITHOUT GOING TO EDIT

        const userStatusUpdate=async(req,res)=>
        {
            const id=req.params.id;
            const {data}=req.body
            try{
                const updatedUserStatus = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            //    console.log(updatedUserStatus)
                await updatedUserStatus.save()
                res.status(200).json({success:true,updatedUserStatus})
            }catch(error)
            {
                res.status(401).json({success:false,error})  
            }


        }
    







module.exports={userRegister,userGet,singleUserGet,userEdit,userDelete,userStatusUpdate}