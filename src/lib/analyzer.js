/* ============================================================
   Analysis Orchestrator — runs all generators and saves result
   ============================================================ */

import { extractSkills } from './skillExtractor';
import { calculateReadinessScore } from './readinessScore';
import { generateChecklist } from './checklistGenerator';
import { generatePlan } from './planGenerator';
import { generateQuestions } from './questionGenerator';
import { saveEntry } from './storage';

/**
 * Run full analysis on a JD input and persist to localStorage.
 * @param {{ company: string, role: string, jdText: string }} input
 * @returns {Object} the full analysis result (also saved to history)
 */
export function runAnalysis({ company, role, jdText }) {
  const extracted = extractSkills(jdText);

  const readinessScore = calculateReadinessScore({
    categoryCount: extracted.categoryCount,
    company,
    role,
    jdText,
  });

  const checklist = generateChecklist(extracted.flat, extracted.categories);
  const plan = generatePlan(extracted.flat, extracted.categories);
  const questions = generateQuestions(extracted.flat);

  const entry = saveEntry({
    company: company.trim(),
    role: role.trim(),
    jdText,
    extractedSkills: extracted.categories,
    plan,
    checklist,
    questions,
    readinessScore,
  });

  return entry;
}
