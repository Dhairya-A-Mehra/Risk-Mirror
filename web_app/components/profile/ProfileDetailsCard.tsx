import { User } from "@/models/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileDetailsCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-500">Full Name</span>
          <span className="font-medium">{user.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Email Address</span>
          <span className="font-medium">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Member Since</span>
          <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}