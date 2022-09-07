import crypto from "crypto";
import { PostGratitude } from "../models/postGratitude.js";
import { User } from "../models/userModel.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import axios from "axios";

// Sets up A3 bucket for images

dotenv.config({ path: "../.env" });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.AWS_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const randomImageName = (bytes = 18) =>
  crypto.randomBytes(bytes).toString("hex");

// @desc    Get gratitudes data and refresh A3 signed image URLs
// @route   GET /api/
// @access  Private

const getGratitudes = async (req, res) => {
  try {
    const data = await PostGratitude.find({ user: req.user });

    for (let post of data) {
      if (typeof post.imageName === "undefined") {
        await PostGratitude.findByIdAndUpdate(post._id, {
          imageName: "sunset.jpg",
        });
      }

      const getObjectParams = {
        Bucket: bucketName,
        Key: post.imageName,
      };

      const command = new GetObjectCommand(getObjectParams);
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

      await PostGratitude.findByIdAndUpdate(post._id, {
        title: post.title,
        category: post.category,
        description: post.description,
        imageName: post.imageName,
        user: post.user,
        imageUrl: signedUrl,
      });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// @desc    Get single gratitude
// @route   GET /api/:id
// @access  Private

const getSingleGratitude = async (req, res) => {
  try {
    const data = await PostGratitude.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// @desc    Add a gratitude
// @route   POST api/save
// @access  Private

const addGratitude = async (req, res) => {
  if (typeof req.file === "undefined") {
    const getObjectParams = {
      Bucket: bucketName,
      Key: "sunset.jpg",
    };

    const command2 = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command2, { expiresIn: 20 });

    const newGratitude = new PostGratitude({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      imageName: "sunset.jpg",
      imageUrl: url,
      user: req.user,
    });

    newGratitude.save((error) => {
      if (error) {
        res.status(500).json({ msg: "Sorry, internal server error" });
        return;
      }
      return res.json({
        msg: "Your data has been saved!",
      });
    });
  } else {
    let newImageName;

    newImageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: newImageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const getObjectParams = {
      Bucket: bucketName,
      Key: newImageName,
    };

    const command2 = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command2, { expiresIn: 20 });

    const newGratitude = new PostGratitude({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      imageName: newImageName,
      imageUrl: url,
      user: req.user,
    });

    newGratitude.save((error) => {
      if (error) {
        res.status(500).json({ msg: "Sorry, internal server error" });
        return;
      }
      return res.json({
        msg: "Your data has been saved!",
      });
    });
  }
};

// @desc    Edit a gratitude
// @route   PUT /api/edit
// @access  Private

const editGratitude = async (req, res) => {
  let newImageUrl;

  if (typeof req.file === "undefined") {
    newImageUrl = req.body.imageUrl;
  } else {
    if (req.body.imageUrl != "sunset.jpg") {
      const params = {
        Bucket: bucketName,
        Key: req.body.imageName,
      };

      const command = new DeleteObjectCommand(params);

      await s3.send(command);
    }

    let newImageName;

    newImageName = randomImageName();
    const params = {
      Bucket: bucketName,
      Key: newImageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const getObjectParams = {
      Bucket: bucketName,
      Key: newImageName,
    };

    const command2 = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command2, { expiresIn: 20 });

    newImageUrl = url;
  }

  const gratitudeId = req.body._id;
  const user = await User.findById(req.user);

  // Check for user

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  try {
    await PostGratitude.findByIdAndUpdate(gratitudeId, {
      user: user._id,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      imageUrl: newImageUrl,
    });
  } catch (error) {
    console.log(error);
  }

  return res.json({
    msg: "Your data has been saved!",
  });
};

// @desc    Delete a gratitude
// @route   DELETE api/:id
// @access  Private

const deleteGratitude = async (req, res) => {
  const gratitude = await PostGratitude.findById(req.params.id);
  const user = await User.findById(req.user);

  // Check for user

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Checks logged in user matches goal user

  if (gratitude.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Deletes S3 Image

  if (gratitude.imageName != "sunset.jpg") {
    const params = {
      Bucket: bucketName,
      Key: gratitude.imageName,
    };

    const command = new DeleteObjectCommand(params);

    await s3.send(command);
  }

  await PostGratitude.findByIdAndDelete(req.params.id);

  res.status(200).json("Gratitude deleted");
};

// @desc    Calls RapidAPI to get gratitude inspiration
// @route   GET api/generateinspiration
// @access  Public

const generateInspiration = async (req, res) => {
  axios({
    method: "GET",
    url: "https://gratitude-questions.p.rapidapi.com/question",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY_GRATITUDES,
      "X-RapidAPI-Host": "gratitude-questions.p.rapidapi.com",
    },
  });

  try {
    const data = res.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export {
  getGratitudes,
  addGratitude,
  getSingleGratitude,
  editGratitude,
  deleteGratitude,
  generateInspiration,
};
