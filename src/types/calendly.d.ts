declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string; text?: string; color?: string; textColor?: string; branding?: boolean }) => void;
      initBadgeWidget: (options: { url: string; text?: string; color?: string; textColor?: string; branding?: boolean }) => void;
    };
  }
}

export {};
