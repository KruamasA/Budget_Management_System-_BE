const { superbudgets, subbudgets } = require("../../model/index_model")

const create_superbudget = async (req, res) => {
    try {
        const { name, budget, note, due_date, fiscalyear_id, budgetgroup_id } = req.body

        const create_superbudget = await superbudgets.create({
            name: name,
            budget: budget,
            note: note,
            due_date : due_date,
            fiscalyear_id: fiscalyear_id,
            budgetgroup_id: budgetgroup_id,
            creator: res.locals.name
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
        const get_superbudget = await superbudgets.findAll({
            order: [["superbudget_id", "ASC"]]
        })
        return res.send(get_superbudget)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const get_superbudget_byId = async (req, res) => {
    try {
        const budgetgroup_id = req.params.budgetgroup_id
        const get_superbudget_byID = await superbudgets.findAll({
            where: {
                budgetgroup_id: budgetgroup_id
            },
            include: [
                {
                    model: subbudgets
                }
            ]
        })
        return res.send(get_superbudget_byID)

    } catch (error) {
        return res.status(500).send("bbbbb")
    }

}

const update_superbudget = async (req, res) => {
    try {
        const superbudget_id = req.params.superbudget_id
        const { name, budget, note, due_date } = req.body

        const update_subbudget = await superbudgets.update({
            name: name,
            budget: budget,
            note: note,
            due_date: due_date
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
    update_superbudget: update_superbudget,
    get_superbudget_byId: get_superbudget_byId
}