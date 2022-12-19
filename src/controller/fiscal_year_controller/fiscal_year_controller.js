const { fiscalyears } = require("../../model/index_model")

const create_fiscalyear = async (req, res) => {
    console.log(res.locals);
    try {
        const { name, budget } = req.body

        const create_fiscalyear = await fiscalyears.create({
            name: name,
            budget: budget,
            creator: res.locals.name
        })
        return res.send(create_fiscalyear)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const delete_fiscalyear = async (req, res) => {
    try {
        const { fiscalyear_id } = req.body

        const get_fiscalyear_byID = await fiscalyears.findOne({
            where: {
                fiscalyear_id: fiscalyear_id

            }
        })
        console.log("get_fiscalyearByID=", get_fiscalyear_byID)

        if (get_fiscalyear_byID) {
            const delete_fiscalyear = await fiscalyears.destroy({
                where: {
                    fiscalyear_id: fiscalyear_id
                }
            })
            res.send({ message: "Delete Successfully" })
        } else {
            return res.status(203).send({ message: "หาไม่เจอ" })
        }


    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const get_fiscalyear = async (req, res) => {
    try {
        const get_fiscalyear = await fiscalyears.findAll({
            order: [["fiscalyear_id", "ASC"]]
        })
        return res.send(get_fiscalyear)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const update_fiscalyear = async (req, res) => {
    try {
        const fiscalyear_id = req.params.fiscalyear_id
        const { name, budget } = req.body

        const update_fiscalyear = await fiscalyears.update({
            name: name,
            budget: budget
        }, {
            where: {
                fiscalyear_id: fiscalyear_id
            }
        })
        const get_fiscalyear_byID = await fiscalyears.findOne({
            where: {
                fiscalyear_id: fiscalyear_id
            }
        })
        res.send(get_fiscalyear_byID)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_fiscalyear: create_fiscalyear,
    delete_fiscalyear: delete_fiscalyear,
    get_fiscalyear: get_fiscalyear,
    update_fiscalyear: update_fiscalyear
}

