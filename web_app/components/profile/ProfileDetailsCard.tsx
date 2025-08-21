import { User } from "@/models/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileDetailsCard({ user }: { user: User }) {
  return (
    <Card className="bg-black/20 border border-neutral-800 rounded-2xl shadow-2xl backdrop-blur-md">
  <CardHeader><CardTitle className="text-white drop-shadow-lg">Account Details</CardTitle></CardHeader>
  <CardContent className="space-y-4 text-white">
        <div className="flex justify-between">
            <span className="text-blue-300">Full Name</span>
          <span className="font-bold text-white">{user.fullName}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-blue-300">Email Address</span>
          <span className="font-bold text-white">{user.email}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-blue-300">Member Since</span>
          <span className="font-bold text-white">{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}