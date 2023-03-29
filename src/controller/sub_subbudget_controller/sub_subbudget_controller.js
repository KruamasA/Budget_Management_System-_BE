const { sub_subbudgets, subbudgets, budgetgroups, superbudgets } = require("../../model/index_model")

const create_sub_subbudget = async (req, res) => {
    try {
        const { name, budget, note, due_date, save_date, use, fiscalyear_id, budgetgroup_id, superbudget_id, subbudget_id } = req.body

        console.log("name",name);

        const create_sub_subbudget = await sub_subbudgets.create({
            name: name,
            budget: budget,
            note: note,
            due_date: due_date,
            save_date: save_date,
            use: use,
            fiscalyear_id: fiscalyear_id,
            budgetgroup_id: budgetgroup_id,
            superbudget_id: superbudget_id,
            subbudget_id: subbudget_id,
            creator: res.locals.name
        })
        return res.send(create_sub_subbudget)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const get_sub_subbudget_byId = async (req, res) => {
    try {
        // const fiscalyear_id = req.params.fiscalyear_id
        const subbudget_id = req.params.subbudget_id
        const get_sub_subbudget_byId = await sub_subbudgets.findAll({
            where: {
                subbudget_id: subbudget_id
            },
        }) 
        return res.send(get_sub_subbudget_byId)

    } catch (error) {
        return res.status(500).send("mmmmm") 
    }

}

const get_sub_subbudget = async (req, res) => {
    try {
        const get_sub_subbudget = await sub_subbudgets.findAll({
            order: [["sub_subbudget_id", "ASC"]]
        })
        return res.send(get_sub_subbudget)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const delete_sub_subbudget = async (req, res) => {
    try {
        const { sub_subbudget_id } = req.body

        const get_sub_subbudget_byID = await sub_subbudgets.findOne({
            where: {
                sub_subbudget_id: sub_subbudget_id
            }
        })
        console.log("get_sub_subbudget_byID=", get_sub_subbudget_byID)

        if (get_sub_subbudget_byID) {
            const delete_sub_subbudget = await sub_subbudgets.destroy({
                where: {
                    sub_subbudget_id: sub_subbudget_id
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

const update_sub_subbudget = async (req, res) => {
    try {
        const sub_subbudget_id = req.params.sub_subbudget_id
        const { name, budget, note, due_date, use, save_date} = req.body

        const update_sub_subbudget = await sub_subbudgets.update({
            name: name,
            budget: budget,
            note: note,
            due_date: due_date,
            use: use,
            save_date: save_date
        }, {
            where: {
                sub_subbudget_id: sub_subbudget_id
            }
        })
        const get_sub_subbudget_byID = await sub_subbudgets.findOne({
            where: {
                sub_subbudget_id: sub_subbudget_id
            }
        })
        res.send(get_sub_subbudget_byID)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    create_sub_subbudget: create_sub_subbudget,
    delete_sub_subbudget: delete_sub_subbudget,
    get_sub_subbudget: get_sub_subbudget,
    update_sub_subbudget: update_sub_subbudget,
    get_sub_subbudget_byId: get_sub_subbudget_byId
}