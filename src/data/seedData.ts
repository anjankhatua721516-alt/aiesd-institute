import {
  SiteSettings,
  HomeHeroData,
  HomeSectionConfig,
  WhyChooseItem,
  CourseFeatureItem,
  Course,
  Batch,
  FacultyMember,
  Question,
  TestSettings,
  Testimonial,
  GalleryItem,
  FAQItem,
  Center,
  NavItem,
  AdminUser,
  SEOConfig
} from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'AIESD',
  fullForm: 'An Institute of Education & Skill Development',
  tagline: 'Empowering Aspirations Through Fluent English & Professional Skills',
  logoUrl: '',
  primaryPhone: '+91 98765 43210',
  alternatePhone: '+91 98765 43211',
  email: 'admissions@aiesd.in',
  whatsappNumber: '+919876543210',
  whatsappDefaultMessage: 'Hello AIESD Team, I would like to know more about the Spoken English course and batch timings.',
  whatsappGreetingText: 'Need help with spoken English or course admissions? Chat with our team right here!',
  showFloatingWhatsApp: true,
  showCourseFees: false,
  enableAnimations: true,
  maintenanceMode: false,
  socialLinks: {
    facebook: 'https://facebook.com/aiesdofficial',
    instagram: 'https://instagram.com/aiesd_spokenenglish',
    youtube: 'https://youtube.com/@aiesd_education',
    linkedin: 'https://linkedin.com/school/aiesd-india',
    telegram: 'https://t.me/aiesd_english_updates',
    whatsappChannel: 'https://chat.whatsapp.com/invite/aiesd-english-learning'
  }
};

export const DEFAULT_CENTERS: Center[] = [
  {
    id: 'center-midnapur',
    name: 'Midnapur Main Center',
    code: 'MID',
    address: 'Station Road, Near Central Bus Stand, Midnapur Town, Paschim Medinipur, West Bengal - 721101',
    landmark: 'Opposite State Bank Building',
    phone: '+91 98765 43210',
    alternatePhone: '+91 3222 255100',
    email: 'midnapur@aiesd.in',
    timings: 'Monday - Saturday: 7:30 AM to 7:00 PM | Sunday: 8:00 AM to 1:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118042.8256515867!2d87.26252277874983!3d22.42436402434224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d44111306385d%3A0x7d6f5198e3b7b257!2sMedinipur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://maps.google.com/?q=Midnapur+West+Bengal',
    isHeadOffice: true
  },
  {
    id: 'center-jhargram',
    name: 'Jhargram Branch',
    code: 'JHG',
    address: 'Court Road, Beside LIC Office, Jhargram, West Bengal - 721507',
    landmark: 'Near District Library',
    phone: '+91 98765 43212',
    email: 'jhargram@aiesd.in',
    timings: 'Monday - Saturday: 8:00 AM to 6:30 PM | Sunday: 9:00 AM to 12:30 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59045.698305081825!2d86.95353597444146!3d22.451368940562683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d821a1b181db7%3A0xe543fa92e6205cf3!2sJhargram%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://maps.google.com/?q=Jhargram+West+Bengal',
    isHeadOffice: false
  },
  {
    id: 'center-gidhni',
    name: 'Gidhni Skill Center',
    code: 'GDH',
    address: 'Station Market Complex, 1st Floor, Gidhni, Jhargram District, West Bengal - 721505',
    landmark: 'Above Rural Cooperative Society',
    phone: '+91 98765 43213',
    email: 'gidhni@aiesd.in',
    timings: 'Monday - Saturday: 8:30 AM to 6:00 PM | Sunday: Closed',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.074744319696!2d86.8118029!3d22.4842188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d9b3a3abfa791%3A0x6f91f37508492061!2sGidhni%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://maps.google.com/?q=Gidhni+Railway+Station',
    isHeadOffice: false
  }
];

export const DEFAULT_HERO_DATA: HomeHeroData = {
  quotes: [
    {
      id: 'q1',
      quote: "Speak English without fear. Fluency is not a privilege; it is a skill that opens doors to every career dream.",
      author: "Founder, AIESD",
      supportingLine: "Join over 8,500 students who transformed their hesitation into fluent, confident conversational English."
    },
    {
      id: 'q2',
      quote: "Your mother tongue is your identity, but English is your passport to the professional world.",
      author: "Academic Director",
      supportingLine: "Daily conversational drills, pronunciation training, and interactive debate circles designed for rapid fluency."
    },
    {
      id: 'q3',
      quote: "Stop translating in your mind. Start thinking, reacting, and speaking in English naturally.",
      author: "Master Trainer",
      supportingLine: "Customized step-by-step training tailored specifically for students and professionals in semi-urban Bengal."
    }
  ],
  activeQuoteIndex: 0,
  founderName: '[Founder Name]',
  founderDesignation: 'Founder & Head of English Pedagogy',
  founderDegrees: ['M.A. in English (Gold Medalist)', 'B.Ed.', 'Certified TESOL / ELT Professional'],
  founderExperienceYears: 18,
  founderPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
  heroImages: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
  ],
  achievementBadges: [
    'Trained 8,500+ Regional Students',
    '18+ Years Dedicated Classroom Experience',
    'Pioneer of Daily Spoken Activity Circles'
  ],
  stats: {
    studentsTrained: 8500,
    yearsOfExperience: 18,
    centersCount: 3,
    satisfactionRate: 98
  },
  ctaTextPrimary: 'Enquire for Next Batch',
  ctaTextWhatsApp: 'Chat with Admissions on WhatsApp',
  ctaTextCall: 'Call Helpline Directly'
};

export const DEFAULT_HOME_SECTIONS: HomeSectionConfig[] = [
  { id: 'sec-hero', key: 'hero', title: 'Hero & Founder Showcase', isVisible: true, order: 1 },
  { id: 'sec-why', key: 'why-choose', title: 'Why Choose AIESD', isVisible: true, order: 2 },
  { id: 'sec-courses', key: 'courses', title: 'Featured Courses (Spoken English First)', isVisible: true, order: 3 },
  { id: 'sec-faculty', key: 'faculty-preview', title: 'Faculty & Mentors Preview', isVisible: true, order: 4 },
  { id: 'sec-test', key: 'test-teaser', title: 'Free English Grammar Assessment Teaser', isVisible: true, order: 5 },
  { id: 'sec-testimonials', key: 'testimonials', title: 'Student Stories & Reviews', isVisible: true, order: 6 },
  { id: 'sec-features', key: 'course-features', title: 'What Every Course Includes', isVisible: true, order: 7 },
  { id: 'sec-gallery', key: 'gallery-preview', title: 'Campus & Classroom Moments', isVisible: true, order: 8 },
  { id: 'sec-about', key: 'about-preview', title: 'About AIESD Overview', isVisible: true, order: 9 },
  { id: 'sec-faq', key: 'faq', title: 'Frequently Asked Questions', isVisible: true, order: 10 },
  { id: 'sec-social', key: 'social-links', title: 'Connected Social Media Communities', isVisible: true, order: 11 },
  { id: 'sec-cta', key: 'cta-band', title: 'Final Admission Call to Action', isVisible: true, order: 12 }
];

