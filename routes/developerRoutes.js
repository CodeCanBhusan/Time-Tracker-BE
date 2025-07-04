import express from "express";
import {
  addDeveloper,
  getDeveloper,
  getDevelopers,
  updateDeveloper,
} from "../controller/developerController.js";

const router = express.Router();

router.route("/").post(addDeveloper).get(getDevelopers);

router.route("/:id").get(getDeveloper).put(updateDeveloper);

export default router;
