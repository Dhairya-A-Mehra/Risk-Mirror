import { User } from "@/models/user";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export function ProfileHeader({ user, onEditClick }: { user: User, onEditClick: () => void }) {
  return (
  <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-black/20 rounded-2xl shadow-2xl border border-neutral-800 backdrop-blur-md">
      {/* In a real app, you would use an <Image> tag with user.profile.avatar */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-cyan-400 flex-shrink-0 flex items-center justify-center shadow-lg">
          <span className="text-white font-extrabold text-4xl drop-shadow-lg">{user.fullName.charAt(0)}</span>
      </div>
      <div className="flex-grow text-center md:text-left">
  <h1 className="text-3xl font-extrabold text-white">{user.fullName}</h1>
  <p className="text-lg text-white/80 font-medium">{user.profile.persona}</p>
  <p className="text-sm text-white/70 mt-1">{user.email}</p>
      </div>
      <Button onClick={onEditClick} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold border-none shadow-md hover:from-cyan-600 hover:to-blue-600">
        <Edit className="h-4 w-4 mr-2 text-white" />
        Edit Profile
      </Button>
    </div>
  );
}