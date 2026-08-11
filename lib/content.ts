// Content sourced from the "How to Write a Winning Resume" and
// "How to Write a Winning Cover Letter" student workbooks.

export interface SentenceStarter {
  label: string;
  text: string;
}

export interface IdeaBox {
  title: string;
  items: string[];
}

export interface StepContent {
  title: string;
  blurb: string;
  whatToInclude: string[];
  sentenceStarters?: SentenceStarter[];
  ideas?: IdeaBox;
  tip?: string;
}

// ---------------------------------------------------------------------------
// Resume — intro content
// ---------------------------------------------------------------------------

export const resumeIntro = {
  whatIs:
    "A resume (also called a CV or curriculum vitae) is a document that tells an employer who you are, what you can do, and why they should hire you. Think of it as your personal marketing document — your chance to make a great first impression before you even walk through the door.",
  whoNeeds: [
    "Part-time or casual jobs (retail, hospitality, supermarkets, tutoring)",
    "Volunteering roles",
    "School-based apprenticeships or traineeships",
    "Work experience / structured workplace learning",
    "University or TAFE applications and scholarships",
  ],
  keyRules: [
    "Keep it to 1–2 pages",
    "Use clear, simple language — no slang",
    "Always tell the truth",
    "Check spelling and grammar carefully",
    "Use a clean, easy-to-read font (e.g. Arial, Calibri, Times New Roman)",
    "Save and send it as a PDF unless asked otherwise",
  ],
  commonMistakes: [
    "Spelling and grammar errors (always proofread!)",
    "Using unprofessional email addresses (create a new one if needed)",
    "Leaving unexplained gaps or being vague",
    "Making it too long or too short",
    "Forgetting to update it before each application",
    "Including false information",
  ],
};

export const resumeActionVerbs = [
  "Assisted", "Organised", "Developed", "Collaborated",
  "Coordinated", "Communicated", "Created", "Managed",
  "Represented", "Supported", "Demonstrated", "Achieved",
  "Participated", "Led", "Completed", "Improved",
];

export const resumeChecklist = [
  "My name and contact details are at the top and are correct",
  "My email address looks professional",
  "My personal statement is 3–5 sentences and introduces me well",
  "I have listed 4–6 personal qualities",
  "My education is listed in reverse order (most recent first)",
  "I have included all relevant work experience, volunteering, or roles",
  "My dot points start with strong action verbs (assisted, organised, developed...)",
  "I have listed my key skills",
  "I have included at least 3 achievements or awards",
  "My hobbies section is 3–5 sentences or dot points",
  "I have listed 2 referees and asked their permission",
  "I have proofread for spelling and grammar errors",
  "My resume is no longer than 2 pages",
  "The font is consistent and easy to read throughout",
];

// ---------------------------------------------------------------------------
// Resume — step-by-step content
// ---------------------------------------------------------------------------

export const contactStep: StepContent = {
  title: "Contact Details",
  blurb: "At the very top of your resume, include your full name and contact details so employers can reach you.",
  whatToInclude: [
    "Full name (first and last)",
    "Phone number (your mobile is fine)",
    "Email address — make sure it is professional! (e.g. firstname.lastname@gmail.com)",
    "Suburb and state (you do not need your full street address)",
  ],
  tip: "Avoid email addresses like 'coolgamer99' or 'princesslulu'. Create a new, professional address just for job applications.",
};

export const personalStatementStep: StepContent = {
  title: "Personal Statement",
  blurb:
    "Your personal statement is a short paragraph (3–5 sentences) at the top of your resume. It tells the employer who you are, what you are good at, and what you are looking for. It is your 'elevator pitch' — keep it punchy and positive.",
  whatToInclude: [
    "Your year level and school",
    "Your key strengths or qualities (2–3)",
    "Your area of interest or career goal",
    "The type of role or opportunity you are seeking",
  ],
  sentenceStarters: [
    { label: "Opening", text: "I am an enthusiastic Year 10 student at [School Name] with a strong interest in..." },
    { label: "Strengths", text: "I am known for being [quality], [quality], and [quality]..." },
    { label: "Goal", text: "I am passionate about [area] and am keen to develop my skills in..." },
    { label: "Seeking", text: "I am looking for a part-time / volunteer / work experience role where I can..." },
    { label: "Closing", text: "I am a motivated individual who is ready to contribute positively and..." },
  ],
  ideas: {
    title: "No Work Experience? That's OK!",
    items: [
      "Focus on who you ARE, not what you have done.",
      "Think about: Are you organised? Creative? A good listener? A team player?",
      "Mention subjects you enjoy and why: 'I have a strong interest in science...'",
      "Talk about your goals: 'I am keen to explore a career in healthcare/IT/design...'",
      "Mention personal values: 'I believe in working hard and treating others with respect.'",
    ],
  },
};

