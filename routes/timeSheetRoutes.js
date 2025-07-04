import express from "express";

import {
  addTimeSheet,
  endTimeSheet,
  getTimeSheetTurn,
} from "../controller/timeSheetController.js";

const router = express.Router();

router.route("/start").post(addTimeSheet);
router.route("/:id/end").post(endTimeSheet);
router.route("/turn/:userToken/:project").get(getTimeSheetTurn);

export default router;
