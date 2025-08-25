'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Container } from '@/app/components/layout/Container';

interface LoginLayoutProps {
  children: ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <Container className="min-h-screen flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center pb-6">
          {/* Optional logo space - can be customized */}
          <div className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          {children}
        </CardContent>
      </Card>
    </Container>
  );
}
