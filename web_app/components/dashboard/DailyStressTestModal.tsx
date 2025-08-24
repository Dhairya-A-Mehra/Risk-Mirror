'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';

export function DailyStressTestModal() {
  const [image, setImage] = useState<File | null>(null);
  const [voice, setVoice] = useState<Blob | null>(null);
  const [typing, setTyping] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => setVoice(new Blob(chunks, { type: 'audio/wav' }));

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    if (voice) formData.append('voice', voice, 'voice.wav');
    formData.append('typing', typing);

    try {
      const response = await fetch('/api/emotional-pulse', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Emotional pulse check submitted successfully!');
        router.refresh(); // Refresh to update dashboard with new scores
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit. Please try again.');
    }
  };

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
          <div>
            <label className="text-sm font-medium text-white">1. Image Capture</label>
            <Input type="file" accept="image/*" capture="user" onChange={handleImageChange} />
          </div>
          <div>
            <label className="text-sm font-medium text-white">2. Voice Recording</label>
            <div className="flex space-x-2">
              <Button onClick={startRecording} disabled={recording}>Start Recording</Button>
              <Button onClick={stopRecording} disabled={!recording}>Stop Recording</Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-white">3. Typing Test</label>
            <Textarea value={typing} onChange={(e) => setTyping(e.target.value)} placeholder="Type something about how you're feeling..." />
          </div>
          <Button onClick={handleSubmit} disabled={!image && !voice && !typing}>Submit Test</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}