import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function PersonalizedRecommendationAlert() {
  return (
  <Alert className="bg-gradient-to-br from-red-900/40 via-red-700/30 to-red-600/40 border-2 border-red-400/60 shadow-lg">
      <AlertCircle className="h-4 w-4 text-red-400 animate-pulse" />
      <AlertTitle className="text-red-300 font-bold text-lg">High Risk Detected!</AlertTitle>
      <AlertDescription className="text-white">
        Your overall risk score is elevated. Consider reviewing your recent spending or taking a moment for a stress-reducing exercise.
      </AlertDescription>
    </Alert>
  );
}