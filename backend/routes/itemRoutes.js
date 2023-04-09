import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import * as path from "path";

const router = express.Router();
import {
  addItem,
  getItems,
  getItemsById,
  deleteItemsById,
  updateItem,
  getItemsAvailable,
  getItemsByOwnerId,
  getItemsByRenterId,
} from "../controllers/itemController.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "frontend/public/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.route("/").get(getItems);
router.route("/available").get(getItemsAvailable);

router.route("/:id").get(getItemsById);
// router.route("/create").post(addItem);
router.route("/create").post(protect, upload.single("image"), addItem);

router.route("/:id").delete(protect, deleteItemsById);
router.route("/:id").put(updateItem);

router.route("/owner/:ownerId").get(getItemsByOwnerId);
router.route("/renter/:renterId").get(getItemsByRenterId);

export default router;
