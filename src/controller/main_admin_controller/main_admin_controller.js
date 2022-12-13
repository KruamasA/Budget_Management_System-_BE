const { mainadmins } = require("../../model/index_model")
const  bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")

const create_main_admin = async (req, res) => {
    try {
        const { name, username, password} = req.body

        const hash_password = await bcrypt.hash(password,10);

        const check_username_admin = await admins.findOne({
            where : {username : username}
        }) 
        const check_username_mainadmin = await mainadmins.findOne({
            where : {username : username}
        })

        if ((check_username_admin === null) && (check_username_mainadmin === null)) {
            const create_main_admin = await mainadmins.create({
                name: name,
                username: username,
                password: hash_password
            })
            return res.send(create_main_admin)
        } else {
            return res.status(500).send(error.message)
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const get_main_admin = async (req, res) => {
    console.log("get main admin");
    console.log(res.locals);
    try {
        const get_main_admin = await mainadmins.findAll({
            order: [["mainadmin_id", "ASC"]]
        })
        return res.send(get_main_admin)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_main_admin: create_main_admin,
    get_main_admin: get_main_admin
}
