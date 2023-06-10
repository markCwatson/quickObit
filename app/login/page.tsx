import { Metadata } from 'next';
import { AuthPartners } from '@/components/AuthPartners';
import { Card } from '@/components/Card';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your quickObit account',
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center -mt-20">
      <Card className="p-2 md:p-10 w-full md:w-auto">
        <div className="flex flex-col justify-center w-full md:w-[350px]">
          <div className="flex flex-col text-center p-4">
            <h1 className="text-xl font-semibold tracking-tight text-my-color10 dark:text-my-color1 pb-2">
              Welcome
            </h1>
            <p className="text-sm text-my-color9 dark:text-my-color2 pb-2">
              Sign in with Google or Facebook
            </p>
          </div>
          <AuthPartners />
        </div>
      </Card>
    </div>
  );
}
