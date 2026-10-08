'use client';

import toast, { ToastPosition } from 'react-hot-toast';
import CustomNotification from '@/app/components/ui/CustomNotification';

/**
 * Enhanced Toast Utility
 * Provides themed success, error, promise, and custom notification toasts.
 */

// ============================================================================
// SUCCESS TOAST
// ============================================================================

export function showSuccessToast(message: string, position: ToastPosition = 'top-center') {
    return toast.success(message, {
        duration: 4000,
        position,
    });
}

// ============================================================================
// ERROR TOAST
// ============================================================================

export function showErrorToast(message: string, position: ToastPosition = 'top-center') {
    return toast.error(message, {
        duration: 4000,
        position,
    });
}

// ============================================================================
// CUSTOM NOTIFICATION TOAST (for FCM notifications)
// ============================================================================

export interface CustomNotificationToastOptions {
    id?: string;
    title: string;
    message: string;
    avatar?: string;
    appLogo?: string;
    clickAction?: string;
    conversationId?: string;
    senderId?: string;
    position?: ToastPosition;
    duration?: number;
    onClose?: () => void;
}

/**
 * Show a custom notification toast (for FCM notifications, messages, likes, etc.)
 * Uses CustomNotification component with chat store integration
 */
export function showNotificationToast(options: CustomNotificationToastOptions) {
    return toast.custom(
        (t) => (
            <CustomNotification
                t={t}
                title={options.title}
                message={options.message}
                avatar={options.avatar}
                appLogo={options.appLogo}
                clickAction={options.clickAction}
                conversationId={options.conversationId}
                senderId={options.senderId}
                onClose={options.onClose}
            />
        ),
        {
            duration: options.duration || 5000,
            position: options.position || 'top-right',
            id: options.id,
        }
    );
}

// ============================================================================
// PROMISE TOAST
// ============================================================================

export function showPromiseToast<T>(
    promise: Promise<T>,
    msgs: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((err: Error) => string);
    },
    position: ToastPosition = 'top-center'
) {
    return toast.promise(
        promise,
        {
            loading: msgs.loading,
            success: msgs.success,
            error: msgs.error,
        },
        { position }
    );
}

// ============================================================================
// UNIFIED TOAST API
// ============================================================================

export const showToast = {
    success: showSuccessToast,
    error: showErrorToast,
    notification: showNotificationToast,
    promise: showPromiseToast,
    dismiss: (toastId?: string) => toast.dismiss(toastId),
};

export default showToast;
