const toggle = document.getElementById("billing-toggle");
const dot = document.getElementById("toggle-dot");
const prices = {
  basic: { monthly: 29, yearly: 23 }, // ~20% off
  pro: { monthly: 99, yearly: 79 },
  enterprise: { monthly: 499, yearly: 399 },
};

let isYearly = false;

toggle.addEventListener("click", () => {
  isYearly = !isYearly;

  // Update Toggle UI
  dot.style.transform = isYearly ? "translateX(24px)" : "translateX(0px)";

  // Update Prices with a small fade effect
  ["basic", "pro", "enterprise"].forEach((tier) => {
    const el = document.getElementById(`price-${tier}`);
    el.style.opacity = "0";

    setTimeout(() => {
      el.innerText = isYearly ? prices[tier].yearly : prices[tier].monthly;
      el.style.opacity = "1";
    }, 150);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to all sections or specific elements
  const hiddenElements = document.querySelectorAll(".reveal");
  hiddenElements.forEach((el) => observer.observe(el));
});
