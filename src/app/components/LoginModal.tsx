'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UnifiedLoginForm } from '@/app/login/UnifiedLoginForm';
import { LogIn } from 'lucide-react';

interface LoginModalProps {
  triggerText?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
}

export function LoginModal({
  triggerText = 'Sign In',
  variant = 'default',
  size = 'default',
  showIcon = true
}: LoginModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          {showIcon && <LogIn className="mr-2 h-4 w-4" />}
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <DialogTitle className="text-center">Welcome back</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <UnifiedLoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
