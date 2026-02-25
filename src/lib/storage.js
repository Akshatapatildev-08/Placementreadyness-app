/* ============================================================
   localStorage Persistence Layer for Analysis History
   ============================================================ */

const STORAGE_KEY = 'placement-readiness-history';
const EMPTY_EXTRACTED_SKILLS = {
  coreCS: [],
  languages: [],
  web: [],
  data: [],
  cloud: [],
  testing: [],
  other: [],
};
const DEFAULT_OTHER_SKILLS = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function toStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || '').trim())
    .filter(Boolean);
}

function normalizeExtractedSkills(raw) {
  const normalized = { ...EMPTY_EXTRACTED_SKILLS };

  if (isObject(raw)) {
    normalized.coreCS = toStringArray(raw.coreCS || raw['Core CS']);
    normalized.languages = toStringArray(raw.languages || raw.Languages);
    normalized.web = toStringArray(raw.web || raw.Web);
    normalized.data = toStringArray(raw.data || raw.Data);
    normalized.cloud = toStringArray(raw.cloud || raw['Cloud/DevOps']);
    normalized.testing = toStringArray(raw.testing || raw.Testing);
    normalized.other = toStringArray(raw.other || raw.General);
  }

  const totalSkills = Object.values(normalized).flat().length;
  if (totalSkills === 0) {
    normalized.other = [...DEFAULT_OTHER_SKILLS];
  }

  return normalized;
}

function normalizeRoundMapping(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item, index) => {
      if (!isObject(item)) return null;
      const roundTitle = String(item.roundTitle || item.round || `Round ${index + 1}`).trim();
      const focusAreas = toStringArray(item.focusAreas || (item.title ? [item.title] : []));
      const whyItMatters = String(item.whyItMatters || item.why || '').trim();
      if (!roundTitle) return null;
      return { roundTitle, focusAreas, whyItMatters };
    })
    .filter(Boolean);
}

function normalizeChecklist(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!isObject(item)) return null;
      const roundTitle = String(item.roundTitle || item.round || '').trim();
      const items = toStringArray(item.items);
      if (!roundTitle) return null;
      return { roundTitle, items };
    })
    .filter(Boolean);
}

function normalizePlan7Days(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item, index) => {
      if (!isObject(item)) return null;
      const day = String(item.day || `Day ${index + 1}`).trim();
      const focus = String(item.focus || item.title || '').trim();
      const tasks = toStringArray(item.tasks);
      if (!day || !focus) return null;
      return { day, focus, tasks };
    })
    .filter(Boolean);
}

function normalizeQuestions(raw) {
  return toStringArray(raw);
}

function clampScore(score) {
  const parsed = Number(score);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(100, Math.round(parsed)));
}

function normalizeSkillConfidenceMap(rawMap, extractedSkills) {
  const normalized = {};
  const allSkills = Object.values(extractedSkills).flat();
  const source = isObject(rawMap) ? rawMap : {};

  for (const skill of allSkills) {
    normalized[skill] = source[skill] === 'know' ? 'know' : 'practice';
  }
  return normalized;
}

function normalizeEntry(entry) {
  if (!isObject(entry)) return null;

  const id = String(entry.id || '').trim() || (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  const createdAt = String(entry.createdAt || '').trim() || new Date().toISOString();
  const extractedSkills = normalizeExtractedSkills(entry.extractedSkills);
  const baseScore = clampScore(entry.baseScore ?? entry.readinessScore ?? entry.finalScore);
  const skillConfidenceMap = normalizeSkillConfidenceMap(entry.skillConfidenceMap, extractedSkills);
  const confidenceDelta = Object.values(skillConfidenceMap).reduce((delta, value) => delta + (value === 'know' ? 2 : -2), 0);
  const inferredFinal = clampScore(baseScore + confidenceDelta);
  const finalScore = clampScore(entry.finalScore ?? entry.readinessScore ?? inferredFinal);

  return {
    id,
    createdAt,
    company: String(entry.company || '').trim(),
    role: String(entry.role || '').trim(),
    jdText: String(entry.jdText || ''),
    extractedSkills,
    roundMapping: normalizeRoundMapping(entry.roundMapping),
    checklist: normalizeChecklist(entry.checklist),
    plan7Days: normalizePlan7Days(entry.plan7Days || entry.plan),
    questions: normalizeQuestions(entry.questions),
    baseScore,
    skillConfidenceMap,
    finalScore,
    updatedAt: String(entry.updatedAt || createdAt),
    // Preserve optional extra metadata already used by UI.
    companyIntel: isObject(entry.companyIntel) ? entry.companyIntel : undefined,
  };
}

function normalizeHistoryEntries(parsed) {
  if (!Array.isArray(parsed)) {
    return { entries: [], hadCorruptedEntry: true };
  }

  const entries = [];
  let hadCorruptedEntry = false;
  for (const item of parsed) {
    const normalized = normalizeEntry(item);
    if (!normalized) {
      hadCorruptedEntry = true;
      continue;
    }
    entries.push(normalized);
  }
  return { entries, hadCorruptedEntry };
}

function writeHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Get all history entries.
 * @returns {Array}
 */
export function getHistory() {
  return getHistoryState().entries;
}

/**
 * Get normalized history and corruption state.
 * @returns {{entries: Array, hadCorruptedEntry: boolean}}
 */
export function getHistoryState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const normalized = normalizeHistoryEntries(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized.entries)) {
      writeHistory(normalized.entries);
    }
    return normalized;
  } catch {
    return { entries: [], hadCorruptedEntry: true };
  }
}

/**
 * Save a new analysis entry to history.
 * @param {Object} entry
 * @returns {Object} the saved entry with id and createdAt
 */
export function saveEntry(entry) {
  const history = getHistory();
  const saved = normalizeEntry({
    id: entry?.id,
    createdAt: entry?.createdAt || new Date().toISOString(),
    ...entry,
    updatedAt: new Date().toISOString(),
  });
  if (!saved) return null;
  history.unshift(saved);
  writeHistory(history);
  return saved;
}

/**
 * Get a single entry by id.
 * @param {string} id
 * @returns {Object|null}
 */
export function getEntryById(id) {
  const history = getHistory();
  return history.find((e) => e.id === id) || null;
}

/**
 * Update an entry by id.
 * @param {string} id
 * @param {Object} updates
 * @returns {Object|null}
 */
export function updateEntry(id, updates) {
  const history = getHistory();
  const index = history.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const candidate = {
    ...history[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  const updated = normalizeEntry(candidate);
  if (!updated) return null;
  history[index] = updated;
  writeHistory(history);
  return updated;
}

/**
 * Delete an entry by id.
 * @param {string} id
 */
export function deleteEntry(id) {
  const history = getHistory().filter((e) => e.id !== id);
  writeHistory(history);
}
