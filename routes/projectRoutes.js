import express from "express";

import {
  addProject,
  getProject,
  getProjects,
  updateProject,
} from "../controller/projectController.js";

const router = express.Router();

router.route("/").post(addProject).get(getProjects);

router.route("/:id").get(getProject).put(updateProject);

export default router;