export const personalQualitiesStep: StepContent = {
  title: "Personal Qualities",
  blurb:
    "This section lists the key qualities and attributes that make you a great employee. Think beyond your job experience — your personality matters enormously to employers!",
  whatToInclude: [
    "4–6 dot points describing your personal strengths",
    "Use strong adjectives (e.g. reliable, motivated, creative, adaptable)",
    "Think about feedback teachers, coaches, or family have given you",
  ],
  sentenceStarters: [
    { label: "Work ethic", text: "Hardworking and dedicated, with a strong commitment to..." },
    { label: "Teamwork", text: "A collaborative team player who enjoys working with others to..." },
    { label: "Communication", text: "Confident communicator with the ability to..." },
    { label: "Attitude", text: "Positive and enthusiastic approach to new challenges and..." },
    { label: "Reliability", text: "Punctual and dependable; consistently follow through on..." },
    { label: "Learning", text: "Quick learner who is open to feedback and eager to..." },
  ],
};

export const personalQualitiesWordBank = [
  "Adaptable", "Ambitious", "Approachable", "Calm under pressure", "Caring",
  "Creative", "Detail-oriented", "Determined", "Empathetic", "Enthusiastic",
  "Flexible", "Friendly", "Hardworking", "Honest", "Inclusive",
  "Motivated", "Organised", "Patient", "Proactive", "Punctual",
  "Reliable", "Resilient", "Respectful", "Responsible", "Self-motivated",
  "Team player", "Thoughtful", "Trustworthy", "Well-presented", "Willing to learn",
];

export const educationStep: StepContent = {
  title: "Education and Training",
  blurb:
    "List your education history, starting with your most recent school (this is called 'reverse chronological order'). Include your current school and any primary schools. Also list any certificates, courses, or training you have completed.",
  whatToInclude: [
    "Name of school/s attended and years",
    "Year level you are currently in",
    "Subjects you study (especially ones relevant to the job)",
    "Any certificates (e.g. First Aid, RSA, barista training, coding courses)",
    "Awards or recognition at school",
  ],
  sentenceStarters: [
    { label: "Current school", text: "[School Name] — Year 10, [Year] – Present" },
    { label: "Subjects", text: "Currently studying [Subject], [Subject], and [Subject], which have helped me develop skills in..." },
    { label: "Certificates", text: "Completed [Certificate Name] in [Month/Year], gaining skills in..." },
    { label: "Online learning", text: "Completed online courses in [topic] through [platform, e.g. Khan Academy, Coursera]" },
  ],
  ideas: {
    title: "Training & Certificates Worth Mentioning",
    items: [
      "First Aid / CPR certificate",
      "Food handling or Responsible Service of Alcohol (RSA) certificate",
      "Driver's Learner Permit",
      "Swimming/lifesaving awards (e.g. Bronze Medallion)",
      "Online courses: coding, graphic design, Microsoft Office training",
      "School-based apprenticeships or VET (Vocational Education and Training) subjects",
      "Language classes or NAPLAN / IELTS results",
      "Sporting coaching or umpiring qualifications",
    ],
  },
};

