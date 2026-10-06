(() => {
  const overlay = document.getElementById('brand-intro');
  let stage = document.getElementById('brand-intro-stage');
  if (!overlay || !stage) return;

  document.body.classList.add('site-intro-active');

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let audioContext = null;
  if (AudioContextClass) {
    try {
      audioContext = new AudioContextClass();
      // Best-effort autoplay. If the browser blocks it, a trusted tap/click
      // anywhere on the intro overlay can unlock audio without a visible button.
      audioContext.resume().catch(() => {});
    } catch {
      audioContext = null;
    }
  }

  let assetsReady = false;
  let animationStarted = false;
  let soundScheduled = false;
  let finished = false;
  let startTimer = null;
  let finishTimer = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sfx(startAt) {
    const c = audioContext;
    const master = c.createGain();
    master.gain.value = .55;
    master.connect(c.destination);

    const reverb = c.createConvolver();
    const length = c.sampleRate * 2.4;
    const impulse = c.createBuffer(2, length, c.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
    }
    reverb.buffer = impulse;
    const wet = c.createGain();
    wet.gain.value = .5;
    reverb.connect(wet);
    wet.connect(master);
    const out = c.createGain();
    out.connect(master);
    out.connect(reverb);

    const envelope = (gain, offset, attack, peak, decay) => {
      gain.gain.setValueAtTime(.0001, startAt + offset);
      gain.gain.linearRampToValueAtTime(peak, startAt + offset + attack);
      gain.gain.exponentialRampToValueAtTime(.0001, startAt + offset + attack + decay);
    };
    const tone = (frequency, offset, attack, peak, decay, endFrequency) => {
      const oscillator = c.createOscillator();
      const gain = c.createGain();
      oscillator.frequency.setValueAtTime(frequency, startAt + offset);
      if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + offset + attack + decay);
      envelope(gain, offset, attack, peak, decay);
      oscillator.connect(gain);
      gain.connect(out);
      oscillator.start(startAt + offset);
      oscillator.stop(startAt + offset + attack + decay + .1);
    };

    // Ink-like sweep
    const noiseBuffer = c.createBuffer(1, c.sampleRate * 2.2, c.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;
    const noise = c.createBufferSource();
    noise.buffer = noiseBuffer;
    const bandPass = c.createBiquadFilter();
    bandPass.type = 'bandpass';
    bandPass.Q.value = 2.5;
    bandPass.frequency.setValueAtTime(250, startAt + .3);
    bandPass.frequency.exponentialRampToValueAtTime(3200, startAt + 1.4);
    const noiseGain = c.createGain();
    envelope(noiseGain, .3, .5, .3, .9);
    noise.connect(bandPass);
    bandPass.connect(noiseGain);
    noiseGain.connect(out);
    noise.start(startAt + .3);
    noise.stop(startAt + 2.3);
    tone(110, .3, .6, .16, 1, 220);
    tone(165, .4, .6, .08, 1, 330);

    // Expanding rings and teal accent
    tone(880, 1.65, .01, .11, 1.2);
    tone(1318.5, 1.9, .01, .08, 1.2);
    tone(1100, 1.97, .005, .26, .18, 260);
    tone(180, 1.97, .01, .2, .4, 90);

    // Shimmer sweep and closing chord
    const shimmer = c.createBufferSource();
    shimmer.buffer = noiseBuffer;
    const highPass = c.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.value = 4000;
    const shimmerGain = c.createGain();
    envelope(shimmerGain, 3.1, .25, .12, .35);
    shimmer.connect(highPass);
    highPass.connect(shimmerGain);
    shimmerGain.connect(out);
    shimmer.start(startAt + 3.1);
    shimmer.stop(startAt + 3.8);
    [1318.5, 1568, 1975.5, 2637].forEach((frequency, i) => tone(frequency, 3.16 + i * .085, .005, .09, 1.1));
    [440, 554.4, 659.3, 880].forEach(frequency => tone(frequency, 3.3, .08, .07, 1.8));
  }

  const preload = src => {
    const image = new Image();
    image.src = src;
    return image.decode ? image.decode().catch(() => {}) : new Promise(resolve => {
      image.onload = image.onerror = resolve;
    });
  };

  function finish() {
    if (finished) return;
    finished = true;
    window.clearTimeout(startTimer);
    window.dispatchEvent(new CustomEvent('intro:done'));
    overlay.classList.add('is-leaving');
    window.setTimeout(() => {
      overlay.remove();
      document.body.classList.remove('site-intro-active');
    }, 900);
  }

  function launchAnimation(trySound = true, restart = false) {
    if (finished || !assetsReady) return;
    window.clearTimeout(startTimer);
    window.clearTimeout(finishTimer);

    if (restart && animationStarted) {
      const freshStage = stage.cloneNode(true);
      freshStage.classList.remove('go');
      stage.replaceWith(freshStage);
      stage = freshStage;
    }

    let delay = 0;
    if (trySound && audioContext && audioContext.state === 'running' && !soundScheduled) {
      const lead = .15;
      try {
        sfx(audioContext.currentTime + lead);
        soundScheduled = true;
        delay = lead + (audioContext.outputLatency || 0) + (audioContext.baseLatency || 0);
      } catch {
        // Keep the visual intro working even if the browser rejects audio nodes.
      }
    }

    const currentStage = stage;
    startTimer = window.setTimeout(() => requestAnimationFrame(() => {
      if (!finished && stage === currentStage) currentStage.classList.add('go');
    }), Math.max(0, delay * 1000));
    finishTimer = window.setTimeout(finish, Math.max(0, delay * 1000 + (reducedMotion ? 80 : 4200)));
    animationStarted = true;
  }

  function resumeFromGesture() {
    if (finished || soundScheduled || !audioContext) return;
    try {
      audioContext.resume().then(() => {
        if (finished || soundScheduled || audioContext.state !== 'running') return;
        if (assetsReady) launchAnimation(true, animationStarted);
      }).catch(() => {});
    } catch {
      // Autoplay remains best-effort on browsers that do not support resume here.
    }
  }

  overlay.addEventListener('pointerdown', resumeFromGesture, { passive: true });

  async function start() {
    await Promise.all([
      preload('/assets/blacksy-intro-mask.png'),
      preload('/assets/blacksy-intro-accent.png')
    ]);
    assetsReady = true;
    // If autoplay was permitted, play immediately. Otherwise the intro still
    // runs silently until a trusted tap/click activates sound.
    launchAnimation(true, false);
  }

  start().catch(finish);
})();
