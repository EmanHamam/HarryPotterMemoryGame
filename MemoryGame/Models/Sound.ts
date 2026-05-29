import type { ISound } from "../Interfaces/ISound.js";

export class Sound implements ISound {
  enabled: boolean;
  private audioCtx: AudioContext | null;

  constructor(enabled = true) {
    this.enabled = enabled;
    this.audioCtx = null;
  }

  toggle(): void {
    this.enabled = !this.enabled;
  }

  playTone(freq: number, duration = 0.15, type: OscillatorType = "sine"): void {
    if (!this.enabled) return;

    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext ||(window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
      }

      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      
    }
  }
}