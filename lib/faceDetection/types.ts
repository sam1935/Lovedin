/**
 * Type definitions for face liveness detection
 */

export type LivenessStage =
    | "idle"
    | "initializing"
    | "detecting-face"
    | "blink"
    | "smile"
    | "capture"
    | "complete"
    | "error";

export interface DetectionResults {
    blinkDetected: boolean;
    smileDetected: boolean;
    timestamp: number;
    blinkCount?: number;
}

export interface LivenessState {
    stage: LivenessStage;
    progress: number;
    instruction: string;
    error?: string;
}

export const LIVENESS_INSTRUCTIONS: Record<LivenessStage, string> = {
    idle: "Click Start to begin verification",
    initializing: "Initializing face detection...",
    "detecting-face": "Position your face in the frame",
    blink: "Please blink your eyes",
    smile: "Great! Now smile 😊",
    capture: "Perfect! Capturing photo...",
    complete: "Verification complete!",
    error: "An error occurred. Please try again.",
};

export const LIVENESS_PROGRESS: Record<LivenessStage, number> = {
    idle: 0,
    initializing: 10,
    "detecting-face": 20,
    blink: 40,
    smile: 70,
    capture: 90,
    complete: 100,
    error: 0,
};
