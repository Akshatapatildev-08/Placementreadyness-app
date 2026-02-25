/* ============================================================
   Interview Questions Generator
   Generates 10 skill-specific interview questions.
   ============================================================ */

const QUESTION_BANK = {
  // Core CS
  'DSA': [
    'How would you optimize search in a sorted dataset?',
    'Explain the difference between BFS and DFS with use cases.',
    'What is the time complexity of quicksort in the average and worst case?',
  ],
  'Algorithms': [
    'Explain dynamic programming and give one real-world application.',
    'What is the difference between greedy and DP approaches?',
  ],
  'OOP': [
    'Explain the four pillars of OOP with examples.',
    'What is the difference between abstract classes and interfaces?',
  ],
  'DBMS': [
    'Explain normalization up to 3NF with an example.',
    'What are ACID properties and why do they matter?',
  ],
  'OS': [
    'Explain deadlock: conditions, prevention, and avoidance strategies.',
    'What is the difference between a process and a thread?',
  ],
  'Networks': [
    'Explain the difference between TCP and UDP.',
    'Walk through what happens when you type a URL in a browser.',
  ],

  // Languages
  'Java': [
    'Explain Java memory model: heap vs stack, garbage collection.',
    'What are the differences between HashMap and ConcurrentHashMap?',
  ],
  'Python': [
    'What are Python decorators and how do they work internally?',
    'Explain the GIL and its impact on multi-threaded Python code.',
  ],
  'JavaScript': [
    'Explain closures and provide a practical use case.',
    'What is the event loop and how does it handle async operations?',
  ],
  'TypeScript': [
    'What are generics in TypeScript and when would you use them?',
    'Explain the difference between type and interface.',
  ],
  'C++': [
    'Explain RAII and smart pointers in modern C++.',
    'What is the difference between stack and heap allocation in C++?',
  ],
  'Go': [
    'How do goroutines differ from OS threads?',
    'Explain channels in Go and their role in concurrency.',
  ],

  // Web
  'React': [
    'Explain state management options in React (useState, context, Redux).',
    'What is the virtual DOM and how does reconciliation work?',
    'Explain the useEffect hook lifecycle and cleanup pattern.',
  ],
  'Next.js': [
    'What are the differences between SSR, SSG, and ISR in Next.js?',
    'How does Next.js handle routing compared to React Router?',
  ],
  'Node.js': [
    'How does the Node.js event loop work?',
    'Explain middleware in Express and its execution order.',
  ],
  'Express': [
    'How would you handle errors globally in an Express application?',
  ],
  'REST': [
    'What makes an API truly RESTful? Explain the constraints.',
    'How would you version a REST API?',
  ],
  'GraphQL': [
    'What are the advantages of GraphQL over REST?',
    'Explain resolvers and schema definition in GraphQL.',
  ],

  // Data
  'SQL': [
    'Explain indexing and when it helps vs. hurts performance.',
    'What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?',
  ],
  'MongoDB': [
    'When would you choose MongoDB over a relational database?',
    'Explain aggregation pipelines in MongoDB.',
  ],
  'PostgreSQL': [
    'What are PostgreSQL-specific features you would use over MySQL?',
  ],
  'MySQL': [
    'Explain the InnoDB storage engine and its locking mechanisms.',
  ],
  'Redis': [
    'What data structures does Redis support and when would you use each?',
    'How would you implement a caching layer using Redis?',
  ],

  // Cloud/DevOps
  'AWS': [
    'Explain the difference between EC2, Lambda, and ECS.',
    'How would you design a highly available architecture on AWS?',
  ],
  'Docker': [
    'What is the difference between an image and a container?',
    'How would you optimize a Docker image for production?',
  ],
  'Kubernetes': [
    'Explain pods, services, and deployments in Kubernetes.',
  ],
  'CI/CD': [
    'Describe a CI/CD pipeline you have set up or worked with.',
  ],
  'Linux': [
    'Explain file permissions in Linux and how chmod works.',
  ],

  // Testing
  'Selenium': [
    'How do you handle dynamic elements in Selenium test automation?',
  ],
  'Cypress': [
    'What advantages does Cypress have over Selenium for frontend testing?',
  ],
  'Jest': [
    'How do you mock modules and functions in Jest?',
  ],
  'Testing': [
    'Explain the testing pyramid: unit, integration, and e2e tests.',
  ],
};

// Generic fallback questions
const GENERIC_QUESTIONS = [
  'Tell me about a project you are most proud of and why.',
  'How do you approach debugging a problem you have never seen before?',
  'Explain a technical concept to me as if I were non-technical.',
  'What is your approach to learning a new technology quickly?',
  'Describe a time you had to make a trade-off in a technical decision.',
  'How do you prioritize tasks when working on multiple things?',
  'What do you consider when designing a system from scratch?',
  'How do you handle code reviews — both giving and receiving feedback?',
  'Explain the importance of version control in a team environment.',
  'Where do you see yourself growing technically in the next 2 years?',
];

/**
 * Generate 10 interview questions based on detected skills.
 * @param {string[]} flatSkills
 * @returns {string[]}
 */
export function generateQuestions(flatSkills) {
  const questions = [];
  const used = new Set();

  // Collect skill-specific questions
  for (const skill of flatSkills) {
    const bank = QUESTION_BANK[skill];
    if (bank) {
      for (const q of bank) {
        if (!used.has(q)) {
          questions.push(q);
          used.add(q);
        }
      }
    }
  }

  // Fill remaining with generic questions
  for (const q of GENERIC_QUESTIONS) {
    if (questions.length >= 10) break;
    if (!used.has(q)) {
      questions.push(q);
      used.add(q);
    }
  }

  return questions.slice(0, 10);
}
