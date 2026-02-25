/* ============================================================
   Analysis Orchestrator — runs all generators and saves result
   ============================================================ */

import { extractSkills } from './skillExtractor';
import { calculateReadinessScore } from './readinessScore';
import { generateChecklist } from './checklistGenerator';
import { generatePlan } from './planGenerator';
import { generateQuestions } from './questionGenerator';
import { generateRoundMapping, inferCompanyIntel } from './companyIntel';
import { saveEntry } from './storage';

const DEFAULT_OTHER_SKILLS = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];

function toSchemaSkills(categories) {
  return {
    coreCS: categories['Core CS'] || [],
    languages: categories.Languages || [],
    web: categories.Web || [],
    data: categories.Data || [],
    cloud: categories['Cloud/DevOps'] || [],
    testing: categories.Testing || [],
    other: categories.General || [],
  };
}

function mapChecklistSchema(checklist) {
  return checklist.map((round) => ({
    roundTitle: round.round,
    items: round.items,
  }));
}

function mapPlanSchema(plan) {
  return plan.map((day) => ({
    day: day.day,
    focus: day.title,
    tasks: day.tasks,
  }));
}

function mapRoundMappingSchema(roundMapping) {
  return roundMapping.map((round) => ({
    roundTitle: round.round,
    focusAreas: round.title ? [round.title] : [],
    whyItMatters: round.why || '',
  }));
}

/**
 * Run full analysis on a JD input and persist to localStorage.
 * @param {{ company: string, role: string, jdText: string }} input
 * @returns {Object} the full analysis result (also saved to history)
 */
export function runAnalysis({ company, role, jdText }) {
  const extracted = extractSkills(jdText);
  const schemaSkills = toSchemaSkills(extracted.categories || {});
  const extractionIsEmpty =
    extracted.isEmpty ||
    extracted.flat.length === 0 ||
    (extracted.flat.length === 1 && extracted.flat[0] === 'General fresher stack');

  if (extractionIsEmpty) {
    schemaSkills.other = [];
  }

  const hasDetectedSkills = Object.values(schemaSkills).flat().length > 0;
  if (!hasDetectedSkills || extractionIsEmpty) {
    schemaSkills.other = [...DEFAULT_OTHER_SKILLS];
  }
  const skillsFlat = Object.values(schemaSkills).flat();

  const baseScore = calculateReadinessScore({
    categoryCount: extracted.categoryCount,
    company,
    role,
    jdText,
  });

  const generationFlat = !extractionIsEmpty && hasDetectedSkills ? extracted.flat : [...DEFAULT_OTHER_SKILLS];
  const checklist = mapChecklistSchema(generateChecklist(generationFlat, extracted.categories));
  const plan7Days = mapPlanSchema(generatePlan(generationFlat, extracted.categories));
  const questions = generateQuestions(generationFlat);
  const companyIntel = inferCompanyIntel({ company, role, jdText });
  const roundMapping = mapRoundMappingSchema(generateRoundMapping({
    companyIntel,
    skillsFlat: skillsFlat,
    extractedSkills: extracted.categories,
  }));

  const skillConfidenceMap = {};
  for (const skill of skillsFlat) {
    skillConfidenceMap[skill] = 'practice';
  }

  const entry = saveEntry({
    company: company.trim(),
    role: role.trim(),
    jdText,
    extractedSkills: schemaSkills,
    plan7Days,
    checklist,
    questions,
    baseScore,
    finalScore: Math.max(0, baseScore - skillsFlat.length * 2),
    skillConfidenceMap,
    companyIntel,
    roundMapping,
  });

  return entry;
}
