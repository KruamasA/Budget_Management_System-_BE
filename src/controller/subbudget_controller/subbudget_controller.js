const { subbudgets } = require("../../model/index_model")
// const main_admin = require("../../model/schema/main_admin")
// const { get } = require("../../routes/indexRoutes")

const create_subbudget = async (req, res) => {
    try {
        const { name, budget, fiscalyear_id, budgetgroup_id, superbudget_id } = req.body

        const createAdmin = await subbudgets.create({
            name: name,
            budget: budget,
            fiscalyear_id: fiscalyear_id,
            budgetgroup_id: budgetgroup_id,
            superbudget_id: superbudget_id,
            creator: res.locals.name
        })
        return res.send(create_subbudget)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const get_subbudget = async (req, res) => {
    try {
        const get_subbudget = await subbudgets.findAll({
            order: [["subbudget_id", "ASC"]]
        })
        return res.send(get_subbudget)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const delete_subbudget = async (req, res) => {
    try {
        const { subbudget_id } = req.body

        const get_subbudget_byID = await subbudgets.findOne({
            where: {
                subbudget_id: subbudget_id
            }
        })
        console.log("get_subbudget_byID=", get_subbudget_byID)

        if (get_subbudget_byID) {
            const delete_subbudget = await subbudgets.destroy({
                where: {
                    subbudget_id: subbudget_id
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

const update_subbudget = async (req, res) => {
    try {
        const subbudget_id = req.params.subbudget_id
        const { name, budget } = req.body

        const update_subbudget = await subbudgets.update({
            name: name,
            budget: budget
        }, {
            where: {
                subbudget_id: subbudget_id
            }
        })
        const get_subbudget_byID = await subbudgets.findOne({
            where: {
                subbudget_id: subbudget_id
            }
        })
        res.send(get_subbudget_byID)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_subbudget: create_subbudget,
    delete_subbudget: delete_subbudget,
    get_subbudget: get_subbudget,
    update_subbudget: update_subbudget
}