const ENTERPRISE_COMPANIES = new Set([
  'amazon',
  'google',
  'microsoft',
  'meta',
  'apple',
  'infosys',
  'tcs',
  'tata consultancy services',
  'wipro',
  'cognizant',
  'capgemini',
  'accenture',
  'ibm',
  'oracle',
  'adobe',
  'hcl',
  'hcltech',
  'tech mahindra',
  'deloitte',
]);

function normalizeCompanyName(company) {
  return (company || '').trim().toLowerCase();
}

export function inferCompanyIntel({ company, role, jdText }) {
  const normalizedCompany = normalizeCompanyName(company);
  const contextText = `${company || ''} ${role || ''} ${jdText || ''}`.toLowerCase();

  const isEnterprise = ENTERPRISE_COMPANIES.has(normalizedCompany);
  const sizeCategory = isEnterprise ? 'Enterprise (2000+)' : 'Startup (<200)';

  let industry = 'Technology Services';
  if (/\b(bank|banking|fintech|payments|insurance)\b/.test(contextText)) {
    industry = 'Financial Services';
  } else if (/\b(health|healthcare|medical|pharma)\b/.test(contextText)) {
    industry = 'Healthcare';
  } else if (/\b(ecommerce|e-commerce|retail|marketplace)\b/.test(contextText)) {
    industry = 'E-commerce';
  } else if (/\b(edtech|education|learning)\b/.test(contextText)) {
    industry = 'Education Technology';
  } else if (/\b(saas|cloud|software platform)\b/.test(contextText)) {
    industry = 'Software';
  }

  let typicalHiringFocus = 'Practical problem solving with strong stack depth and ownership in real project scenarios.';
  if (sizeCategory.startsWith('Enterprise')) {
    typicalHiringFocus = 'Structured DSA rounds with strong emphasis on core fundamentals and communication clarity.';
  } else if (sizeCategory.startsWith('Mid-size')) {
    typicalHiringFocus = 'Balanced focus on coding fundamentals, project relevance, and execution speed.';
  }

  return {
    companyName: company || 'N/A',
    industry,
    sizeCategory,
    typicalHiringFocus,
    modeNote: 'Demo Mode: Company intel generated heuristically.',
  };
}

export function generateRoundMapping({ companyIntel, skillsFlat = [], extractedSkills = {} }) {
  const skills = skillsFlat.map((skill) => String(skill).toLowerCase());
  const hasDSA = skills.includes('dsa') || skills.includes('algorithms') || Boolean(extractedSkills['Core CS']) || Boolean(extractedSkills.coreCS);
  const hasWebStack = ['react', 'next.js', 'node.js', 'express', 'graphql', 'rest'].some((s) => skills.includes(s));
  const hasCore = Boolean(extractedSkills['Core CS']) || Boolean(extractedSkills.coreCS);
  const hasData = Boolean(extractedSkills['Data']) || Boolean(extractedSkills.data);

  if (companyIntel?.sizeCategory?.startsWith('Enterprise')) {
    return [
      {
        round: 'Round 1',
        title: hasDSA ? 'Online Test (DSA + Aptitude)' : 'Online Test (Aptitude + Basics)',
        why: 'This round quickly filters for baseline analytical ability and coding discipline at scale.',
      },
      {
        round: 'Round 2',
        title: hasCore ? 'Technical Interview (DSA + Core CS)' : 'Technical Interview (Problem Solving + Fundamentals)',
        why: 'Interviewers validate your reasoning depth across fundamentals and coding approach.',
      },
      {
        round: 'Round 3',
        title: hasWebStack || hasData ? 'Tech + Projects Deep Dive' : 'Technical Application Round',
        why: 'This round checks if you can apply concepts in practical project situations.',
      },
      {
        round: 'Round 4',
        title: 'Managerial / HR',
        why: 'Final fit check for role expectations, communication, and long-term alignment.',
      },
    ];
  }

  if (companyIntel?.sizeCategory?.startsWith('Mid-size')) {
    return [
      {
        round: 'Round 1',
        title: 'Online Assessment (Coding + Basics)',
        why: 'Screens practical coding readiness and core fundamentals in one pass.',
      },
      {
        round: 'Round 2',
        title: hasCore ? 'Technical Interview (Core + Problem Solving)' : 'Technical Interview (Implementation Focus)',
        why: 'Evaluates how well you translate fundamentals into workable solutions.',
      },
      {
        round: 'Round 3',
        title: 'Project and Stack Discussion',
        why: 'Confirms hands-on depth with your claimed tools and architecture decisions.',
      },
      {
        round: 'Round 4',
        title: 'HR / Behavioral',
        why: 'Assesses collaboration style, motivation, and team compatibility.',
      },
    ];
  }

  return [
    {
      round: 'Round 1',
      title: hasWebStack ? 'Practical Coding (Feature Build / Debug)' : 'Practical Coding (Problem Solving Task)',
      why: 'Startups prioritize immediate hands-on execution and clean implementation choices.',
    },
    {
      round: 'Round 2',
      title: hasData ? 'System Discussion (APIs + Data Decisions)' : 'System Discussion (Architecture + Trade-offs)',
      why: 'You are tested on design judgment, clarity of thought, and trade-off awareness.',
    },
    {
      round: 'Round 3',
      title: 'Culture Fit / Founder Round',
      why: 'Final round ensures ownership mindset, adaptability, and communication fit for small teams.',
    },
  ];
}
