'use client';

import { useState, useTransition } from 'react';
import { login } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Signing In...' : 'Sign In'}
      <LogIn className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await login(formData);
      if (result?.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        // Store admin token locally so we can authorize uploads/deletes
        if (result.token) {
          localStorage.setItem('admin_token', result.token);
        }
        localStorage.setItem('is_admin', 'true');
        router.push('/uploads');
      } else {
        setError(result?.message ?? 'Sign in failed.');
      }
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Static Gallery</CardTitle>
          <CardDescription>Enter your credentials to access the gallery.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="admin"
              required
              defaultValue="admin"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.push('/')}>Home</Button>
          <div className="flex-1 flex justify-end">
            <SubmitButton pending={isPending} />
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