export const DEFAULT_WHY_CHOOSE: WhyChooseItem[] = [
  {
    id: 'wc-1',
    title: 'Zero Mother Tongue Inhibition',
    description: 'We eliminate the fear of making mistakes through gentle, encouraging Bengali/Hindi-to-English transition methods.',
    iconName: 'Sparkles',
    order: 1
  },
  {
    id: 'wc-2',
    title: 'Daily Speaking & Extempore Circles',
    description: 'Every student gets 30+ minutes of spoken stage time every single class. No passive backbench sitting.',
    iconName: 'MessageSquare',
    order: 2
  },
  {
    id: 'wc-3',
    title: 'Small, Interactive Batch Sizes',
    description: 'Capped at 15 to 20 students per batch to guarantee individual attention, correction, and confidence nurturing.',
    iconName: 'Users',
    order: 3
  },
  {
    id: 'wc-4',
    title: 'Comprehensive Practical Grammar',
    description: 'Forget dry textbook rules; master intuitive grammar applied directly to everyday conversation and emails.',
    iconName: 'BookOpen',
    order: 4
  },
  {
    id: 'wc-5',
    title: 'Audio-Visual Listening Labs',
    description: 'Ear-training with standard pronunciation, neutral accent building, voice recording, and playback feedback.',
    iconName: 'Headphones',
    order: 5
  },
  {
    id: 'wc-6',
    title: 'Job Interview & Career Grooming',
    description: 'Resume curation, mock interview drills, corporate email writing, and telephone etiquette bundled together.',
    iconName: 'Briefcase',
    order: 6
  }
];

