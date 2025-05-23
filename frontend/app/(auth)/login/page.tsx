import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login | TeamPulse',
  description: 'Login to TeamPulse to manage your team status updates and availability.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-1 bg-primary items-center justify-center">
        <div className="max-w-md p-8 text-white">
          <h1 className="text-3xl font-bold mb-6">TeamPulse</h1>
          <p className="text-lg mb-8">
            {`Your team's availability and status updates in one place.`}
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-primary-foreground/20 p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>{`Track who's working on what`}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-primary-foreground/20 p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>View team availability</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-primary-foreground/20 p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Quickly check team goals</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <Suspense fallback={<div className="animate-pulse w-full max-w-md h-96 bg-muted rounded-md"></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}