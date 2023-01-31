const { budgetgroups, superbudgets, subbudgets } = require("../../model/index_model")

const create_budgetgroup_byId = async (req, res) => {
    try {
        const { name, budget, fiscalyear_id, note } = req.body

        const create_budgetgroup = await budgetgroups.create({
            name: name,
            budget: budget,
            fiscalyear_id: fiscalyear_id,
            note: note,
            creator: res.locals.name
        })
        return res.send(create_budgetgroup)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const get_budgetgroup = async (req, res) => {
    try {
        const get_budgetgroup = await budgetgroups.findAll({
            order: [["budgetgroup_id", "ASC"]]
        })
        return res.send(get_budgetgroup)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const get_budgetgroup_byId = async (req, res) => {
    try {
        const fiscalyear_id = req.params.fiscalyear_id
        const get_budgetgroup_byID = await budgetgroups.findAll({
            where: {
                fiscalyear_id: fiscalyear_id
            },

            include: [
                {
                    model: superbudgets
                },
                {
                    model: subbudgets
                }
            ]
        })
        return res.send(get_budgetgroup_byID)

    } catch (error) {
        return res.status(500).send("aaaa")
    }

}



const delete_budgetgroup = async (req, res) => {
    try {
        const { budgetgroup_id } = req.body

        const get_budgetgroup_byID = await budgetgroups.findOne({
            where: {
                budgetgroup_id: budgetgroup_id
            }
        })
        console.log("get_budgetgroup_byID=", get_budgetgroup_byID)

        if (get_budgetgroup_byID) {
            const delete_budgetgroup = await budgetgroups.destroy({
                where: {
                    budgetgroup_id: budgetgroup_id
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

const update_budgetgroup = async (req, res) => {
    try {
        const budgetgroup_id = req.params.budgetgroup_id
        const { name, budget , note} = req.body

        const update_budgetgroup = await budgetgroups.update({
            name: name,
            budget: budget,
            note : note
        }, {
            where: {
                budgetgroup_id: budgetgroup_id
            }
        })
        const get_budgetgroup_byID = await budgetgroups.findOne({
            where: {
                budgetgroup_id: budgetgroup_id
            }
        })
        res.send(get_budgetgroup_byID)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_budgetgroup_byId: create_budgetgroup_byId,
    get_budgetgroup: get_budgetgroup,
    update_budgetgroup: update_budgetgroup,
    delete_budgetgroup: delete_budgetgroup,
    get_budgetgroup_byId: get_budgetgroup_byId
}