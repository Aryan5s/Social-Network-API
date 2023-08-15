const User = require('../models/userModel');
const {
    validateEmail,
    validatePassword,
  } = require("../utils/validators");
const bcrypt = require('bcrypt');
const validate = require('uuid-validate');
const jwt = require('jsonwebtoken');  

const authenticateUser = async(req , res) => {
    try {
        const { email, password } = req.body;
        if (email.length === 0) return res.status(400).json({ err: "Please enter your email" })
        if (password.length === 0) return res.status(400).json({ err: "Please enter your password" });
        if (!validateEmail(email)) return res.status(400).json({ err: "Error: Invalid email" });

          if (!validatePassword(password)) {
            return res.status(400).json({
              err: "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character",
            });
          }
    
        const existingUser = await User.findOne({ email });
    
        if (!existingUser) return res.status(404).json({ err: "User not found" });
        
    
        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );
    
        if (!isPasswordCorrect) return res.status(400).json({ err: "Invalid credentials" });
        
        console.log(existingUser, existingUser.id);
        const payload = { user: { id: existingUser.id } };
        const bearerToken = await jwt.sign(payload, process.env.SECRET, {
          expiresIn: 360000,
        });
    
        res.cookie("t", bearerToken, { expire: new Date() + 9999 });
    
        // console.log("Logged in successfully");
    
        return res.status(200).json({ msg: "Signed-In successfully", bearerToken });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
      }
}


const getUser = async(req , res) => {
try {
    const user = req.user;
    if(!user)  return res.status(404).json({ err: "User not found" });
    return res.status(200).json({
        userName : user.name,
        followers : user.followers.length,
        following : user.following.length
    })
} catch (error) {
    console.log(err);
    return res.status(500).json({ err: err.message });
}
}

const followUser = async(req , res) => {
    try {
        if(!validate(req.params.id)) return res.status(404).json({msg : `Invalid User Id`})
        const follower = req.user;
        const following = await User.findById(req.params.id);
        if(!following) return res.status(404).json({ msg : `No user found with id : ${req.params.id}`})
        following.followers.push(follower);
        return res.status(200).json({
            msg : `${following} was followed by ${follower.name}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({err : error.message})
    }
}

const unfollowUser = async(req , res) => {
    try {
        if(!validate(req.params.id)) return res.status(404).json({msg : `Invalid User Id`})
        const unfollower = req.user;
        const user = await User.findById(req.params.id);
        await User.findOneAndUpdate({
           id : req.params.id
        }, {
            $pull : {followers : unfollower}
        })
        return res.status(200).json({msg : `${unfollower} successfully unfollowed ${user}`});
    } catch (error) {
       console.log(error);
       return res.status(500).json({err : error.message});   
    }
}




module.exports = {
    authenticateUser,
    getUser,
    followUser,
    unfollowUser
}