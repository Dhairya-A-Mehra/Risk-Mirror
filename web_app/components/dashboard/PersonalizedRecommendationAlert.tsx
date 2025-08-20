import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function PersonalizedRecommendationAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>High Risk Detected!</AlertTitle>
      <AlertDescription>
        Your overall risk score is elevated. Consider reviewing your recent spending or taking a moment for a stress-reducing exercise.
      </AlertDescription>
    </Alert>
  );
}