export const DEFAULT_COURSES: Course[] = [
  {
    id: 'course-spoken-english',
    slug: 'spoken-english-mastery',
    title: 'Spoken English & Communication Mastery',
    category: 'Spoken English',
    isFeatured: true,
    shortDescription: 'Our flagship transformation program: overcome hesitation, master conversational English, correct grammar, and build fluent spontaneous speaking.',
    fullOverview: 'The Spoken English & Communication Mastery program at AIESD is engineered from the ground up for students, job applicants, and working adults who understand English but hesitate when speaking. Through structured daily conversational sessions, vocabulary building, pronunciation drilling, and public speaking exercises, you will transition from translating thoughts in your native language to thinking and expressing fluently in English.',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    duration: '3 Months (Weekend & Weekday Tracks)',
    mode: 'offline',
    level: 'All Levels',
    batchTimings: 'Morning 7:30 AM - 9:00 AM | Evening 5:00 PM - 6:30 PM',
    fee: 4500,
    availableCenters: ['center-midnapur', 'center-jhargram', 'center-gidhni'],
    keyHighlights: [
      'Daily 30-minute extempore and peer conversation drills',
      'Neutral pronunciation, tongue training, and accent correction',
      'Comprehensive functional grammar (tenses, modals, sentence structures)',
      'Situational role-plays: shopping, banking, workplace, and social introductions',
      'Weekly stage speech sessions to conquer public stage fright',
      'Verifiable institute certificate upon completion'
    ],
    whoIsThisFor: [
      'College students aiming for campus recruitment and interviews',
      'Job seekers facing rejection due to English communication barriers',
      'Working professionals wanting to handle meetings and emails with poise',
      'Homemakers and parents seeking to support their children\'s education',
      'Anyone who can read English but struggles to speak without hesitation'
    ],
    learningOutcomes: [
      'Speak for 5 to 10 minutes continuously on any general topic without stumbling',
      'Eliminate recurrent grammatical blunders in tenses, prepositions, and agreement',
      'Build an active vocabulary of 500+ contemporary conversational words and phrases',
      'Compose clear, professional WhatsApp messages, formal letters, and corporate emails',
      'Confidently handle customer facing and professional telephone conversations'
    ],
    syllabus: [
      {
        id: 'mod-1',
        title: 'Module 1: Hesitation Breakdown & Daily Conversational Basics',
        duration: 'Weeks 1-3',
        topics: [
          'Breaking the psychological hesitation and mental translation barrier',
          'Greetings, self-introduction, and initiating informal dialogues',
          'Core sentence construction: Subject, Verb, Object dynamics',
          'Everyday conversational topics: Family, hobbies, neighborhood, daily routines'
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Practical Grammar for Spoken Fluency',
        duration: 'Weeks 4-6',
        topics: [
          'Tenses simplified for spontaneous speech (Past, Present, Continuous, Future)',
          'Modals of courtesy and permission (Can, Could, May, Would, Should)',
          'Eliminating common mother-tongue errors in prepositions and articles',
          'Asking polite questions and handling responses with confidence'
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Pronunciation, Vocabulary & Stage Presence',
        duration: 'Weeks 7-9',
        topics: [
          'Phonics basics, silent letters, and clear consonant enunciation',
          'High-frequency idiom and phrasal verb integration',
          'Body language, eye contact, and vocal modulation techniques',
          'Group discussions and friendly debate circles'
        ]
      },
      {
        id: 'mod-4',
        title: 'Module 4: Professional Communication & Final Assessment',
        duration: 'Weeks 10-12',
        topics: [
          'Professional telephone and email etiquette',
          'Handling tough queries, disagreement, and negotiation politely',
          'Individual graduation speech on stage',
          'Final spoken proficiency assessment and certificate presentation'
        ]
      }
    ],
    trainerName: '[Founder Name]',
    trainerRole: 'Master Trainer & Academic Director',
    isPublished: true,
    order: 1
  },
  {
    id: 'course-computer-basics',
    slug: 'computer-basics-ms-office',
    title: 'Computer Basics & MS Office Professional',
    category: 'Computer Basics',
    isFeatured: false,
    shortDescription: 'Master modern computing essentials, Windows 11 navigation, MS Word, Excel formulas, PowerPoint presentations, and secure internet utilities.',
    fullOverview: 'A comprehensive, practical laboratory course designed to make you completely computer-literate and productive. Learn document drafting in MS Word, data manipulation and formulas in MS Excel, engaging slide decks in MS PowerPoint, safe email correspondence, cloud storage navigation, and printing tools required in modern corporate and administrative workplaces.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    duration: '2.5 Months',
    mode: 'offline',
    level: 'Beginner',
    batchTimings: 'Morning 10:00 AM - 11:30 AM | Afternoon 3:30 PM - 5:00 PM',
    fee: 3200,
    availableCenters: ['center-midnapur', 'center-jhargram', 'center-gidhni'],
    keyHighlights: [
      '100% hands-on training with 1-to-1 computer workstation access',
      'In-depth MS Word formatting, tables, official letterheads, and mail merge',
      'MS Excel essential formulas: SUM, AVERAGE, IF, VLOOKUP, and sorting/filtering',
      'Professional PowerPoint animations and business presentation building',
      'Google Drive, Gmail attachment handling, and cyber safety hygiene',
      'Government/Private job oriented certificate'
    ],
    whoIsThisFor: [
      'High school and college students seeking administrative job eligibility',
      'Office clerks, school staff, and retail store operators needing digital skill',
      'Beginners with no prior computer background'
    ],
    learningOutcomes: [
      'Operate Windows computers independently with quick shortcut proficiencies',
      'Create formatted official circulars, biodata, invoices, and reports',
      'Manage office accounts, student registers, and inventory records in Excel',
      'Deliver visual presentations using PowerPoint'
    ],
    syllabus: [
      {
        id: 'c-mod-1',
        title: 'Module 1: Operating System & Hardware Basics',
        duration: 'Weeks 1-2',
        topics: ['Computer fundamentals, files and folders, keyboard shortcuts, printing and scanning']
      },
      {
        id: 'c-mod-2',
        title: 'Module 2: MS Word Comprehensive',
        duration: 'Weeks 3-5',
        topics: ['Text formatting, tables, headers, footers, page borders, official documentation']
      },
      {
        id: 'c-mod-3',
        title: 'Module 3: MS Excel for Business & Data',
        duration: 'Weeks 6-8',
        topics: ['Worksheets, math formulas, percentage calculations, VLOOKUP, pivot charts']
      },
      {
        id: 'c-mod-4',
        title: 'Module 4: MS PowerPoint & Internet Utilities',
        duration: 'Weeks 9-10',
        topics: ['Slide themes, transitions, animations, Gmail, Google Drive, online forms']
      }
    ],
    trainerName: 'Senior IT Instructor',
    trainerRole: 'Computer Science Faculty',
    isPublished: true,
    order: 2
  },
  {
    id: 'course-interview-training',
    slug: 'job-interview-training-bootcamp',
    title: 'Job Interview & Campus Placement Bootcamp',
    category: 'Interview Training',
    isFeatured: false,
    shortDescription: 'Crack competitive interviews with stellar resume craft, mock video drills, answer structuring, and aptitude group discussions.',
    fullOverview: 'Designed for graduates, diploma holders, and competitive aspirants preparing for private sector, banking, IT, and administrative recruitment drives. This intensive coaching covers resume modernization, answering standard and situational HR questions, group discussion tactics, body language alignment, and video-recorded mock interview panels with personalized critique.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    duration: '6 Weeks Fast-Track',
    mode: 'hybrid',
    level: 'Intermediate',
    batchTimings: 'Saturday & Sunday: 3:00 PM - 6:00 PM',
    fee: 3000,
    availableCenters: ['center-midnapur', 'center-jhargram'],
    keyHighlights: [
      'ATS-compliant modern resume and LinkedIn profile makeover',
      'Mastering "Tell me about yourself" and behavioral STAR technique',
      'Recorded 1-on-1 mock interviews with written feedback scorecards',
      'Group discussion simulation with live moderation strategy',
      'Salary negotiation and professional communication etiquette'
    ],
    whoIsThisFor: [
      'Final year students preparing for campus recruitment drives',
      'Professionals aiming for career switches and higher corporate salaries',
      'Candidates experiencing repeated interview round eliminations'
    ],
    learningOutcomes: [
      'Answer unpredictable interview questions with composure and structured clarity',
      'Present a crisp, professional ATS-ready resume',
      'Command respectful authority in group discussions'
    ],
    syllabus: [
      {
        id: 'i-mod-1',
        title: 'Module 1: Resume & Profile Engineering',
        duration: 'Weeks 1-2',
        topics: ['Keyword optimization, cover letters, LinkedIn optimization']
      },
      {
        id: 'i-mod-2',
        title: 'Module 2: HR & Behavioral Questions Mastery',
        duration: 'Weeks 3-4',
        topics: ['The STAR framework, handling salary queries, handling gap years with honesty']
      },
      {
        id: 'i-mod-3',
        title: 'Module 3: Video Mock Panels & GD Simulations',
        duration: 'Weeks 5-6',
        topics: ['Recorded mock interviews, body language audit, live GD rounds']
      }
    ],
    trainerName: 'HR Consultant & Placement Mentor',
    trainerRole: 'Corporate Placement Specialist',
    isPublished: true,
    order: 3
  },
  {
    id: 'course-personality-development',
    slug: 'personality-development-public-speaking',
    title: 'Personality Development & Public Speaking',
    category: 'Personality Development',
    isFeatured: false,
    shortDescription: 'Build magnetic executive presence, eliminate social anxiety, master body language, and articulate ideas with unwavering confidence.',
    fullOverview: 'Personality is the vehicle that delivers your talent to the world. This transformative program is crafted to cultivate social grace, public speaking poise, emotional intelligence, active listening, time management, and dignified personal grooming that leaves a lasting positive impression in both social and workplace encounters.',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    duration: '2 Months',
    mode: 'offline',
    level: 'All Levels',
    batchTimings: 'Weekend: 10:00 AM - 1:00 PM',
    fee: 3500,
    availableCenters: ['center-midnapur', 'center-jhargram'],
    keyHighlights: [
      'Overcoming stage phobia and public speech palpitations',
      'Mastering micro-expressions, posture, hand gestures, and voice projection',
      'Active listening and non-violent assertive communication',
      'Personal grooming, dress codes, and dinner/social etiquette',
      'Conflict resolution and collaborative teamwork exercises'
    ],
    whoIsThisFor: [
      'Individuals who feel introverted, shy, or invisible in social circles',
      'Emerging leaders, teachers, entrepreneurs, and team heads',
      'Anyone aspiring to build a memorable personal presence'
    ],
    learningOutcomes: [
      'Address groups of 50+ people without trembling or anxiety',
      'Demonstrate open, confident, and professional non-verbal body language',
      'Navigate social gatherings and conversations with genuine charm'
    ],
    syllabus: [
      {
        id: 'p-mod-1',
        title: 'Module 1: Self-Image & Inner Confidence',
        duration: 'Weeks 1-2',
        topics: ['Deconstructing self-doubt, growth mindset, vocal pitch & projection']
      },
      {
        id: 'p-mod-2',
        title: 'Module 2: Body Language & First Impressions',
        duration: 'Weeks 3-4',
        topics: ['The psychology of handshake, eye contact, spatial awareness and posture']
      },
      {
        id: 'p-mod-3',
        title: 'Module 3: Public Speaking & Storytelling',
        duration: 'Weeks 5-6',
        topics: ['Structuring 3-act speeches, humor usage, engaging the audience']
      },
      {
        id: 'p-mod-4',
        title: 'Module 4: Social Graces & Leadership Presence',
        duration: 'Weeks 7-8',
        topics: ['Meeting management, etiquette, conflict diplomacy, graduation speech']
      }
    ],
    trainerName: 'Senior Behavioral Coach',
    trainerRole: 'Personal Grooming & Leadership Facilitator',
    isPublished: true,
    order: 4
  }
];

export const DEFAULT_BATCHES: Batch[] = [
  {
    id: 'b-1',
    batchName: 'Spoken English - Fast Track Morning',
    courseId: 'course-spoken-english',
    courseTitle: 'Spoken English & Communication Mastery',
    centerId: 'center-midnapur',
    centerName: 'Midnapur Main Center',
    timing: '7:30 AM - 9:00 AM',
    days: 'Monday, Wednesday, Friday',
    startDate: '2026-10-05',
    seatsStatus: 'Filling fast',
    trainerName: '[Founder Name]',
    isActive: true
  },
  {
    id: 'b-2',
    batchName: 'Spoken English - Executive Evening',
    courseId: 'course-spoken-english',
    courseTitle: 'Spoken English & Communication Mastery',
    centerId: 'center-midnapur',
    centerName: 'Midnapur Main Center',
    timing: '5:30 PM - 7:00 PM',
    days: 'Tuesday, Thursday, Saturday',
    startDate: '2026-10-08',
    seatsStatus: 'Open',
    trainerName: '[Founder Name]',
    isActive: true
  },
  {
    id: 'b-3',
    batchName: 'Spoken English - Weekend Special',
    courseId: 'course-spoken-english',
    courseTitle: 'Spoken English & Communication Mastery',
    centerId: 'center-jhargram',
    centerName: 'Jhargram Branch',
    timing: '9:00 AM - 12:00 PM',
    days: 'Saturday & Sunday',
    startDate: '2026-10-10',
    seatsStatus: 'Open',
    trainerName: 'Senior Faculty',
    isActive: true
  },
  {
    id: 'b-4',
    batchName: 'Computer Basics - Morning Lab',
    courseId: 'course-computer-basics',
    courseTitle: 'Computer Basics & MS Office Professional',
    centerId: 'center-midnapur',
    centerName: 'Midnapur Main Center',
    timing: '10:00 AM - 11:30 AM',
    days: 'Monday to Friday',
    startDate: '2026-10-06',
    seatsStatus: 'Open',
    trainerName: 'IT Instructor',
    isActive: true
  },
  {
    id: 'b-5',
    batchName: 'Spoken English - Foundation Batch',
    courseId: 'course-spoken-english',
    courseTitle: 'Spoken English & Communication Mastery',
    centerId: 'center-gidhni',
    centerName: 'Gidhni Skill Center',
    timing: '8:30 AM - 10:00 AM',
    days: 'Monday, Wednesday, Friday',
    startDate: '2026-10-12',
    seatsStatus: 'Filling fast',
    trainerName: 'Associate Trainer',
    isActive: true
  },
  {
    id: 'b-6',
    batchName: 'Job Interview Intensive Weekend',
    courseId: 'course-interview-training',
    courseTitle: 'Job Interview & Campus Placement Bootcamp',
    centerId: 'center-midnapur',
    centerName: 'Midnapur Main Center',
    timing: '3:00 PM - 6:00 PM',
    days: 'Saturday & Sunday',
    startDate: '2026-10-15',
    seatsStatus: 'Open',
    trainerName: 'Corporate Placement Specialist',
    isActive: true
  }
];

export const DEFAULT_FACULTY: FacultyMember[] = [
  {
    id: 'fac-1',
    slug: 'founder-mentor',
    name: '[Founder Name]',
    designation: 'Founder & Head of English Pedagogy',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    teachingExperienceYears: 18,
    qualifications: [
      'M.A. in English Literature (Gold Medalist, Vidyasagar University)',
      'Bachelor of Education (B.Ed.)',
      'Advanced TESOL / ELT Certification'
    ],
    certifications: [
      'Certified British Council Language Trainer',
      'Master Corporate Communications Facilitator',
      'Phonetics & Accent Neutralization Mentor'
    ],
    subjects: [
      'Spoken English & Fluency Architecture',
      'Conversational Grammar Mastery',
      'Public Address & Stage Presence',
      'Executive Communication'
    ],
    bio: '[Founder Name] founded AIESD with a single heartfelt mission: ensuring that students from rural and semi-urban Bengal never lose out on career aspirations simply because of hesitation in spoken English. Having mentored over 8,500 students across 18 years, the pedagogical method replaces intimidating memorization with lively conversational circles, speech labs, and empathetic daily practice.',
    careerTimeline: [
      {
        year: '2008',
        title: 'Founded AIESD First Learning Circle',
        institution: 'Midnapur Town',
        description: 'Started with 12 students in a single room focused purely on conversational drills and confidence rebuilding.'
      },
      {
        year: '2014',
        title: 'Expansion to Jhargram & Modern Lab Setup',
        institution: 'AIESD Regional Expansion',
        description: 'Introduced audio-visual listening setups and structured MS Office training modules.'
      },
      {
        year: '2019',
        title: 'Launch of Gidhni Skill Center',
        institution: 'AIESD Community Outreach',
        description: 'Brought affordable English and vocational skill access to railway and rural belts of Jhargram district.'
      },
      {
        year: '2025',
        title: 'Crossed 8,500+ Alumni Milestone',
        institution: 'AIESD Convocation',
        description: 'Celebrated hundreds of alumni working in IT, banking, aviation, teaching, and customer service.'
      }
    ],
    order: 1,
    isFounder: true
  },
  {
    id: 'fac-2',
    slug: 'senior-language-trainer',
    name: '[Senior Language Trainer]',
    designation: 'Senior Spoken English Trainer',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    teachingExperienceYears: 10,
    qualifications: ['M.A. in English', 'B.A. (Honours)', 'Diploma in Soft Skills Coaching'],
    certifications: ['Certified IELTS Coach', 'Voice & Accent Specialist'],
    subjects: ['Daily Extempore Speeches', 'Group Discussions', 'Idioms & Practical Vocabulary'],
    bio: 'Specialist in taking students from zero hesitation to energetic spontaneous speech through interactive theater games and daily conversational roleplays.',
    careerTimeline: [
      {
        year: '2016',
        title: 'Lecturer in Communicative English',
        institution: 'Regional Degree College',
        description: 'Mentored undergraduate batches in campus interview readiness.'
      },
      {
        year: '2020 - Present',
        title: 'Senior Spoken English Trainer',
        institution: 'AIESD Midnapur',
        description: 'Leading morning and evening flagship spoken English circles.'
      }
    ],
    order: 2,
    isFounder: false
  },
  {
    id: 'fac-3',
    slug: 'it-faculty-mentor',
    name: '[IT & Computer Faculty]',
    designation: 'Head of Computer & Digital Skills',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    teachingExperienceYears: 8,
    qualifications: ['Master of Computer Applications (MCA)', 'B.Sc. in Computer Science'],
    certifications: ['Microsoft Office Specialist (MOS) Certified', 'Google Cloud Certified Associate'],
    subjects: ['Advanced MS Excel', 'MS Word & Office Automation', 'Internet Security & Typing Skills'],
    bio: 'Dedicated to turning beginners into productive digital champions capable of handling corporate data and official clerical paperwork with speed and precision.',
    careerTimeline: [
      {
        year: '2018',
        title: 'IT Lab Instructor',
        institution: 'Vocational Training Institute',
        description: 'Taught MS Office and accounting packages.'
      },
      {
        year: '2021 - Present',
        title: 'Head of Computer Department',
        institution: 'AIESD Centers',
        description: 'Designed modern computer modules aligned with private and government job syllabus requirements.'
      }
    ],
    order: 3,
    isFounder: false
  },
  {
    id: 'fac-4',
    slug: 'personality-placement-coach',
    name: '[Career & Grooming Mentor]',
    designation: 'Interview Coach & Behavioral Mentor',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    teachingExperienceYears: 12,
    qualifications: ['MBA in Human Resource Management', 'B.Com (Honours)'],
    certifications: ['Certified Corporate Trainer', 'NLP Practitioner'],
    subjects: ['Mock Interview Panels', 'Resume Modernization', 'Body Language & Stage Confidence'],
    bio: 'Former corporate recruiter turned mentor, guiding AIESD candidates to present themselves with dignity, calm authority, and winning communication during competitive interviews.',
    careerTimeline: [
      {
        year: '2014 - 2020',
        title: 'Talent Acquisition Manager',
        institution: 'Kolkata Corporate Sector',
        description: 'Conducted thousands of campus interviews and recruitment drives.'
      },
      {
        year: '2021 - Present',
        title: 'Career & Grooming Mentor',
        institution: 'AIESD',
        description: 'Conducting intensive placement bootcamps and personalized interview simulations.'
      }
    ],
    order: 4,
    isFounder: false
  }
];

export const DEFAULT_QUESTIONS: Question[] = [
  // Tenses
  {
    id: 'q-1',
    category: 'tenses',
    difficulty: 'Beginner',
    question: 'Choose the correct form: She _____ to the coaching center every morning.',
    options: ['go', 'goes', 'going', 'is go'],
    correctOptionIndex: 1,
    explanation: 'With third-person singular subjects (She/He/It) in simple present tense, the verb takes -s or -es (goes).'
  },
  {
    id: 'q-2',
    category: 'tenses',
    difficulty: 'Beginner',
    question: 'Yesterday, we _____ an exciting spoken English debate in class.',
    options: ['have', 'had', 'having', 'has had'],
    correctOptionIndex: 1,
    explanation: '"Yesterday" denotes a completed action in the past, so the simple past tense "had" is required.'
  },
  {
    id: 'q-3',
    category: 'tenses',
    difficulty: 'Intermediate',
    question: 'By the time the trainer arrived, the students _____ their practice speech.',
    options: ['already finished', 'had already finished', 'have already finished', 'are finishing'],
    correctOptionIndex: 1,
    explanation: 'When two actions happened in the past, the earlier past action takes the Past Perfect tense (had + past participle).'
  },
  {
    id: 'q-4',
    category: 'tenses',
    difficulty: 'Intermediate',
    question: 'I _____ in Midnapur for the past three years.',
    options: ['am living', 'have been living', 'lived', 'was living'],
    correctOptionIndex: 1,
    explanation: 'Actions that began in the past and continue up to the present with "for/since" require Present Perfect Continuous (have been living).'
  },

  // Articles
  {
    id: 'q-5',
    category: 'articles',
    difficulty: 'Beginner',
    question: 'He is _____ honest student who never skips his speaking drills.',
    options: ['a', 'an', 'the', 'no article needed'],
    correctOptionIndex: 1,
    explanation: 'The word "honest" begins with a vowel sound (/ɒ/), hence the indefinite article "an" is used.'
  },
  {
    id: 'q-6',
    category: 'articles',
    difficulty: 'Intermediate',
    question: 'Mount Everest is the highest peak in _____ Himalayas.',
    options: ['a', 'an', 'the', 'no article'],
    correctOptionIndex: 2,
    explanation: 'Mountain ranges (plural like the Himalayas, the Alps) always take the definite article "the".'
  },
  {
    id: 'q-7',
    category: 'articles',
    difficulty: 'Beginner',
    question: 'Rohan plays _____ guitar very melodiously.',
    options: ['a', 'an', 'the', 'no article'],
    correctOptionIndex: 2,
    explanation: 'Musical instruments take the definite article "the" when talking about the skill of playing them.'
  },

  // Prepositions
  {
    id: 'q-8',
    category: 'prepositions',
    difficulty: 'Beginner',
    question: 'The new spoken English batch begins _____ Monday.',
    options: ['in', 'at', 'on', 'from'],
    correctOptionIndex: 2,
    explanation: 'Specific days of the week and specific calendar dates always use the preposition "on".'
  },
  {
    id: 'q-9',
    category: 'prepositions',
    difficulty: 'Intermediate',
    question: 'She has been practicing her pronunciation _____ 7:00 AM this morning.',
    options: ['for', 'since', 'from', 'during'],
    correctOptionIndex: 1,
    explanation: '"Since" is used to refer to a specific starting point in time.'
  },
  {
    id: 'q-10',
    category: 'prepositions',
    difficulty: 'Advanced',
    question: 'The student was commended _____ his outstanding speech delivery.',
    options: ['for', 'with', 'about', 'at'],
    correctOptionIndex: 0,
    explanation: 'The verb "commend" typically pairs with "for" when specifying the reason for praise.'
  },
  {
    id: 'q-11',
    category: 'prepositions',
    difficulty: 'Intermediate',
    question: 'Distribute the question papers _____ the five students.',
    options: ['between', 'among', 'in between', 'within'],
    correctOptionIndex: 1,
    explanation: '"Between" is used for two items/persons; "among" is used for more than two.'
  },

  // Subject-Verb Agreement
  {
    id: 'q-12',
    category: 'subject-verb agreement',
    difficulty: 'Beginner',
    question: 'Either the trainer or the students _____ going to present the topic today.',
    options: ['is', 'are', 'was', 'am'],
    correctOptionIndex: 1,
    explanation: 'When subjects are connected by "either...or", the verb agrees with the closer subject ("the students" -> plural "are").'
  },
  {
    id: 'q-13',
    category: 'subject-verb agreement',
    difficulty: 'Intermediate',
    question: 'Neither of the applicants _____ qualified for the senior position.',
    options: ['are', 'is', 'were', 'have been'],
    correctOptionIndex: 1,
    explanation: '"Neither of" takes a singular verb ("is") in standard formal English.'
  },
  {
    id: 'q-14',
    category: 'subject-verb agreement',
    difficulty: 'Advanced',
    question: 'The committee _____ divided in their opinions regarding the batch schedule.',
    options: ['was', 'were', 'is', 'has been'],
    correctOptionIndex: 1,
    explanation: 'Collective nouns take a plural verb when individual members are acting separately or holding differing views.'
  },
  {
    id: 'q-15',
    category: 'subject-verb agreement',
    difficulty: 'Beginner',
    question: 'Bread and butter _____ his favorite breakfast.',
    options: ['are', 'is', 'were', 'being'],
    correctOptionIndex: 1,
    explanation: 'When two nouns express a single idea or compound item together, they take a singular verb ("is").'
  },

  // Modals
  {
    id: 'q-16',
    category: 'modals',
    difficulty: 'Beginner',
    question: '_____ you please pass me the English grammar handout?',
    options: ['Should', 'Must', 'Could', 'Shall'],
    correctOptionIndex: 2,
    explanation: '"Could" is the most polite modal auxiliary for making a gentle request.'
  },
  {
    id: 'q-17',
    category: 'modals',
    difficulty: 'Intermediate',
    question: 'You _____ wear a helmet while riding a motorcycle; it is mandated by law.',
    options: ['might', 'must', 'could', 'would'],
    correctOptionIndex: 1,
    explanation: '"Must" expresses strong legal obligation or compulsion.'
  },
  {
    id: 'q-18',
    category: 'modals',
    difficulty: 'Advanced',
    question: 'I _____ rather attend the offline classroom session than watch recordings.',
    options: ['could', 'should', 'would', 'might'],
    correctOptionIndex: 2,
    explanation: 'The idiom of preference is "would rather".'
  },

  // Conditionals
  {
    id: 'q-19',
    category: 'conditionals',
    difficulty: 'Intermediate',
    question: 'If you _____ every day, your English fluency will improve drastically.',
    options: ['practiced', 'practice', 'will practice', 'had practiced'],
    correctOptionIndex: 1,
    explanation: 'In the First Conditional (If + Present Simple, will + Base Verb), the if-clause uses the simple present tense.'
  },
  {
    id: 'q-20',
    category: 'conditionals',
    difficulty: 'Advanced',
    question: 'If I _____ you, I would enroll in the Spoken English course immediately.',
    options: ['was', 'were', 'am', 'had been'],
    correctOptionIndex: 1,
    explanation: 'In the Second Conditional for hypothetical conditions, subjunctive "were" is used with all subjects.'
  },
  {
    id: 'q-21',
    category: 'conditionals',
    difficulty: 'Advanced',
    question: 'If she had informed us earlier, we _____ reserved a seat for her.',
    options: ['would have', 'will have', 'had', 'would'],
    correctOptionIndex: 0,
    explanation: 'Third conditional pattern: If + Past Perfect, would have + past participle.'
  },

  // Vocabulary
  {
    id: 'q-22',
    category: 'vocabulary',
    difficulty: 'Beginner',
    question: 'What is the synonym of "Fluent"?',
    options: ['Hesitant', 'Articulate and smooth', 'Rough', 'Silent'],
    correctOptionIndex: 1,
    explanation: '"Fluent" means able to speak or write a particular language easily, smoothly, and accurately.'
  },
  {
    id: 'q-23',
    category: 'vocabulary',
    difficulty: 'Intermediate',
    question: 'Choose the antonym of the word "Confident":',
    options: ['Bold', 'Apprehensive', 'Optimistic', 'Assertive'],
    correctOptionIndex: 1,
    explanation: '"Apprehensive" means anxious or fearful that something bad or unpleasant will happen; the opposite of confident.'
  },
  {
    id: 'q-24',
    category: 'vocabulary',
    difficulty: 'Advanced',
    question: 'Select the word that best describes speaking without prior preparation:',
    options: ['Monologue', 'Extempore', 'Dialogue', 'Recitation'],
    correctOptionIndex: 1,
    explanation: '"Extempore" refers to spoken or done without preparation or thought ahead of time.'
  },
  {
    id: 'q-25',
    category: 'vocabulary',
    difficulty: 'Intermediate',
    question: 'Which word means "capable of making oneself clearly understood"?',
    options: ['Ambiguous', 'Articulate', 'Vague', 'Obscure'],
    correctOptionIndex: 1,
    explanation: '"Articulate" describes having or showing the ability to speak fluently and coherently.'
  },

  // Sentence Correction
  {
    id: 'q-26',
    category: 'sentence correction',
    difficulty: 'Beginner',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'He do not know how to speak English.',
      'He does not knows how to speak English.',
      'He does not know how to speak English.',
      'He did not knows how to speak English.'
    ],
    correctOptionIndex: 2,
    explanation: 'With auxiliary "does", the main verb stays in base infinitive form without -s ("does not know").'
  },
  {
    id: 'q-27',
    category: 'sentence correction',
    difficulty: 'Intermediate',
    question: 'Which sentence is free of error?',
    options: [
      'She is senior than me in the organization.',
      'She is senior to me in the organization.',
      'She is more senior than me in the organization.',
      'She is senior over me in the organization.'
    ],
    correctOptionIndex: 1,
    explanation: 'Latin comparative adjectives like senior, junior, superior, and inferior take the preposition "to", never "than".'
  },
  {
    id: 'q-28',
    category: 'sentence correction',
    difficulty: 'Intermediate',
    question: 'Choose the correct expression:',
    options: [
      'I look forward to meet you at the institute.',
      'I look forward to meeting you at the institute.',
      'I am looking forward to meet you at the institute.',
      'I look forward meeting you at the institute.'
    ],
    correctOptionIndex: 1,
    explanation: 'The phrasal preposition "look forward to" is followed by a gerund (-ing form), so "meeting you" is correct.'
  },
  {
    id: 'q-29',
    category: 'sentence correction',
    difficulty: 'Advanced',
    question: 'Which of the following sentences is correctly structured?',
    options: [
      'Hardly had I entered the classroom when the speech contest started.',
      'Hardly I had entered the classroom than the speech contest started.',
      'Hardly did I entered the classroom when the speech contest started.',
      'Hardly had I entered the classroom then the speech contest started.'
    ],
    correctOptionIndex: 0,
    explanation: '"Hardly" takes negative inversion (Hardly had + subject + verb3) and is correlated with "when", not "than".'
  },
  {
    id: 'q-30',
    category: 'sentence correction',
    difficulty: 'Intermediate',
    question: 'Correct the common Indian English phrase: "I will revert back to your email tomorrow."',
    options: [
      'I will revert again to your email tomorrow.',
      'I will reply back to your email tomorrow.',
      'I will revert to your email tomorrow.',
      'I will revert behind your email tomorrow.'
    ],
    correctOptionIndex: 2,
    explanation: '"Revert" already contains the sense of return or turning back, so combining it with "back" is redundant repetition.'
  }
];

export const DEFAULT_TEST_SETTINGS: TestSettings = {
  questionsPerTest: 20,
  enableTimer: true,
  timeLimitMinutes: 15,
  requireLeadBeforeResult: true,
  beginnerMax: 40,
  elementaryMax: 60,
  intermediateMax: 75,
  upperIntermediateMax: 89,
  advancedMax: 100
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    studentName: 'Suman Roy',
    courseTaken: 'Spoken English & Communication Mastery',
    center: 'Midnapur Main Center',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    quote: 'Coming from a Bengali medium background, I was terrified of speaking English during campus placement drives. At AIESD, the daily extempore circles completely transformed my confidence. I cleared my IT placement interview on the very first attempt!',
    type: 'text',
    studentCurrentRole: 'Associate Software Engineer',
    company: 'TCS Kolkata',
    isApproved: true,
    isFeaturedOnHome: true,
    order: 1
  },
  {
    id: 'test-2',
    studentName: 'Priyanka Mahato',
    courseTaken: 'Spoken English + Interview Training',
    center: 'Jhargram Branch',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    quote: 'Sir explained grammar in such a simple, practical way without heavy jargon. We practiced speaking for 30 minutes every single day. Today, I converse effortlessly with doctors and administrators in my hospital role.',
    type: 'text',
    studentCurrentRole: 'Administrative Officer',
    company: 'Care Hospital',
    isApproved: true,
    isFeaturedOnHome: true,
    order: 2
  },
  {
    id: 'test-3',
    studentName: 'Amitava Bera',
    courseTaken: 'Computer Basics & MS Office',
    center: 'Gidhni Skill Center',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    quote: 'I had never touched a computer before enrolling at AIESD Gidhni. In two and a half months, I mastered Excel formulas, Word letter drafting, and internet operations. It helped me secure a front-desk billing job in our local town.',
    type: 'text',
    studentCurrentRole: 'Billing Coordinator',
    company: 'Nexus Retail',
    isApproved: true,
    isFeaturedOnHome: true,
    order: 3
  },
  {
    id: 'test-4',
    studentName: 'Sourav Mondal',
    courseTaken: 'Spoken English & Communication Mastery',
    center: 'Midnapur Main Center',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    quote: 'Hear my live transformation journey! The weekly microphone speeches helped me defeat extreme stage fright and crack the banking interview with distinction.',
    type: 'video',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    studentCurrentRole: 'Branch Operations Officer',
    company: 'Regional Banking Unit',
    isApproved: true,
    isFeaturedOnHome: true,
    order: 4
  }
];

