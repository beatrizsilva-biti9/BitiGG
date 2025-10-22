// A global AudioContext to be reused
let audioContext: AudioContext | null = null;

// Function to get or create the AudioContext
const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
};

// A generic function to play a sound with a given frequency and duration
const playNote = (frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.3) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Resume context if it's suspended (required by browser policies)
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Fade out to avoid clicking
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
};

// Specific sound effect functions
export const playClickSound = () => {
    playNote(350, 0.08, 'triangle', 0.2);
};

export const playCorrectSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    playNote(523.25, 0.1, 'sine', 0.3); // C5
    setTimeout(() => playNote(783.99, 0.15, 'sine', 0.3), 100); // G5
};

export const playIncorrectSound = () => {
    playNote(220, 0.2, 'sawtooth', 0.3);
};

export const playWinSound = () => {
    const notes = [
        { freq: 523.25, delay: 0 },    // C5
        { freq: 659.25, delay: 100 },   // E5
        { freq: 783.99, delay: 200 },   // G5
        { freq: 1046.50, delay: 300 },  // C6
    ];
    notes.forEach(note => {
        setTimeout(() => playNote(note.freq, 0.15, 'triangle', 0.4), note.delay);
    });
};

export const playLoseSound = () => {
    const notes = [
        { freq: 261.63, delay: 0 },    // C4
        { freq: 233.08, delay: 200 },  // A#3
        { freq: 220.00, delay: 400 },  // A3
        { freq: 196.00, delay: 600 },  // G3
    ];
    notes.forEach(note => {
        setTimeout(() => playNote(note.freq, 0.18, 'square', 0.3), note.delay);
    });
};
