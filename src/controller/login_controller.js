const { where } = require('sequelize')
const { admins, mainadmins } = require('../model/index_model')
const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config();

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const check_user_mainadmin = await mainadmins.findOne({
            where: { username: username }
        })

        const check_user_admin = await admins.findOne({
            where: { username: username }
        })

        if (check_user_mainadmin) {

            if (check_user_mainadmin && (await bcrypt.compare(password, check_user_mainadmin.password))) {
                // Create token
                const token = jsonwebtoken.sign(
                    { mainAdmin_id: check_user_mainadmin.mainAdmin_id, username },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                // save mainadmins token
                check_user_mainadmin.token = token;

                console.log("ok main admin")

                // mainadmins
                return res.status(200).json(check_user_mainadmin);
            }

        } else if (check_user_admin && (await bcrypt.compare(password, check_user_admin.password))) {
            // Create token
            const token = jsonwebtoken.sign(
                { admin_id: check_user_admin.admin_id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save admins token
            check_user_admin.token = token;

            console.log("ok admin")

            // admins
            return res.status(200).json(check_user_admin);

        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}
module.exports = {
    login: login
}