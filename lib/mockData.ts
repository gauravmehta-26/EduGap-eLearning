import { QuizQuestion, DashboardData, RemediationContent, SubjectId } from './types';

// Subject-specific quiz questions
export const quizQuestionsBySubject: Record<SubjectId, QuizQuestion[]> = {
  physics: [
    {
      id: 'physics_q1',
      subject: 'physics',
      question: 'What is the formula for electric force between two charges?',
      options: ['F = ma', 'F = kq₁q₂/r²', 'F = GMm/r²', 'F = qE'],
      correctAnswer: 1
    },
    {
      id: 'physics_q2',
      subject: 'physics',
      question: 'What is Newton\'s second law of motion?',
      options: ['F = ma', 'F = kx', 'F = GMm/r²', 'F = qvB'],
      correctAnswer: 0
    },
    {
      id: 'physics_q3',
      subject: 'physics',
      question: 'What is the speed of light in a vacuum?',
      options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'],
      correctAnswer: 0
    },
    {
      id: 'physics_q4',
      subject: 'physics',
      question: 'What is the unit of electric potential?',
      options: ['Ampere', 'Volt', 'Ohm', 'Watt'],
      correctAnswer: 1
    },
    {
      id: 'physics_q5',
      subject: 'physics',
      question: 'What is the first law of thermodynamics?',
      options: [
        'Energy cannot be created or destroyed',
        'Entropy always increases',
        'Heat flows from hot to cold',
        'Work equals force times distance'
      ],
      correctAnswer: 0
    }
  ],
  mathematics: [
    {
      id: 'math_q1',
      subject: 'mathematics',
      question: 'What is the derivative of x²?',
      options: ['x', '2x', 'x²', '2'],
      correctAnswer: 1
    },
    {
      id: 'math_q2',
      subject: 'mathematics',
      question: 'What is the quadratic formula?',
      options: [
        'x = -b ± √(b² - 4ac) / 2a',
        'x = b ± √(b² + 4ac) / 2a',
        'x = -b ± √(b² + 4ac) / a',
        'x = b ± √(b² - 4ac) / a'
      ],
      correctAnswer: 0
    },
    {
      id: 'math_q3',
      subject: 'mathematics',
      question: 'What is sin²θ + cos²θ equal to?',
      options: ['0', '1', 'tan²θ', 'sin(2θ)'],
      correctAnswer: 1
    },
    {
      id: 'math_q4',
      subject: 'mathematics',
      question: 'What is the area of a circle with radius r?',
      options: ['πr', 'πr²', '2πr', 'πr³'],
      correctAnswer: 1
    },
    {
      id: 'math_q5',
      subject: 'mathematics',
      question: 'What is the mean of the dataset: 2, 4, 6, 8, 10?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 1
    }
  ],
  chemistry: [
    {
      id: 'chem_q1',
      subject: 'chemistry',
      question: 'What is the pH of a neutral solution?',
      options: ['0', '7', '14', '1'],
      correctAnswer: 1
    },
    {
      id: 'chem_q2',
      subject: 'chemistry',
      question: 'What is the general formula for alkanes?',
      options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'],
      correctAnswer: 1
    },
    {
      id: 'chem_q3',
      subject: 'chemistry',
      question: 'What is Avogadro\'s number?',
      options: ['6.02 × 10²³', '6.02 × 10²²', '6.02 × 10²⁴', '6.02 × 10²¹'],
      correctAnswer: 0
    },
    {
      id: 'chem_q4',
      subject: 'chemistry',
      question: 'What type of bond involves the sharing of electrons?',
      options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
      correctAnswer: 1
    },
    {
      id: 'chem_q5',
      subject: 'chemistry',
      question: 'How many moles are in 22.4 L of gas at STP?',
      options: ['0.5 mol', '1 mol', '2 mol', '22.4 mol'],
      correctAnswer: 1
    }
  ],
  biology: [
    {
      id: 'bio_q1',
      subject: 'biology',
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
      correctAnswer: 2
    },
    {
      id: 'bio_q2',
      subject: 'biology',
      question: 'What is the basic unit of heredity?',
      options: ['Chromosome', 'Gene', 'DNA', 'Allele'],
      correctAnswer: 1
    },
    {
      id: 'bio_q3',
      subject: 'biology',
      question: 'What organelle is responsible for photosynthesis?',
      options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'],
      correctAnswer: 2
    },
    {
      id: 'bio_q4',
      subject: 'biology',
      question: 'What is the process by which organisms maintain stable internal conditions?',
      options: ['Evolution', 'Homeostasis', 'Metabolism', 'Respiration'],
      correctAnswer: 1
    },
    {
      id: 'bio_q5',
      subject: 'biology',
      question: 'What is a community of organisms and their physical environment called?',
      options: ['Population', 'Biome', 'Ecosystem', 'Habitat'],
      correctAnswer: 2
    }
  ]
};

