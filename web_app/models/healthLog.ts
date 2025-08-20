import { ObjectId } from 'mongodb';

export interface EmotionScan {
  source: 'image' | 'voice';
  dominantEmotion: string;
  stressLevel: number;
}
export interface TypingTest {
  wpm: number;
  accuracy: number;
  panicSignal: number;
}
export interface WearableData {
  source: 'fitbit' | 'apple_health';
  avgHeartRate?: number;
  sleepHours?: number;
}
export interface HealthLog {
  _id?: ObjectId;
  userId: ObjectId;
  logDate: Date;
  emotionScan?: EmotionScan;
  typingTest?: TypingTest;
  wearableData?: WearableData;
}