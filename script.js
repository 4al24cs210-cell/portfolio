/**
 * THANISH S. - DEVELOPER PORTFOLIO (PRO EDITION)
 * Core Interactive Logic & Animations:
 * 1. Interactive Particle Constellation Canvas
 * 2. Dynamic Typewriter Effect
 * 3. 3D Card Tilt & Cursor Spotlight Effect
 * 4. Scroll-Triggered Reveal Animations
 * 5. Animated Metric Counters
 * 6. Interactive Developer CLI Terminal Tool
 * 7. Skills Category Filter
 * 8. Toast Notifications & Clipboard Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initParticleCanvas();
  initTypewriter();
  initScrollReveal();
  initMetricCounters();
  init3DTilt();
  initNavbarScroll();
  initSectionSpy();
  initMobileDrawer();
  initSkillsFilter();
  initBackToTop();
  initCliTerminal();
});

/**
 * Update current year in footer
 */
function initYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * ANIMATION 1: Interactive Particle Constellation Canvas
 * Creates a reactive node network that connects particles to each other and to the mouse cursor
 */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
  const connectionDistance = 120;
  const mouseConnectionDistance = 160;

  const mouse = { x: null, y: null };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      else if (this.x > width) this.x = 0;

      if (this.y < 0) this.y = height;
      else if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw and connect particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDistance) {
          const alpha = (1 - dist / mouseConnectionDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * ANIMATION 3: Dynamic Typewriter Effect
 */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter-text');
  if (!typewriterEl) return;

  const roles = [
    'Computer Science & Engineering Student',
    'Software Developer & Problem Solver',
    'Java, Spring Boot & MySQL Backend',
    'Python & Video Processing Enthusiast',
    'Data Analytics & Business Intelligence'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 1800;

  function type() {
    const currentText = roles[roleIdx];

    if (!isDeleting) {
      typewriterEl.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentText.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
    } else {
      typewriterEl.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/**
 * ANIMATION 4: 3D Card Tilt & Cursor Spotlight
 */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/**
 * ANIMATION 5: Scroll-Triggered Reveal Animations
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((el) => observer.observe(el));
}

/**
 * ANIMATION 6: Animated Metric Counters
 */
function initMetricCounters() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const metricsRow = document.querySelector('.hero-metrics');
  if (metricsRow) observer.observe(metricsRow);
}

/**
 * INTERACTIVE DEVELOPER TOOLBOX & CLI TOOL
 */
function initCliTerminal() {
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  if (!cliForm || !cliInput) return;

  window.handleCliCommand = function(e) {
    e.preventDefault();
    const rawCmd = cliInput.value.trim();
    if (!rawCmd) return;
    executeCommand(rawCmd);
    cliInput.value = '';
  };

  window.runShortcut = function(cmd) {
    executeCommand(cmd);
    cliInput.focus();
  };

  window.clearTerminal = function() {
    const body = document.getElementById('cli-body');
    if (body) {
      body.innerHTML = `
        <div class="cli-line text-muted">Terminal cleared. Type <span class="cli-cmd-hint">help</span> for commands.</div>
      `;
    }
  };
}

function executeCommand(command) {
  const body = document.getElementById('cli-body');
  if (!body) return;

  const normalized = command.toLowerCase().trim();

  // Print input command
  const inputLine = document.createElement('div');
  inputLine.className = 'cli-line';
  inputLine.innerHTML = `<span class="cli-prompt">visitor@thanish.dev:~$</span> <span class="cli-cmd-preview">${escapeHtml(command)}</span>`;
  body.appendChild(inputLine);

  const responseWrap = document.createElement('div');
  responseWrap.className = 'cli-response';

  switch (normalized) {
    case 'help':
      responseWrap.innerHTML = `
        <p><strong>Available Commands:</strong></p>
        <p>• <span class="cli-cmd-hint">skills</span> - View programming languages, backend & tools</p>
        <p>• <span class="cli-cmd-hint">projects</span> - View featured project portfolio</p>
        <p>• <span class="cli-cmd-hint">education</span> - View academic degrees and institutions</p>
        <p>• <span class="cli-cmd-hint">certs</span> - View professional certifications</p>
        <p>• <span class="cli-cmd-hint">interests</span> - View analytical and BI focus areas</p>
        <p>• <span class="cli-cmd-hint">contact</span> - View direct contact details</p>
        <p>• <span class="cli-cmd-hint">clear</span> - Clear terminal output</p>
      `;
      break;

    case 'skills':
      responseWrap.innerHTML = `
        <p>💻 <strong>Languages:</strong> C, Java, Python, SQL, JavaScript</p>
        <p>🌐 <strong>Web & Backend:</strong> HTML, CSS, JSP, Java Servlets, JDBC, Spring Boot</p>
        <p>🗄️ <strong>Databases & Tools:</strong> MySQL, React, Bootstrap, Git, GitHub, Eclipse, Apache Tomcat</p>
        <p>🧠 <strong>Concepts:</strong> DBMS, Data Structures, OOP, MVC, REST APIs</p>
        <p>🤝 <strong>Non-Technical:</strong> Public Speaking (Seminars), Teamwork, Leadership, Time Management</p>
      `;
      break;

    case 'projects':
      responseWrap.innerHTML = `
        <p>🚀 <strong>1. Traffic Violation Detection</strong> (Python)</p>
        <p>&nbsp;&nbsp;&nbsp;→ Automated image/video processing for detecting vehicular infractions.</p>
        <p>🚀 <strong>2. Mark Management System</strong> (Java, Spring Boot, MySQL)</p>
        <p>&nbsp;&nbsp;&nbsp;→ Backend REST application for managing student academic marks and records.</p>
        <p>🚀 <strong>3. RapidCare Emergency Response System</strong> (React, Tailwind CSS, Context API)</p>
        <p>&nbsp;&nbsp;&nbsp;→ Healthcare emergency platform connecting users with hospitals and ambulances.</p>
      `;
      break;

    case 'education':
      responseWrap.innerHTML = `
        <p>🎓 <strong>B.E. in Computer Science & Engineering (Pursuing, 2024 - Present)</strong></p>
        <p>&nbsp;&nbsp;&nbsp;Alva's Institute of Engineering & Technology (AIET) - Affiliated to VTU, Karnataka</p>
        <p>📚 <strong>Pre-University Course (PUC) - Science</strong></p>
        <p>&nbsp;&nbsp;&nbsp;Sri Adi Chunchanagiri Independent PU College (SAIPUC), Shivamogga</p>
        <p>🏫 <strong>Secondary School Leaving Certificate (SSLC)</strong></p>
        <p>&nbsp;&nbsp;&nbsp;JAIN PUBLIC SCHOOL, Shivamogga</p>
      `;
      break;

    case 'certs':
    case 'certifications':
      responseWrap.innerHTML = `
        <p>📜 <strong>MongoDB:</strong> From Relational Model (SQL) to MongoDB's Document Model</p>
        <p>📜 <strong>Coursera:</strong> Data Structures and Algorithms</p>
        <p>📜 <strong>Coursera:</strong> Database Management Systems</p>
      `;
      break;

    case 'interests':
      responseWrap.innerHTML = `
        <p>📊 Data Analytics &bull; Data Visualization &bull; Database Management &bull; Data-Driven Problem Solving &bull; Business Intelligence</p>
      `;
      break;

    case 'contact':
      responseWrap.innerHTML = `
        <p>👤 <strong>THANISH S.</strong></p>
        <p>📞 Phone: <a href="tel:8296457646" class="text-accent">8296457646</a></p>
        <p>✉️ Email: <a href="mailto:thanish.s7134@gmail.com" class="text-accent">thanish.s7134@gmail.com</a></p>
        <p>🔗 LinkedIn: <a href="https://linkedin.com/in/thanish-s-a9aa77432" target="_blank" class="text-accent">linkedin.com/in/thanish-s-a9aa77432</a></p>
        <p>🐙 GitHub: <a href="https://github.com/thanishsthanish-debug" target="_blank" class="text-accent">github.com/thanishsthanish-debug</a></p>
      `;
      break;

    case 'clear':
      window.clearTerminal();
      return;

    default:
      responseWrap.innerHTML = `
        <p class="text-muted">Command not recognized: '<span class="text-white">${escapeHtml(command)}</span>'. Type <span class="cli-cmd-hint">help</span> for a list of available commands.</p>
      `;
  }

  body.appendChild(responseWrap);
  body.scrollTop = body.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Navbar scroll style
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Active Nav Link Spy on Scroll
 */
function initSectionSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
        drawerLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach((s) => observer.observe(s));
}

/**
 * Mobile Drawer Menu
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const links = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function open() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  links.forEach((l) => l.addEventListener('click', close));
}

/**
 * Skills Filtering
 */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Back to top floating button
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 450);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Copy to clipboard with toast notification
 */
window.copyToClipboard = function(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || 'Copied to clipboard!');
    }).catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
};

function fallbackCopy(text, successMessage) {
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(successMessage || 'Copied to clipboard!');
  } catch (e) {
    showToast('Failed to copy', true);
  }
}

function showToast(message, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fade-out 0.3s ease-out forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/**
 * Contact mailer form
 */
window.handleMessageSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('sender-name')?.value.trim() || '';
  const subject = document.getElementById('sender-subject')?.value.trim() || '';
  const message = document.getElementById('sender-message')?.value.trim() || '';

  const mailtoLink = `mailto:thanish.s7134@gmail.com?subject=${encodeURIComponent(subject ? `[Portfolio] ${subject} - ${name}` : `Contact from ${name}`)}&body=${encodeURIComponent(`Hi Thanish,\n\n${message}\n\nBest regards,\n${name}`)}`;

  window.location.href = mailtoLink;
  showToast('Opening default email client...');
};
