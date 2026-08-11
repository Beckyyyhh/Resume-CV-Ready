export interface EmploymentEntry {
  id: string;
  role: string;
  organisation: string;
  dates: string;
  bullets: string[];
}

export interface RefereeEntry {
  id: string;
  name: string;
  role: string;
  organisation: string;
  phone: string;
  email: string;
}

export interface ResumeData {
  fullName: string;
  phone: string;
  email: string;
  suburbState: string;

  personalStatement: string;
  personalQualities: string[];

  currentSchool: string;
  yearsAttended: string;
  subjects: string;
  previousSchools: string;
  certificates: string;

  employment: EmploymentEntry[];

  skillsDigital: string;
  skillsCommunication: string;
  skillsLanguages: string;
  skillsOther: string;
  skillsCertificates: string;

  achievements: string[];

  hobbies: string;

  referees: RefereeEntry[];
}

export const emptyResumeData: ResumeData = {
  fullName: "",
  phone: "",
  email: "",
  suburbState: "",

  personalStatement: "",
  personalQualities: [],

  currentSchool: "",
  yearsAttended: "",
  subjects: "",
  previousSchools: "",
  certificates: "",

  employment: [],

  skillsDigital: "",
  skillsCommunication: "",
  skillsLanguages: "",
  skillsOther: "",
  skillsCertificates: "",

  achievements: [],

  hobbies: "",

  referees: [],
};

export interface CoverLetterData {
  fullName: string;
  phone: string;
  email: string;
  suburbState: string;

  date: string;
  employerName: string;
  companyName: string;
  companyAddress: string;
  jobTitle: string;
  whereSeen: string;

  openingParagraph: string;
  fitParagraph: string;
  companyParagraph: string;
  closingParagraph: string;
}

export const emptyCoverLetterData: CoverLetterData = {
  fullName: "",
  phone: "",
  email: "",
  suburbState: "",

  date: "",
  employerName: "",
  companyName: "",
  companyAddress: "",
  jobTitle: "",
  whereSeen: "",

  openingParagraph: "",
  fitParagraph: "",
  companyParagraph: "",
  closingParagraph: "",
};
