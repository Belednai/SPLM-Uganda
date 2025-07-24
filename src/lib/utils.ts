import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate unique SPLM-UG ID in format SPLM-UG-XXXXXX
export function generateSplmUgId(): string {
  // Generate 6-digit number with leading zeros
  const randomNum = Math.floor(Math.random() * 1000000);
  const paddedNum = randomNum.toString().padStart(6, '0');
  return `SPLM-UG-${paddedNum}`;
}

// Create a red background placeholder image as data URL
export function createRedBackgroundPlaceholder(width: number = 200, height: number = 240): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  canvas.width = width;
  canvas.height = height;
  
  // Fill with red background
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 0, width, height);
  
  // Add placeholder text
  ctx.fillStyle = 'white';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Upload Photo', width / 2, height / 2 - 10);
  ctx.fillText('Red Background', width / 2, height / 2 + 10);
  ctx.fillText('Required', width / 2, height / 2 + 30);
  
  return canvas.toDataURL();
}

// Simple storage utility for member data (in real app, this would be API calls)
export const memberStorage = {
  save: (memberId: string, data: any) => {
    localStorage.setItem(`member_${memberId}`, JSON.stringify(data));
  },
  
  get: (memberId: string) => {
    const data = localStorage.getItem(`member_${memberId}`);
    return data ? JSON.parse(data) : null;
  },
  
  getCurrentMember: () => {
    const currentMemberId = localStorage.getItem('currentMemberId');
    return currentMemberId ? memberStorage.get(currentMemberId) : null;
  },
  
  setCurrentMember: (memberId: string) => {
    localStorage.setItem('currentMemberId', memberId);
  }
};
