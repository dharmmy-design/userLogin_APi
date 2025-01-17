const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { validateUser, validatelogin } = require("../utils/validations/validate");
const jwt = require('jsonwebtoken');

 const registerUser = async (req, res) =>{
    const error = await validateUser(req.body);

    if(error) return res.status(400).json(error);

    const {email, password} = req.body; //ACCEPTING USER DATA FROM THE REQUEST BODY

    //validation
    if(!email ||!password){
        return res.status(400).json({message: "Please provide email and password"});
    }
    
    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message: "Email already exists"});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
        email,
        password:hashedPassword
     });

   await newUser.save();

    res.status(201).json({newUser,msg:"User Created"});

};


const login = async (req, res) =>{
    
    const error = await validatelogin(req.body);

    if(error) return res.status(400).json(error);
    
    const {email, password} = req.body;
     //validation
     if(!email ||!password){
        return res.status(400).json({message: "Please provide email and password"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "Invalid Email provided"});
    }

   // Validate the password by comparing it with the stored hashed password

     const passwordMatch = await bcryptjs.compare(password, user.password);

     if(!passwordMatch){
        return res.status(400).json({message: "Invalid Email or Password provided"});
     }

     const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {expiresIn:'1d'});

     res.cookie('accessToken', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV =='production'
     })

     

     res.json({msg:"Logged In Successfully",token});


};
    
    
const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({msg:"User logged Out"})

}
      
    

module.exports = {
    registerUser,
    login,
    logout
};