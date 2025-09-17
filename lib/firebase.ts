// Firebase configuration
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAnL-JHYv-PCmPspN9sef9j6vF3ovSu6pc",
  authDomain: "studymate-4ba45.firebaseapp.com",
  projectId: "studymate-4ba45",
  storageBucket: "studymate-4ba45.firebasestorage.app",
  messagingSenderId: "537351683696",
  appId: "1:537351683696:web:9a974ba473f476cc163eb5",
  measurementId: "G-DQDBFKT0BL"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;