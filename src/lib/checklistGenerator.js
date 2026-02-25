/* ============================================================
   Round-wise Preparation Checklist Generator
   ============================================================ */

/**
 * Generate a round-wise checklist based on extracted skills.
 * @param {string[]} flatSkills - flat array of detected skill names
 * @param {Object} categories - skill categories object
 * @returns {Array<{round: string, items: string[]}>}
 */
export function generateChecklist(flatSkills, categories) {
  const has = (s) => flatSkills.some((sk) => sk.toLowerCase().includes(s.toLowerCase()));
  const hasCat = (c) => !!categories[c];

  // Round 1: Aptitude / Basics
  const round1 = [
    'Revise quantitative aptitude (percentages, ratios, probability)',
    'Practice logical reasoning puzzles',
    'Review verbal ability and reading comprehension',
    'Brush up on basic math (permutations, combinations)',
    'Take 2 timed aptitude mock tests',
  ];
  if (hasCat('Languages')) {
    round1.push(`Review fundamentals of ${categories['Languages'].slice(0, 2).join(', ')}`);
  }
  if (hasCat('Core CS')) {
    round1.push('Revise core CS concepts: OS scheduling, DBMS normalization, networking layers');
  }

  // Round 2: DSA + Core CS
  const round2 = [
    'Solve 15 easy-level DSA problems (arrays, strings, hashmaps)',
    'Solve 10 medium-level DSA problems (trees, graphs, DP)',
    'Revise sorting algorithms and time complexity analysis',
    'Practice recursion and backtracking patterns',
    'Review stack, queue, and linked list operations',
  ];
  if (has('SQL') || has('DBMS')) {
    round2.push('Practice SQL queries: JOINs, subqueries, GROUP BY, indexing');
  }
  if (has('OS')) {
    round2.push('Revise OS concepts: deadlock, paging, process scheduling');
  }
  if (has('Networks')) {
    round2.push('Review networking: TCP/IP, HTTP/HTTPS, DNS resolution');
  }

  // Round 3: Tech Interview (projects + stack)
  const round3 = [
    'Prepare a 2-minute summary of your top 2 projects',
    'Be ready to explain architecture decisions in your projects',
    'Prepare for "walk me through your code" questions',
  ];
  if (hasCat('Web')) {
    round3.push(`Review ${categories['Web'].join(', ')} concepts and common patterns`);
    if (has('React')) round3.push('Prepare: React lifecycle, hooks, state management, virtual DOM');
    if (has('Node')) round3.push('Prepare: Node.js event loop, middleware, async patterns');
  }
  if (hasCat('Data')) {
    round3.push(`Review database design with ${categories['Data'].join(', ')}`);
  }
  if (hasCat('Cloud/DevOps')) {
    round3.push(`Review ${categories['Cloud/DevOps'].join(', ')} basics and deployment workflows`);
  }
  if (hasCat('Testing')) {
    round3.push(`Review testing practices with ${categories['Testing'].join(', ')}`);
  }
  if (round3.length < 6) {
    round3.push('Review system design basics: load balancing, caching, scaling');
    round3.push('Prepare to discuss trade-offs in your technology choices');
  }

  // Round 4: Managerial / HR
  const round4 = [
    'Prepare "Tell me about yourself" (structured: background, skills, goals)',
    'Prepare 3 STAR-format behavioral answers (leadership, conflict, failure)',
    'Research the company: products, culture, recent news',
    'Prepare thoughtful questions to ask the interviewer',
    'Practice salary and offer negotiation talking points',
    'Review your resume — be ready to justify every line',
    'Prepare a clear answer for "Why this company?"',
    'Practice body language and confident communication',
  ];

  return [
    { round: 'Round 1: Aptitude & Basics', items: round1 },
    { round: 'Round 2: DSA & Core CS', items: round2 },
    { round: 'Round 3: Technical Interview', items: round3 },
    { round: 'Round 4: Managerial & HR', items: round4 },
  ];
}
