/**
 * Face Liveness Detection Utilities
 * 
 * Provides algorithms for detecting blinks and smiles using MediaPipe face landmarks.
 */

export interface FaceLandmark {
    x: number;
    y: number;
    z?: number;
}

/**
 * Calculate Eye Aspect Ratio (EAR) for blink detection
 * 
 * EAR measures the ratio of eye height to width. When eyes close, EAR drops significantly.
 * Threshold: EAR < 0.2 indicates closed eyes
 * 
 * @param landmarks - Array of 478 face landmarks from MediaPipe
 * @returns Average EAR for both eyes (0-1 range)
 */
export function calculateEyeAspectRatio(landmarks: FaceLandmark[]): number {
    // Left eye landmarks indices
    const leftEyeIndices = {
        outer: 33,
        inner: 133,
        topOuter: 160,
        topInner: 144,
        bottomOuter: 158,
        bottomInner: 153,
    };

    // Right eye landmarks indices
    const rightEyeIndices = {
        outer: 362,
        inner: 263,
        topOuter: 387,
        topInner: 373,
        bottomOuter: 385,
        bottomInner: 380,
    };

    // Get left eye landmarks
    const leftEye = {
        outer: landmarks[leftEyeIndices.outer],
        inner: landmarks[leftEyeIndices.inner],
        topOuter: landmarks[leftEyeIndices.topOuter],
        topInner: landmarks[leftEyeIndices.topInner],
        bottomOuter: landmarks[leftEyeIndices.bottomOuter],
        bottomInner: landmarks[leftEyeIndices.bottomInner],
    };

    // Get right eye landmarks
    const rightEye = {
        outer: landmarks[rightEyeIndices.outer],
        inner: landmarks[rightEyeIndices.inner],
        topOuter: landmarks[rightEyeIndices.topOuter],
        topInner: landmarks[rightEyeIndices.topInner],
        bottomOuter: landmarks[rightEyeIndices.bottomOuter],
        bottomInner: landmarks[rightEyeIndices.bottomInner],
    };

    // Calculate vertical distances for left eye
    const leftVertical1 = euclideanDistance(leftEye.topOuter, leftEye.bottomInner);
    const leftVertical2 = euclideanDistance(leftEye.topInner, leftEye.bottomOuter);
    const leftHorizontal = euclideanDistance(leftEye.outer, leftEye.inner);

    // Calculate vertical distances for right eye
    const rightVertical1 = euclideanDistance(rightEye.topOuter, rightEye.bottomInner);
    const rightVertical2 = euclideanDistance(rightEye.topInner, rightEye.bottomOuter);
    const rightHorizontal = euclideanDistance(rightEye.outer, rightEye.inner);

    // Calculate EAR for each eye
    const leftEAR = (leftVertical1 + leftVertical2) / (2.0 * leftHorizontal);
    const rightEAR = (rightVertical1 + rightVertical2) / (2.0 * rightHorizontal);

    // Return average EAR
    return (leftEAR + rightEAR) / 2.0;
}

/**
 * Calculate Mouth Aspect Ratio (MAR) for smile detection
 * 
 * MAR measures the ratio of mouth height to width. When smiling, MAR increases.
 * Threshold: MAR > 0.6 indicates a smile
 * 
 * @param landmarks - Array of 478 face landmarks from MediaPipe
 * @returns MAR value (0-1+ range)
 */
export function calculateMouthAspectRatio(landmarks: FaceLandmark[]): number {
    // Mouth landmarks indices
    const mouthIndices = {
        leftCorner: 61,
        rightCorner: 291,
        topLip: 13,
        bottomLip: 14,
    };

    const leftCorner = landmarks[mouthIndices.leftCorner];
    const rightCorner = landmarks[mouthIndices.rightCorner];
    const topLip = landmarks[mouthIndices.topLip];
    const bottomLip = landmarks[mouthIndices.bottomLip];

    // Calculate mouth width and height
    const width = euclideanDistance(leftCorner, rightCorner);
    const height = euclideanDistance(topLip, bottomLip);

    // Return MAR
    return height / width;
}

/**
 * Calculate Euclidean distance between two 2D points
 */
function euclideanDistance(p1: FaceLandmark, p2: FaceLandmark): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * Blink detector class to track blink events
 */
export class BlinkDetector {
    private wasEyeClosed = false;
    private blinkCount = 0;
    private readonly threshold: number;

    constructor(threshold = 0.2) {
        this.threshold = threshold;
    }

    /**
     * Check if a blink occurred based on current EAR
     * @param ear - Current Eye Aspect Ratio
     * @returns true if a blink was just detected
     */
    checkBlink(ear: number): boolean {
        if (ear < this.threshold && !this.wasEyeClosed) {
            // Eyes just closed
            this.wasEyeClosed = true;
            return false;
        } else if (ear > this.threshold && this.wasEyeClosed) {
            // Eyes just opened - blink detected!
            this.wasEyeClosed = false;
            this.blinkCount++;
            return true;
        }
        return false;
    }

    getBlinkCount(): number {
        return this.blinkCount;
    }

    reset(): void {
        this.wasEyeClosed = false;
        this.blinkCount = 0;
    }
}

/**
 * Smile detector class to track smile events
 */
export class SmileDetector {
    private readonly threshold: number;
    private isSmiling = false;

    constructor(threshold = 0.6) {
        this.threshold = threshold;
    }

    /**
     * Check if user is currently smiling
     * @param mar - Current Mouth Aspect Ratio
     * @returns true if smiling
     */
    checkSmile(mar: number): boolean {
        const currentlySmiling = mar > this.threshold;

        // Update state
        const justStartedSmiling = currentlySmiling && !this.isSmiling;
        this.isSmiling = currentlySmiling;

        return justStartedSmiling;
    }

    isCurrentlySmiling(): boolean {
        return this.isSmiling;
    }

    reset(): void {
        this.isSmiling = false;
    }
}