export const employmentStep: StepContent = {
  title: "Employment History",
  blurb:
    "This is often the section students worry about most — but even without formal paid work, you have experience worth listing! Think broadly: volunteering, babysitting, helping in a family business, mowing lawns, work experience days, and school placements all count.",
  whatToInclude: [
    "Job title / role (e.g. Volunteer, Babysitter, Work Experience Student)",
    "Organisation or who you worked for",
    "Dates (month and year)",
    "2–4 dot points describing what you did",
  ],
  sentenceStarters: [
    { label: "Tasks", text: "Assisted with [task], including..." },
    { label: "Customer service", text: "Provided friendly service to customers by..." },
    { label: "Teamwork", text: "Worked as part of a team to..." },
    { label: "Organisation", text: "Organised and maintained [files/stock/equipment] to ensure..." },
    { label: "Learning", text: "Developed skills in [area] by observing and participating in..." },
    { label: "Responsibility", text: "Was responsible for [task], which required..." },
    { label: "Achievement", text: "Successfully completed [task/project], resulting in..." },
  ],
  ideas: {
    title: "No Formal Work Experience? Think About This",
    items: [
      "Babysitting: 'Provided care for children aged [x] to [x], preparing meals, supervising play, and maintaining a safe environment.'",
      "Lawn mowing / odd jobs: 'Provided gardening / odd-job services for neighbours, managing my own schedule and client communication.'",
      "Family business: 'Assisted in the family [business type], performing tasks such as serving customers, stocking shelves, and handling cash.'",
      "Volunteering: 'Volunteered at [organisation], contributing to [activity] and developing teamwork and communication skills.'",
      "Work experience / placement: 'Completed one week of work experience at [workplace], where I observed/assisted with [tasks].'",
      "School roles: 'Served as [SRC member/House Captain/Peer Mentor], organising events and representing student interests.'",
      "Fundraising: 'Participated in organising a school fundraising event, taking on responsibilities for [planning/promotion/coordination].'",
      "If you truly have nothing to list yet, write \"Currently seeking my first employment opportunity\" and focus heavily on your skills and qualities sections.",
    ],
  },
};

export const skillsStep: StepContent = {
  title: "Skills",
  blurb:
    "This section highlights your practical and technical skills. Think about what you can DO — not just who you are. Skills can be grouped into categories to make them easier to read.",
  whatToInclude: [
    "Digital / computer skills",
    "Communication skills",
    "Languages spoken",
    "Organisational skills",
    "Physical / practical skills",
    "Licences and certifications",
  ],
  sentenceStarters: [
    { label: "Digital", text: "Proficient in Microsoft Word, Excel, and PowerPoint; experience with..." },
    { label: "Creative", text: "Skilled in graphic design using Canva / Adobe / [other]; able to..." },
    { label: "Communication", text: "Strong written and verbal communication skills developed through..." },
    { label: "Languages", text: "Fluent in English and [language]; able to communicate effectively with..." },
    { label: "Organisational", text: "Excellent time management and organisational skills; experienced in..." },
    { label: "Physical", text: "Physically fit; experience in [sport/activity] that has developed..." },
    { label: "Licence", text: "Hold a current [certificate/licence], enabling me to..." },
  ],
  ideas: {
    title: "Skills You Might Overlook",
    items: [
      "Using Microsoft Office (Word, Excel, PowerPoint) — almost everyone has this!",
      "Typing speed / keyboard skills",
      "Social media management (if relevant — e.g. ran a school page or personal brand)",
      "Photography or video editing",
      "Coding / programming (Python, Scratch, HTML)",
      "Drawing, design, or art skills",
      "Playing a musical instrument",
      "Cooking or food preparation",
      "Driving (learner permit counts!)",
      "Sports coaching, umpiring, or lifesaving qualifications",
    ],
  },
};

export const achievementsStep: StepContent = {
  title: "Special Achievements and Awards",
  blurb:
    "This is your chance to shine! Achievements do not have to be trophies or medals. Anything that shows you went above and beyond is worth including. Think about school, sport, community, and personal life.",
  whatToInclude: [
    "Academic awards (honour roll, subject prizes, Principal's Award)",
    "Sporting achievements (team wins, representative selections, personal bests)",
    "Leadership roles (SRC, House Captain, Peer Mentor, Club President)",
    "Community contributions (fundraising, volunteering milestones)",
    "Cultural or creative achievements (art shows, music performances, competitions)",
    "Personal challenges you have overcome (include only if you are comfortable)",
  ],
  sentenceStarters: [
    { label: "Award", text: "[Award Name] — [School/Organisation], [Year]" },
    { label: "Sporting", text: "Represented [school/club/region] in [sport], achieving [result]" },
    { label: "Leadership", text: "Elected as [role] at [school/club], where I was responsible for..." },
    { label: "Community", text: "Raised $[amount] for [cause] by organising/participating in..." },
    { label: "Competition", text: "Competed in [competition name], placing [result] out of [number] participants" },
    { label: "Personal", text: "Completed [challenge/goal], demonstrating my commitment to..." },
  ],
  ideas: {
    title: "Think Broadly!",
    items: [
      "Did you ever get Student of the Week / Month / Term? That counts!",
      "Have you completed a community project or fundraiser?",
      "Have you been selected for a sports team (school, local club, regional)?",
      "Have you performed in a concert, play, or art exhibition?",
      "Have you completed a personal challenge (charity run, fundraising walk)?",
      "Have you taken on a leadership role in any club, team, or group?",
      "Have you received a certificate for attendance, improvement, or effort?",
      "Did you help organise a school event or activity?",
      "If you genuinely have nothing yet: 'Currently seeking opportunities to contribute to my school and community.'",
    ],
  },
};

