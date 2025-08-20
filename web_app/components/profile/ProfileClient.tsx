// web_app/components/profile/ProfileClient.tsx
"use client";

import { User } from "@/models/user";
import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { GamificationCard } from "./GamificationCard";
import { ProfileDetailsCard } from "./ProfileDetailsCard";
import { EditProfileModal } from "./EditProfileModal";

export function ProfileClient({ initialUser }: { initialUser: User }) {
  // Use state to manage the user data, so it updates instantly after an edit
  const [user, setUser] = useState(initialUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // This function will be called from the modal on successful update
  const handleProfileUpdate = (updatedUser: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <div className="flex flex-col gap-8">
      <ProfileHeader 
        user={user} 
        onEditClick={() => setIsEditModalOpen(true)} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* We can add more detailed cards here in the future */}
          <ProfileDetailsCard user={user} />
        </div>
        <div className="lg:col-span-1">
          <GamificationCard user={user} />
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        user={user}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
}