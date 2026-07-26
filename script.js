"use strict";

const typingElement = document.getElementById("typingText");

const personalTypingTexts = [
  "Developer · Creator · Explorer",
  "开发者 · 创作者 · 探索者",
  "Building interesting things with code.",
  "用代码将灵感变成现实。",
  "Explore · Create · Share"
];

const organizationTypingTexts = [
  "Ideas transformed into code.",
  "将创意转化为代码。",
  "Open Source · AI · Developer Tools",
  "探索 · 创造 · 协作",
  "Explore · Create · Collaborate"
];

const isOrganizationWebsite =
  document.body.dataset.website === "organization";

const typingTexts = isOrganizationWebsite
  ? organizationTypingTexts
  : personalTypingTexts;

let typingTextIndex = 0;
let typingCharacterIndex = 0;
let deleting = false;

function updateTypingText() {
  if (!typingElement) {
    return;
  }

  const currentText = typingTexts[typingTextIndex];

  if (!deleting) {
    typingCharacterIndex += 1;
    typingElement.textContent =
      currentText.slice(0, typingCharacterIndex);

    if (typingCharacterIndex >= currentText.length) {
      deleting = true;
      window.setTimeout(updateTypingText, 1700);
      return;
    }
  } else {
    typingCharacterIndex -= 1;
    typingElement.textContent =
      currentText.slice(0, typingCharacterIndex);

    if (typingCharacterIndex <= 0) {
      deleting = false;
      typingTextIndex =
        (typingTextIndex + 1) % typingTexts.length;

      window.setTimeout(updateTypingText, 350);
      return;
    }
  }

  const delay = deleting ? 35 : 75;
  window.setTimeout(updateTypingText, delay);
}

function createStars() {
  const starsContainer = document.getElementById("stars");

  if (!starsContainer) {
    return;
  }

  const starCount = window.innerWidth < 700 ? 35 : 75;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("span");

    star.className = "star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty(
      "--size",
      `${(Math.random() * 2.3 + 0.6).toFixed(2)}px`
    );
    star.style.setProperty(
      "--opacity",
      `${(Math.random() * 0.65 + 0.25).toFixed(2)}`
    );
    star.style.setProperty(
      "--duration",
      `${(Math.random() * 3.5 + 1.8).toFixed(2)}s`
    );
    star.style.animationDelay =
      `${(Math.random() * 4).toFixed(2)}s`;

    fragment.appendChild(star);
  }

  starsContainer.replaceChildren(fragment);
}

function observeRevealElements() {
  const revealElements =
    document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function configureMobileNavigation() {
  const menuButton =
    document.getElementById("menuButton");

  const navigation =
    document.getElementById("navigation");

  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      navigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });
}

function setCurrentYear() {
  const yearElement =
    document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent =
      String(new Date().getFullYear());
  }
}

createStars();
observeRevealElements();
configureMobileNavigation();
setCurrentYear();
updateTypingText();

let resizeTimer;

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(
    createStars,
    250
  );
});
