/* ============================================================
   Readiness Score Calculator
   ============================================================ */

/**
 * Calculate readiness score based on inputs.
 * Starts at 50. +5 per detected category (max 30). +10 company. +10 role. +10 JD length > 800.
 * @param {Object} params
 * @returns {number} score 0–100
 */
export function calculateReadinessScore({ categoryCount, company, role, jdText }) {
  let score = 50;

  // +5 per category present, max 30
  score += Math.min(categoryCount * 5, 30);

  // +10 if company name provided
  if (company && company.trim().length > 0) {
    score += 10;
  }

  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10;
  }

  // +10 if JD length > 800 chars
  if (jdText && jdText.length > 800) {
    score += 10;
  }

  return Math.min(score, 100);
}
