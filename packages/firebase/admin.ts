// Change 'import * as admin' to this:
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v2/https";

// Use getApps() instead of admin.apps for cleaner, modern code
if (!getApps().length) {
  // ... rest of your initialization logic
  if (process.env.NODE_ENV === "development") {
    process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "demo-project",
    });
  } else {
    admin.initializeApp();
  }
}

export { admin, onRequest };
