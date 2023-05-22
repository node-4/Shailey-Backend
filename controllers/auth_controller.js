const LoginModel = require("../models/otp.model");
const newOTP = require("otp-generators");
//const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.configs");
const twilio = require("twilio");
const accountSid = "AC64d2540032d625f24bf75e9bf45522ea";
const authToken = "c8f5bb605949380c59313891958be532";
const client = twilio(accountSid, authToken);

exports.login = async (req, res) => {
    try {
        const userexists = await LoginModel.findOne({ phone: req.body.phone });
        if (userexists && req.body.phone == "9876543210") {
            userexists.OTP = 1234;
            await userexists.save();
            return res
                .status(200)
                .send({ message: "otp sent successfully", otp: 1234 });
        }
        if (userexists) {
            const otpGen = Math.floor(1000 + Math.random() * 9000).toString();
            userexists.OTP = otpGen;
            const updatedUser = await userexists.save();

            client.messages.create({
                body: `Your OTP for login is: ${otpGen}`,
                messagingServiceSid: "MGe4d477423a9242714f79040637360f7a",
                from: "+15075797754",
                to: `+91${userexists.phone}`,
            });

            return res.status(200).json({
                otp: otpGen,
                message: "OTP sent successfully",
            });
        } else {
            if ((req.body.phone = "9876543210")) {
                const otpToSend = await LoginModel.create({
                    phone: req.body.phone,
                    OTP: "1234",
                });
                return res.status(200).json({
                    success: true,
                    otp: otpGen,
                    message: "OTP sent Successfully",
                });
            }
            const otpGen = Math.floor(1000 + Math.random() * 9000).toString();

            const data = {
                phone: req.body.phone,
                OTP: otpGen,
            };

            const otpToSend = await LoginModel.create(data);

            client.messages.create({
                body: `Your OTP for login is: ${otpGen}`,
                messagingServiceSid: "MGe4d477423a9242714f79040637360f7a",
                from: "+15075797754",
                to: `+91${req.body.phone}`,
            });

            return res.status(200).json({
                success: true,
                otp: otpGen,
                message: "OTP sent Successfully",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

// exports.login = async (req, res) => {
//     try {
//         const userexists = await LoginModel.findOne({ phone: req.body.phone });
//         //console.log( userexits);

//         if (userexists) {
//             //console.log(userexists,"123");

//             const otpGen = newOTP.generate(4, {
//                 alphabets: false,
//                 upperCase: false,
//                 specialChar: false,
//             });
//             userexists.OTP = otpGen;
//             // const updatedUser = await userexists.save();

//             //console.log(updatedUser);

//             await userexists.save();
//             return res.status(200).json({
//                 OTP: otpGen,
//                 message: "OTP sent successfully",
//             });
//         } else {
//             const otpGen = newOTP.generate(4, {
//                 alphabets: false,
//                 upperCase: false,
//                 specialChar: false,
//             });

//             const data = {
//                 phone: req.body.phone,
//                 OTP: otpGen,
//             };

//             const otpToSend = await LoginModel.create(data);
//             return res.status(200).json({
//                 data: otpToSend.OTP,
//                 message: "OTP Generated Successfully",
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "internal server error" });
//     }
// };

exports.verifyOtp = async (req, res) => {
    try {
        // const { phone,OTP } = req.body;
        // console.log({ phone,OTP });

        const data = {
            phone: req.body.phone,
            // OTP : req.body.OTP
        };
        //console.log(req.body.phone);
        // console.log(req.body.OTP);

        if (!data.phone) {
            return res
                .status(400)
                .json({ message: "phone Number is required" });
        }
        if (!req.body.OTP) {
            return res.status(401).json({ message: "OTP is required" });
        }
        //const users= await LoginModel.find();

        const user = await LoginModel.findOne({ phone: req.body.phone });

        //console.log(user);
        if (!user) {
            return res.status(401).json({
                message: "Invalid phone Number",
            });
        }
        //console.log(user);

        if (user.OTP != req.body.OTP) {
            return res.status(403).json({ message: "Invalid OTP" });
        }
        const accessToken = jwt.sign({ id: user.phone }, authConfig.secret, {
            expiresIn: "24h",
        });
        const refreshToken = jwt.sign({ id: user.phone }, authConfig.secret, {
            expiresIn: "24h",
        });
        console.log(
            `#### user with phone number ${user.phone}  logged in ####`
        );

        return res.status(200).json({
            data: user,
            message: "user logged in",
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "internal server error" });
    }
};

// exports.refreshAccessToken = (req,res)=>{
//     const accessToken = jwt.sign({id: req.user.userId}, authConfig.secret, {expiresIn : authConfig.accessTokenTime});
//     res.status(200).send({
//         accessToken : accessToken
//     });

exports.socialLogin = async (req, res) => {
    try {
        const data = { phone: req.body.socialId };
        const user = await LoginModel.findOne({ phone: data.phone });
        console.log(user);
        if (!user) {
            const user = await LoginModel.create(data);
            const accessToken = jwt.sign(
                { id: user.phone },
                authConfig.secret,
                {
                    expiresIn: "24h",
                }
            );
            return res.status(200).send({
                msg: "logged in successfully",
                accessToken: accessToken,
                data: user,
            });
        }
        const accessToken = jwt.sign({ id: user.phone }, authConfig.secret, {
            expiresIn: "24h",
        });
        res.status(200).send({
            msg: "logged in successfully",
            accessToken: accessToken,
            data: user,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "internal server error",
            err: err.message,
        });
    }
};
