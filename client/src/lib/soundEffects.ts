class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
    if (!this.enabled) return;
    
    try {
      this.initAudioContext();
      if (!this.audioContext) return;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = type;
      oscillator.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  placement() {
    this.playTone(400, 0.1, 'sine', 0.08);
  }

  deletion() {
    this.playTone(300, 0.15, 'sine', 0.08);
    setTimeout(() => this.playTone(200, 0.1, 'sine', 0.05), 50);
  }

  click() {
    this.playTone(600, 0.05, 'square', 0.05);
  }

  warning() {
    this.playTone(800, 0.2, 'triangle', 0.1);
    setTimeout(() => this.playTone(600, 0.2, 'triangle', 0.1), 150);
  }

  rotate() {
    this.playTone(500, 0.08, 'sine', 0.06);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();
