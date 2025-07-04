import { Developer } from "../model/developerModel.js";

// POST api/developers
export const addDeveloper = async (req, res) => {
  try {
    const { name, email, projects } = req.body;

    const newDeveloper = await Developer.create({
      name,
      email,
      projects,
    });

    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET api/developers
export const getDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find({
      isActive: true,
    })
      .sort({ name: -1 })
      .populate("projects");

    if (developers.length === 0) {
      return res.status(404).json({ message: "No developers found" });
    }

    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET api/developers/:id
export const getDeveloper = async (req, res) => {
  try {
    const { id } = req.params;

    const developer = await Developer.findById(id).populate("projects");

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.status(201).json(developer);
  } catch (error) {
    res.status(500).json(error);
  }
};

// PUT api/developers/:id
export const updateDeveloper = async (req, res) => {
  try {
    const { name, email, isActive, projects } = req.body;
    const { id } = req.params;

    const updateDeveloper = await Developer.findByIdAndUpdate(
      id,
      {
        name,
        email,
        isActive,
        projects,
      },
      { new: true }
    );

    res.status(201).json(updateDeveloper);
  } catch (error) {
    res.status(500).json(error);
  }
};
