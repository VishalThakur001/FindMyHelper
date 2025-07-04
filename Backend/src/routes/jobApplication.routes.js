import express from "express";
import {
  applyForJob,
  confirmApplication,
  updateApplicationStatus,
  getApplicationsForCustomer,
  getMyApplications
} from "../controllers/jobApplication.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Worker applies
router.post("/apply/:jobId", authenticateUser, applyForJob);

// Worker: view all applications sent
router.get("/my-applications", authenticateUser, getMyApplications);

// Customer: view applications for a job they posted
router.get("/job-applications/:jobId", authenticateUser, getApplicationsForCustomer);

// Customer updates application status (accept/reject)
router.put("/:applicationId", authenticateUser, updateApplicationStatus);

// Customer accepts
router.put("/:applicationId/accept", authenticateUser, confirmApplication);

export default router;