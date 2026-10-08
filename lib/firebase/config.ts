import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getMessaging, Messaging, isSupported } from "firebase/messaging";

/**
 * Firebase Configuration
 * 
 * Initializes Firebase app with environment variables.
 * Provides Firebase Messaging instance for FCM token management.
 */

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional: for Google Analytics
};

// Initialize Firebase app (singleton)
let app: FirebaseApp;
let messaging: Messaging | null = null;

export const getFirebaseApp = (): FirebaseApp => {
    if (!app) {
        // Check if Firebase app is already initialized
        const apps = getApps();
        if (apps.length > 0) {
            app = apps[0];
        } else {
            app = initializeApp(firebaseConfig);

        }
    }
    return app;
};

export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
    try {
        // Check if messaging is supported (not supported in all browsers)
        const messagingSupported = await isSupported();
        if (!messagingSupported) {
            console.warn("⚠️ Firebase Messaging is not supported in this browser");
            return null;
        }

        if (!messaging) {
            // Register service worker for background notifications
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                        scope: '/'
                    });


                    // Wait for service worker to be ready
                    await navigator.serviceWorker.ready;

                } catch (swError) {
                    console.error("❌ Service Worker registration failed:", swError);
                    // Continue anyway - foreground notifications will still work
                }
            }

            const app = getFirebaseApp();
            messaging = getMessaging(app);

        }
        return messaging;
    } catch (error) {
        console.error("❌ Error initializing Firebase Messaging:", error);
        return null;
    }
};

export default getFirebaseApp;
