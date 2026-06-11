export type BlogGenerationTopic = {
  topic: string;
  angle: string;
  category: string;
  keywords: string[];
};

export const blogGenerationTopics: BlogGenerationTopic[] = [
  {
    topic: 'Identity verification before the background check',
    angle: 'Explain why employers need to know who they are screening before relying on background check results.',
    category: 'Hiring Risk',
    keywords: ['identity verification', 'background check', 'remote hiring', 'applicant fraud'],
  },
  {
    topic: 'County criminal checks vs national database searches',
    angle: 'Show why national database searches are useful but not enough for many hiring decisions.',
    category: 'Criminal Background Checks',
    keywords: ['county criminal check', 'national criminal database', 'employment screening'],
  },
  {
    topic: 'Background screening for small businesses',
    angle: 'Help small businesses understand how to screen without setup fees, minimums, or overbuilt packages.',
    category: 'Small Business Screening',
    keywords: ['small business background checks', 'hiring risk', 'employee screening'],
  },
  {
    topic: 'Volunteer background checks for churches and nonprofits',
    angle: 'Explain how volunteer screening protects trust, safety, and vulnerable populations.',
    category: 'Volunteer Screening',
    keywords: ['volunteer background checks', 'church background screening', 'nonprofit screening'],
  },
  {
    topic: 'Healthcare OIG exclusion screening',
    angle: 'Explain why healthcare employers should review sanctions, exclusions, and license-related risks.',
    category: 'Healthcare Compliance',
    keywords: ['OIG exclusion check', 'healthcare sanctions', 'healthcare background checks'],
  },
  {
    topic: 'MVR checks for employees who drive',
    angle: 'Explain why driving records matter even when driving is only part of the job.',
    category: 'Transportation Screening',
    keywords: ['MVR checks', 'driving records', 'employee drivers'],
  },
  {
    topic: 'AI-powered resume fraud and employment verification',
    angle: 'Connect AI-assisted resumes to the need for employment and education verification.',
    category: 'Hiring Risk',
    keywords: ['AI resume fraud', 'employment verification', 'education verification'],
  },
  {
    topic: 'Background check delays and how employers can reduce them',
    angle: 'Explain practical ways employers can reduce delays without cutting corners.',
    category: 'Hiring Efficiency',
    keywords: ['background check delays', 'time to hire', 'screening turnaround'],
  },
  {
    topic: 'Role-based background screening packages',
    angle: 'Teach employers why every role does not need the same screening package.',
    category: 'Background Screening Strategy',
    keywords: ['screening packages', 'role-based screening', 'employment background checks'],
  },
  {
    topic: 'Background screening for staffing companies',
    angle: 'Explain why staffing firms need speed, consistency, client protection, and compliance-minded screening.',
    category: 'Staffing Screening',
    keywords: ['staffing background checks', 'temporary worker screening', 'client risk'],
  },
  {
    topic: 'Drug testing policy basics for employers',
    angle: 'Explain pre-employment, random, post-accident, and reasonable-suspicion drug testing in plain language.',
    category: 'Drug Screening',
    keywords: ['drug testing', 'pre-employment drug screening', 'employer drug policy'],
  },
  {
    topic: 'Education verification in modern hiring',
    angle: 'Explain why employers should verify degrees and credentials when a role depends on them.',
    category: 'Verification',
    keywords: ['education verification', 'degree verification', 'credential fraud'],
  },
];
