import { User } from "@/models/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Flame } from "lucide-react";

export function GamificationCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader><CardTitle>Your Achievements</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-slate-500">Current Streak</span>
          </div>
          <span className="font-bold text-lg">{user.gamification.streak.current} Days</span>
        </div>
        <div>
          <h4 className="font-medium mb-3">Badges Earned</h4>
          <div className="flex flex-wrap gap-4">
            {user.gamification.badges.length > 0 ? (
              user.gamification.badges.map(badge => (
                <TooltipProvider key={badge}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <Award className="h-6 w-6 text-blue-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{badge}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            ) : (
              <p className="text-sm text-slate-500">No badges earned yet. Keep it up!</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}