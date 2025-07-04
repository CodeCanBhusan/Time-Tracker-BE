import { Project } from "../model/projectModel.js";

// POST api/projects
export const addProject = async (req, res) => {
  try {
    const { name } = req.body;

    const newProject = await Project.create({
      name,
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET api/projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      isActive: true,
    }).sort({ name: -1 });

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET api/projects/:id
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.find(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
};

// PUT api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const { name, isActive } = req.body;
    const { id } = req.params;

    const updateProject = await Project.findByIdAndUpdate(
      id,
      {
        name,
        isActive,
      },
      { new: true }
    );

    if (!updateProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updateProject);
  } catch (error) {
    res.status(500).json(error);
  }
};
