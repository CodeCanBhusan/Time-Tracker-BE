import { Developer } from "../model/developerModel.js";
import { TimeSheet } from "../model/timeSheetModel.js";

// POST api/time-sheets/start
export const addTimeSheet = async (req, res) => {
  try {
    const { userToken, project, startTime } = req.body;

    const developer = await Developer.findById(userToken);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    const newTimeSheet = await TimeSheet.create({
      developer: developer?._id,
      project,
      startTime,
    });

    res.status(201).json(newTimeSheet);
  } catch (error) {
    res.status(500).json(error);
  }
};

// POST api/time-sheets/:id/end
export const endTimeSheet = async (req, res) => {
  try {
    const { userToken, project, endTime, remarks } = req.body;

    const { id } = req.params;

    const developer = await Developer.findById(userToken);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    const updatedTimeSheet = await TimeSheet.findByIdAndUpdate(
      id,
      {
        developer: developer?._id,
        project,
        endTime,
        remarks,
      },
      { new: true }
    );

    res.status(201).json(updatedTimeSheet);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET /api/time-sheets/turn/:userToken/:project
export const getTimeSheetTurn = async (req, res) => {
  try {
    const { userToken, project } = req.params;

    if (!userToken || !project) {
      return res
        .status(400)
        .json({ message: "User token and project are required" });
    }

    const _timeSheet = await TimeSheet.findOne({
      developer: userToken,
      project: project,
      isActive: true,
    })
      .sort({ startTime: -1 })
      .populate("developer", "name email");

    if (!_timeSheet) {
      res.status(200).json({
        turn: "start",
        developer: _timeSheet?.developer,
      });

      return;
    }

    if (!!_timeSheet?.startTime && !_timeSheet.endTime) {
      res.status(200).json({
        turn: "end",
        timeSheet: _timeSheet,
        developer: _timeSheet?.developer,
      });

      return;
    }

    if (!!_timeSheet?.startTime && !!_timeSheet.endTime) {
      res.status(200).json({
        turn: "start",
        developer: _timeSheet?.developer,
      });

      return;
    }

    res.status(200).json({
      turn: "start",
      developer: _timeSheet?.developer,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
