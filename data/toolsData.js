export const CATEGORIES = {
  academic: {
    id: 'academic',
    name: 'Academic Calculators',
    description: 'Accurate, instant calculators for grades, attendance, marks, and GPA.',
    path: '/calculators',
    icon: 'GraduationCap',
    badgeColor: 'blue',
  },
  productivity: {
    id: 'productivity',
    name: 'Study & Productivity',
    description: 'Planners, timers, and trackers to keep your study sessions focused and organized.',
    path: '/productivity',
    icon: 'Clock',
    badgeColor: 'indigo',
  },
};

export const TOOLS = [
  // --- Academic Calculators ---
  {
    id: 'attendance',
    title: 'Attendance Calculator',
    shortDescription: 'Calculate attendance percentage and check if you meet the minimum required threshold.',
    category: 'academic',
    path: '/calculators/attendance',
    icon: 'Calendar',
    badge: 'Popular',
    featured: true,
    keywords: ['attendance percentage', 'college attendance', 'bunk calculator', 'minimum attendance'],
  },
  {
    id: 'attendance-shortage',
    title: 'Attendance Shortage Calculator',
    shortDescription: 'Find out how many consecutive classes you need to attend (or can afford to miss) to hit your target.',
    category: 'academic',
    path: '/calculators/attendance-shortage',
    icon: 'AlertTriangle',
    badge: 'Essential',
    featured: true,
    keywords: ['attendance shortage', 'how many classes to attend', 'safe bunks', 'target attendance'],
  },
  {
    id: 'cgpa',
    title: 'CGPA Calculator',
    shortDescription: 'Calculate your cumulative GPA across all semesters with weighted credits.',
    category: 'academic',
    path: '/calculators/cgpa',
    icon: 'Award',
    badge: 'Popular',
    featured: true,
    keywords: ['cgpa calculator', 'cumulative gpa', 'college cgpa', 'university grades'],
  },
  {
    id: 'gpa',
    title: 'GPA Calculator',
    shortDescription: 'Calculate your semester GPA from course grades, letter grades, and credit hours.',
    category: 'academic',
    path: '/calculators/gpa',
    icon: 'GraduationCap',
    badge: 'Popular',
    featured: true,
    keywords: ['semester gpa', 'gpa calculator', 'credit hours', 'grade point average'],
  },
  {
    id: 'percentage',
    title: 'Percentage Calculator',
    shortDescription: 'Calculate marks percentage, percentage change, and fractional scores with ease.',
    category: 'academic',
    path: '/calculators/percentage',
    icon: 'Percent',
    badge: null,
    featured: false,
    keywords: ['marks percentage', 'calculate percentage', 'percentage increase', 'exam score percentage'],
  },
  {
    id: 'marks',
    title: 'Marks Calculator',
    shortDescription: 'Sum up multiple subject marks, compute aggregate scores, and find your overall percentage.',
    category: 'academic',
    path: '/calculators/marks',
    icon: 'FileText',
    badge: null,
    featured: false,
    keywords: ['marks calculator', 'total marks', 'subject aggregate', 'board marks'],
  },
  {
    id: 'grade',
    title: 'Grade Calculator',
    shortDescription: 'Convert marks or percentages into letter grades using standard 10-point, 4-point, or custom scales.',
    category: 'academic',
    path: '/calculators/grade',
    icon: 'Medal',
    badge: null,
    featured: false,
    keywords: ['grade calculator', 'letter grade', 'percentage to grade', 'grading scale'],
  },
  {
    id: 'semester-gpa',
    title: 'Semester GPA Calculator',
    shortDescription: 'Compute your weighted SGPA with customizable credit systems and letter grade mappings.',
    category: 'academic',
    path: '/calculators/semester-gpa',
    icon: 'Layers',
    badge: null,
    featured: false,
    keywords: ['sgpa calculator', 'semester grade point', 'college sgpa', 'credit point calculator'],
  },
  {
    id: 'backlog',
    title: 'Backlog Calculator',
    shortDescription: 'Understand the impact of backlogs or cleared subjects on your current and target CGPA.',
    category: 'academic',
    path: '/calculators/backlog',
    icon: 'RefreshCw',
    badge: null,
    featured: false,
    keywords: ['backlog impact', 'clear arrears', 'reappear exam gpa', 'backlog cgpa recovery'],
  },
  {
    id: 'college-fee',
    title: 'College Fee Calculator',
    shortDescription: 'Estimate total educational expenses including tuition, hostel, transport, and semester fees.',
    category: 'academic',
    path: '/calculators/college-fee',
    icon: 'Wallet',
    badge: null,
    featured: false,
    keywords: ['college fee estimate', 'semester fee calculator', 'hostel fee', 'total degree cost'],
  },

  // --- Study & Productivity Tools ---
  {
    id: 'student-dashboard',
    title: 'Student Dashboard',
    shortDescription: 'Customizable startup page with digital & analog clocks, study task manager, and quick website shortcuts.',
    category: 'productivity',
    path: '/student-dashboard',
    icon: 'LayoutDashboard',
    badge: 'Popular',
    featured: true,
    keywords: ['student dashboard', 'browser start page', 'new tab dashboard', 'study desk', 'student shortcuts'],
  },
  {
    id: 'study-planner',
    title: 'Study Planner',
    shortDescription: 'Create, organize, and track daily study tasks, subject priorities, and deadlines locally.',
    category: 'productivity',
    path: '/productivity/study-planner',
    icon: 'ListChecks',
    badge: 'Interactive',
    featured: true,
    keywords: ['study planner', 'daily study schedule', 'task tracker', 'exam prep planner'],
  },
  {
    id: 'exam-countdown',
    title: 'Exam Countdown',
    shortDescription: 'Live countdown timers for upcoming midterms, finals, and standardized tests.',
    category: 'productivity',
    path: '/productivity/exam-countdown',
    icon: 'AlarmClock',
    badge: 'Popular',
    featured: true,
    keywords: ['exam countdown', 'days left for exam', 'finals countdown timer', 'study timer'],
  },
  {
    id: 'assignment-deadline',
    title: 'Assignment Deadline Calculator',
    shortDescription: 'Calculate exact time remaining and get visual urgency levels for pending assignments.',
    category: 'productivity',
    path: '/productivity/assignment-deadline',
    icon: 'Hourglass',
    badge: null,
    featured: false,
    keywords: ['assignment deadline', 'homework countdown', 'due date calculator', 'urgency tracker'],
  },
  {
    id: 'study-hours',
    title: 'Study Hours Calculator',
    shortDescription: 'Plan and distribute your available weekly study hours evenly across all your subjects.',
    category: 'productivity',
    path: '/productivity/study-hours',
    icon: 'Clock',
    badge: null,
    featured: false,
    keywords: ['study hours calculator', 'weekly study schedule', 'hours per subject', 'study time allocation'],
  },
  {
    id: 'pomodoro',
    title: 'Pomodoro Timer',
    shortDescription: 'Customizable 25/5/15 Pomodoro focus timer with auto-cycles and browser notifications.',
    category: 'productivity',
    path: '/productivity/pomodoro',
    icon: 'Timer',
    badge: 'Interactive',
    featured: true,
    keywords: ['pomodoro timer', 'focus timer', 'study interval', 'productivity clock'],
  },
];

export function getToolById(id) {
  return TOOLS.find((tool) => tool.id === id) || null;
}

export function getToolsByCategory(categoryId) {
  return TOOLS.filter((tool) => tool.category === categoryId);
}

export function getFeaturedTools() {
  return TOOLS.filter((tool) => tool.featured);
}

export function getRelatedTools(currentToolId, limit = 3) {
  const current = getToolById(currentToolId);
  if (!current) return TOOLS.slice(0, limit);

  // Return tools from same category first, excluding current
  const sameCategory = TOOLS.filter(
    (tool) => tool.category === current.category && tool.id !== currentToolId
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Backfill with other tools
  const otherCategory = TOOLS.filter(
    (tool) => tool.category !== current.category && tool.id !== currentToolId
  );
  return [...sameCategory, ...otherCategory].slice(0, limit);
}
