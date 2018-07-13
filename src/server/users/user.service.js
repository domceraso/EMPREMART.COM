const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
// const createToken = require('../_helpers/createToken')
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}



async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}
/*

async function create(userParam) {
    //validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    //send verification email
    const token = createToken({ name });
    const verifyAddress =
      `${config.apiUrl}/email_verification/?token=${token}`;
    const content =
      `<a href="${verifyAddress}">
         Click to verify your email address.
      </a>`;
    
    const info = await sendMail(email, content).catch((err) => {
      res.status(500).json({ success: false, message: 'email sent error' });
      console.log('Email not sent, err:' + err);
    });

    const hashedPassword = await hashPassword(password);
    await new User({ email, name, password: hashedPassword, verified: false }).save();

    console.log('____User saved');

    res.status(200).json({ success: true, message: config.USER_MESSAGE.MAIL_SENT });
    console.log('Email sent: ' + info.response);


  };

*/

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}



async function _delete(id) {
    await User.findByIdAndRemove(id);
}
