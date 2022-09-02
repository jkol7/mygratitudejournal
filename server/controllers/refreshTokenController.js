import {User} from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refToken = cookies.jwt;

  const foundUser = await User.findOne({refToken}).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden

  jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {username: decoded.username, user: decoded.user},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '1h'}
    );

    res.json({accessToken});
  });
};

export {handleRefreshToken};
