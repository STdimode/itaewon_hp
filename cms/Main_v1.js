document.addEventListener("DOMContentLoaded", () => {
  /* ─── FadeUp Logic ─── */
  const fadeUpElements = document.querySelectorAll(".cms-fade-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeUpElements.forEach((el) => {
    const delay = el.getAttribute("data-delay") || "0";
    el.style.transitionDuration = "0.7s";
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });

  /* ─── Hero Dots Logic ─── */
  const heroDots = document.querySelectorAll('.cms-hero-dot');
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      heroDots.forEach(d => {
        d.style.width = '10px';
        d.style.background = 'rgba(255,255,255,0.45)';
      });
      dot.style.width = '28px';
      dot.style.background = 'white';
      // In a real app, this would also change the hero image.
      // Assuming only one hero image is in HERO_IMAGES as per App.tsx, this is mostly visual.
    });
  });

  /* ─── Gallery Carousel Logic ─── */
  const galleryContainer = document.querySelector(".cms-gallery-container");
  const track = document.querySelector(".cms-gallery-track");
  const leftArrow = document.querySelector(".cms-gallery-arrow-left");
  const rightArrow = document.querySelector(".cms-gallery-arrow-right");
  const dots = document.querySelectorAll(".cms-gallery-dot");

  if (!galleryContainer || !track) return;

  const N = 6;
  const GALLERY_GAP = 20;
  let visibleCount = 5;
  let slideW = 0;
  let gap = GALLERY_GAP;
  let idx = N; // start at copy1 index=6
  let anim = true;
  let isDragging = false;
  let dragOffset = 0;
  let dragStartX = 0;
  let autoplayEnabled = true;

  function getVisibleCount(width) {
    if (width < 640) return 2;
    if (width < 900) return 3;
    return 5;
  }

  function measure() {
    const cw = galleryContainer.clientWidth;
    visibleCount = getVisibleCount(cw);
    gap = cw < 480 ? 10 : GALLERY_GAP;
    slideW = (cw - gap * (visibleCount - 1)) / visibleCount;

    const imgHeight = visibleCount <= 2 ? 200 : 260;

    const slides = track.querySelectorAll(".cms-gallery-slide");
    slides.forEach(slide => {
      slide.style.width = `${slideW}px`;
      slide.style.height = `${imgHeight}px`;
    });

    galleryContainer.style.padding = visibleCount <= 2 ? "0 16px" : "0";

    // adjust arrows SVG width
    const svgWidth = visibleCount <= 2 ? 60 : 160;
    if (leftArrow) leftArrow.querySelector('svg').style.width = `${svgWidth}px`;
    if (rightArrow) rightArrow.querySelector('svg').style.width = `${svgWidth}px`;

    updateTransform();
  }

  function updateTransform() {
    const translateX = idx * (slideW + gap) - dragOffset;
    track.style.transition = anim ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(-${translateX}px)`;
    track.style.gap = `${gap}px`;
    updateDots();
  }

  function updateDots() {
    const activeDot = ((idx % N) + N) % N;
    dots.forEach((dot, i) => {
      if (i === activeDot) {
        dot.style.width = "20px";
        dot.style.background = "#666";
      } else {
        dot.style.width = "8px";
        dot.style.background = "#ccc";
      }
    });
  }

  // Initial measure
  measure();
  window.addEventListener("resize", measure);

  // Autoplay
  setInterval(() => {
    if (autoplayEnabled) {
      anim = true;
      idx++;
      updateTransform();
    }
  }, 3500);

  // Infinite loop jump
  track.addEventListener("transitionend", () => {
    if (idx >= N * 2) {
      anim = false;
      idx -= N;
      updateTransform();
    } else if (idx < N) {
      anim = false;
      idx += N;
      updateTransform();
    }
    // Re-enable animation after 2 RAFs
    if (!anim) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          anim = true;
        });
      });
    }
  });

  // Arrows
  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      anim = true;
      idx++;
      updateTransform();
    });
  }

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      anim = true;
      idx--;
      updateTransform();
    });
  }

  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      anim = true;
      idx = N + i;
      updateTransform();
    });
  });

  // Dragging
  function onDragStart(clientX) {
    isDragging = true;
    autoplayEnabled = false;
    anim = false;
    dragStartX = clientX;
    dragOffset = 0;
    galleryContainer.style.cursor = "grabbing";
  }

  function onDragMove(clientX) {
    if (!isDragging) return;
    dragOffset = clientX - dragStartX;
    updateTransform();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    autoplayEnabled = true;
    galleryContainer.style.cursor = "grab";

    const threshold = slideW * 0.3;
    if (dragOffset < -threshold) {
      anim = true;
      idx++;
    } else if (dragOffset > threshold) {
      anim = true;
      idx--;
    } else {
      anim = true; // snap back
    }
    dragOffset = 0;
    updateTransform();
  }

  // Mouse events
  galleryContainer.addEventListener("mousedown", (e) => onDragStart(e.clientX));
  galleryContainer.addEventListener("mousemove", (e) => onDragMove(e.clientX));
  galleryContainer.addEventListener("mouseup", onDragEnd);
  galleryContainer.addEventListener("mouseleave", onDragEnd);

  // Touch events
  galleryContainer.addEventListener("touchstart", (e) => onDragStart(e.touches[0].clientX));
  galleryContainer.addEventListener("touchmove", (e) => onDragMove(e.touches[0].clientX));
  galleryContainer.addEventListener("touchend", onDragEnd);

});
