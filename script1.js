// script1.js - SPACE EMPEROR SECURITY PROTOCOL v3.0
// DUTYFREE Authentication System for Cyber Dominion Dashboard

class SpaceForceSecurity {
  constructor() {
    this.CLEARANCE_PASSWORD = 'dutyfree';
    this.AUTH_KEY = 'spaceforce_authenticated';
    this.initSecurity();
  }

  initSecurity() {
    // Check if already authenticated
      if (this.isAuthenticated()) {
      this.activateDashboard();
      return;
    }

    // Lock down dashboard - show security screen
    this.showSecurityScreen();
    
    // Bind authentication events
    this.bindAuthEvents();
  }

  isAuthenticated() {
    return false; // Alwats Force Login
  }

  showSecurityScreen() {
    // Create full-screen security overlay
    const securityHTML = `
      <div id="security-overlay" class="security-lockout">
        <div class="security-container">
          <div class="security-emblem">🔒</div>
          <h1 class="security-title">SPACE EMPEROR CYBER DOMINION</h1>
          <div class="security-subtitle">ORBITAL COMMAND AUTHENTICATION REQUIRED</div>
          
          <div class="auth-form">
            <div class="auth-field">
              <label>CLEARANCE CODE</label>
              <input type="password" id="clearance-input" maxlength="8" autocomplete="off">
              <div class="auth-hint">DUTY FREE ACCESS</div>
            </div>
            <button id="auth-btn" class="auth-button" disabled>AUTHENTICATE</button>
          </div>
          
          <div class="security-status" id="security-status">
            STANDBY - AWAITING CLEARANCE
          </div>
          
          <div class="security-counter" id="attempt-counter">
            ATTEMPTS REMAINING: 3
          </div>
        </div>
      </div>
    `;

    document.body.innerHTML = securityHTML + document.body.innerHTML;
    document.body.style.overflow = 'hidden';
    
    // Add security CSS
    this.injectSecurityStyles();
  }

