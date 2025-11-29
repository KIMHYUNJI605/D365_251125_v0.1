import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Deal, DealStage } from '../types';
import { 
  Search, Filter, Plus, MoreHorizontal, AlertCircle, Calendar, 
  FileText, Phone, Mail, X, Sparkles, ArrowRight, ChevronRight, 
  CheckSquare, Clock, ShieldCheck, DollarSign, UserCheck, Send
} from 'lucide-react';
import { Badge } from './ui/Badge';

// --- STAGE DEFINITIONS (9 Columns) ---
const STAGES: DealStage[] = [
  'Lead Contacted', 
  'Appointment Set', 
  'Visit / Test Drive', 
  'Worksheet / Desking', 
  'Credit & Docs', 
  'F&I', 
  'Contract Signing', 
  'Delivery', 
  'Post Follow-up'
];

// --- MOCK DATA GENERATION ---
const DEALS: Deal[] = [
  // 1. Lead Contacted
  { id: '101', customerName: 'Michael Corleone', leadSource: 'Web', year: '2025', vehicle: 'Porsche Panamera', trim: 'Turbo S', dealAmount: '$185,000', status: 'HOT', stage: 'Lead Contacted', lastActivity: 'Email Opened', lastActivityTime: '10m ago', nextAction: 'Call to qualify', probability: 15 },
  { id: '102', customerName: 'Sarah Connor', leadSource: 'Phone', year: '2024', vehicle: 'Audi Q8', trim: 'Prestige', dealAmount: '$92,500', status: 'WARM', stage: 'Lead Contacted', lastActivity: 'Inbound Call', lastActivityTime: '2h ago', nextAction: 'Send brochure', probability: 10 },
  { id: '103', customerName: 'John Wick', leadSource: 'Walk-in', year: '2025', vehicle: 'Ford Mustang', trim: 'Dark Horse', dealAmount: '$68,000', status: 'HOT', stage: 'Lead Contacted', lastActivity: 'Walk-in Visit', lastActivityTime: '4h ago', nextAction: 'Schedule Drive', probability: 25 },

  // 2. Appointment Set
  { id: '201', customerName: 'Tony Stark', leadSource: 'Referral', year: '2025', vehicle: 'Audi R8', trim: 'V10 Performance', dealAmount: '$210,000', status: 'HOT', stage: 'Appointment Set', lastActivity: 'Appt Confirmed', lastActivityTime: '1h ago', nextAction: 'Prep Vehicle', probability: 40 },
  { id: '202', customerName: 'Bruce Banner', leadSource: 'Web', year: '2024', vehicle: 'Range Rover', trim: 'Autobiography', dealAmount: '$155,000', status: 'COLD', stage: 'Appointment Set', lastActivity: 'SMS Sent', lastActivityTime: '1d ago', nextAction: 'Confirm Time', probability: 35 },

  // 3. Visit / Test Drive
  { id: '301', customerName: 'Diana Prince', leadSource: 'Campaign', year: '2025', vehicle: 'Mercedes-Benz', trim: 'G 63 AMG', dealAmount: '$189,000', status: 'HOT', stage: 'Visit / Test Drive', lastActivity: 'Driving Now', lastActivityTime: 'Now', nextAction: 'Debrief & Quote', probability: 50 },
  { id: '302', customerName: 'Clark Kent', leadSource: 'Walk-in', year: '2024', vehicle: 'Toyota Tacoma', trim: 'TRD Pro', dealAmount: '$54,000', status: 'WARM', stage: 'Visit / Test Drive', lastActivity: 'License Scan', lastActivityTime: '15m ago', nextAction: 'Start Drive', probability: 45 },

  // 4. Worksheet / Desking
  { id: '401', customerName: 'Peter Parker', leadSource: 'Web', year: '2025', vehicle: 'Honda Civic', trim: 'Type R', dealAmount: '$44,800', status: 'HOT', stage: 'Worksheet / Desking', lastActivity: 'Numbers Presented', lastActivityTime: '30m ago', nextAction: 'Negotiate Trade', probability: 60 },
  
  // 5. Credit & Docs
  { id: '501', customerName: 'Wade Wilson', leadSource: 'Web', year: '2024', vehicle: 'Porsche 911', trim: 'GT3 RS', dealAmount: '$285,000', status: 'HOT', stage: 'Credit & Docs', lastActivity: 'Credit Pulled', lastActivityTime: '2h ago', nextAction: 'Verify Income', probability: 75, missingDocs: true },
  { id: '502', customerName: 'Matt Murdock', leadSource: 'Referral', year: '2024', vehicle: 'Lexus IS', trim: '500 F Sport', dealAmount: '$65,000', status: 'WARM', stage: 'Credit & Docs', lastActivity: 'App Submitted', lastActivityTime: '4h ago', nextAction: 'Stip Collection', probability: 70 },

  // 6. F&I
  { id: '601', customerName: 'Steve Rogers', leadSource: 'Walk-in', year: '2025', vehicle: 'Chevrolet Silverado', trim: 'High Country', dealAmount: '$78,000', status: 'WARM', stage: 'F&I', lastActivity: 'Menu Presentation', lastActivityTime: '10m ago', nextAction: 'Print Contract', probability: 85 },

  // 7. Contract Signing
  { id: '701', customerName: 'Natasha Romanoff', leadSource: 'Web', year: '2025', vehicle: 'Corvette', trim: 'Z06', dealAmount: '$115,000', status: 'HOT', stage: 'Contract Signing', lastActivity: 'Signing', lastActivityTime: 'Now', nextAction: 'Finalize Down Pmt', probability: 95 },

  // 8. Delivery
  { id: '801', customerName: 'TChalla', leadSource: 'Referral', year: '2025', vehicle: 'Lexus LC', trim: '500 Inspiration', dealAmount: '$108,000', status: 'HOT', stage: 'Delivery', lastActivity: 'Detailing', lastActivityTime: '1h ago', nextAction: 'Handover Keys', probability: 100 },

  // 9. Post Follow-up
  { id: '901', customerName: 'Nick Fury', leadSource: 'Campaign', year: '2024', vehicle: 'Cadillac Escalade', trim: 'V-Series', dealAmount: '$152,000', status: 'WARM', stage: 'Post Follow-up', lastActivity: 'Survey Sent', lastActivityTime: '2d ago', nextAction: 'Service Intro', probability: 100 },
];

