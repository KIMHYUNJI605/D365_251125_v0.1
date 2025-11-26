
export interface KPI {
  id: string;
  label: string;
  value: string;
  trend: number; // positive or negative
  data: number[]; // for sparkline
}

export enum ActivityType {
  TEST_DRIVE = 'TEST DRIVE',
  DELIVERY = 'DELIVERY',
  MEETING = 'MEETING',
  CALL = 'CALL',
  TASK = 'TASK',
  QUOTE = 'QUOTE',
  LEAD = 'LEAD'
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: ActivityType;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Lead {
  id: string;
  name: string;
  source: 'Walk-in' | 'Web' | 'Referral' | 'Phone';
  vehicle: string;
  status: 'HOT' | 'WARM' | 'COLD';
}

export interface TimelineEvent {
  id: string;
  time: string;
  type: ActivityType;
  description: string;
  isToday: boolean;
}

export type DealStage = 
  | 'Lead Contacted' 
  | 'Appointment Set' 
  | 'Visit / Test Drive' 
  | 'Worksheet / Desking' 
  | 'Credit & Docs' 
  | 'F&I' 
  | 'Contract Signing' 
  | 'Delivery'
  | 'Post Follow-up';

export interface Deal {
  id: string;
  customerName: string;
  leadSource: 'Web' | 'Phone' | 'Walk-in' | 'Referral' | 'Campaign';
  year: string;
  vehicle: string;
  trim: string;
  dealAmount: string;
  status: 'HOT' | 'WARM' | 'COLD';
  stage: DealStage;
  lastActivity: string;
  lastActivityTime: string;
  nextAction?: string;
  agent?: string;
  missingDocs?: boolean;
  probability?: number;
}
