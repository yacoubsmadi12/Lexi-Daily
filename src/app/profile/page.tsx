import { ProfileClient } from '@/components/app/profile-client';

export default function ProfilePage() {
  return (
    <div className="container mx-auto space-y-8">
       <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Progress</h1>
        <p className="mt-2 text-lg text-muted-foreground">Keep up the great work!</p>
      </div>
      <ProfileClient />
    </div>
  );
}
