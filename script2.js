// scripts.js - SPACE FORCE CYBER DOMINION v3.0
// Military space command terminal + orbital weapons

class SpaceForceTerminal {
  constructor() {
    this.terminal = document.getElementById('terminal');
    this.targetElements = {
      energy: document.getElementById('target-energy'),
      lock: document.getElementById('target-lock'),
      distance: document.getElementById('target-distance'),
      velocity: document.getElementById('target-velocity')
    };
    this.statusElements = {
      uptime: document.getElementById('uptime'),
      lastScan: document.getElementById('last-scan'),
      targetsCount: document.getElementById('targets-count')
    };
    this.sliders = {
      freq: document.getElementById('freq-slider'),
      vol: document.getElementById('vol-slider')
    };
    this.buttons = {
      scan: document.getElementById('scan-btn'),
      override: document.getElementById('override-btn')
    };
    
    this.startTime = Date.now();
    this.targetCount = 0;
    this.isScanning = false;
    this.audioCtx = null;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.startUptime();
    this.spaceForceBoot();
    this.startStatusFluctuations();
  }

  bindEvents() {
    // Command console
    const commandInput = document.getElementById('command-input');
    commandInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.executeSpaceCommand(commandInput.value);
        commandInput.value = '';
      }
    });

    // Sector scan
    this.buttons.scan.addEventListener('click', () => this.scanSector());
    
    // Override protocol
    this.buttons.override.addEventListener('click', () => this.forceOverride());

    // Sliders
    this.sliders.freq.addEventListener('input', (e) => {
      document.getElementById('freq-display').textContent = (e.target.value * 1000).toFixed(0) + ' MHz';
    });
    
    this.sliders.vol.addEventListener('input', (e) => {
      document.getElementById('vol-display').textContent = e.target.value + '%';
      this.updateAudioVisualizer(e.target.value / 100);
    });

    // Weapon buttons (using event delegation for dynamic elements)
    document.addEventListener('click', (e) => {
      if (e.target.matches('#fire-primary, .action-button.danger')) this.fireOrbitalStrike();
      if (e.target.matches('#fire-secondary')) this.launchSupport();
      if (e.target.matches('#activate-shields, button:contains("SHIELDS")')) this.raiseShields();
      if (e.target.matches('#emergency-jump, button:contains("HYPERJUMP")')) this.hyperJump();
    });
  }

  spaceForceBoot() {
    const bootSequence = [
      '[SPACE FORCE] Orbital Command initializing...',
      '[SYSTEM] Quantum satellite array online',
      '[SENSORS] Wideband orbital sweep active - 2.45 GHz',
      '[WEAPONS] Railgun capacitors charged - 100%',
      '[AI] Tactical analysis core synchronized',
      '[NETWORK] Solar defense grid linked',
      '[COMMAND] SPACE FORCE CYBER DOMINION - OPERATIONAL',
      '>>> SECTOR SCAN READY',
      ''
    ];

    let i = 0;
    const bootTimer = setInterval(() => {
      if (i < bootSequence.length) {
        this.addTerminalLine(bootSequence[i], 'boot');
        i++;
      } else {
        clearInterval(bootTimer);
        this.commandCursor();
      }
    }, 120);
  }

  addTerminalLine(message, type = 'default') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = message;
    this.terminal.appendChild(line);
    this.terminal.scrollTop = this.terminal.scrollHeight;
    
    // Auto-scroll with smooth effect
    this.terminal.style.scrollBehavior = 'smooth';
  }

  typeWriter(message, callback) {
    const line = document.createElement('div');
    line.className = 'terminal-line typing';
    this.terminal.appendChild(line);
    this.terminal.scrollTop = this.terminal.scrollHeight;

    let i = 0;
    function typeChar() {
      if (i < message.length) {
        line.textContent += message[i++];
        setTimeout(typeChar, Math.random() * 50 + 20);
      } else if (callback) {
        callback();
      }
    }
    typeChar();
  }

  scanSector() {
    if (this.isScanning) return;
    
    this.isScanning = true;
    this.buttons.scan.classList.add('override');
    this.addTerminalLine('>>> [ORBITAL SCAN] Sweeping sector 7G-Alpha...');

    setTimeout(() => this.orbitScanResults(), 1500);
  }

  orbitScanResults() {
    const targets = [
      { name: 'HOSTILE DRONE', energy: '92%', lock: '98%', dist: '847km', vel: '2.4km/s' },
      { name: 'CORVETTE SIG', energy: '78%', lock: '89%', dist: '1,234km', vel: '1.8km/s' },
      { name: 'BOMBER WING', energy: '95%', lock: '99%', dist: '423km', vel: '3.1km/s' },
      { name: 'CAPITAL SHIP', energy: '100%', lock: '94%', dist: '2,100km', vel: '0.9km/s' }
    ];

    const target = targets[Math.floor(Math.random() * targets.length)];
    
    this.typeWriter(`[CONTACT] ${target.name} - ACQUIRED`, () => {
      this.addTerminalLine(`    Energy: ${target.energy}`);
      this.addTerminalLine(`    Lock: ${target.lock}`);
      this.addTerminalLine(`    Range: ${target.dist}`);
      this.addTerminalLine(`    Velocity: ${target.vel}`);
      this.addTerminalLine('>>> WEAPONS FREE - ORBITAL STRIKE AUTHORIZED');
      
      this.updateTargets(target);
      this.targetCount++;
      this.statusElements.targetsCount.textContent = this.targetCount;
      this.statusElements.lastScan.textContent = new Date().toLocaleTimeString();
      
      this.isScanning = false;
      this.buttons.scan.classList.remove('override');
    });
  }

  updateTargets(target) {
    // Update all target displays
    this.targetElements.energy.textContent = target.energy;
    this.targetElements.lock.textContent = target.lock;
    this.targetElements.distance.textContent = target.dist;
    this.targetElements.velocity.textContent = target.vel;
    
    // Lock-on effect
    document.querySelectorAll('.info-item').forEach(item => {
      item.classList.add('locked', 'shake');
    });
    
    setTimeout(() => {
      document.querySelectorAll('.info-item').forEach(item => {
        item.classList.remove('shake');
      });
    }, 800);
  }

  fireOrbitalStrike() {
    const weapons = ['Microwave Lance', 'Railgun Barrage', 'Particle Beam', 'Plasma Cascade'];
    const weapon = weapons[Math.floor(Math.random() * weapons.length)];
    
    this.addTerminalLine(`[STRIKE] ${weapon} - IMPACT CONFIRMED`, 'danger');
    this.createAlert('>>> ORBITAL KILL CONFIRMED');
    this.orbitalExplosion();
    this.reducePower(20);
  }

  launchSupport() {
    const support = ['Drone Swarm', 'Nanite Cloud', 'Missile Pod'];
    const type = support[Math.floor(Math.random() * support.length)];
    
    this.addTerminalLine(`[LAUNCH] ${type} deployed`, 'warning');
    this.createAlert('SUPPORT CRAFT DEPLOYED');
  }

  raiseShields() {
    const shields = document.querySelector('.status-fill[style*="88%"], .status-fill');
    if (shields) shields.style.width = '100%';
    
    this.addTerminalLine('[SHIELDS] FULL SPECTRUM ACTIVE', 'success');
    this.createAlert('DEFENSIVE GRID ONLINE');
  }

  hyperJump() {
    this.addTerminalLine('[HYPERJUMP] Quantum tunnel established', 'danger');
    this.createAlert('>>> JUMP COMPLETE - NEW SECTOR');
    this.screenShake();
    this.resetDisplays();
  }

  forceOverride() {
    this.buttons.override.classList.add('override');
    this.addTerminalLine('>>> [WARNING] FIREWALL OVERRIDE - ALL SAFETIES OFFLINE');
    this.addTerminalLine('[SYSTEM] Lethal force authorized');
    
    setTimeout(() => {
      this.buttons.override.classList.remove('override');
    }, 3000);
  }

  orbitalExplosion() {
    const blast = document.createElement('div');
    blast.className = 'emp-blast';
    document.body.appendChild(blast);
    setTimeout(() => blast.remove(), 1200);
    
    this.screenShake();
  }

  reducePower(percent) {
    const powerBar = document.querySelector('.status-fill[style*="95%"], .status-fill:last-child');
    if (powerBar) {
      let current = parseInt(powerBar.style.width) || 95;
      powerBar.style.width = Math.max(10, current - percent) + '%';
    }
  }

  screenShake() {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 800);
  }

  createAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'system-alert';
    alert.innerHTML = `🚨 ${message} 🚨`;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 6000);
  }

  resetDisplays() {
    Object.values(this.targetElements).forEach(el => {
      el.textContent = el.id === 'target-distance' ? '∞' : 'SCANNING';
    });
  }

  startUptime() {
    setInterval(() => {
      const uptime = new Date(Date.now() - this.startTime).toISOString().substr(11, 8);
      this.statusElements.uptime.textContent = uptime;
    }, 1000);
  }

  commandCursor() {
    setInterval(() => {
      const input = document.getElementById('command-input');
      input.classList.toggle('cursor-active');
    }, 600);
  }

  updateAudioVisualizer(vol) {
    const peaks = document.querySelectorAll('.audio-peak, .audio-peaks *');
    peaks.forEach((peak, i) => {
      const height = (Math.sin(Date.now() * 0.01 + i) * 0.5 + 0.5) * 30 * vol;
      peak.style.height = height + 'px';
    });
  }

  startStatusFluctuations() {
    setInterval(() => {
      document.querySelectorAll('.status-fill').forEach(bar => {
        let current = parseInt(bar.style.width) || 90;
        const change = (Math.random() - 0.5) * 8;
        bar.style.width = Math.max(20, Math.min(100, current + change)) + '%';
      });
    }, 4000);
  }

  executeSpaceCommand(cmd) {
    const commands = {
      'scan': () => this.scanSector(),
      'status': () => this.addTerminalLine('[STATUS] All systems nominal'),
      'clear': () => this.terminal.innerHTML = '',
      'help': () => {
        this.addTerminalLine('COMMANDS: scan, status, clear, help, override, fire, shields');
      },
      'override': () => this.forceOverride(),
      'fire': () => this.fireOrbitalStrike(),
      'shields': () => this.raiseShields()
    };

    const command = cmd.toLowerCase().trim();
    if (commands[command]) {
      commands[command]();
    } else {
      this.addTerminalLine(`[ERROR] Unknown directive: ${cmd}`, 'danger');
    }
  }
}

// Orbital patrol simulation
function orbitalPatrol() {
  setTimeout(() => {
    const patrol = setInterval(() => {
      if (Math.random() > 0.75) {
        document.getElementById('scan-btn')?.click();
      }
    }, 12000);
  }, 8000);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new SpaceForceTerminal();
  orbitalPatrol();
  
  // Title glitch effect
  setInterval(() => {
    const title = document.getElementById('title');
    if (Math.random() > 0.92) {
      title.classList.add('shake');
      setTimeout(() => title.classList.remove('shake'), 150);
    }
  }, 2500);
});

// Konami code - Space Force God Mode
const konami = [38,38,40,40,37,39,37,39,66,65];
let konamiInput = [];

document.addEventListener('keydown', (e) => {
  konamiInput.push(e.keyCode);
  if (konamiInput.length > 10) konamiInput.shift();
  
  if (konamiInput.toString() === konami.toString()) {
    document.body.style.filter = 'hue-rotate(90deg)';
    setTimeout(() => document.body.style.filter = '', 4000);
  }
});
