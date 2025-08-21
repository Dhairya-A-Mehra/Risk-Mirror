import { User } from "@/models/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Flame } from "lucide-react";

export function GamificationCard({ user }: { user: User }) {
  return (
  <Card className="bg-black/20 border border-neutral-800 rounded-2xl shadow-2xl backdrop-blur-md">
  <CardHeader><CardTitle className="text-white">Your Achievements</CardTitle></CardHeader>
  <CardContent className="space-y-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-blue-300">Current Streak</span>
          </div>
  <span className="font-extrabold text-lg drop-shadow-lg text-white">{user.gamification.streak.current} Days</span>
        </div>
        <div>
  <h4 className="font-medium mb-3 text-blue-300">Badges Earned</h4>
          <div className="flex flex-wrap gap-4">
            {user.gamification.badges.length > 0 ? (
              user.gamification.badges.map(badge => (
                <TooltipProvider key={badge}>
                  <Tooltip>
                    <TooltipTrigger>
                        <div className="p-3 bg-blue-900 rounded-full border border-blue-400">
                        <Award className="h-6 w-6 text-blue-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{badge}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            ) : (
  <p className="text-sm text-blue-300">No badges earned yet. Keep it up!</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}