  injectSecurityStyles() {
    const styles = `
      <style>
        #security-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at center, rgba(10,10,26,0.98) 0%, #000 80%);
          display: flex;
          z-index: 99999;
          backdrop-filter: blur(10px);
        }
        
        .security-container {
          margin: auto;
          text-align: center;
          padding: 60px;
          max-width: 500px;
          background: rgba(0,183,235,0.1);
          border: 3px solid #00b7eb;
          border-radius: 15px;
          box-shadow: 0 0 60px rgba(0,183,235,0.5);
          animation: security-pulse 3s infinite;
        }
        
        @keyframes security-pulse {
          0%, 100% { box-shadow: 0 0 60px rgba(0,183,235,0.5); }
          50% { box-shadow: 0 0 80px rgba(0,183,235,0.8), 0 0 100px rgba(255,215,0,0.3); }
        }
        
        .security-emblem {
          font-size: 4em;
          margin-bottom: 20px;
          animation: lock-glow 2s infinite alternate;
          filter: drop-shadow(0 0 20px #ffd700);
        }
        
        @keyframes lock-glow {
          0% { filter: drop-shadow(0 0 20px #ffd700); }
          100% { filter: drop-shadow(0 0 40px #ffd700) drop-shadow(0 0 60px #00b7eb); }
        }
        
        .security-title {
          color: #ffd700;
          font-size: 2em;
          letter-spacing: 8px;
          text-transform: uppercase;
          margin-bottom: 10px;
          font-family: 'Orbitron', monospace;
          text-shadow: 0 0 30px #ffd700;
        }
        
        .security-subtitle {
          color: #00b7eb;
          font-size: 1.1em;
          letter-spacing: 3px;
          margin-bottom: 40px;
          opacity: 0.9;
        }
        
        .auth-field {
          margin-bottom: 30px;
          text-align: left;
        }
        
        .auth-field label {
          color: #ffd700;
          font-size: 0.9em;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 10px;
        }
        
        #clearance-input {
          width: 100%;
          padding: 20px;
          background: rgba(0,0,0,0.8);
          border: 2px solid #00b7eb;
          color: #00b7eb;
          font-size: 1.2em;
          font-family: monospace;
          border-radius: 8px;
          transition: all 0.3s;
          text-align: center;
        }
        
        #clearance-input:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 30px rgba(255,215,0,0.5);
          transform: scale(1.02);
        }
        
        .auth-hint {
          color: rgba(255,215,0,0.6);
          font-size: 0.8em;
          margin-top: 8px;
          letter-spacing: 1px;
        }
        
        .auth-button {
          padding: 20px 50px;
          background: transparent;
          border: 3px solid #ffd700;
          color: #ffd700;
          font-size: 1.2em;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.4s;
          font-family: 'Orbitron', monospace;
          margin: 20px 0;
        }
        
        .auth-button:hover:not(:disabled) {
          background: #ffd700;
          color: #000;
          box-shadow: 0 0 40px #ffd700;
          transform: translateY(-3px);
        }
        
        .auth-button:disabled {
          border-color: #666;
          color: #666;
          cursor: not-allowed;
        }
        
        .security-status {
          font-size: 1.1em;
          color: #00ff88;
          letter-spacing: 2px;
          margin: 30px 0;
          min-height: 30px;
          font-family: monospace;
          text-shadow: 0 0 10px #00ff88;
        }
        
        .security-counter {
          color: #ff003c;
          font-size: 1em;
          font-weight: bold;
          letter-spacing: 2px;
          text-shadow: 0 0 15px #ff003c;
        }
        
        .success {
          color: #00ff88 !important;
          animation: success-glow 1s infinite alternate;
        }
        
        .error {
          color: #ff003c !important;
          animation: error-shake 0.5s;
        }
        
        @keyframes success-glow {
          0% { text-shadow: 0 0 10px #00ff88; }
          100% { text-shadow: 0 0 25px #00ff88, 0 0 35px #00ff88; }
        }
        
        @keyframes error-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  bindAuthEvents() {
    const input = document.getElementById('clearance-input');
    const button = document.getElementById('auth-btn');
    const status = document.getElementById('security-status');
    let attempts = 3;

    input.addEventListener('input', (e) => {
      const value = e.target.value;
      button.disabled = value.length < 8;
      
      if (value.length === 8) {
        status.textContent = 'AUTHENTICATING...';
        status.className = 'security-status';
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.length === 8) {
        this.attemptAuthentication(input.value, status, button, input);
      }
    });

    button.addEventListener('click', () => {
      this.attemptAuthentication(input.value, status, button, input);
    });

    // Update attempt counter
    const counter = document.getElementById('attempt-counter');
    counter.textContent = `ATTEMPTS REMAINING: ${attempts}`;
  }

  attemptAuthentication(code, status, button, input) {
    if (code.toLowerCase() !== this.CLEARANCE_PASSWORD) {
      // Wrong password
      status.textContent = '❌ ACCESS DENIED - INVALID CLEARANCE';
      status.className = 'security-status error';
      
      input.value = '';
      input.focus();
      button.disabled = true;
      
      this.screenShake();
      return;
    }

    // SUCCESS!
    status.textContent = '✅ CLEARANCE VERIFIED - DUTY FREE AUTHORIZED';
    status.className = 'security-status success';
    
    // Authenticate user
    this.grantAccess();
  }

  grantAccess() {
    // Set authentication token
    localStorage.setItem(this.AUTH_KEY, 'AUTHORIZED');
    
    // Security clearance animation
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
      // Remove security overlay
      const overlay = document.getElementById('security-overlay');
      if (overlay) overlay.remove();
      
      // Restore dashboard
      document.body.style.overflow = '';
      document.body.style.opacity = '1';
      
      // Activate main dashboard
      this.activateDashboard();
      
      // Terminal clearance message
      setTimeout(() => {
        const terminal = document.getElementById('terminal');
        if (terminal) {
          const line = document.createElement('div');
          line.className = 'terminal-line success';
          line.textContent = '[SECURITY] DUTY FREE CLEARANCE GRANTED - COMMAND ONLINE';
          terminal.appendChild(line);
          terminal.scrollTop = terminal.scrollHeight;
        }
      }, 500);
    }, 1500);
  }

  activateDashboard() {
    // Initialize main dashboard functionality
    if (typeof SpaceForceTerminal !== 'undefined') {
      new SpaceForceTerminal();
    }
    
    // Show authenticated status
    const header = document.querySelector('#header');
    if (header) {
      const authBadge = document.createElement('div');
      authBadge.className = 'auth-badge';
      authBadge.innerHTML = '🔒 DUTY FREE <span style="color:#00ff88;">AUTHORIZED</span>';
      authBadge.style.cssText = `
        background: rgba(0,255,136,0.2);
        border: 2px solid #00ff88;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9em;
        letter-spacing: 2px;
        text-shadow: 0 0 10px #00ff88;
      `;
      header.appendChild(authBadge);
    }
  }

  screenShake() {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
  }
}

// Initialize security on page load
document.addEventListener('DOMContentLoaded', () => {
  new SpaceForceSecurity();
});

// Prevent right-click and dev tools
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = (e) => {
  // Block F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.key === 'u') ||
      (e.ctrlKey && e.key === 's')) {
    e.preventDefault();
    return false;
  }
};

// Logout function (add to dashboard)
function spaceForceLogout() {
  sessionStorage.removeItem('spaceforce_authenticated');
  location.reload();
}
