import { Router } from "express";
import User from "../Models/User.js";
import auth from "../Middleware/auth.js";
import multer from "multer";
const storage = multer.memoryStorage();
const router = new Router();

const upload = multer({
  dest: "avatars/",
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post("/users", upload.single("avatar"), async (req, res) => {
  try {
    const user = new User(req.body);
    console.log({ headers: req.headers, body: req.body, file: req.file });
    if (req.file) {
      user.avatar = req.file.buffer;
    }
    await user.save();
    const token = await user.generateAuthToken();
    // console.log("generatedToken");
    res.status(201).send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get all users
router.get("/users", async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/find/id/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("user not found");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("something went wrong");
  }
});

router.post("/users/find/email", async (req, res) => {
  const email = req.body.email;
  // console.log(email);
  try {
    const opponent = await User.findOne({ email });

    if (!opponent) {
      return res.status(404).send("user not found");
    }

    res.status(200).send(opponent);
  } catch (e) {
    res.status(500).send("something went wrong");
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "username", "avatar"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // console.log(req.user);
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // console.log("me/avatar");
    try {
      // console.log(req.file);
      console.log("req.file", req.file);
      req.user.avatar = req.file.buffer;
      await req.user.save();
      // console.log("req.file", req.file.buffer);
      res.send({ message: "file uploaded successfully" });
    } catch (e) {
      throw Error(e.message);
    }
  },
  (error, req, res, next) => {
    // console.log("me/avatar");
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar"),
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    req.send();
  };

// allowing a user to fetch profile picture
router.get("/users/:id/avatar"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user || !user.avatar) {
        throw new Error();
      }
      req.set("Content-Type", "image/jpg");
      res.send(user.avatar);
    } catch (error) {
      res.status(404).send();
    }
  };

export default router;
