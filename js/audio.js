/**
 * Quizee - Web Audio API Sound Synthesizer
 * Generates crisp procedural sound effects without external audio files.
 */

class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem("quizee_sound_muted") === "true";
  }

  // Lazy-initialize AudioContext on first user interaction to comply with browser autoplay policies
  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("quizee_sound_muted", this.isMuted);
    return this.isMuted;
  }

  // Plays a procedural tone
  playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type; // 'sine', 'square', 'triangle', 'sawtooth'
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + startTime);

      // Volume envelope (attack, decay)
      gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + startTime);
      osc.stop(this.audioCtx.currentTime + startTime + duration);
    } catch (e) {
      console.warn("Audio playback notice:", e);
    }
  }

  // Button click blip
  playClick() {
    this.playTone(600, "triangle", 0.05, 0, 0.08);
  }

  // Correct answer chime (pleasant rising triad C5 -> E5 -> G5)
  playCorrect() {
    if (this.isMuted) return;
    this.playTone(523.25, "sine", 0.12, 0, 0.15);      // C5
    this.playTone(659.25, "sine", 0.12, 0.08, 0.15);   // E5
    this.playTone(783.99, "sine", 0.25, 0.16, 0.18);   // G5
  }

  // Incorrect answer buzz (descending dissonant buzz)
  playWrong() {
    if (this.isMuted) return;
    this.playTone(280, "sawtooth", 0.12, 0, 0.12);
    this.playTone(220, "sawtooth", 0.25, 0.09, 0.12);
  }

  // Streak bonus fanfare
  playStreak() {
    if (this.isMuted) return;
    this.playTone(587.33, "triangle", 0.08, 0, 0.12);    // D5
    this.playTone(739.99, "triangle", 0.08, 0.06, 0.14); // F#5
    this.playTone(880.00, "triangle", 0.10, 0.12, 0.16); // A5
    this.playTone(1174.66, "sine", 0.35, 0.18, 0.18);   // D6
  }

  // Timer countdown urgent tick
  playTick() {
    if (this.isMuted) return;
    this.playTone(880, "triangle", 0.04, 0, 0.05);
  }

  // Question timeout buzz
  playTimeout() {
    if (this.isMuted) return;
    this.playTone(240, "square", 0.15, 0, 0.1);
    this.playTone(180, "square", 0.25, 0.15, 0.12);
  }

  // Challenge complete victory fanfare
  playVictory() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, "sine", 0.25, idx * 0.1, 0.14);
    });
    this.playTone(1046.50, "triangle", 0.6, 0.45, 0.2);
  }
}

// Global instance
const audioManager = new SoundEffects();

