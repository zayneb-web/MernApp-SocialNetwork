const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signup = (req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10), //chaine que veux crypte , 10 par def
        bio: req.body.bio,
        picture: req.body.picture,
        birthDate: req.body.birthDate
    }
    const _user = new User(data);
    _user.save().then(
        (createdUser) => {
            res.status(200).json({ message: "User added successfully.. " })
        }
    ).catch((err) => {
        res.status(400).json({ message: "Error creating user !" })
    })
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })   //recherche dans DB
    if (!user) {
        return res.status(400).json({ message: "Email Invalid!" })
    }
    bcrypt.compare(password, user.password).then(
        (isMatch) => {
            if (isMatch == false) {
            return res.status(400).json({ message: "pwd Invalid!" })
        }else {
            //genreate token
            const token = jwt.sign(
                //Data
                {data:{id:user._id,role:user.role}},
                //cle creé
                process.env.CLE,
                //expiration token
                {expiresIn:'1h'}
                )
                return res.status(200).json({ message: "Sucess!" ,token:token,user:user})
            }
        }
    )



}
