
import CryptoJS from "crypto-js";

/**
 * Encrypts a media ID using AES encryption with the verification key.
 * @param mediaId The media ID to encrypt
 * @returns The encrypted string
 */
export const encryptMediaId = (mediaId: string): string => {
    const key = process.env.NEXT_PUBLIC_PHOTO_VERIFICATION_ENCRYPTION_KEY;

    if (!key) {
        console.warn("Missing NEXT_PUBLIC_PHOTO_VERIFICATION_ENCRYPTION_KEY");
        return mediaId; // In dev/fallback, might just return ID or throw error
    }

    return CryptoJS.AES.encrypt(mediaId, key).toString();
};
