import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function PersonalizedRecommendationAlert() {
  return (
    <Alert className="bg-gradient-to-br from-blue-950/80 via-teal-900/60 to-cyan-950/80 border-none shadow-lg">
      <AlertCircle className="h-4 w-4 text-cyan-400" />
      <AlertTitle className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">High Risk Detected!</AlertTitle>
      <AlertDescription className="text-white">
        Your overall risk score is elevated. Consider reviewing your recent spending or taking a moment for a stress-reducing exercise.
      </AlertDescription>
    </Alert>
  );
}