/**
 * Validates if the detected face is properly positioned within the guide area
 * @param landmarks - Face landmarks from MediaPipe
 * @param video - Video element for dimensions
 * @returns true if face is centered and properly sized
 */
export function validateFacePosition(
    landmarks: { x: number; y: number }[]
): boolean {
    // Get key face points
    const noseTip = landmarks[1]; // Nose tip
    const leftCheek = landmarks[234]; // Left face boundary
    const rightCheek = landmarks[454]; // Right face boundary
    const forehead = landmarks[10]; // Top of face
    const chin = landmarks[152]; // Bottom of face

    // Calculate face center in normalized coordinates (0-1)
    const faceCenterX = noseTip.x;
    const faceCenterY = noseTip.y;

    // Calculate face dimensions
    const faceWidth = Math.abs(rightCheek.x - leftCheek.x);
    const faceHeight = Math.abs(chin.y - forehead.y);

    // Define acceptable ranges for the oval guide area (Relaxed)
    // - Reduced strictness to allow easier positioning while keeping face in oval
    const centerXMin = 0.30;
    const centerXMax = 0.70;
    const centerYMin = 0.20;
    const centerYMax = 0.80;

    // Face should occupy a reasonable portion of the frame
    // Allow user to be slightly further back (min 15% width instead of 20%)
    const minFaceWidth = 0.15;
    const maxFaceWidth = 0.85;
    const minFaceHeight = 0.15;
    const maxFaceHeight = 0.90;

    // Check if face is centered
    const isCentered =
        faceCenterX >= centerXMin &&
        faceCenterX <= centerXMax &&
        faceCenterY >= centerYMin &&
        faceCenterY <= centerYMax;

    // Check if face size is appropriate
    const isSizeCorrect =
        faceWidth >= minFaceWidth &&
        faceWidth <= maxFaceWidth &&
        faceHeight >= minFaceHeight &&
        faceHeight <= maxFaceHeight;

    // Debug logging (only log occasionally to avoid spam)
    if (Math.random() < 0.05) {
        console.log(`[Face Position] Center: (${faceCenterX.toFixed(2)}, ${faceCenterY.toFixed(2)}), Size: ${faceWidth.toFixed(2)}x${faceHeight.toFixed(2)}, Centered: ${isCentered}, SizeOK: ${isSizeCorrect}`);
    }

    return isCentered && isSizeCorrect;
}
