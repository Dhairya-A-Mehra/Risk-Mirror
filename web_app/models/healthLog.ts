import { ObjectId } from 'mongodb';



export interface EmotionScan {
  emotion: string;
  stressLevel: number;
}
export interface TypingTest {
  text: string;
  score: number;
}
export interface WearableData {
  source: 'fitbit' | 'apple_health';
  avgHeartRate?: number;
  sleepHours?: number;
}
export interface HealthLog {
  userId: ObjectId;
  createdAt: Date;
  emotionScan: EmotionScan;
  typingTest: TypingTest;
}