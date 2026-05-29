export interface ISound{
  // flip: string;
  // match: string;
  // mismatch: string;
  // win: string;
  enabled: boolean;  //to enable/disable sounds
  toggle(): void;
  playTone(freq: number, duration?: number, type?: OscillatorType): void; //in this i handle all sounds with AudioContext instead of using external sounds
}