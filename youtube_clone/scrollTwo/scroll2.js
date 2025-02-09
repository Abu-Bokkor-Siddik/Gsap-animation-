document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Select all block rows
  const blockRows = document.querySelectorAll(".blocks-row");

  // Generate multiple box-shaped animated blocks dynamically
  blockRows.forEach((row) => {
    for (let i = 0; i < 16; i++) {
      const block = document.createElement("div");
      block.className = "block";
      row.appendChild(block);
    }
  });

  // Select all block containers
  const blockContainers = document.querySelectorAll(".blocks-container");

  blockContainers.forEach((container, containerIndex) => {
    const rows = container.querySelectorAll(".blocks-row");
    const isTop = container.classList.contains("top");

    rows.forEach((row, rowIndex) => {
      let blocks = Array.from(row.querySelectorAll(".block"));

      // Apply GSAP animation to each block individually
      blocks.forEach((block, blockIndex) => {
        gsap.fromTo(
          block,
          {
            opacity: 0,
            scale: 0.5,
            x: blockIndex % 2 === 0 ? -50 : 50,
            y: blockIndex % 3 === 0 ? -50 : 50,
          },

          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
              stagger: 0.1 * blockIndex, // Stagger animation for each block
            },
          }
        );
      });
    });

    // Animate the section title separately
    ScrollTrigger.create({
      trigger: container.parentElement, // The whole section
      start: "top center",
      end: "bottom center",
      scrub: true,
      onEnter: () => animateTitle(containerIndex),
      onEnterBack: () => animateTitle(containerIndex),
    });
  });

  function animateTitle(index) {
    let section = document.querySelectorAll("section")[index];
    let title = section.querySelector("h1");

    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }
  }
});