// Legacy export for backward compatibility
export const quizQuestions: QuizQuestion[] = quizQuestionsBySubject.mathematics;

// Subject-specific weak concepts
export const weakConceptsBySubject: Record<SubjectId, import('./types').WeakConcept[]> = {
  physics: [
    { id: 'electrostatics', name: 'Electrostatics', riskPercentage: 85, subject: 'physics' },
    { id: 'mechanics', name: 'Mechanics', riskPercentage: 72, subject: 'physics' },
    { id: 'thermodynamics', name: 'Thermodynamics', riskPercentage: 65, subject: 'physics' }
  ],
  mathematics: [
    { id: 'calculus', name: 'Differential Calculus', riskPercentage: 78, subject: 'mathematics' },
    { id: 'trigonometry', name: 'Trigonometry', riskPercentage: 70, subject: 'mathematics' },
    { id: 'algebra', name: 'Algebra', riskPercentage: 62, subject: 'mathematics' }
  ],
  chemistry: [
    { id: 'organic', name: 'Organic Chemistry', riskPercentage: 80, subject: 'chemistry' },
    { id: 'acids-bases', name: 'Acids and Bases', riskPercentage: 68, subject: 'chemistry' },
    { id: 'stoichiometry', name: 'Stoichiometry', riskPercentage: 60, subject: 'chemistry' }
  ],
  biology: [
    { id: 'genetics', name: 'Genetics', riskPercentage: 75, subject: 'biology' },
    { id: 'cell-biology', name: 'Cell Biology', riskPercentage: 67, subject: 'biology' },
    { id: 'ecology', name: 'Ecology', riskPercentage: 58, subject: 'biology' }
  ]
};

// Subject-specific performance data (simulates quiz results for each subject)
export const subjectPerformanceBySubject: Record<SubjectId, { subject: string; score: number }[]> = {
  physics: [
    { subject: 'Electrostatics', score: 45 },
    { subject: 'Mechanics', score: 52 },
    { subject: 'Waves & Optics', score: 38 },
    { subject: 'Thermodynamics', score: 55 }
  ],
  mathematics: [
    { subject: 'Calculus', score: 48 },
    { subject: 'Algebra', score: 62 },
    { subject: 'Trigonometry', score: 55 },
    { subject: 'Geometry', score: 70 }
  ],
  chemistry: [
    { subject: 'Organic Chemistry', score: 42 },
    { subject: 'Inorganic Chemistry', score: 65 },
    { subject: 'Physical Chemistry', score: 58 },
    { subject: 'Acids & Bases', score: 68 }
  ],
  biology: [
    { subject: 'Genetics', score: 50 },
    { subject: 'Cell Biology', score: 67 },
    { subject: 'Ecology', score: 72 },
    { subject: 'Evolution', score: 60 }
  ]
};

// Legacy dashboard data (uses mathematics weak concepts for backward compatibility)
export const dashboardData: DashboardData = {
  examFailureRisk: 68,
  weakConcepts: weakConceptsBySubject.mathematics,
  subjectPerformance: [
    { subject: 'Physics', score: 45 },
    { subject: 'Mathematics', score: 52 },
    { subject: 'Chemistry', score: 68 },
    { subject: 'Biology', score: 72 }
  ]
};