export const DEFAULT_COURSE_FEATURES: CourseFeatureItem[] = [
  {
    id: 'cf-1',
    title: 'Individual Speaking Time',
    description: 'Guaranteed personal microphone and group conversational drills every single class.',
    iconName: 'Mic',
    order: 1
  },
  {
    id: 'cf-2',
    title: 'Doubt Clearing Support',
    description: 'Post-class 1-on-1 assistance for grammar queries and hesitant learners.',
    iconName: 'HelpCircle',
    order: 2
  },
  {
    id: 'cf-3',
    title: 'Printed Study Materials',
    description: 'Simple, concise grammar booklets, vocabulary guides, and daily phrase sheets.',
    iconName: 'FileText',
    order: 3
  },
  {
    id: 'cf-4',
    title: 'Video-Recorded Mock Drills',
    description: 'Review your posture, tone, and pronunciation through recorded playback reviews.',
    iconName: 'Video',
    order: 4
  },
  {
    id: 'cf-5',
    title: 'Verifiable Certificate',
    description: 'Recognized completion certificate valued by employers across private and public sectors.',
    iconName: 'Award',
    order: 5
  },
  {
    id: 'cf-6',
    title: 'Lifetime Alumni Access',
    description: 'Attend free Sunday speaking workshops even after graduating from your batch.',
    iconName: 'RefreshCw',
    order: 6
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Daily Conversational Speaking Circle',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    caption: 'Students practicing extempore speech and peer dialogues at Midnapur Main Center.',
    order: 1
  },
  {
    id: 'gal-2',
    title: 'Computer Lab Practical Session',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    caption: '1-to-1 computer workstation practice with MS Excel and Word documentation.',
    order: 2
  },
  {
    id: 'gal-3',
    title: 'Annual Speech & Debate Championship',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    caption: 'Alumni and current students participating in the annual English elocution contest.',
    order: 3
  },
  {
    id: 'gal-4',
    title: 'Certificate Distribution Ceremony',
    category: 'Certifications',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    caption: 'Batch graduation ceremony celebrating students who conquered spoken English hesitation.',
    order: 4
  },
  {
    id: 'gal-5',
    title: 'Interactive Group Discussion Lab',
    category: 'Classroom',
    imageUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1000&q=80',
    caption: 'Students learning teamwork and polite assertion in group discussion drills.',
    order: 5
  },
  {
    id: 'gal-6',
    title: 'Modern Jhargram Branch Reception',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    caption: 'Welcoming admissions desk and counseling space at our Jhargram branch.',
    order: 6
  }
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'I studied in Bengali/Hindi medium. Can I really learn to speak fluent English?',
    answer: 'Absolutely yes. More than 80% of our successful alumni come from vernacular language backgrounds. We do not shame or intimidate you; rather, we bridge your natural mother-tongue concepts into English step-by-step with practical speaking drills from day one.',
    category: 'Courses',
    showOnHome: true,
    order: 1
  },
  {
    id: 'faq-2',
    question: 'What makes AIESD different from general English grammar tuition?',
    answer: 'Standard tuition teaches you to pass written grammar exams. AIESD focuses specifically on spoken oral fluency. In our classes, you spend 70% of the time actually speaking on stage, in pairs, and in debates, building active reflexes.',
    category: 'General',
    showOnHome: true,
    order: 2
  },
  {
    id: 'faq-3',
    question: 'What is the duration of the flagship Spoken English course?',
    answer: 'The core course runs for 3 months with comprehensive weekday and weekend options. We also provide ongoing Sunday practice club access for alumni at no extra cost to maintain fluency.',
    category: 'Courses',
    showOnHome: true,
    order: 3
  },
  {
    id: 'faq-4',
    question: 'How many students are there in each classroom batch?',
    answer: 'We strictly cap batches between 15 to 20 students so that our trainers can give individual speaking time, personal pronunciation corrections, and confidence mentoring to every single student.',
    category: 'Batches',
    showOnHome: true,
    order: 4
  },
  {
    id: 'faq-5',
    question: 'Are there batches for working professionals and college students?',
    answer: 'Yes! We offer early morning batches (7:30 AM to 9:00 AM) and evening batches (5:00 PM to 6:30 PM) on weekdays, as well as dedicated weekend batches (Saturdays and Sundays).',
    category: 'Batches',
    showOnHome: true,
    order: 5
  },
  {
    id: 'faq-6',
    question: 'Will I receive an official certificate after completing the course?',
    answer: 'Yes. Upon successfully completing the course and meeting the 80% attendance and speaking assessment threshold, you will be awarded an authorized AIESD completion certificate recognized by regional employers.',
    category: 'Certificates',
    showOnHome: true,
    order: 6
  },
  {
    id: 'faq-7',
    question: 'Can I pay the course fee in installments?',
    answer: 'Yes, affordable installment payment options are available at all our centers to support students and families. Please enquire at the center office during admission.',
    category: 'Admissions',
    showOnHome: true,
    order: 7
  },
  {
    id: 'faq-8',
    question: 'How do I take the Free English Grammar Assessment Test?',
    answer: 'Simply click the "Free English Test" link in the top menu. You will answer 20 multiple-choice questions with instant scoring, category breakdown, explanations, and course recommendations.',
    category: 'General',
    showOnHome: true,
    order: 8
  },
  {
    id: 'faq-9',
    question: 'Do you offer computer training alongside spoken English?',
    answer: 'Yes, our Computer Basics & MS Office Professional course covers Windows, MS Word, Excel, PowerPoint, and Internet utilities with 100% hands-on computer lab time.',
    category: 'Courses',
    showOnHome: false,
    order: 9
  },
  {
    id: 'faq-10',
    question: 'Where are your centers located?',
    answer: 'We currently operate three accessible centers in Midnapur (Main Center near Bus Stand), Jhargram (Court Road), and Gidhni (Station Market Complex).',
    category: 'General',
    showOnHome: false,
    order: 10
  },
  {
    id: 'faq-11',
    question: 'What if I miss a class due to illness or exams?',
    answer: 'You can attend backup doubt-clearing sessions during weekend revision clinics, or attend the corresponding topic in a parallel batch with mentor approval.',
    category: 'Batches',
    showOnHome: false,
    order: 11
  },
  {
    id: 'faq-12',
    question: 'Is there any age or qualification requirement to enroll?',
    answer: 'No strict age limit exists. We welcome school students (Class 8+), college students, job seekers, homemakers, and working professionals who wish to speak English fluently.',
    category: 'Admissions',
    showOnHome: false,
    order: 12
  }
];

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'nav-home', label: 'Home', path: '/', isVisible: true, order: 1 },
  { id: 'nav-courses', label: 'Courses', path: '/courses', isVisible: true, order: 2 },
  { id: 'nav-about', label: 'About', path: '/about', isVisible: true, order: 3 },
  { id: 'nav-faculty', label: 'Faculty', path: '/faculty', isVisible: true, order: 4 },
  { id: 'nav-test', label: 'Free English Test', path: '/free-english-test', isVisible: true, order: 5 },
  { id: 'nav-testimonials', label: 'Testimonials', path: '/testimonials', isVisible: true, order: 6 },
  { id: 'nav-gallery', label: 'Gallery', path: '/gallery', isVisible: true, order: 7 },
  { id: 'nav-social', label: 'Social Channels', path: '/social', isVisible: true, order: 8 },
  { id: 'nav-contact', label: 'Contact', path: '/contact', isVisible: true, order: 9 }
];

