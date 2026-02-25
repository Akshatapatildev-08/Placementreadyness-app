/* ============================================================
   Skill Extraction Engine
   Detects keywords from JD text across 6 categories.
   ============================================================ */

const SKILL_MAP = {
  'Core CS': ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating system', 'networks', 'computer networks', 'networking'],
  'Languages': ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go lang'],
  'Web': ['react', 'reactjs', 'react.js', 'next.js', 'nextjs', 'node.js', 'nodejs', 'node', 'express', 'expressjs', 'rest', 'restful', 'graphql'],
  'Data': ['sql', 'mongodb', 'mongo', 'postgresql', 'postgres', 'mysql', 'redis'],
  'Cloud/DevOps': ['aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'cicd', 'ci cd', 'linux'],
  'Testing': ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'testing'],
};

// Normalize display names for matched keywords
const DISPLAY_NAMES = {
  'dsa': 'DSA', 'data structures': 'DSA', 'algorithms': 'Algorithms',
  'oop': 'OOP', 'object oriented': 'OOP',
  'dbms': 'DBMS', 'database management': 'DBMS',
  'os': 'OS', 'operating system': 'OS',
  'networks': 'Networks', 'computer networks': 'Networks', 'networking': 'Networks',
  'java': 'Java', 'python': 'Python',
  'javascript': 'JavaScript', 'typescript': 'TypeScript',
  'c++': 'C++', 'c#': 'C#', 'golang': 'Go', 'go lang': 'Go',
  'react': 'React', 'reactjs': 'React', 'react.js': 'React',
  'next.js': 'Next.js', 'nextjs': 'Next.js',
  'node.js': 'Node.js', 'nodejs': 'Node.js', 'node': 'Node.js',
  'express': 'Express', 'expressjs': 'Express',
  'rest': 'REST', 'restful': 'REST', 'graphql': 'GraphQL',
  'sql': 'SQL', 'mongodb': 'MongoDB', 'mongo': 'MongoDB',
  'postgresql': 'PostgreSQL', 'postgres': 'PostgreSQL',
  'mysql': 'MySQL', 'redis': 'Redis',
  'aws': 'AWS', 'amazon web services': 'AWS',
  'azure': 'Azure', 'gcp': 'GCP', 'google cloud': 'GCP',
  'docker': 'Docker', 'kubernetes': 'Kubernetes', 'k8s': 'Kubernetes',
  'ci/cd': 'CI/CD', 'cicd': 'CI/CD', 'ci cd': 'CI/CD', 'linux': 'Linux',
  'selenium': 'Selenium', 'cypress': 'Cypress', 'playwright': 'Playwright',
  'junit': 'JUnit', 'pytest': 'PyTest', 'jest': 'Jest', 'testing': 'Testing',
};

/**
 * Extract skills from JD text.
 * @param {string} jdText - The job description text
 * @returns {Object} - { categories: { [category]: string[] }, flat: string[], categoryCount: number }
 */
export function extractSkills(jdText) {
  const text = jdText.toLowerCase();
  const categories = {};

  for (const [category, keywords] of Object.entries(SKILL_MAP)) {
    const found = new Set();
    for (const kw of keywords) {
      // Use word boundary matching for short keywords, substring for multi-word
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = kw.length <= 3
        ? new RegExp(`\\b${escaped}\\b`, 'i')
        : new RegExp(escaped, 'i');

      if (regex.test(text)) {
        found.add(DISPLAY_NAMES[kw] || kw);
      }
    }
    if (found.size > 0) {
      categories[category] = [...found];
    }
  }

  const categoryCount = Object.keys(categories).length;
  const flat = Object.values(categories).flat();

  // If nothing detected, return general fresher stack
  if (flat.length === 0) {
    return {
      categories: { 'General': ['General fresher stack'] },
      flat: ['General fresher stack'],
      categoryCount: 0,
      isEmpty: true,
    };
  }

  return { categories, flat, categoryCount, isEmpty: false };
}