export const hobbiesStep: StepContent = {
  title: "Hobbies and Interests",
  blurb:
    "This section helps the employer see you as a real person. It also shows how your interests connect to your qualities. Keep it brief (3–5 sentences or dot points) and relevant.",
  whatToInclude: [
    "Sports or physical activities",
    "Creative pursuits (music, art, writing, photography, drama)",
    "Community involvement or volunteering",
    "Clubs or groups you belong to",
    "Reading, gaming, cooking, or other personal interests",
    "Explain briefly why you enjoy it or what skills it has built",
  ],
  sentenceStarters: [
    { label: "Sport", text: "I am an active member of [club/team], playing [sport] on a [regular/weekly] basis, which has developed my..." },
    { label: "Creative", text: "I am passionate about [music/art/writing], which allows me to express my creativity and..." },
    { label: "Community", text: "I enjoy volunteering at [place/event], where I contribute to [cause] and develop my..." },
    { label: "Technology", text: "I have a strong interest in [coding/gaming/design], and regularly..." },
    { label: "Reading/Learning", text: "I enjoy reading [topic/genre] and keeping up to date with developments in [area]..." },
    { label: "Multiple", text: "In my spare time, I enjoy [activity], [activity], and [activity], all of which have helped me to..." },
  ],
  tip: "Connect hobbies to qualities! e.g. 'Playing team sport has taught me the value of communication and perseverance.'",
};

export const refereesStep: StepContent = {
  title: "Referees",
  blurb:
    "Referees are people who know you well and can speak positively about your character, work ethic, or abilities. Always ask permission before listing someone as a referee!",
  whatToInclude: [
    "A teacher (ideally a subject teacher or Year Coordinator)",
    "A coach, trainer, or sports club official",
    "A community or volunteer organisation leader",
    "A family friend in a professional role (NOT a family member/parent)",
    "A boss or supervisor from any job, work experience, or volunteer role",
  ],
  ideas: {
    title: "Referee Rules",
    items: [
      "Always ask the person's permission before listing them",
      "Make sure you have their correct contact details",
      "Give them a heads-up when you apply so they are prepared",
      "Choose someone who knows you well and can speak positively about you",
      "Avoid listing parents, siblings, or close family members",
      "Aim for 2 referees minimum",
    ],
  },
};

// ---------------------------------------------------------------------------
// Worked example resume — Jessica Taylor (from the workbook)
// ---------------------------------------------------------------------------

import type { ResumeData, CoverLetterData } from "./types";

