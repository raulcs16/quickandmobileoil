import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

// Initialize your admin app if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp();
}

export { admin, onRequest };
