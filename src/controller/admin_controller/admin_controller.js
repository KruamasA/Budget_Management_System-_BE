const { admins, mainadmins } = require("../../model/index_model")
const  bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")

const create_admin = async (req, res) => {
    try {
        const { fname, lname, phone_number, username, password } = req.body

        const hash_password = await bcrypt.hash(password,10);

        const check_username_admin = await admins.findOne({
            where : {username : username}
        }) 
        const check_username_mainadmin = await mainadmins.findOne({
            where : {username : username}
        })
        console.log("check_username")

        if ((check_username_admin === null) && (check_username_mainadmin === null)) {
            console.log("user is null")
            const createAdmin = await admins.create({
                fname: fname,
                lname: lname,
                phone_number: phone_number,
                username: username,
                password: hash_password
            })
            return res.send(createAdmin)
        }else{
            return res.status(500).send("")
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const delete_admin = async (req, res) => {
    try {
        const { admin_id } = req.body

        const get_admin_byID = await admins.findOne({
            where: {
                admin_id: admin_id
            }
        })
        console.log("get_admin_byID=", get_admin_byID)

        if (get_admin_byID) {
            const delete_admin = await admins.destroy({
                where: {
                    admin_id: admin_id
                }
            })
            res.send({ message: "Delete Successfully" })
        } else {
            return res.status(203).send({ message: "Not found ID" })
        }


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const get_admin = async (req, res) => {
    try {
        const get_admin = await admins.findAll({
            order: [["admin_id", "ASC"]]
        })
        return res.send(get_admin)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const update_admin = async (req, res) => {
    try {
        const admin_id = req.params.admin_id
        const { fname, lname, phone_number, username, password } = req.body

        const update_admin = await admins.update({
            fname: fname,
            lname: lname,
            phone_number: phone_number,
            username: username,
            password: password
        }, {
            where: {
                admin_id: admin_id

            }
        })
        const get_admin_byID = await admins.findOne({
            where: {
                admin_id: admin_id
            }
        })
        res.send(get_admin_byID)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_admin: create_admin,
    delete_admin: delete_admin,
    get_admin: get_admin,
    update_admin: update_admin
}