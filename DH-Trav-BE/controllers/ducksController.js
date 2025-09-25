import Duck from "../models/Duck.js";

// Get all non-deleted ducks
export const getAllDucks = async (req, res) => {
  try {
    const ducks = await Duck.find({ deleted: false });
    res.json(ducks);
  } catch (error) {
    console.error("Error fetching ducks:", error);
    res.status(500).json({ message: "Error fetching ducks", error: error.message });
  }
};

// Create a new duck
export const createDuck = async (req, res) => {
  try {
    const id = Math.floor(Math.random() * 1000000); // Spec stated the ID should be a number, not a UUID/GUID
    const duck = new Duck({...req.body, id, deleted: false });
    await duck.save();
    res.status(201).json(duck);
  } catch (error) {
    console.error("Error creating duck:", error);
    res.status(500).json({ message: "Error creating duck", error: error.message });
  }
};

// Update an existing duck
export const updateDuck = async (req, res) => {
  try {
    const duck = await Duck.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!duck) {
      return res.status(404).json({ message: "Duck not found" });
    }
    res.json(duck);
  } catch (error) {
    console.error("Error updating duck:", error);
    res.status(500).json({ message: "Error updating duck", error: error.message });
  }
};

// Logical delete a duck
export const deleteDuck = async (req, res) => {
  try {
    const duck = await Duck.findOneAndUpdate({ id: req.params.id }, { deleted: true }, { new: true });
    if (!duck) {
      return res.status(404).json({ message: "Duck not found" });
    }
    res.json({ message: "Duck deleted" });
  } catch (error) {
    console.error("Error deleting duck:", error);
    res.status(500).json({ message: "Error deleting duck", error: error.message });
  }
};

// Get a single duck by ID
export const getDuckById = async (req, res) => {
  try {
    const duck = await Duck.findOne({ id: req.params.id, deleted: false });
    if (!duck) {
      return res.status(404).json({ message: "Duck not found" });
    }
    res.json(duck);
  } catch (error) {
    console.error("Error fetching duck:", error);
    res.status(500).json({ message: "Error fetching duck", error: error.message });
  }
};
