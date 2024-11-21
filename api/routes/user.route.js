import express from "express";
const router = express.Router();
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { vu } from "../utils/vu.js";


router.get("/test", test
);
router.put("/update/:id",vu,updateUser)
export default router;
