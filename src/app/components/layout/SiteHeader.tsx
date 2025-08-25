import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { ThemeModeToggler } from "@/components/theme-mode-toggler";
import { ThemeColorToggler } from "@/components/theme-color-toggler";
import { ThemeRadiusToggler } from "@/components/theme-radius-toggler";
import { LoginButton } from "@/app/components/LoginButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container size="xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HP</span>
            </div>
            <span className="font-bold text-xl">Hallpass</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#analytics" className="text-sm font-medium hover:text-primary transition-colors">
              Analytics
            </Link>
            <Link href="#security" className="text-sm font-medium hover:text-primary transition-colors">
              Security
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Controls */}
            <div className="hidden md:flex items-center space-x-2">
              <ThemeColorToggler />
              <ThemeRadiusToggler />
            </div>
            <ThemeModeToggler />

            <LoginButton variant="ghost" size="sm" />
            <Button size="sm" asChild>
              <Link href="/demo">Book a demo</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
