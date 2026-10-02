$(document).ready(function () {
  // --- 1. New Loader Animation ---

  // Animate bar width
  gsap.to('#loader-bar', {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete: function () {
      // Slide up loader
      gsap.to('#loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      });

      // Trigger Hero Animations
      gsap.to('.hero-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.to('.hero-img-container', {
        scale: 1,
        duration: 2,
        ease: 'power2.out',
        delay: 0.2,
      });
    },
  });

  // Set initial state for hero reveal
  gsap.set('.hero-reveal', { y: 100, opacity: 0 });

  // --- 2. Navbar & Mobile Menu ---
  // Mobile Dropdown Logic
  $('#mobile-services-toggle').on('click', function () {
    const $icon = $(this).find('i');
    const $list = $('#mobile-services-list');

    $list.slideToggle(300);
    $icon.toggleClass('rotate-180');
  });

  // Navbar & Hamburger Logic
  $('#hamburger').on('click', function () {
    const $nav = $('#navbar');
    const $targets = $('.nav-blend-target');

    $(this).toggleClass('nav-open');
    if ($(this).hasClass('nav-open')) {
      $('#mobile-menu')
        .removeClass('translate-x-full')
        .addClass('translate-x-0');
      $targets
        .removeClass('mix-blend-difference')
        .removeClass('text-white')
        .addClass('text-v-dark');
      $('body').css('overflow', 'hidden');
    } else {
      $('#mobile-menu')
        .removeClass('translate-x-0')
        .addClass('translate-x-full');
      setTimeout(() => {
        $targets.removeClass('text-v-dark').addClass('text-white');
        if ($(window).scrollTop() <= 50) {
          $targets.addClass('mix-blend-difference');
        }
      }, 400);
      $('body').css('overflow', 'auto');
    }
  });

  $(window).on('scroll', function () {
    const $targets = $('.nav-blend-target');
    if (!$('#hamburger').hasClass('nav-open')) {
      if ($(this).scrollTop() > 50) {
        $('#navbar')
          .addClass('bg-black/80 backdrop-blur-md py-3')
          .removeClass('py-6');
        $targets.removeClass('mix-blend-difference');
      } else {
        $('#navbar')
          .removeClass('bg-black/80 backdrop-blur-md py-3')
          .addClass('py-6');
        $targets.addClass('mix-blend-difference');
      }
    }
  });

  // --- 3. GSAP Animations ---

  gsap.registerPlugin(ScrollTrigger);

  // Parallax Hero Image
  gsap.to('.hero-img-container img', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Reveal Text on Scroll (About Section)
  gsap.from('.gs-reveal-text', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Reveal Image on Scroll (About Section)
  gsap.from('.gs-reveal-img', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
    },
    x: -50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  });

  // Number Counters
  gsap.utils.toArray('.counter').forEach((counter) => {
    const target = counter.getAttribute('data-target');
    gsap.to(counter, {
      innerHTML: target,
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        once: true,
      },
      duration: 2,
      ease: 'power2.out',
    });
  });

  // Horizontal Scroll for Gallery 
    const scrollContainer = document.querySelector(".gallery-wrapper");
    const scrollDistance = scrollContainer.scrollWidth - window.innerWidth;

    gsap.to(scrollContainer, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
            trigger: "#projects",
            pin: true,
            start: "center center",
            scrub: 1,
            end: "+=3000"
        }
    });

  // --- 4. Testimonial Swiper Logic ---
  const testimonials = [
    {
      text: 'Verdant & Stone transformed our disorganized backyard into a beautiful garden. Their attention to detail was amazing.',
      name: 'James Sterling',
      role: 'Homeowner, Kensington',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      text: 'The team is incredibly professional. They show up on time, and my lawn has never looked greener. Highly recommended!',
      name: 'Sarah Jenkins',
      role: 'Resident, Portland',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      text: 'I love the new garden design. It feels like a completely new home. The designers listened to exactly what I wanted.',
      name: 'Michael Ross',
      role: 'Homeowner, Beaverton',
      img: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
  ];

  let currentTestimonial = 0;
  const $container = $('#testimonial-container');

  function renderTestimonial(index) {
    const t = testimonials[index];
    const content = `
    <div class="testimonial-slide active animate-fade-in">
    <p class="text-2xl md:text-4xl font-display font-light leading-normal mb-8">
        "${t.text}"
    </p>
    <div class="flex items-center justify-center gap-4">
        <img src="${t.img}" class="w-12 h-12 rounded-full grayscale border-2 border-v-dark" alt="Client">
        <div class="text-left">
            <h5 class="font-bold uppercase tracking-wider text-sm">${t.name}</h5>
            <span class="text-xs opacity-70">${t.role}</span>
        </div>
    </div>
</div>
        `;
    $container.html(content).hide().fadeIn(400);
  }

  // Initial Render
  renderTestimonial(currentTestimonial);

  $('#next-testim').click(function () {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
  });

  $('#prev-testim').click(function () {
    currentTestimonial =
      (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
  });

  // --- 5. Marquee CSS Injection ---
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 20s linear infinite;
        }
    `;
  document.head.appendChild(styleSheet);

  // --- 6. Floating Buttons Logic ---
  const scrollTopBtn = $('#scroll-top');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      scrollTopBtn.addClass('visible');
    } else {
      scrollTopBtn.removeClass('visible');
    }
  });
  scrollTopBtn.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
  });
});