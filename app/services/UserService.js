const User = lulu.use("app/models/mongoose/User");
const { db, Hash } = lulu.use("app/helpers");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);
const AppValidationError = lulu.use("app/errors/AppValidationError");

async function userLogin({ email, password }) {
  let isExistingUser = await User.findOne({
    email,
  })
    .select("password")
    .exec();
  if (!isExistingUser || !Hash.compare(password, isExistingUser.password)) {
    throw new Error("Wrong email or password !");
  }
  let user = await User.findOne({ email });
  return user;
}

async function loginSocial(data) {
  let isExistingUser = await userByEmail(data.email);

  if (isExistingUser) {
    if (
      data.socialLogin.id === isExistingUser.socialLogin.id &&
      data.socialLogin.provider === isExistingUser.socialLogin.provider
    ) {
      return isExistingUser;
    }
    let newUser = new User(data);
    return newUser.save();
  }
}

async function regularRegistration(data) {
  if (await userByEmail(data.email)) {
    throw new ResourceAlreadyExistsError(
      "User with this email already exists."
    );
  }

  let newUser = new User({
    name: data.name,
    uid: await generateUserId(),
    email: data.email,
    password: await Hash.make(data.password),
    baseRole: data.baseRole,
  });

  return await newUser.save();
}

async function resolveCreator(userId, createdBy) {
  return await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        createdBy: createdBy,
      },
    },
    {
      new: true,
    }
  );
}

async function list() {
  return await User.find();
}

async function details(id) {
  if (!db.isValidObjectId(id)) {
    return null;
  } // return null if id is not valid ObjectId to avoid error in mongoose.
  return await User.findOne({ _id: id });
}

async function userByEmail(email) {
  return await User.findOne({ email: email });
}

async function generateUserId() {
  let userId = Math.floor(Math.random() * 10000000000);
  if (await userByUserId(userId)) {
    return await generateUserId();
  }
  return userId;
}

async function userByUserId(userId) {
  return await User.findOne({ userId: userId });
}

module.exports = {
  list,
  details,
  userByEmail,
  userByUserId,
  regularRegistration,
  resolveCreator,
  userLogin,
  loginSocial,
};