export const exampleResume: ResumeData = {
  fullName: "Jessica Taylor",
  phone: "0412 345 678",
  email: "jessica.taylor@email.com",
  suburbState: "12 Bayside Ave, Melbourne VIC 3000",

  personalStatement:
    "I am an enthusiastic and dedicated Year 10 student at Bayside Secondary College with a strong interest in business, communication, and community service. I am a reliable team player who is eager to develop new skills in a professional environment. I am seeking a part-time or casual role where I can contribute positively and continue to grow.",
  personalQualities: [
    "Punctual, reliable, and hardworking",
    "Strong communication and listening skills",
    "Friendly and approachable with a positive attitude",
    "Able to work both independently and as part of a team",
    "Quick learner who takes initiative",
  ],

  currentSchool: "Bayside Secondary College, Melbourne",
  yearsAttended: "2021 – Present",
  subjects: "Currently completing Year 10. Subjects include English, Mathematics, Business Management, Media Studies, and Physical Education. Recipient of the Principal's Award for Academic Excellence (2023).",
  previousSchools: "",
  certificates: "CPCWHS1001 - Prepare to work safely in the construction industry (white card) — completed June 2026\nFirst Aid Certificate — completed February 2024",

  employment: [
    {
      id: "ex-1",
      role: "Volunteer",
      organisation: "Bayside Community Op-Shop",
      dates: "March 2024 – Present",
      bullets: [
        "Sorted and priced donated clothing and household items",
        "Assisted customers and handled cash transactions under supervision",
        "Worked collaboratively with a team of volunteers",
      ],
    },
    {
      id: "ex-2",
      role: "Work Experience",
      organisation: "Harrison & Co Real Estate",
      dates: "June 2024 (1 week)",
      bullets: [
        "Observed client meetings and property inspections",
        "Assisted with filing, data entry, and preparing marketing materials",
        "Developed understanding of professional workplace communication",
      ],
    },
  ],

  skillsDigital: "Microsoft Word, Excel, PowerPoint, Canva, Google Workspace",
  skillsCommunication: "Clear written and verbal communication; confident public speaker",
  skillsLanguages: "Fluent in English; conversational Vietnamese",
  skillsOther: "Strong time management; ability to prioritise tasks",
  skillsCertificates: "",

  achievements: [
    "Principal's Award for Academic Excellence — Bayside Secondary College, 2023",
    "Represented school in the Regional Public Speaking Competition, placing 2nd — 2023",
    "Student Representative Council (SRC) Member — 2023–2024",
    "Raised $850 for the Red Cross through a school fundraising event — 2024",
  ],

  hobbies:
    "I enjoy netball, playing in the local Bayside Junior League every Saturday. I am also passionate about photography and run a small creative Instagram page showcasing my work. I volunteer at my local animal shelter on weekends and enjoy reading non-fiction books about entrepreneurship and finance.",

  referees: [
    {
      id: "ex-r1",
      name: "Ms Robyn Chen",
      role: "Teacher — Commerce",
      organisation: "Bayside Secondary College",
      phone: "(03) 9876 5432",
      email: "rchen@bayside.edu.au",
    },
    {
      id: "ex-r2",
      name: "Mr Tom Bauer",
      role: "Op-Shop Coordinator",
      organisation: "Bayside Community Op-Shop",
      phone: "0412 345 678",
      email: "tbauer@baysideopshop.org.au",
    },
  ],
};

// ---------------------------------------------------------------------------
// Cover letter — intro content
// ---------------------------------------------------------------------------

export const coverLetterIntro = {
  whatIs:
    "A cover letter is a one-page letter that introduces you to an employer. It sits alongside your resume and answers one key question: 'Why should we hire YOU for THIS job?' It gives you the chance to show your personality and enthusiasm in a way a resume cannot.",
  whoNeeds: [
    "Part-time or casual jobs, especially when an application form asks for one",
    "Work experience or structured workplace learning placements",
    "Volunteering roles",
    "Scholarship, program, or traineeship applications",
    "Any job advertisement that says 'please include a cover letter'",
  ],
  keyRules: [
    "Keep it to one page (3–4 short paragraphs)",
    "Address it to a specific person if you can find a name",
    "Tailor it to the specific job — never send a generic copy-paste letter",
    "Match the tone of your resume and use clear, simple language",
    "Always tell the truth",
    "Check spelling and grammar carefully",
    "Save and send it as a PDF unless asked otherwise",
  ],
  commonMistakes: [
    "Starting every letter with 'To Whom It May Concern' when a name is available",
    "Repeating your resume word-for-word instead of adding new detail",
    "Writing a generic letter that could apply to any job",
    "Making it longer than one page",
    "Forgetting to mention the job title or where you saw the ad",
    "Spelling the company or manager's name incorrectly",
  ],
};

export const coverLetterChecklist = [
  "My contact details and the date are at the top",
  "I have addressed it to a real name where possible",
  "I have named the specific job and where I saw it advertised",
  "My letter is tailored to this job, not a generic copy",
  "I have given 1–2 specific examples that show my skills",
  "I have explained why I want to work for this company",
  "I have thanked the employer and invited them to contact me",
  "I have used a professional sign-off",
  "My letter is no longer than one page",
  "I have proofread for spelling and grammar errors",
];

// ---------------------------------------------------------------------------
// Cover letter — step-by-step content
// ---------------------------------------------------------------------------

export const clDetailsStep: StepContent = {
  title: "Your Details, Date & Greeting",
  blurb:
    "At the top, include your contact details, the date, and — if you can find one — the name of the person you are writing to.",
  whatToInclude: [
    "Your full name, phone, email and suburb/state",
    "Today's date",
    "The employer or manager's name (if you can find one)",
    "The company name and address",
    "The job title you are applying for, and where you saw it advertised",
  ],
  tip: "Can't find a name? Search the company website, call and ask reception, or check the job ad. If you truly cannot find one, use 'Dear Hiring Manager' instead of 'To Whom It May Concern'.",
};

