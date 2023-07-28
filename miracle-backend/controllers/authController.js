const { createToken } = require('../middlewares/verifyToken');
const userModel = require('../models/userModel');
var bcrypt = require('bcryptjs');
const profileModel = require('../models/profileModel');
const Joi = require("joi")

const validateUser = (item) => {
    const userSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return userSchema.validate(item)
}


module.exports.loginUser = [

  async (req, res) => {
       
    const { email, password } = req.body;
    

    try {
      const user = await userModel.findOne({ email });

      if (user) {
        const auth = await bcrypt.compare(password, user.password);

          if (auth) {
            const profile = await profileModel.findOne({user: user._id}).populate("user")
          const token = await createToken(user);

          res.status(201).json({
            message: "Successfully Logged In",
            user,
              token,
            profile
          });
        } else {
          throw Error("Incorrect Password");
        }
      } else {
        throw Error("User Not Found");
      }
    } catch (err) {
      let error = err.message;
      res.status(400).json({ error: error });
    }
  },
];

module.exports.registerUser = [
   
    async (req, res) => {
        const  { error } = validateUser(req.body)
        if (error) return res.status(404).json({ error: error.details[0].message })
    
        const { name, email, password } = req.body;
        try {
            const userExists = await userModel.findOne({ email })
            if(userExists)return res.status(409).send("The user with that email already exists")
            
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await userModel.create({
                name,
                email,
                password: hashedPassword
            });

            var profile = await profileModel.create({
              user: user._id,
            
              about: " ",
            
              title: " ",
  
              
              education: [
                {
                  school: "",
                  description: "No information",
                }
              ],

              certification: [
                {
                  title: "",
                  description: "No information",
                }
              ],
              experience: [
                {
                  company: "",
                  description: "No information",
                }
              ],
              inventions: [
                {
                  title: "",
                  description: "No information",
                }
              ],
              patents: [
                {
                  title: "",
                  description: "No information",
                }
                ],
                hourlyRates: 0,
                country: "No country information",
                phoneNumber: "No phone number",
                openToCollaborators: false,
                tutorSkills:"no skills"
               
            });

            res.status(201).json({
              user: user,
              message: "User Created Successfully",
            });
            
        } catch (err) {
            let error = err.message;
            res.status(400).json({ error: error });
        }
    },
];