// Subject-specific remediation content
export const remediationContentBySubject: Record<SubjectId, Record<string, RemediationContent>> = {
  physics: {
    electrostatics: {
      conceptId: 'electrostatics',
      conceptName: 'Electrostatics',
      subject: 'physics',
      explanation: 'Electrostatics is the study of electric charges at rest. The fundamental principle is Coulomb\'s Law, which states that the force between two point charges is directly proportional to the product of their charges and inversely proportional to the square of the distance between them: F = kq₁q₂/r², where k is Coulomb\'s constant (8.99 × 10⁹ N⋅m²/C²).',
      example: 'Consider two charges: q₁ = +5μC and q₂ = -3μC separated by 2cm. The force between them is F = (8.99 × 10⁹)(5 × 10⁻⁶)(-3 × 10⁻⁶)/(0.02)² = -337.125 N. The negative sign indicates attraction.',
      commonMistake: 'Students often forget that like charges repel and unlike charges attract. Also, remember to convert all units to SI units (meters, coulombs) before calculating.'
    },
    mechanics: {
      conceptId: 'mechanics',
      conceptName: 'Mechanics',
      subject: 'physics',
      explanation: 'Mechanics is the study of motion and forces. Newton\'s second law (F = ma) relates force, mass, and acceleration. This fundamental principle allows us to predict how objects will move under the influence of forces.',
      example: 'A 5 kg object experiences a net force of 20 N. Using F = ma: 20 = 5a, so a = 4 m/s². The object accelerates at 4 meters per second squared.',
      commonMistake: 'Students often confuse mass and weight. Mass is measured in kilograms and is constant, while weight is a force (measured in Newtons) that depends on gravity: W = mg.'
    },
    thermodynamics: {
      conceptId: 'thermodynamics',
      conceptName: 'Thermodynamics',
      subject: 'physics',
      explanation: 'Thermodynamics studies energy transfer and transformation. The first law states that energy cannot be created or destroyed, only converted from one form to another: ΔU = Q - W, where ΔU is change in internal energy, Q is heat added, and W is work done by the system.',
      example: 'If a gas absorbs 500 J of heat and does 200 J of work expanding, the change in internal energy is ΔU = 500 - 200 = 300 J.',
      commonMistake: 'Students often confuse the sign conventions. Heat added to the system is positive, work done by the system is positive. Be careful with the direction of energy transfer.'
    }
  },
  mathematics: {
    calculus: {
      conceptId: 'calculus',
      conceptName: 'Differential Calculus',
      subject: 'mathematics',
      explanation: 'Differential calculus focuses on rates of change. The derivative of a function represents the instantaneous rate of change. For power functions, use the power rule: d/dx(xⁿ) = nxⁿ⁻¹.',
      example: 'Find the derivative of f(x) = x². Using the power rule: f\'(x) = 2x²⁻¹ = 2x. This means the slope of the tangent line at any point x is 2x.',
      commonMistake: 'Students often forget to reduce the exponent by 1 after bringing it down as a coefficient. Remember: the exponent decreases by exactly 1.'
    },
    trigonometry: {
      conceptId: 'trigonometry',
      conceptName: 'Trigonometry',
      subject: 'mathematics',
      explanation: 'Trigonometry deals with relationships between angles and sides of triangles. The fundamental identity sin²θ + cos²θ = 1 is derived from the Pythagorean theorem and is essential for solving many problems.',
      example: 'If sin(θ) = 3/5, find cos(θ). Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1, so cos²θ = 1 - 9/25 = 16/25, therefore cos(θ) = ±4/5.',
      commonMistake: 'Don\'t forget that cosine can be positive or negative depending on the quadrant. Always check the angle range to determine the correct sign.'
    },
    algebra: {
      conceptId: 'algebra',
      conceptName: 'Algebra',
      subject: 'mathematics',
      explanation: 'Algebra involves manipulating equations and expressions using variables. The quadratic formula x = (-b ± √(b² - 4ac)) / 2a solves equations of the form ax² + bx + c = 0. The discriminant (b² - 4ac) determines the nature of solutions.',
      example: 'Solve 2x² + 5x - 3 = 0. Here a=2, b=5, c=-3. x = (-5 ± √(25 + 24)) / 4 = (-5 ± 7) / 4. So x = 1/2 or x = -3.',
      commonMistake: 'The most common error is forgetting the negative sign before b in the formula. It\'s -b, not b. Also, remember to divide by 2a, not just a.'
    }
  },
  chemistry: {
    organic: {
      conceptId: 'organic',
      conceptName: 'Organic Chemistry',
      subject: 'chemistry',
      explanation: 'Organic chemistry studies carbon-containing compounds. Alkanes are saturated hydrocarbons with the general formula CₙH₂ₙ₊₂. They contain only single bonds between carbon atoms and follow systematic naming conventions.',
      example: 'Methane (CH₄) is the simplest alkane with n=1. Ethane (C₂H₆) has n=2. Propane (C₃H₈) has n=3. Each follows the formula CₙH₂ₙ₊₂.',
      commonMistake: 'Students often confuse alkanes (CₙH₂ₙ₊₂) with alkenes (CₙH₂ₙ) and alkynes (CₙH₂ₙ₋₂). Remember: alkanes have only single bonds, alkenes have one double bond, alkynes have one triple bond.'
    },
    'acids-bases': {
      conceptId: 'acids-bases',
      conceptName: 'Acids and Bases',
      subject: 'chemistry',
      explanation: 'Acids and bases are characterized by pH, which measures hydrogen ion concentration. pH = -log[H⁺]. A neutral solution has pH 7, acids have pH < 7, and bases have pH > 7. Each unit change represents a 10-fold change in concentration.',
      example: 'A solution with [H⁺] = 1 × 10⁻³ M has pH = -log(10⁻³) = 3, making it acidic. A solution with pH 11 is basic with [H⁺] = 10⁻¹¹ M.',
      commonMistake: 'Students often forget that pH is a logarithmic scale. A change from pH 3 to pH 5 means the solution is 100 times less acidic, not just 2 units less acidic.'
    },
    stoichiometry: {
      conceptId: 'stoichiometry',
      conceptName: 'Stoichiometry',
      subject: 'chemistry',
      explanation: 'Stoichiometry involves calculating quantities in chemical reactions using mole ratios. At STP (Standard Temperature and Pressure), one mole of any gas occupies 22.4 L. Use Avogadro\'s number (6.02 × 10²³) to convert between moles and particles.',
      example: 'How many molecules are in 2 moles of H₂O? Using Avogadro\'s number: 2 mol × 6.02 × 10²³ molecules/mol = 1.204 × 10²⁴ molecules.',
      commonMistake: 'Students often forget to use the mole ratio from the balanced equation. Always balance the equation first, then use coefficients to determine mole ratios between reactants and products.'
    }
  },
  biology: {
    genetics: {
      conceptId: 'genetics',
      conceptName: 'Genetics',
      subject: 'biology',
      explanation: 'Genetics is the study of heredity and variation. Genes are the basic units of heredity, located on chromosomes. Alleles are different versions of a gene. Genotype refers to the genetic makeup (e.g., Aa), while phenotype refers to the observable characteristics.',
      example: 'In a Punnett square for Aa × Aa: 25% AA (homozygous dominant), 50% Aa (heterozygous), 25% aa (homozygous recessive). If A is dominant, 75% show the dominant phenotype.',
      commonMistake: 'Students often confuse genotype with phenotype. Genotype is the genetic code (letters like Aa), phenotype is what you observe (like brown eyes). Two different genotypes (AA and Aa) can have the same phenotype.'
    },
    'cell-biology': {
      conceptId: 'cell-biology',
      conceptName: 'Cell Biology',
      subject: 'biology',
      explanation: 'Cell biology studies the structure and function of cells. Mitochondria are the powerhouses of the cell, producing ATP through cellular respiration. Chloroplasts (in plant cells) perform photosynthesis. The nucleus contains genetic material and controls cell activities.',
      example: 'During cellular respiration, glucose (C₆H₁₂O₆) is broken down in mitochondria: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. This process releases energy stored in glucose bonds.',
      commonMistake: 'Students often confuse mitochondria and chloroplasts. Mitochondria are in all eukaryotic cells and perform cellular respiration. Chloroplasts are only in plant cells and perform photosynthesis. Both produce energy but through different processes.'
    },
    ecology: {
      conceptId: 'ecology',
      conceptName: 'Ecology',
      subject: 'biology',
      explanation: 'Ecology studies interactions between organisms and their environment. An ecosystem includes all living organisms (biotic factors) and non-living components (abiotic factors) in an area. Energy flows through ecosystems via food chains and food webs, while matter cycles.',
      example: 'In a forest ecosystem: producers (trees) capture solar energy, primary consumers (deer) eat plants, secondary consumers (wolves) eat deer, and decomposers (fungi) break down dead matter, returning nutrients to soil.',
      commonMistake: 'Students often confuse population, community, and ecosystem. A population is one species in an area, a community is all species in an area, and an ecosystem includes the community plus abiotic factors like water and soil.'
    }
  }
};

// Legacy export for backward compatibility (uses mathematics content)
export const remediationContent: Record<string, RemediationContent> = remediationContentBySubject.mathematics;
