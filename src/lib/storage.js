/* ============================================================
   localStorage Persistence Layer for Analysis History
   ============================================================ */

const STORAGE_KEY = 'placement-readiness-history';

function writeHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Get all history entries.
 * @returns {Array}
 */
export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Save a new analysis entry to history.
 * @param {Object} entry
 * @returns {Object} the saved entry with id and createdAt
 */
export function saveEntry(entry) {
  const history = getHistory();
  const saved = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
    ...entry,
  };
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

  const updated = {
    ...history[index],
    ...updates,
  };
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
