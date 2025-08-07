"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/company-details");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-2">Teambo</h2>

        <Card className="max-w-md mx-auto mt-10 shadow-lg">
          <CardHeader className="text-center text-2xl font-semibold">
            Sign Up
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />

              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Create a password"
              />

              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Re-enter your password"
              />

              <Button type="submit" className="mt-2 w-full">
                Sign Up
              </Button>
            </form>

            <div className="text-center text-sm mt-4 text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-medium underline hover:text-primary"
              >
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
