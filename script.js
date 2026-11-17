// AYUSH Master Portfolio - Clean, High-Performance JavaScript Engine
// Business • Finance • Data Analytics

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Reading Progress Bar
  // =========================================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    if (scrollProgressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgressBar.style.width = `${scrolled}%`;
    }
  }, { passive: true });

  // =========================================================================
  // 2. Typing Effect for Professional Focus Areas
  // =========================================================================
  const roles = [
    'Business & Data Analytics',
    'Financial Expansion Modelling',
    'Corporate Strategy & Planning',
    'Marketing Analytics & STP',
    'Data-Driven Decision Making'
  ];
  
  const typingElement = document.getElementById('typingText');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 85;
  const erasingDelay = 40;
  const nextRoleDelay = 2000;

  function typeRole() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = nextRoleDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  if (typingElement) {
    setTimeout(typeRole, 400);
  }

  // =========================================================================
  // 3. 3D Card Tilt & Flip for Executive Profile Badge
  // =========================================================================
  const idBadgeCard = document.getElementById('idBadgeCard');
  const cardWrapper = document.getElementById('profileCardWrapper');

  if (idBadgeCard && cardWrapper) {
    // Click to Flip Front / Back
    idBadgeCard.addEventListener('click', (e) => {
      // Ignore if clicking on direct links inside the card
      if (e.target.closest('a') || e.target.closest('button')) return;
      idBadgeCard.classList.toggle('flipped');
    });

    // Subtle 3D Mouse Tilt
    cardWrapper.addEventListener('mousemove', (e) => {
      if (idBadgeCard.classList.contains('flipped')) return;
      const rect = cardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotY = (x / (rect.width / 2)) * 8;
      const rotX = -(y / (rect.height / 2)) * 8;
      idBadgeCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    cardWrapper.addEventListener('mouseleave', () => {
      if (!idBadgeCard.classList.contains('flipped')) {
        idBadgeCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
    });
  }

  // =========================================================================
  // 4. Live Amritsar Clock
  // =========================================================================
  const liveClockElement = document.getElementById('liveAmritsarTimeBadge');
  function updateAmritsarClock() {
    if (!liveClockElement) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
      liveClockElement.textContent = `Amritsar, IN: ${formatter.format(now)}`;
    } catch (e) {
      liveClockElement.textContent = 'Amritsar, Punjab (IST)';
    }
  }
  updateAmritsarClock();
  setInterval(updateAmritsarClock, 1000);

  // =========================================================================
  // 5. One-Click Copy Email Handlers
  // =========================================================================
  function setupCopyButton(btnId, textId, defaultText) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('ayush23021@gmail.com').then(() => {
        const textSpan = textId ? document.getElementById(textId) : null;
        if (textSpan) textSpan.textContent = 'Copied to Clipboard!';
        btn.classList.add('copied');
        
        setTimeout(() => {
          if (textSpan) textSpan.textContent = defaultText;
          btn.classList.remove('copied');
        }, 3000);
      }).catch(() => {
        window.location.href = 'mailto:ayush23021@gmail.com';
      });
    });
  }

  setupCopyButton('copyHeroEmailBtn', 'copyHeroEmailText', 'Copy Email');
  setupCopyButton('copyContactEmailBox', 'copyBadgePill', 'Copy');

  // =========================================================================
  // 6. Scroll Reveal Animations (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 7. Ambient Particle Background Canvas (Subtle & Quiet)
  // =========================================================================
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const particleCount = Math.min(45, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    let mouseX = -9999;
    let mouseY = -9999;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const mouseGlow = document.getElementById('mouseGlow');
      if (mouseGlow) {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
      }
    }, { passive: true });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.fill();

        // Connect adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // =========================================================================
  // 8. Project Filter Tabs
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 9. Project Details Modal System
  // =========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');

  const projectDetails = {
    mitti: {
      title: 'MITTI Compass: Sustainable Social Enterprise Expansion',
      badge: 'Top 10 Finalist • National Finals at IIM Bangalore (14 Nov 2026)',
      desc: 'National finalist case competition project focused on scaling MITTI Café — a social enterprise employing persons with disabilities — without taking on crippling retail real estate overhead or fixed debt risks.',
      features: [
        'Mobile Cart Expansion: Modeled ₹2,50,000 unit CapEx for deploying low-footprint carts in corporate complexes and universities.',
        'Daily POS Debt Repayment: Automated ₹2,500 monthly debt service deducted micro-daily via Point-of-Sale receipts, achieving 98.4% modeled recovery with zero fixed-default risk.',
        'Institutional Partnerships: 60–70% corporate-hosted café ratio to eliminate commercial rental liabilities.',
        'Asset Accounting: Applied 20% Written Down Value (WDV) depreciation method and financial ring-fencing for operational risk governance.',
        'Inclusive Brand Storytelling: Inclusive superhero comic universe positioning persons with disabilities as capable heroes.'
      ]
    },
    tutoring: {
      title: 'Independent Accountancy Tutoring Service',
      badge: 'Independent Initiative • Amritsar, Punjab',
      desc: 'Managing an independent academic tutoring engagement providing structured Accountancy instruction for senior secondary (Classes 11 & 12) commerce students.',
      features: [
        'Curriculum Instruction: In-depth coverage of double-entry bookkeeping, partnership accounts, and financial statement analysis.',
        'Mentorship & Guidance: Personalized academic tracking helping students strengthen conceptual foundations and analytical rigor.',
        'Operations & Fee Management: Independently overseeing student admissions, fee scheduling, and learning schedules.'
      ]
    },
    interop: {
      title: 'Interoperability & Accountability Frameworks',
      badge: 'Case Competition Research Brief',
      desc: 'Synthesised research on institutional coordination mechanisms, interoperability standards, and accountability frameworks to formulate evidence-backed recommendations.',
      features: [
        'Institutional Governance: Synthesised multi-stakeholder accountability frameworks across decentralized platforms.',
        'Structured Synthesis: Translated dense research documents into clear, actionable executive summaries.'
      ]
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];

      if (data && modalContent && projectModal) {
        modalContent.innerHTML = `
          <span class="modal-badge">${data.badge}</span>
          <h3>${data.title}</h3>
          <p class="modal-desc">${data.desc}</p>
          <ul class="modal-features-list">
            ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
          </ul>
          <div style="margin-top: 1.5rem; text-align: right;">
            <a href="#contact" class="btn btn-sm btn-primary" onclick="document.getElementById('projectModal').classList.remove('active');">
              <i class="fa-solid fa-envelope"></i> Discuss This Project
            </a>
          </div>
        `;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 10. Theme Accent Switcher
  // =========================================================================
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const theme = dot.getAttribute('data-theme');
      document.body.setAttribute('data-accent', theme);
    });
  });

  // =========================================================================
  // 11. Confetti Cannon on Form Submit
  // =========================================================================
  const confettiCanvas = document.getElementById('confettiCanvas');
  function triggerConfetti(originX, originY, count = 60) {
    if (!confettiCanvas) return;
    const cCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#38bdf8', '#818cf8', '#c084fc', '#fbbf24', '#34d399', '#ffffff'];

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1.2) * 12,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    function renderConfetti() {
      cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotSpeed;
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          alive = true;
          cCtx.save();
          cCtx.translate(p.x, p.y);
          cCtx.rotate((p.rotation * Math.PI) / 180);
          cCtx.fillStyle = p.color;
          cCtx.globalAlpha = p.alpha;
          cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          cCtx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(renderConfetti);
      } else {
        cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    renderConfetti();
  }

  // =========================================================================
  // 12. Working Contact Form (Connected to ayush23021@gmail.com)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      submitBtn.disabled = true;

      const nameVal = document.getElementById('name').value;
      const emailVal = document.getElementById('email').value;
      const messageVal = document.getElementById('message').value;

      try {
        const response = await fetch('https://formsubmit.co/ajax/ayush23021@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            message: messageVal,
            _subject: `New Portfolio Message from ${nameVal}`,
            _template: 'table'
          })
        });

        if (response.ok) {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Delivered!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

          const rect = submitBtn.getBoundingClientRect();
          triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

          if (formStatus) {
            formStatus.textContent = 'Thank you! Your message has been sent directly to Ayush\'s inbox.';
            formStatus.classList.add('success');
          }

          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 4500);
        } else {
          throw new Error('Failed to deliver message');
        }
      } catch (err) {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send via Email';
        submitBtn.disabled = false;

        if (formStatus) {
          formStatus.innerHTML = `Note: Click above to open direct email to <strong>ayush23021@gmail.com</strong>.`;
          formStatus.classList.add('success');
        }

        window.location.href = `mailto:ayush23021@gmail.com?subject=Message from ${encodeURIComponent(nameVal)}&body=${encodeURIComponent(messageVal)}`;
      }
    });
  }

  // =========================================================================
  // 13. Mobile Menu Toggle
  // =========================================================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // =========================================================================
  // 14. Print / PDF Resume Export Button
  // =========================================================================
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  // =========================================================================
  // 15. Dynamic Current Year in Footer
  // =========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 16. Active Navigation Link on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id], header[id]');
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

});
