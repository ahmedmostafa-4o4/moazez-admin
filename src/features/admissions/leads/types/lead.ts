export interface Lead {
  [key: string]: any;
  id: string;
  name: string;
  gradeInterest: string;
  status: string;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  leadId: string;
  type: string;
  message: string;
  createdAt: string;
  createdBy: string;
}

export interface Note {
  id: string;
  leadId: string;
  body: string;
  createdAt: string;
  createdBy: string;
}

export interface ApplicationDraft {
  id: string;
  leadId: string;
  studentName: string;
  gradeRequested: string;
  status: string;
  createdAt: string;
}