export const clOpeningStep: StepContent = {
  title: "Paragraph 1 — The Opening",
  blurb:
    "State which job you are applying for, where you saw it advertised, and one sentence that sums up why you are a strong candidate.",
  whatToInclude: [
    "The exact job title you are applying for",
    "Where you saw the job advertised",
    "One sentence summing up why you're a strong candidate",
  ],
  sentenceStarters: [
    { label: "Standard", text: "I am writing to apply for the [job title] position advertised on/at [where you saw it]." },
    { label: "Referral", text: "I was excited to learn about the [job title] opportunity through [person/source] and am keen to apply." },
    { label: "Confident", text: "As a [year level] student with [quality/experience], I am confident I would be a valuable addition to your team." },
  ],
};

export const clFitStep: StepContent = {
  title: "Paragraph 2 — Why You're a Good Fit",
  blurb:
    "This is the main paragraph. Pick 1–2 examples from school, volunteering, sport, or work experience and explain the skills they gave you. Link your skills directly to what the job needs.",
  whatToInclude: [
    "1–2 specific examples (school, volunteering, sport, work experience)",
    "The skills those examples gave you",
    "A direct link between your skills and what the job needs",
  ],
  sentenceStarters: [
    { label: "Experience", text: "Through my role as [role] at [organisation], I developed skills in [skill], including [example]." },
    { label: "Qualities", text: "I am known for being [quality] and [quality], which I believe are essential for this role because..." },
    { label: "Linking", text: "This experience taught me how to [skill], which I could bring to the [job title] role." },
  ],
};

export const clCompanyStep: StepContent = {
  title: "Paragraph 3 — Why This Company",
  blurb:
    "Show you have done some research. Mention something specific you like about the company, and briefly restate your availability or enthusiasm.",
  whatToInclude: [
    "Something specific you like about the company (reputation, values, products)",
    "Your availability (days/times) and when you could start",
  ],
  sentenceStarters: [
    { label: "Company interest", text: "I am particularly drawn to [company name] because [reason, e.g. its reputation, values, products]." },
    { label: "Availability", text: "I am available [days/times] and would be able to start [timeframe]." },
  ],
};

export const clSignOffStep: StepContent = {
  title: "Sign-off",
  blurb: "Thank the employer for their time and finish with a professional sign-off.",
  whatToInclude: [
    "A thank you for their time/consideration",
    "An invitation for them to contact you or discuss at interview",
  ],
  sentenceStarters: [
    { label: "Thanks", text: "Thank you for considering my application. I have attached my resume for your reference." },
    { label: "Invite contact", text: "I would welcome the opportunity to discuss my application further at an interview." },
  ],
  tip: "Your sign-off line (Yours sincerely / Yours faithfully) is added automatically based on whether you addressed the letter to a named person.",
};

export const exampleCoverLetter: CoverLetterData = {
  fullName: "Jessica Taylor",
  phone: "0412 345 678",
  email: "jessica.taylor@email.com",
  suburbState: "12 Bayside Ave, Melbourne VIC 3000",

  date: "24 August 2026",
  employerName: "Mr Kelly",
  companyName: "Bayside Fresh Grocer",
  companyAddress: "45 Bay Street, Melbourne VIC 3000",
  jobTitle: "Casual Shop Assistant",
  whereSeen: "the Bayside Fresh Grocer noticeboard",

  openingParagraph:
    "I am writing to apply for the Casual Shop Assistant position advertised on the Bayside Fresh Grocer noticeboard. As a Year 10 student at Bayside Secondary College with volunteer retail experience, I am confident I would be a reliable and friendly addition to your team.",
  fitParagraph:
    "For the past year I have volunteered at the Bayside Community Op-Shop, where I sorted stock, priced items, and assisted customers with sales under supervision. This role taught me how to handle cash transactions accurately, stay organised during busy periods, and communicate politely with a wide range of customers. I am punctual, quick to learn new systems, and enjoy working as part of a team.",
  companyParagraph:
    "I am particularly drawn to Bayside Fresh Grocer because of its reputation for friendly, community-focused service, and I would love the opportunity to bring my enthusiasm and work ethic to your store. I am available on weekends and after school on weekdays.",
  closingParagraph:
    "Thank you for considering my application. I have attached my resume for your reference and would welcome the opportunity to discuss my application further at an interview.",
};
