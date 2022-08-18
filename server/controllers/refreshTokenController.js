import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
   
    if (!cookies?.jwt) return res.sendStatus(401);
   
    const refToken = cookies.jwt;

    console.log("This is refresh token: " + refToken)
    const foundUser = await User.findOne({ refToken }).exec();

    console.log(foundUser)
   
    if (!foundUser) return res.sendStatus(403); //Forbidden 
   
    // evaluate jwt 
   //[server] TypeError: secret must be a string or bufferor a KeyObject
   
    jwt.verify(
        refToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
           if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const token = jwt.sign(
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            console.log(token)
            res.json({ token })
        }
    );
}

export { handleRefreshToken }