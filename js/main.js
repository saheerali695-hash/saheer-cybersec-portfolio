/**
 * MUHAMAD SAHEER ALI M.N - CYBERSECURITY PORTFOLIO
 * Main Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all subsystems
  initTelemetryClock();
  initCyberCanvas();
  initNavigation();
  initInteractiveTerminal();
  initProjectModals();
  initResumeModal();
  initProjectFilter();
  initContactForm();
  initCopyToClipboard();
  initScrollTop();
  initAudioFeedback();
});

/* --------------------------------------------------------------------------
   01. Telemetry Clocks (UTC Time)
   -------------------------------------------------------------------------- */
function initTelemetryClock() {
  const clockElement = document.getElementById('telemetry-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');

    clockElement.innerHTML = `<i class="fa-regular fa-clock"></i> UTC ${utcHours}:${utcMinutes}:${utcSeconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   02. Subtle Cyber Node / Network Canvas Background
   -------------------------------------------------------------------------- */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 0.8;
      this.color = Math.random() > 0.3 ? '#00f5ff' : '#10b981';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!prefersReducedMotion.matches) {
    animate();
  }
}

/* --------------------------------------------------------------------------
   03. Navigation, Mobile Menu & Active Section Scroll Spy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const nav = document.querySelector('.main-nav');
  const toggleBtn = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   04. Interactive Cyber Terminal Widget (Verified Data)
   -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalBody || !terminalInput) return;

  const commands = {
    help: () => `
<div class="t-line"><span class="t-accent">Available System Commands:</span></div>
<div class="t-line">  <span class="t-green">whoami</span>       - Display analyst identity & credentials</div>
<div class="t-line">  <span class="t-green">focus</span>        - Current focus in cybersecurity & application security</div>
<div class="t-line">  <span class="t-green">education</span>    - BCA graduation details (Al-Ameen / MG University)</div>
<div class="t-line">  <span class="t-green">skills</span>       - Practiced security topics & core domains</div>
<div class="t-line">  <span class="t-green">tools</span>        - Practiced tools & full-stack development stack</div>
<div class="t-line">  <span class="t-green">projects</span>     - Display projects (Blood Donor Locator & Parking App)</div>
<div class="t-line">  <span class="t-green">cert</span>         - Completed certifications & ongoing courses</div>
<div class="t-line">  <span class="t-green">contact</span>      - Phone, Email, LinkedIn & location channels</div>
<div class="t-line">  <span class="t-green">resume</span>       - View resume status & request instructions</div>
<div class="t-line">  <span class="t-green">clear</span>        - Clear terminal history</div>
<div class="t-line">  <span class="t-green">sudo</span>         - Administrative privilege test</div>
`,
    whoami: () => `
<div class="t-line"><span class="t-accent font-bold">Muhamad Saheer Ali M.N</span></div>
<div class="t-line"><span class="t-dim">Role:</span> Cybersecurity Learner & Aspiring Security Analyst</div>
<div class="t-line"><span class="t-dim">Education:</span> BCA (Class of 2026) — Al-Ameen College, MG University</div>
<div class="t-line"><span class="t-dim">Location:</span> Kochi, Kerala, India</div>
<div class="t-line"><span class="t-green">Contact:</span> saheerali695@gmail.com | +91 6282381145</div>
`,
    focus: () => `
<div class="t-line"><span class="t-accent">PRIMARY FOCUS &amp; AREAS OF STUDY:</span></div>
<div class="t-line">  [✓] Web Application Security &amp; OWASP Top 10 (SQLi, XSS, CSRF)</div>
<div class="t-line">  [✓] Vulnerability Assessment &amp; Web Request Inspection</div>
<div class="t-line">  [✓] Network Protocol Analysis &amp; Packet Forensics (Wireshark)</div>
<div class="t-line">  [✓] AI &amp; LLM Security (Certified LLM Security Expert - CLLMSE)</div>
<div class="t-line">  [✓] Ethical Hacking Methodologies (CEH In Progress)</div>
`,
    education: () => `
<div class="t-line"><span class="t-accent font-bold">Bachelor of Computer Applications (BCA)</span></div>
<div class="t-line"><span class="t-dim">Institution:</span> Al-Ameen College, Edathala</div>
<div class="t-line"><span class="t-dim">University:</span> Mahatma Gandhi University (MG University)</div>
<div class="t-line"><span class="t-dim">Graduation:</span> Class of 2026</div>
<div class="t-line"><span class="t-dim">Core Areas:</span> Computer Networks, Operating Systems, DBMS, Software Engineering, OOP</div>
`,
    skills: () => `
<div class="t-line"><span class="t-accent">CYBERSECURITY COMPETENCIES &amp; TOPICS:</span></div>
<div class="t-line">  - <span class="t-green">Web Vulnerabilities:</span> SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF</div>
<div class="t-line">  - <span class="t-green">Standards:</span> OWASP Top 10, Input Sanitization, Parameterized Queries</div>
<div class="t-line">  - <span class="t-green">Vulnerability Testing:</span> Target Recon, Port Scanning, Web Request Tampering</div>
<div class="t-line">  - <span class="t-green">Networking:</span> TCP/IP Architecture, OSI Model, Packet Capture &amp; Protocols</div>
<div class="t-line">  - <span class="t-green">Emerging Tech:</span> LLM Security, Prompt Injection, Generative AI Risks</div>
`,
    tools: () => `
<div class="t-line"><span class="t-accent">PRACTICED TOOLS &amp; TECH STACK:</span></div>
<div class="t-line">  - <span class="t-green">Security Tools:</span> Kali Linux, Nmap, Burp Suite, Wireshark, Metasploit</div>
<div class="t-line">  - <span class="t-green">Development:</span> Python, Flask, Vue.js, HTML5, CSS3, JavaScript</div>
<div class="t-line">  - <span class="t-green">Data &amp; Tasks:</span> SQLite, Redis, Celery</div>
`,
    projects: () => `
<div class="t-line"><span class="t-accent">VERIFIED SOFTWARE PROJECTS:</span></div>
<div class="t-line">  1. <span class="t-green font-bold">Blood Donor Locator</span> [Web App]</div>
<div class="t-line">     Stack: HTML5, CSS3, JavaScript</div>
<div class="t-line">     Features: Donor search by blood type/location, emergency contact shortcuts, mobile-first design.</div>
<div class="t-line">  2. <span class="t-green font-bold">Vehicle Parking App</span> [Full-stack Web App]</div>
<div class="t-line">     Stack: Python, Flask, Vue.js, SQLite, Redis, Celery, HTML/CSS</div>
<div class="t-line">     Features: User auth, real-time spot booking, admin dashboard, Celery background tasks &amp; Redis caching.</div>
`,
    cert: () => `
<div class="t-line"><span class="t-accent">VERIFIED CERTIFICATIONS &amp; CREDENTIALS:</span></div>
<div class="t-line">  <span class="t-green">[COMPLETED]</span> Introduction to Cybersecurity — Cisco Networking Academy</div>
<div class="t-line">              Date: 02 August 2026 | ID: 38b835fd-36e0-4a4a-a60e-c4d7097e4091</div>
<div class="t-line">  <span class="t-green">[COMPLETED]</span> Certified LLM Security Expert (CLLMSE) — Red Team Leaders</div>
<div class="t-line">              Date: 29 September 2026 | Verify: courses.redteamleaders.com</div>
<div class="t-line"><span class="t-accent">ONGOING &amp; IN PROGRESS:</span></div>
<div class="t-line">  <span class="t-amber">[IN PROGRESS]</span> Certified Ethical Hacker (CEH) — EC-Council</div>
<div class="t-line">  <span class="t-cyan">[PURSUING]</span> Professional Cybersecurity Course</div>
`,
    contact: () => `
<div class="t-line"><span class="t-accent">VERIFIED DIRECT CONTACT:</span></div>
<div class="t-line">  - <span class="t-dim">Phone:</span> <span class="t-green">+91 6282381145</span></div>
<div class="t-line">  - <span class="t-dim">Email:</span> <span class="t-green">saheerali695@gmail.com</span></div>
<div class="t-line">  - <span class="t-dim">LinkedIn:</span> <a href="https://www.linkedin.com/in/muhamad-saheerali-75882535a" target="_blank" style="color:#00f5ff;">linkedin.com/in/muhamad-saheerali-75882535a</a></div>
<div class="t-line">  - <span class="t-dim">Location:</span> Kochi, Kerala, India</div>
`,
    resume: () => {
      openResumeModal();
      return `<div class="t-line"><span class="t-green">[✓] Opening resume request dialog...</span></div>
<div class="t-line"><span class="t-dim">Status: In preparation / Available on request via saheerali695@gmail.com</span></div>`;
    },
    sudo: () => `
<div class="t-line"><span class="t-amber">[!] ALERT: Unauthorized privilege escalation test logged!</span></div>
<div class="t-line"><span class="t-dim">Defensive awareness active. Saheer is monitoring terminal access.</span></div>
`,
    clear: () => {
      const outputLines = terminalBody.querySelectorAll('.t-history-line');
      outputLines.forEach(line => line.remove());
      return '';
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      if (!rawInput) return;

      const cmd = rawInput.toLowerCase();
      terminalInput.value = '';

      const promptLine = document.createElement('div');
      promptLine.className = 't-line t-history-line';
      promptLine.innerHTML = `<span class="t-prompt">saheer@sec:~$</span> <span class="t-cmd">${escapeHTML(rawInput)}</span>`;
      terminalBody.insertBefore(promptLine, terminalInput.closest('.t-interactive-line'));

      let responseHtml = '';
      if (commands[cmd]) {
        responseHtml = commands[cmd]();
      } else {
        responseHtml = `<div class="t-line"><span class="t-amber">Command not found: "${escapeHTML(rawInput)}". Type <span class="t-green">help</span> for a list of available commands.</span></div>`;
      }

      if (responseHtml) {
        const respContainer = document.createElement('div');
        respContainer.className = 't-res t-history-line';
        respContainer.innerHTML = responseHtml;
        terminalBody.insertBefore(respContainer, terminalInput.closest('.t-interactive-line'));
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   05. Project Modals & Verified Project Specifications
   -------------------------------------------------------------------------- */
const projectDetailsData = {
  bloodDonor: {
    title: 'Blood Donor Locator',
    type: 'Web Application',
    stack: 'HTML5, CSS3, JavaScript, Responsive UI',
    overview: 'A responsive healthcare web application designed to connect individuals in urgent need of blood with active, eligible donors, minimizing emergency response times through intuitive geographic and blood group search.',
    securityHighlights: [
      'Donor search filtered by specific blood type and location parameters.',
      'Direct contact shortcuts for instant emergency communication between recipients and donors.',
      'Responsive mobile-first interface ensuring rapid triage on smartphones during critical situations.',
      'Clean client-side input validation and parameter checks.'
    ]
  },
  parkingApp: {
    title: 'Vehicle Parking App',
    type: 'Full-Stack Web Application',
    stack: 'Python, Flask, Vue.js, SQLite, Redis, Celery, HTML/CSS',
    overview: 'An advanced full-stack parking management platform providing real-time slot availability, automated booking reservations, role-based administration, automated email alerts, and analytical report generation.',
    securityHighlights: [
      'User registration, login, and session-based authentication management.',
      'Real-time parking spot reservation and parking lot / spot allocation management.',
      'Administrative dashboard with full system visibility and complete booking history tracking.',
      'Automated email notification dispatch and dynamic PDF report / receipt exports.',
      'High-performance background asynchronous task execution via Celery and in-memory caching with Redis.',
      'Parameterized database queries using SQLite protecting against SQL Injection (SQLi).'
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.view-project-details-btn');

  if (!modalOverlay) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      const data = projectDetailsData[projectKey];

      if (data) {
        document.getElementById('modal-project-title').textContent = data.title;
        document.getElementById('modal-project-type').textContent = data.type;
        document.getElementById('modal-project-stack').textContent = data.stack;
        document.getElementById('modal-project-overview').textContent = data.overview;

        const highlightsList = document.getElementById('modal-project-security-list');
        highlightsList.innerHTML = '';
        data.securityHighlights.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="text-cyan"><i class="fa-solid fa-check"></i></span> ${item}`;
          highlightsList.appendChild(li);
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   06. Resume Request Modal
   -------------------------------------------------------------------------- */
function openResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-modal-close-btn');
  const triggers = document.querySelectorAll('.download-resume-trigger');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   07. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.tool-filter-btn[data-filter]');
  const toolItems = document.querySelectorAll('.tool-item[data-category]');

  if (!filterBtns.length || !toolItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      toolItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   08. Interactive Contact Form with Validation & Feedback Toast
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const subject = document.getElementById('sender-subject').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (statusMsg) {
        statusMsg.className = 'form-status success';
        statusMsg.innerHTML = `<i class="fa-solid fa-check-double text-emerald"></i> <strong>Message Received!</strong> Thank you ${escapeHTML(name)}. Saheer will respond to ${escapeHTML(email)} shortly.`;
        statusMsg.style.display = 'block';

        setTimeout(() => {
          statusMsg.style.display = 'none';
        }, 8000);
      }

      showToastNotification('Message transmitted successfully!');
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   09. Copy to Clipboard Utility with Toast Feedback
   -------------------------------------------------------------------------- */
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToastNotification(`Copied to clipboard: "${textToCopy}"`);
        const originalTitle = btn.getAttribute('title');
        btn.setAttribute('title', 'Copied!');
        setTimeout(() => {
          btn.setAttribute('title', originalTitle || 'Copy');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
}

function showToastNotification(message) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.background = '#0f172a';
    toast.style.border = '1px solid #00f5ff';
    toast.style.color = '#f8fafc';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '6px';
    toast.style.fontFamily = "'Fira Code', monospace";
    toast.style.fontSize = '0.84rem';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 245, 255, 0.25)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
    toast.style.opacity = '0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="color:#00f5ff; margin-right:8px;"><i class="fa-solid fa-terminal"></i></span> ${escapeHTML(message)}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 4000);
}

/* --------------------------------------------------------------------------
   10. Scroll To Top Utility
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   11. Subtle Audio Feedback (Web Audio API Synthesizer)
   -------------------------------------------------------------------------- */
function initAudioFeedback() {
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  let audioEnabled = false;
  let audioCtx = null;

  function playCyberBlip(freq = 880, duration = 0.05) {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context error or browser policy
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high text-cyan"></i> AUDIO: ON';
        playCyberBlip(1200, 0.08);
      } else {
        audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> AUDIO: OFF';
      }
    });

    document.querySelectorAll('.btn, .nav-link, .tool-filter-btn').forEach(el => {
      el.addEventListener('click', () => playCyberBlip(900, 0.04));
    });
  }
}
