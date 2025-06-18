document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Header scroll effect
  const header = document.getElementById('header');
  const navButtons = document.querySelectorAll('.nav-button');
  const logo = document.getElementById('logo');
  
  // Scroll to section function
  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveNav(id);
    }
  }
  
  // Set active nav item
  function setActiveNav(id) {
    navButtons.forEach(button => {
      if (button.dataset.section === id) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  // Handle scroll events
  function handleScroll() {
    // Header scroll effect
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active navigation item based on scroll position
    const sections = ['hero', 'resume', 'about', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveNav(section);
          break;
        }
      }
    }
  }
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll);
  
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      scrollToSection(button.dataset.section);
    });
  });
  
  logo.addEventListener('click', () => {
    scrollToSection('hero');
  });
  
  // Hero image parallax effect
  const heroImage = document.getElementById('hero-image');
  if (heroImage) {
    document.getElementById('hero').addEventListener('mousemove', (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 20;
      const y = (e.clientY - window.innerHeight / 2) / 20;
      heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  
  // Download CV button
  document.getElementById('download-cv').addEventListener('click', () => {
    window.open('public/cv.pdf', '_blank');
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Section titles
        if (element.classList.contains('section-title')) {
          element.classList.add('animate-fade-in-down');
        }
        
        // About section
        if (element.id === 'about') {
          document.querySelector('.about-image-container').classList.add('animate-fade-in-left');
          document.querySelector('.about-text-container').classList.add('animate-fade-in-right');
        }
        
        // Resume section
        if (element.id === 'resume') {
          document.querySelector('.resume-subtitle').classList.add('animate-fade-in-left');
          
          // Education and experience cards
          const educationCards = document.querySelectorAll('.education-card');
          const experienceCards = document.querySelectorAll('.experience-card');
          
          educationCards.forEach((card, index) => {
            card.classList.add('animate-fade-in-up', `delay-${index}`);
          });
          
          experienceCards.forEach((card, index) => {
            card.classList.add('animate-fade-in-up', `delay-${index}`);
          });
        }
        
        // Contact section
        if (element.id === 'contact') {
          document.querySelector('.section-title').classList.add('animate-fade-in-down');
        }
      }
    });
  }, observerOptions);
  
  // Observe sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Initial animations
  document.querySelector('.hero-title').style.animation = 'fadeInDown 1s ease-out forwards';
  document.querySelector('.hero-subtitle').style.animation = 'fadeInUp 1s ease-out forwards 0.3s';
});
function down() {
  window.open('assets/cv.pdf', '_blank');
}