const express = require("express");
const router = express.Router();


const admin_controller = require("../controller/admin_controller/admin_controller");
const fiscalyear_controller = require("../controller/fiscal_year_controller/fiscal_year_controller");
const budgetgroup_controller = require("../controller/budget_group_controller/budget_group_controll");
const main_admin_controller = require("../controller/main_admin_controller/main_admin_controller");
const login_controller = require("../controller/login_controller")

const auth = require("../middleware/auth");
const superbudget_controller = require("../controller/superbudget_controller/superbudget_controller");
const subbudget_controller = require("../controller/subbudget_controller/subbudget_controller");

// router.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

//login
router.post("/login",login_controller.login)

//main_admin
router.post("/create/main_admin",main_admin_controller.create_main_admin)
router.get("/get/main_admin", auth,main_admin_controller.get_main_admin)


//admin
router.post("/create/admin",auth,admin_controller.create_admin) 
router.get("/get/admin",auth, admin_controller.get_admin) 
router.put("/update/admin/:admin_id",admin_controller.update_admin) 
router.post("/delete/admin",admin_controller.delete_admin) 

//fiscalyear
router.post("/create/fiscalyear",auth, fiscalyear_controller.create_fiscalyear) 
router.get("/get/fiscalyear",fiscalyear_controller.get_fiscalyear)
router.get("/get/fiscalyear_byId/fiscalyear=:fiscalyear_id",fiscalyear_controller.get_fiscal_year_byId)
router.put("/update/fiscalyear",fiscalyear_controller.update_fiscalyear) 
router.post("/delete/fiscalyear",fiscalyear_controller.delete_fiscalyear) 
// router.get("/get/fiscalyear/:fiscalyear_id",auth,fiscalyear_controller.get_fiscalyear_byID)

//budgetgroup
router.post("/create/budgetgroup/fiscalyear=:fiscalyear_id",auth, budgetgroup_controller.create_budgetgroup_byId) 
router.get("/get/budgetgroup",budgetgroup_controller.get_budgetgroup) 
router.put("/update/budgetgroup/:budgetgroup_id",budgetgroup_controller.update_budgetgroup) 
router.post("/delete/budgetgroup",budgetgroup_controller.delete_budgetgroup) 
router.get("/get/budgetgroup/:fiscalyear_id",auth , budgetgroup_controller.get_budgetgroup_byId)

//superbudget
router.post("/create/superbudget",auth, superbudget_controller.create_superbudget) 
router.get("/get/superbudget",superbudget_controller.get_superbudget) 
router.put("/update/superbudget/:superbudget_id",superbudget_controller.update_superbudget) 
router.post("/delete/superbudget",superbudget_controller.delete_superbudget) 
router.get("/get/superbudget/:budgetgroup_id",superbudget_controller.get_superbudget_byId)

//subbudget
router.post("/create/subbudget",auth, subbudget_controller.create_subbudget) 
router.get("/get/subbudget",subbudget_controller.get_subbudget) 
router.put("/update/subbudget/:subbudget_id",subbudget_controller.update_subbudget) 
router.post("/delete/subbudget",subbudget_controller.delete_subbudget)
router.get("/get/subbudget/:superbudget_id",auth,subbudget_controller.get_subbudget_byId) 

module.exports = router;