const validationTemplate = `Validation Block
- One-sentence project description
- Project type and primary artifact
- Stack picks (3–6 items)
- Name choice
- Top 4 risk questions`;

export function getValidationTemplate() {
  return validationTemplate;
}

export async function copyTemplateToClipboard() {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }

  await navigator.clipboard.writeText(validationTemplate);
  return true;
}

function attachCopyHandler() {
  const button = document.querySelector("[data-copy-template]");
  if (!button) return;

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Copied!";

    try {
      const copied = await copyTemplateToClipboard();
      if (!copied) {
        button.textContent = "Clipboard unavailable";
      }
    } catch (err) {
      console.warn("Copy failed", err);
      button.textContent = "Copy failed";
    } finally {
      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Copy validation block";
      }, 1300);
    }
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", attachCopyHandler);
}
