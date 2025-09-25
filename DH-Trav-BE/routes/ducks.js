import { Router } from "express";
import { 
  getAllDucks, 
  createDuck, 
  updateDuck, 
  deleteDuck, 
  getDuckById 
} from "../controllers/ducksController.js";

const router = Router();

// Route definitions
router.get("/", getAllDucks);
router.get("/:id", getDuckById);
router.post("/", createDuck);
router.put("/:id", updateDuck);
router.delete("/:id", deleteDuck);

export default router;
