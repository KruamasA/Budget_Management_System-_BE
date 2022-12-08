const { superbudgets } = require("../../model/index_model")

const create_superbudget = async (req, res) => {
    try {
        const { name, budget } = req.body

        const create_superbudget = await superbudgets.create({
            name: name,
            budget: budget
        })
        return res.send(create_superbudget)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const delete_superbudget = async (req, res) => {
    try {
        const { superbudget_id } = req.body

        const get_superbudget_byID = await superbudgets.findOne({
            where: {
                superbudget_id: superbudget_id
            }
        })
        console.log("get_superbudget_byID=", get_superbudget_byID)

        if (get_superbudget_byID) {
            const delete_superbudget = await superbudgets.destroy({
                where: {
                    superbudget_id: superbudget_id
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

const get_superbudget = async (req, res) => {
    try {
        const get_subbudget = await superbudgets.findAll({
            order: [["subbudget_id", "ASC"]]
        })
        return res.send(get_subbudget)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const update_superbudget = async (req, res) => {
    try {
        const superbudget_id = req.params.admin_id
        const { name, budget } = req.body

        const update_subbudget = await superbudgets.update({
            name: name,
            budget: budget
        }, {
            where: {
                superbudget_id: superbudget_id

            }
        })
        const get_superbudget_byID = await superbudgets.findOne({
            where: {
                superbudget_id: superbudget_id

            }
        })
        res.send(get_superbudget_byID)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_superbudget: create_superbudget,
    delete_superbudget: delete_superbudget,
    get_superbudget: get_superbudget,
    update_superbudget: update_superbudget
}