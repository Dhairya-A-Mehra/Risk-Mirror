import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DailyStressTestModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 w-full">Take Daily Stress Test</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Daily Emotional Pulse Check</DialogTitle>
          <DialogDescription>
            This multi-modal test will help gauge your current wellness state.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          
          <p>1. Image Capture (Not implemented)</p>
          <p>2. Voice Recording (Not implemented)</p>
          <p>3. Typing Test (Not implemented)</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
