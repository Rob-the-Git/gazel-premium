(() => {
    const header = document.querySelector(".site-header");
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-cta");
  
    const hero = document.getElementById("hero");
    const heroVideo = document.getElementById("heroVideo");
  
    // ---------- Mobile menu ----------
    const closeMenu = () => {
      burgerBtn.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      burgerBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
  
    const openMenu = () => {
      burgerBtn.classList.add("is-open");
      mobileMenu.classList.add("is-open");
      burgerBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
  
    if (burgerBtn && mobileMenu) {
      burgerBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("is-open");
        if (isOpen) closeMenu();
        else openMenu();
      });
  
      mobileLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
  
      window.addEventListener("resize", () => {
        if (window.innerWidth > 860) closeMenu();
      });
    }
  
    // ---------- Header background on scroll ----------
    window.addEventListener(
      "scroll",
      () => {
        if (!header) return;
        if (window.scrollY > 24) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      },
      { passive: true }
    );
  
    // ---------- GSAP + ScrollTrigger video scrub ----------
    if (
      hero &&
      heroVideo &&
      window.gsap &&
      window.ScrollTrigger &&
      typeof heroVideo.play === "function"
    ) {
      gsap.registerPlugin(ScrollTrigger);
  
      const initVideoScroll = () => {
        // iOS/Chrome policy workaround: "разбудить" видео.
        const unlockPlay = heroVideo.play();
        if (unlockPlay && typeof unlockPlay.then === "function") {
          unlockPlay.then(() => heroVideo.pause()).catch(() => {});
        }
  
        heroVideo.pause();
        heroVideo.currentTime = 0;
  
        const state = { frame: 0 };
  
        gsap.to(state, {
          frame: heroVideo.duration || 1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15
          },
          onUpdate: () => {
            const t = Math.min(state.frame, heroVideo.duration || state.frame);
            if (!Number.isNaN(t)) {
              heroVideo.currentTime = t;
            }
          }
        });
  
        ScrollTrigger.refresh();
      };
  
      if (heroVideo.readyState >= 1) {
        initVideoScroll();
      } else {
        heroVideo.addEventListener("loadedmetadata", initVideoScroll, { once: true });
      }
    }
  
    // ---------- Demo form handler ----------
    const form = document.querySelector(".contact-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        form.reset();
      });
    }
  })();