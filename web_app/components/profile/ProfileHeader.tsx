import { User } from "@/models/user";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export function ProfileHeader({ user, onEditClick }: { user: User, onEditClick: () => void }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg shadow">
      {/* In a real app, you would use an <Image> tag with user.profile.avatar */}
      <div className="w-32 h-32 rounded-full bg-slate-300 dark:bg-slate-700 flex-shrink-0"></div>
      <div className="flex-grow text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{user.fullName}</h1>
        <p className="text-lg text-blue-500 font-medium">{user.profile.persona}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{user.email}</p>
      </div>
      <Button onClick={onEditClick} variant="outline">
        <Edit className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
}