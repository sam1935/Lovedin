// Utility functions for chat functionality

import { Message } from "@/types/chat/chat.type";

/**
 * Format timestamp for message display
 * Returns "11:00 PM", "Yesterday", "Jan 5", etc.
 */
export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  if (isToday(date)) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  // Within the last week
  const daysDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  // Older messages
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 minutes ago", "1 hour ago")
 */
export function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  return formatMessageTime(timestamp);
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Group messages by date for display
 */
export function groupMessagesByDate(messages: Message[]): {
  date: string;
  messages: Message[];
}[] {
  const groups: { date: string; messages: Message[] }[] = [];

  messages.forEach((message) => {
    const date = new Date(message.created_at);
    let dateKey: string;

    if (isToday(date)) {
      dateKey = "Today";
    } else if (isYesterday(date)) {
      dateKey = "Yesterday";
    } else {
      dateKey = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
      });
    }

    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === dateKey) {
      lastGroup.messages.push(message);
    } else {
      groups.push({ date: dateKey, messages: [message] });
    }
  });

  return groups;
}

/**
 * Debounce function for typing indicators
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate temporary ID for optimistic updates
 */
export function generateOptimisticId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if a message is from the current user
 */
export function isOwnMessage(message: Message, currentUserId: string): boolean {
  return message.sender_user_id === currentUserId;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

/**
 * Validate file type for media upload
 */
export function isValidMediaFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/quicktime"];
  return validTypes.includes(file.type);
}

/**
 * Get max file size for media upload (in bytes)
 */
export function getMaxFileSize(): number {
  return 10 * 1024 * 1024; // 10MB
}

/**
 * Download GIF from URL and convert to File object
 * Used for GIPHY integration
 */
export async function downloadGifAsFile(url: string, fileName: string = 'gif-message.gif'): Promise<File> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download GIF: ${response.statusText}`);
    }

    const blob = await response.blob();

    // Create File object from Blob
    const file = new File([blob], fileName, { type: 'image/gif' });

    return file;
  } catch (error) {
    console.error('Error downloading GIF:', error);
    throw new Error('Failed to download GIF. Please try again.');
  }
}

