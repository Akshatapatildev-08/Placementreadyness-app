/* ============================================================
   7-Day Preparation Plan Generator
   ============================================================ */

/**
 * Generate a 7-day preparation plan adapted to detected skills.
 * @param {string[]} flatSkills
 * @param {Object} categories
 * @returns {Array<{day: string, title: string, tasks: string[]}>}
 */
export function generatePlan(flatSkills, categories) {
  const has = (s) => flatSkills.some((sk) => sk.toLowerCase().includes(s.toLowerCase()));
  const hasCat = (c) => !!categories[c];

  // Day 1-2: Basics + Core CS
  const day1 = {
    day: 'Day 1',
    title: 'Fundamentals & Core CS',
    tasks: [
      'Revise OOP principles: inheritance, polymorphism, abstraction, encapsulation',
      'Review OS basics: processes, threads, memory management',
      'Study DBMS: normalization (1NF–3NF), ACID properties, indexing',
    ],
  };
  if (hasCat('Languages')) {
    day1.tasks.push(`Review syntax and core concepts of ${categories['Languages'].slice(0, 2).join(' and ')}`);
  } else {
    day1.tasks.push('Pick one language and review its core syntax and standard library');
  }

  const day2 = {
    day: 'Day 2',
    title: 'Networking & Aptitude',
    tasks: [
      'Study networking: OSI model, TCP vs UDP, HTTP methods, REST principles',
      'Practice 30 aptitude questions (quant + logical reasoning)',
      'Review SQL: SELECT, JOINs, GROUP BY, HAVING, subqueries',
    ],
  };
  if (has('SQL') || has('MySQL') || has('PostgreSQL')) {
    day2.tasks.push('Write 10 SQL queries from scratch covering aggregation and joins');
  }

  // Day 3-4: DSA + coding practice
  const day3 = {
    day: 'Day 3',
    title: 'DSA — Arrays, Strings & Hashing',
    tasks: [
      'Solve 5 array problems: two sum, sliding window, prefix sum',
      'Solve 3 string problems: anagram check, longest substring, palindrome',
      'Review hash map patterns and collision handling',
      'Practice time and space complexity analysis',
    ],
  };

  const day4 = {
    day: 'Day 4',
    title: 'DSA — Trees, Graphs & DP',
    tasks: [
      'Solve 3 tree problems: traversals, LCA, BST validation',
      'Solve 2 graph problems: BFS, DFS, shortest path',
      'Solve 2 dynamic programming problems: knapsack, LCS pattern',
      'Revise recursion and backtracking templates',
    ],
  };

  // Day 5: Project + resume alignment
  const day5 = {
    day: 'Day 5',
    title: 'Projects & Resume Alignment',
    tasks: [
      'Prepare a crisp 2-minute walkthrough for each project',
      'Identify 3 technical challenges you solved and how',
      'Align resume bullet points with the job description keywords',
      'Prepare to explain your architecture decisions and trade-offs',
    ],
  };
  if (hasCat('Web')) {
    day5.tasks.push('Review your frontend/backend project stack and be ready to deep-dive');
    if (has('React')) day5.tasks.push('Prepare: hooks, context API, component lifecycle, virtual DOM diffing');
    if (has('Node')) day5.tasks.push('Prepare: Express middleware, event loop, async/await patterns');
  }
  if (hasCat('Cloud/DevOps')) {
    day5.tasks.push(`Review deployment: ${categories['Cloud/DevOps'].join(', ')} workflows`);
  }

  // Day 6: Mock interview questions
  const day6 = {
    day: 'Day 6',
    title: 'Mock Interview Practice',
    tasks: [
      'Do a 45-min timed DSA mock (2 medium problems)',
      'Practice explaining your solution approach out loud',
      'Answer 5 behavioral questions using the STAR method',
      'Conduct a mock HR round with a friend or record yourself',
    ],
  };
  if (hasCat('Testing')) {
    day6.tasks.push('Prepare to discuss your testing approach and tools used');
  }

  // Day 7: Revision + weak areas
  const day7 = {
    day: 'Day 7',
    title: 'Revision & Weak Areas',
    tasks: [
      'Review all problems you got wrong or struggled with',
      'Re-read your project summaries and key talking points',
      'Do one final timed aptitude test',
      'Ensure your resume PDF is updated and error-free',
      'Prepare your laptop/environment for any online assessment',
      'Get proper rest — no last-minute cramming',
    ],
  };

  return [day1, day2, day3, day4, day5, day6, day7];
}
