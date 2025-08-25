'use client';

import { LoginModal } from './LoginModal';
import { LogIn } from 'lucide-react';

interface LoginButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  className?: string;
}

export function LoginButton({
  variant = 'default',
  size = 'default',
  showIcon = true,
  className
}: LoginButtonProps) {
  return (
    <LoginModal
      triggerText="Sign In"
      variant={variant}
      size={size}
      showIcon={showIcon}
    />
  );
}

// Pre-configured variants for common use cases
export function LoginButtonOutline(props: Omit<LoginButtonProps, 'variant'>) {
  return <LoginButton {...props} variant="outline" />;
}

export function LoginButtonGhost(props: Omit<LoginButtonProps, 'variant'>) {
  return <LoginButton {...props} variant="ghost" />;
}

export function LoginButtonLink(props: Omit<LoginButtonProps, 'variant'>) {
  return <LoginButton {...props} variant="link" showIcon={false} />;
}

export function LoginIconButton(props: Omit<LoginButtonProps, 'size' | 'showIcon'>) {
  return <LoginButton {...props} size="icon" showIcon={true} />;
}
