export interface Application {
  id: string;
  gradeRequested: string;
  documents: any[];
  guardians?: any[];
  studentName?: string;
  leadId?: string;
}

export interface Test {
  subject: string;
  date: string;
  time: string;
  location: string;
  score?: number;
  maxScore?: number;
}

export interface Interview {
  date: string;
  time: string;
  interviewer: string;
  location: string;
}

export interface Decision {
  decision: "accept" | "waitlist" | "reject";
  reason: string;
}
