import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Activity, ActionItem, ActivityType } from '../types';
import { ChevronRight, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- MOCK DATA ---
const ACTIVITIES: Activity[] = [
    { id: '1', time: '09:00 AM', title: 'Test Drive: Sarah Connor', subtitle: 'Porsche Macan GTS', type: ActivityType.TEST_DRIVE },
    { id: '2', time: '11:30 AM', title: 'Delivery: BMW X5', subtitle: 'M50i Package Prep', type: ActivityType.DELIVERY },
    { id: '3', time: '02:00 PM', title: 'Sales Meeting', subtitle: 'Q3 Targets Review', type: ActivityType.MEETING },
    { id: '4', time: '04:15 PM', title: 'Follow-up: James Bond', subtitle: 'Aston Inquiry', type: ActivityType.CALL },
];

const ACTIONS: ActionItem[] = [
    { id: '1', title: 'Draft Quote: Mr. Wayne', description: 'Lamborghini Revuelto', due: '2h', priority: 'High' },
    { id: '2', title: 'Update CRM Profile', description: 'Lead #4092 details', due: '4h', priority: 'Medium' },
    { id: '3', title: 'Confirm Service Appt', description: 'Mrs. Robinson', due: 'Today', priority: 'Low' },
];

// --- COMPONENTS ---

const ActivityItem: React.FC<{ item: Activity }> = ({ item }) => {
    // Updated Badge Color Mapping
    let badgeColor: 'indigo' | 'green' | 'purple' | 'yellow' | 'slate' = 'slate';
    if (item.type === ActivityType.TEST_DRIVE) badgeColor = 'indigo';
    if (item.type === ActivityType.DELIVERY) badgeColor = 'green';
    if (item.type === ActivityType.MEETING) badgeColor = 'purple';
    if (item.type === ActivityType.CALL) badgeColor = 'yellow';

    return (
        <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-100/80 last:border-0 hover:bg-white/50 -mx-4 md:-mx-6 px-4 md:px-6 transition-colors group cursor-pointer gap-2 sm:gap-0">
            <div className="w-full sm:w-20 shrink-0 text-xs sm:text-sm font-medium text-slate-400 flex justify-between sm:block">
                {item.time}
                <span className="sm:hidden block"><Badge label={item.type} color={badgeColor} variant="solid" className="text-[10px] py-0" /></span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{item.title}</p>
                <p className="text-xs font-medium text-slate-500 truncate">{item.subtitle}</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 ml-2">
                <Badge label={item.type} color={badgeColor} variant="solid" />
                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600" />
            </div>
        </div>
    );
};

const ActionItemRow: React.FC<{ item: ActionItem }> = ({ item }) => (
    <div className="flex items-start py-3 border-b border-slate-100/80 last:border-0 hover:bg-white/50 -mx-4 md:-mx-6 px-4 md:px-6 transition-colors group cursor-pointer">
        <div className="mt-1 mr-3 text-slate-600 group-hover:text-slate-500 shrink-0">
             {item.priority === 'High' ? <AlertCircle size={18} className="text-inventis-red" /> : <CheckCircle2 size={18} />}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{item.title}</p>
            <p className="text-xs font-medium text-slate-500 truncate">{item.description}</p>
            <div className="mt-2 sm:hidden flex">
                 <Badge label={`Due: ${item.due}`} variant="light" color={item.priority === 'High' ? 'red' : 'slate'} />
            </div>
        </div>
        <div className="flex items-center gap-3 pl-2 shrink-0">
             <div className="hidden sm:block">
                <Badge label={`Due: ${item.due}`} variant="light" color={item.priority === 'High' ? 'red' : 'slate'} />
             </div>
             <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-600" />
        </div>
    </div>
);

export const RowTwo: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Today' | 'Tomorrow'>('Today');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-4 h-full min-h-0">
            {/* LEFT: Today's Activities */}
            <div className="md:col-span-1 lg:col-span-6 h-auto lg:h-full min-h-0">
                <Card 
                    title="Activities"
                    className="bg-[#F8F8F8] lg:bg-white" // Mobile specific tint
                    fullHeight
                    action={
                        <div className="flex bg-slate-200/50 rounded-lg p-0.5 w-full sm:w-auto">
                            {(['Today', 'Tomorrow'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 sm:flex-none px-3 py-1 text-xs font-bold rounded-md transition-all ${
                                        activeTab === tab 
                                        ? 'bg-white text-slate-900 shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    }
                    footer={
                        <button className="w-full text-center text-sm font-bold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 py-1">
                            <Calendar size={16} /> View Full Calendar
                        </button>
                    }
                >
                   <div className="flex flex-col">
                       {ACTIVITIES.map(act => <ActivityItem key={act.id} item={act} />)}
                   </div>
                </Card>
            </div>

            {/* RIGHT: Action Items */}
            <div className="md:col-span-1 lg:col-span-6 h-auto lg:h-full min-h-0">
                <Card title="Action Items" className="bg-[#F6F6F6] lg:bg-white" fullHeight>
                    <div className="flex flex-col">
                        {ACTIONS.map(action => <ActionItemRow key={action.id} item={action} />)}
                    </div>
                </Card>
            </div>
        </div>
    );
};