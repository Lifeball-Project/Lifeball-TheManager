'use client';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  imageUrl?: string;
  className?: string;
}

export function BackgroundWrapper({
  children,
  imageUrl = '/images/chat-background.jpg',
  className = '',
}: BackgroundWrapperProps) {
  return (
    <div
      className={`w-screen h-screen bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      {children}
    </div>
  );
}