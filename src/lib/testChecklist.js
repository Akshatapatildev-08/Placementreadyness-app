const TEST_CHECKLIST_KEY = 'placement-readiness-test-checklist';

export const TEST_ITEMS = [
  {
    id: 'jd_required_validation',
    label: 'JD required validation works',
    hint: 'Try submitting empty JD on Assessments page.',
  },
  {
    id: 'short_jd_warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Type a short JD and verify warning message appears.',
  },
  {
    id: 'skill_extraction_groups',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze JD with React, SQL, AWS and confirm grouped skills.',
  },
  {
    id: 'round_mapping_dynamic',
    label: 'Round mapping changes based on company + skills',
    hint: 'Compare Amazon + DSA vs unknown startup + React JD.',
  },
  {
    id: 'score_deterministic',
    label: 'Score calculation is deterministic',
    hint: 'Re-run same JD and compare base/final score pattern.',
  },
  {
    id: 'skill_toggle_live',
    label: 'Skill toggles update score live',
    hint: 'Toggle I know this/Need practice and watch score ring.',
  },
  {
    id: 'persist_after_refresh',
    label: 'Changes persist after refresh',
    hint: 'Refresh resources page and verify toggles + score remain.',
  },
  {
    id: 'history_save_load',
    label: 'History saves and loads correctly',
    hint: 'Analyze multiple JDs and reopen entries from Practice page.',
  },
  {
    id: 'export_content',
    label: 'Export buttons copy the correct content',
    hint: 'Use copy actions and paste into a text editor.',
  },
  {
    id: 'no_console_errors',
    label: 'No console errors on core pages',
    hint: 'Open browser console and navigate dashboard/assessments/resources.',
  },
];

function buildDefaultChecklist() {
  const map = {};
  for (const item of TEST_ITEMS) {
    map[item.id] = false;
  }
  return map;
}

function normalizeChecklist(raw) {
  const defaults = buildDefaultChecklist();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return defaults;

  const normalized = { ...defaults };
  for (const item of TEST_ITEMS) {
    normalized[item.id] = raw[item.id] === true;
  }
  return normalized;
}

function writeChecklist(value) {
  localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(value));
}

export function getTestChecklist() {
  try {
    const raw = localStorage.getItem(TEST_CHECKLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const normalized = normalizeChecklist(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      writeChecklist(normalized);
    }
    return normalized;
  } catch {
    const defaults = buildDefaultChecklist();
    writeChecklist(defaults);
    return defaults;
  }
}

export function updateTestChecklistItem(id, checked) {
  const checklist = getTestChecklist();
  if (!(id in checklist)) return checklist;
  checklist[id] = checked === true;
  writeChecklist(checklist);
  return checklist;
}

export function resetTestChecklist() {
  const defaults = buildDefaultChecklist();
  writeChecklist(defaults);
  return defaults;
}

export function getChecklistStats(checklist = getTestChecklist()) {
  const total = TEST_ITEMS.length;
  const passed = Object.values(checklist).filter(Boolean).length;
  return { passed, total, allPassed: passed === total };
}
