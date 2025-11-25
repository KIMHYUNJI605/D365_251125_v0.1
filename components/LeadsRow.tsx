import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Lead, TimelineEvent, ActivityType } from '../types';
import { ChevronRight } from 'lucide-react';

// --- MOCK DATA ---
const LEADS: Lead[] = [
    { id: '1', name: 'Michael Ross', source: 'Web', vehicle: 'Porsche 911 Turbo S', status: 'HOT' },
    { id: '2', name: 'Rachel Zane', source: 'Walk-in', vehicle: 'Range Rover Sport', status: 'WARM' },
    { id: '3', name: 'Harvey Specter', source: 'Referral', vehicle: 'Mercedes S-Class', status: 'HOT' },
    { id: '4', name: 'Louis Litt', source: 'Phone', vehicle: 'BMW i7', status: 'COLD' },
];

const TIMELINE: TimelineEvent[] = [
    { id: '1', time: '10:45 AM', type: ActivityType.QUOTE, description: 'Sent Quote #8821', isToday: true },
    { id: '2', time: '09:15 AM', type: ActivityType.CALL, description: 'Inbound Service Call', isToday: true },
    { id: '3', time: '04:30 PM', type: ActivityType.LEAD, description: 'Lead Assigned: M. Ross', isToday: false },
    { id: '4', time: '02:00 PM', type: ActivityType.TASK, description: 'Test drive log completed', isToday: false },
];

// --- COMPONENTS ---

const LeadRowItem: React.FC<{ lead: Lead }> = ({ lead }) => {
    let badgeColor: 'red' | 'orange' | 'slate' = 'slate';
    if (lead.status === 'HOT') badgeColor = 'red';
    if (lead.status === 'WARM') badgeColor = 'orange';

    return (
        <div className="flex items-center py-3.5 border-b border-slate-100 last:border-0 -mx-4 md:-mx-6 px-4 md:px-6 hover:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center">
                {/* Mobile Layout: Stacked */}
                <div className="col-span-1 sm:col-span-4 flex justify-between sm:block items-center">
                    <p className="text-sm font-bold text-slate-900 truncate">{lead.name}</p>
                    <div className="sm:hidden"><Badge label={lead.status} color={badgeColor} variant="solid" /></div>
                </div>
                
                <div className="col-span-1 sm:col-span-5 flex items-center gap-2 sm:block">
                    <span className="text-xs font-medium text-slate-400 sm:hidden">{lead.source} •</span>
                    <p className="text-sm font-medium text-slate-700 truncate">{lead.vehicle}</p>
                </div>
                
                <div className="hidden sm:block col-span-3 text-right">
                    <Badge label={lead.status} color={badgeColor} variant="solid" />
                </div>
                <div className="hidden sm:block col-span-12 mt-1">
                     <p className="text-xs text-slate-400 font-medium">{lead.source}</p>
                </div>
            </div>
            <div className="ml-4 hidden sm:block">
                 <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-600" />
            </div>
        </div>
    );
};

const TimelineItem: React.FC<{ event: TimelineEvent }> = ({ event }) => (
    <div className="relative pl-6 py-2 group cursor-pointer">
        {/* Vertical Spine */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-slate-200 group-last:bottom-auto group-last:h-4"></div>
        {/* Dot */}
        <div className={`absolute left-0 top-3 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 
            ${event.isToday ? 'bg-slate-800' : 'bg-slate-300'}`}></div>
        
        <div className="flex items-center justify-between bg-white p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-mono text-slate-400">{event.time}</span>
                    <Badge label={event.type} color="slate" variant="light" className="scale-90 origin-left opacity-80" />
                </div>
                <p className="text-sm font-medium text-slate-700 line-clamp-2 sm:line-clamp-1">{event.description}</p>
            </div>
            <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-500 hidden sm:block" />
        </div>
    </div>
);

export const RowThree: React.FC = () => {
    const todayEvents = TIMELINE.filter(e => e.isToday);
    const yesterdayEvents = TIMELINE.filter(e => !e.isToday);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-4 h-full min-h-0">
            {/* LEFT: New Leads */}
            <div className="md:col-span-1 lg:col-span-6 h-auto lg:h-full min-h-0">
                <Card title="New Leads" className="bg-white" fullHeight>
                    <div className="flex flex-col">
                        {/* Header only visible on Tablet/Desktop */}
                        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50 -mx-6 border-b border-slate-100 mb-1">
                            <div className="col-span-4">Name</div>
                            <div className="col-span-5">Interest</div>
                            <div className="col-span-3 text-right">Status</div>
                        </div>
                        {LEADS.map(lead => <LeadRowItem key={lead.id} lead={lead} />)}
                    </div>
                </Card>
            </div>

            {/* RIGHT: Recent Activity Timeline */}
            <div className="md:col-span-1 lg:col-span-6 h-auto lg:h-full min-h-0">
                <Card title="Recent Activity" className="bg-white" fullHeight>
                    <div className="flex flex-col pl-1 md:pl-2">
                        {todayEvents.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 ml-6">Today</h4>
                                {todayEvents.map(e => <TimelineItem key={e.id} event={e} />)}
                            </div>
                        )}
                         {yesterdayEvents.length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 ml-6">Yesterday</h4>
                                {yesterdayEvents.map(e => <TimelineItem key={e.id} event={e} />)}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};