export const DEFAULT_SEO: SEOConfig = {
  siteTitleDefault: 'AIESD - Spoken English Coaching & Professional Skills',
  metaDescriptionDefault: 'Transform your spoken English, master conversational fluency, computer literacy, and crack job interviews with AIESD in Midnapur, Jhargram, and Gidhni.',
  keywordsDefault: 'spoken english midnapur, english coaching jhargram, aiesd, computer training gidhni, interview preparation west bengal',
  ogImageDefault: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  pageOverrides: {
    '/': {
      title: 'AIESD - An Institute of Education & Skill Development',
      description: 'Overcome hesitation and speak English fluently. Dedicated Spoken English, Computer Basics, and Interview Coaching centers in Midnapur, Jhargram, and Gidhni.'
    },
    '/social': {
      title: 'Official Social Media & Direct App Channels | AIESD',
      description: 'Connect with AIESD directly across Instagram, WhatsApp Channels, Facebook, YouTube, LinkedIn, and Telegram for daily English tips and batch notices.'
    },
    '/courses': {
      title: 'Courses - Spoken English, Computer & Interview Training | AIESD',
      description: 'Explore our flagship Spoken English Mastery, MS Office Computer Training, and Campus Placement Bootcamps with experienced mentors.'
    },
    '/about': {
      title: 'About AIESD - Mission, Vision & Educational Story',
      description: 'Learn about AIESD journey from a single room to empowering 8,500+ students across Paschim Medinipur and Jhargram.'
    },
    '/faculty': {
      title: 'Experienced Faculty & Spoken English Mentors | AIESD',
      description: 'Meet our dedicated language educators, IT trainers, and corporate placement coaches with over 18 years of classroom dedication.'
    },
    '/free-english-test': {
      title: 'Free English Grammar Assessment Test | AIESD',
      description: 'Assess your English proficiency in 15 minutes with our 20-question test. Get instant scores, detailed explanations, and level analysis.'
    },
    '/testimonials': {
      title: 'Student Success Stories & Reviews | AIESD',
      description: 'Read and watch genuine transformation journeys of students who overcame English hesitation and secured rewarding careers.'
    },
    '/gallery': {
      title: 'Campus & Classroom Gallery | AIESD',
      description: 'Explore photographs of our daily speaking circles, computer lab sessions, elocution events, and student celebrations.'
    },
    '/contact': {
      title: 'Contact Us & Centers - Midnapur, Jhargram, Gidhni | AIESD',
      description: 'Find phone numbers, street addresses, office timings, Google Map directions, and direct admissions contact for all AIESD centers.'
    },
    '/enroll': {
      title: 'Online Batch Enrollment & Application | AIESD',
      description: 'Reserve your seat in the upcoming Spoken English and computer batches. Fast 3-step verification with instant WhatsApp confirmation.'
    }
  }
};