// --- COMPONENTS ---

// 1. KPI CARD (Micro version - Single Line)
const KPIItem: React.FC<{ label: string; value: string; trend: string; up: boolean }> = ({ label, value, trend, up }) => (
  <div className="bg-white rounded-[6px] shadow-sm border border-slate-200 px-4 flex items-center justify-between h-[44px] min-w-[180px]">
    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-lg font-bold text-[#424651]">{value}</span>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        <span>{trend}</span>
        <span>{up ? '▲' : '▼'}</span>
      </div>
    </div>
  </div>
);

// 2. DEAL CARD
const DealCard: React.FC<{ deal: Deal; onClick: (d: Deal) => void; isSelected: boolean }> = ({ deal, onClick, isSelected }) => {
  const statusColor = 
    deal.status === 'HOT' ? 'bg-[#E75A5A]' : 
    deal.status === 'WARM' ? 'bg-[#F2A444]' : 'bg-[#8AA4FF]';

  return (
    <div 
      onClick={() => onClick(deal)}
      className={`
        w-full bg-white rounded-[6px] p-4 cursor-pointer transition-all duration-200 border relative group
        ${isSelected 
          ? 'ring-2 ring-[#B4E975] shadow-card-hover border-transparent z-10 scale-[1.02]' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-card'
        }
      `}
    >
      {/* [1] Header: Name + Status */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-[16px] font-bold text-[#424651] leading-tight group-hover:text-black transition-colors">
          {deal.customerName}
        </h3>
        <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-[4px] uppercase tracking-wide ${statusColor}`}>
          {deal.status}
        </span>
      </div>

      {/* [2] Lead Source */}
      <div className="mb-2">
         <span className="text-[11px] font-medium text-slate-500">{deal.leadSource} Lead</span>
      </div>

      {/* [3] Vehicle Info */}
      <div className="mb-1">
        <p className="text-[14px] font-medium text-[#424651]">
          {deal.year} {deal.vehicle}
        </p>
        <p className="text-[12px] text-slate-500">{deal.trim}</p>
      </div>

      {/* [4] Amount */}
      <div className="flex justify-end mb-3">
        <span className="text-[14px] font-bold text-[#424651]">{deal.dealAmount}</span>
      </div>

      <div className="h-px bg-slate-100 w-full mb-3"></div>

      {/* [5] & [6] Activity & Next Action */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
           <p className="text-[11px] text-slate-500 truncate">
             {deal.lastActivity} · {deal.lastActivityTime}
           </p>
        </div>
        {deal.nextAction && (
          <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-[4px] w-fit max-w-full">
             <ArrowRight size={10} />
             <p className="text-[11px] font-bold truncate">Next: {deal.nextAction}</p>
          </div>
        )}
      </div>

      {/* Missing Docs Indicator */}
      {deal.missingDocs && (
        <div className="absolute top-[-4px] right-[-4px]">
           <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </div>
      )}
    </div>
  );
};

export const DealsScreen: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [myDealsOnly, setMyDealsOnly] = useState(false); // State for My Deals toggle

  // Checklist State Management
  const [tasks, setTasks] = useState([
     { id: 1, txt: 'Upload Driver License', done: true, urgent: false, due: 'Today' },
     { id: 2, txt: 'Collect Deposit ($1,000)', done: false, urgent: true, due: 'Tomorrow' },
     { id: 3, txt: 'Confirm Insurance Validity', done: false, urgent: true, due: '2 Days' },
     { id: 4, txt: 'Sign Privacy Notice', done: false, urgent: false, due: '3 Days' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Notes State Management
  const [notes, setNotes] = useState<{id: number, text: string, author: string, time: string}[]>([
      { id: 1, text: "Wife prefers the beige interior, but husband wants black. Need to find a compromise unit or check incoming inventory.", author: "Alex M.", time: "Yesterday" }
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
      if (!newNote.trim()) return;
      const note = {
          id: Date.now(),
          text: newNote,
          author: "Alex M.",
          time: "Just now"
      };
      setNotes([note, ...notes]);
      setNewNote('');
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F7F7] overflow-hidden">
      
      {/* --- ACTION HEADER --- */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10">
        
        {/* LEFT: Search */}
        <div className="flex items-center gap-2">
            {/* Date Range Picker (Mock) */}
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-[6px] text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
              <Calendar size={16} className="text-slate-400" />
              <span>This Month</span>
              <ChevronRight size={14} className="text-slate-400 rotate-90" />
           </button>
           <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
            <input 
               type="text" 
               placeholder="Search deals, people..." 
               className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[6px] text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64 transition-all"
            />
           </div>
           <div className="h-6 w-px bg-slate-300 mx-1"></div>
           {/* Filter Button */}
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-[6px] text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
              <Filter size={16} />
              <span>Filter</span>
           </button>
        </div>

        {/* CENTER: Controls */}
        <div className="flex items-center gap-3">
           {/* My Deals Toggle */}
           <button 
             onClick={() => setMyDealsOnly(!myDealsOnly)}
             className={`flex items-center gap-2 px-3 py-2 border rounded-[6px] text-sm font-medium transition-all ${
                myDealsOnly 
                ? 'bg-[#424651] border-[#424651] text-white shadow-sm' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
             }`}
           >
              <UserCheck size={16} className={myDealsOnly ? 'text-[#B4E975]' : 'text-slate-400'} />
              <span>My Deals Only</span>
           </button>
           <div className="h-6 w-px bg-slate-300 mx-1"></div>
           {/* RIGHT: New Deal */}
            <button className="flex items-center gap-2 bg-[#424651] hover:bg-[#2d3038] text-white px-4 py-2 rounded-[6px] text-sm font-bold shadow-sm transition-all active:scale-95">
               <Plus size={18} />
               <span>New Deal</span>
            </button>
        </div>    
      </div>

      {/* --- TOP KPI BAR --- */}
      <div className="shrink-0 bg-[#F7F7F7] px-6 py-4 grid grid-cols-4 gap-4 border-b border-slate-200/50">
        <KPIItem label="Deals Today" value="12" trend="3" up={true} />
        <KPIItem label="Hot Deals" value="8" trend="2" up={true} />
        <KPIItem label="Pending Docs" value="5" trend="1" up={false} />
        <KPIItem label="Appts Today" value="7" trend="0" up={true} />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* KANBAN BOARD */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
           <div className="h-full px-6 py-4 flex gap-4 min-w-max pb-8">
              {STAGES.map((stage) => {
                 const stageDeals = DEALS.filter(d => d.stage === stage);
                 return (
                   <div key={stage} className="flex flex-col h-full w-[300px] shrink-0 align-top">
                      {/* Column Header */}
                      <div className="flex items-center justify-between mb-4 pl-1 pr-2">
                         <div className="flex items-center gap-2">
                            <h4 className="text-[13px] font-bold text-[#424651] uppercase tracking-tight">{stage}</h4>
                            <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-[4px]">
                               {stageDeals.length}
                            </span>
                         </div>
                         <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                      </div>

                      {/* Drop Zone */}
                      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-20 pr-1 no-scrollbar">
                         {stageDeals.map(deal => (
                           <DealCard 
                              key={deal.id} 
                              deal={deal} 
                              onClick={setSelectedDeal} 
                              isSelected={selectedDeal?.id === deal.id} 
                           />
                         ))}
                         {/* Empty State Stub */}
                         {stageDeals.length === 0 && (
                           <div className="h-24 border-2 border-dashed border-slate-200 rounded-[6px] flex items-center justify-center bg-slate-50/50">
                              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Empty</span>
                           </div>
                         )}
                      </div>
                   </div>
                 );
              })}
           </div>
        </div>

        {/* --- DETAIL PANEL (Portal Overlay + Slide-in) --- */}
        {selectedDeal && createPortal(
          <>
            {/* Dimmer Overlay - z-90 to be above FABs (z-50) */}
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[90] transition-opacity duration-300"
              onClick={() => setSelectedDeal(null)}
            ></div>

            {/* Panel Container - z-100 to be topmost */}
            <div className="fixed top-0 right-0 w-[450px] md:w-[520px] h-screen bg-white z-[100] shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300 ease-out">
               
               {/* Header */}
               <div className="shrink-0 p-6 border-b border-slate-100 bg-white">
                  <div className="flex justify-between items-start mb-2">
                     <div>
                        <div className="flex items-center gap-2">
                           <h2 className="text-xl font-bold text-[#424651]">{selectedDeal.customerName}</h2>
                           <Badge label={selectedDeal.status} variant="solid" color={selectedDeal.status === 'HOT' ? 'red' : selectedDeal.status === 'WARM' ? 'orange' : 'blue'} className="scale-90" />
                        </div>
                        <p className="text-xs text-slate-400 font-medium mt-1">Lead ID: #{selectedDeal.id} • {selectedDeal.leadSource}</p>
                     </div>
                     <button onClick={() => setSelectedDeal(null)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
                        <X size={20} />
                     </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                     <Badge label={selectedDeal.stage} variant="light" color="slate" />
                     <span className="text-xs text-slate-400">•</span>
                     <span className="text-sm font-bold text-[#424651]">{selectedDeal.dealAmount}</span>
                  </div>
               </div>

               {/* Scrollable Body */}
               <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
                  
                  {/* 1. Vehicle Info Summary */}
                  <div className="flex items-start gap-4 p-4 bg-[#F7F7F7] rounded-[6px] border border-slate-100">
                      <div className="w-12 h-12 bg-white rounded-[6px] border border-slate-200 flex items-center justify-center shrink-0">
                         <CheckSquare size={20} className="text-slate-400" />
                      </div>
                      <div>
                         <h3 className="text-sm font-bold text-[#424651]">{selectedDeal.year} {selectedDeal.vehicle}</h3>
                         <p className="text-xs text-slate-500 mb-1">{selectedDeal.trim} • Stock #K2921</p>
                         <p className="text-[10px] font-bold text-indigo-600 cursor-pointer hover:underline">View VDP & Specs</p>
                      </div>
                  </div>

                  {/* 2. AI Recommendation (Dark Mode) */}
                  <div className="bg-[#424651] rounded-[6px] p-5 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-[-10%] right-[-10%] opacity-10 rotate-12">
                        <Sparkles size={100} className="text-white" />
                     </div>
                     <div className="flex items-center gap-2 mb-3 relative z-10">
                        <Sparkles size={14} className="text-[#B4E975]" />
                        <span className="text-[#B4E975] text-[11px] font-bold uppercase tracking-wider">Dealer365 AI Insight</span>
                     </div>
                     <p className="text-white text-sm font-medium leading-relaxed mb-4 relative z-10">
                        Customer engagement score is <span className="text-[#B4E975]">High (85/100)</span>. 
                        Based on recent web activity, they are comparing financing options. 
                        <br/><br/>
                        <strong>Recommendation:</strong> Send the "Low APR Special" proposal immediately to secure an appointment.
                     </p>
                     <button className="w-full bg-[#B4E975] hover:bg-[#a0d766] text-[#424651] text-xs font-bold py-2.5 rounded-[4px] flex items-center justify-center gap-2 transition-colors relative z-10">
                        Generate & Send Proposal <ArrowRight size={14} />
                     </button>
                  </div>

                  {/* 3. Deal Probability */}
                  <div>
                     <div className="flex justify-between items-end mb-2">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Closing Probability</h4>
                        <span className="text-sm font-bold text-[#424651]">{selectedDeal.probability}%</span>
                     </div>
                     <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${selectedDeal.probability && selectedDeal.probability > 50 ? 'bg-[#424651]' : 'bg-slate-400'}`} 
                          style={{ width: `${selectedDeal.probability}%` }}
                        ></div>
                     </div>
                  </div>

                  {/* 4. Quick Actions Grid */}
                  <div>
                     <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">Quick Actions</h4>
                     <div className="grid grid-cols-4 gap-2">
                        {[
                           { icon: Phone, label: 'Call' },
                           { icon: Mail, label: 'Email' },
                           { icon: Calendar, label: 'Book' },
                           { icon: FileText, label: 'Quote' },
                           //{ icon: ShieldCheck, label: 'Verify' },
                           //{ icon: DollarSign, label: 'Desk' },
                           //{ icon: Clock, label: 'Log' },
                           //{ icon: MoreHorizontal, label: 'More' }
                        ].map((action, i) => (
                           <button key={i} className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white border border-slate-200 rounded-[6px] hover:bg-slate-50 hover:border-slate-300 transition-all">
                              <action.icon size={18} className="text-[#424651]" />
                              <span className="text-[10px] font-semibold text-slate-600">{action.label}</span>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* 5. Required Tasks Checklist (Interactive) */}
                  <div>
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Required Tasks</h4>
                        <div className="flex gap-2">
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-[4px]">
                                {tasks.filter(t => t.done).length}/{tasks.length} Done
                            </span>
                            {tasks.some(t => t.urgent && !t.done) && (
                                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-[4px]">Action Req</span>
                            )}
                        </div>
                     </div>
                     <div className="space-y-2">
                        {tasks.map((task) => (
                           <div 
                             key={task.id} 
                             onClick={() => toggleTask(task.id)}
                             className={`flex items-center gap-3 p-3 bg-white rounded-[6px] border transition-colors cursor-pointer group ${
                                 task.done ? 'border-slate-100' : 'border-slate-200 hover:border-indigo-300'
                             }`}
                           >
                               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                                   task.done 
                                   ? 'bg-[#424651] border-[#424651]' 
                                   : 'border-slate-300 group-hover:border-indigo-400 bg-white'
                               }`}>
                                  {task.done && <div className="w-1.5 h-1.5 bg-white rounded-[1px]"></div>}
                               </div>
                               
                               <div className="flex-1 min-w-0">
                                   <p className={`text-xs font-medium truncate ${task.done ? 'text-slate-400 line-through' : 'text-[#424651]'}`}>
                                       {task.txt}
                                   </p>
                               </div>

                               <div className="flex items-center gap-2 shrink-0">
                                   {!task.done && (
                                       <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                           task.urgent ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                                       }`}>
                                           Due: {task.due}
                                       </span>
                                   )}
                                   {task.urgent && !task.done && <AlertCircle size={14} className="text-[#E75A5A]" />}
                               </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* 6. Timeline */}
                  <div>
                     <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-4">Activity Timeline</h4>
                     <div className="pl-2 border-l-2 border-slate-100 space-y-6">
                        {[
                           { time: 'Today, 10:15 AM', title: 'Quote Sent', sub: 'Updated pricing with trade-in value', icon: FileText },
                           { time: 'Yesterday, 2:30 PM', title: 'Phone Call (5m 12s)', sub: 'Discussed interior color options', icon: Phone },
                           { time: 'Yesterday, 9:00 AM', title: 'Test Drive Completed', sub: 'Customer liked handling, concerned about size', icon: CheckSquare },
                           { time: 'Mon, 4:45 PM', title: 'Lead Assigned', sub: 'Source: Web Inquiry', icon: UserPlus },
                        ].map((event, i) => (
                           <div key={i} className="relative pl-5 group">
                              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white group-hover:bg-[#424651] transition-colors"></div>
                              <div className="flex justify-between items-start">
                                 <div>
                                    <p className="text-xs font-bold text-[#424651]">{event.title}</p>
                                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{event.sub}</p>
                                 </div>
                                 <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{event.time}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-[#424651] py-2 border border-dashed border-slate-200 rounded-[6px] hover:border-slate-300 transition-colors">
                        View Full History
                     </button>
                  </div>

                  {/* 7. Internal Notes (Interactive) */}
                  <div className="pb-10">
                     <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">Internal Notes</h4>
                     
                     {/* Add New Note */}
                     <div className="flex gap-2 mb-4">
                        <input 
                           type="text" 
                           value={newNote}
                           onChange={(e) => setNewNote(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                           placeholder="Add a quick note..."
                           className="flex-1 text-xs border border-slate-200 rounded-[6px] px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <button 
                           onClick={handleAddNote}
                           disabled={!newNote.trim()}
                           className="bg-[#424651] text-white p-2 rounded-[6px] hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                           <Send size={14} />
                        </button>
                     </div>

                     {/* Notes List */}
                     <div className="space-y-3">
                        {notes.map((note) => (
                           <div key={note.id} className="bg-[#fff9c4] p-3 rounded-[6px] border border-yellow-200 shadow-sm relative group">
                              <p className="text-xs text-yellow-900 leading-relaxed font-medium">
                                 "{note.text}"
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-2">
                                 <p className="text-[10px] text-yellow-700/60 font-bold">- {note.author}</p>
                                 <span className="text-[9px] text-yellow-700/40">• {note.time}</span>
                              </div>
                           </div>
                        ))}
                        {notes.length === 0 && (
                           <div className="text-center py-4 border-2 border-dashed border-slate-100 rounded-[6px]">
                              <p className="text-xs text-slate-400">No notes yet.</p>
                           </div>
                        )}
                     </div>
                  </div>

               </div>
            </div>
          </>,
          document.body
        )}

      </div>
    </div>
  );
};

// Helper for icon in mock data
function UserPlus(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}