/**
 * Deals Screen Component for Dealer365 TOBE
 *
 * Purpose: Kanban-style deal management interface with AI-powered insights
 * Features:
 * - 9-stage deal pipeline visualization
 * - KPI dashboard with real-time metrics
 * - Drag-and-drop deal cards (ready for implementation)
 * - Detail panel with AI recommendations
 * - Deal probability tracking
 * - Activity timeline and quick actions
 *
 * Z-Index Hierarchy:
 * - Main content: z-0 (base)
 * - Detail panel overlay: z-[9998] (above all content)
 * - Detail panel: z-[9999] (topmost layer, above header)
 */

import React, { useState } from 'react';
import { Deal, DealStage } from '../types';
import {
  Search, Filter, Plus, MoreHorizontal, AlertCircle, Calendar,
  FileText, Phone, Mail, X, Sparkles, ArrowRight, ChevronRight,
  CheckSquare, Clock, ShieldCheck, DollarSign
} from 'lucide-react';
import { Badge } from './ui/Badge';

/**
 * Deal Pipeline Stages (9-column Kanban board)
 * Represents the complete sales funnel from initial contact to post-delivery
 */
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

/**
 * Mock Deal Data
 * Sample deals distributed across all pipeline stages
 */
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

// ========================================
// SUB-COMPONENTS
// ========================================

/**
 * KPI Item Component
 * Displays a single key performance indicator with trend
 * @param label - KPI label (e.g., "Deals Today")
 * @param value - Current value
 * @param trend - Trend indicator (e.g., "+3", "-1")
 * @param up - Trend direction (true = up/positive, false = down/negative)
 */
const KPIItem: React.FC<{ label: string; value: string; trend: string; up: boolean }> = ({ label, value, trend, up }) => (
  <div className="bg-white rounded-[6px] shadow-sm border border-slate-200 px-4 py-3 flex flex-col justify-between h-[88px] min-w-[180px]">
    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-[#424651]">{value}</span>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        <span>{trend}</span>
        <span>{up ? '▲' : '▼'}</span>
      </div>
    </div>
  </div>
);

/**
 * Deal Card Component
 * Individual deal card displayed in Kanban columns
 * Shows customer info, vehicle details, status, and next actions
 * @param deal - Deal object with all details
 * @param onClick - Handler when card is clicked
 * @param isSelected - Whether this card is currently selected
 */
const DealCard: React.FC<{ deal: Deal; onClick: (d: Deal) => void; isSelected: boolean }> = ({ deal, onClick, isSelected }) => {
  // Determine status badge color based on deal temperature
  const statusColor =
    deal.status === 'HOT' ? 'bg-[#E75A5A]' :
    deal.status === 'WARM' ? 'bg-[#F2A444]' : 'bg-[#8AA4FF]';

  return (
    <div
      onClick={() => onClick(deal)}
      className={`
        w-full bg-white rounded-[6px] p-4 cursor-pointer transition-all duration-200 border relative group
        ${isSelected
          ? 'ring-2 ring-[#B4E975] shadow-md border-transparent z-10'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-card'
        }
      `}
    >
      {/* Header: Customer Name + Deal Status Badge */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-[16px] font-bold text-[#424651] leading-tight group-hover:text-black transition-colors">
          {deal.customerName}
        </h3>
        <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-[4px] uppercase tracking-wide ${statusColor}`}>
          {deal.status}
        </span>
      </div>

      {/* Lead Source Label */}
      <div className="mb-2">
         <span className="text-[11px] font-medium text-slate-500">{deal.leadSource} Lead</span>
      </div>

      {/* Vehicle Information */}
      <div className="mb-1">
        <p className="text-[14px] font-medium text-[#424651]">
          {deal.year} {deal.vehicle}
        </p>
        <p className="text-[12px] text-slate-500">{deal.trim}</p>
      </div>

      {/* Deal Amount */}
      <div className="flex justify-end mb-3">
        <span className="text-[14px] font-bold text-[#424651]">{deal.dealAmount}</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 w-full mb-3"></div>

      {/* Activity Timeline & Next Action */}
      <div className="space-y-1.5">
        {/* Last Activity */}
        <div className="flex items-center gap-1.5">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
           <p className="text-[11px] text-slate-500 truncate">
             {deal.lastActivity} · {deal.lastActivityTime}
           </p>
        </div>

        {/* Next Action Badge */}
        {deal.nextAction && (
          <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-[4px] w-fit max-w-full">
             <ArrowRight size={10} />
             <p className="text-[11px] font-bold truncate">Next: {deal.nextAction}</p>
          </div>
        )}
      </div>

      {/* Missing Documents Alert Indicator */}
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

/**
 * Main Deals Screen Component
 * Full-page view of the deal management interface
 */
export const DealsScreen: React.FC = () => {
  // Selected deal state for detail panel
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#F7F7F7] overflow-hidden">

      {/* ========== TOP KPI DASHBOARD ========== */}
      {/* 4-column grid showing key metrics */}
      <div className="shrink-0 bg-[#F7F7F7] px-6 py-4 grid grid-cols-4 gap-4 border-b border-slate-200/50">
        <KPIItem label="Deals Today" value="12" trend="3" up={true} />
        <KPIItem label="Hot Deals" value="8" trend="2" up={true} />
        <KPIItem label="Pending Docs" value="5" trend="1" up={false} />
        <KPIItem label="Appts Today" value="7" trend="0" up={true} />
      </div>

      {/* ========== MAIN CONTENT AREA ========== */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ===== KANBAN BOARD: 9-Column Deal Pipeline ===== */}
        {/* Horizontal scrollable container for all pipeline stages */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
           <div className="h-full px-6 py-4 flex gap-4 min-w-max pb-8">
              {/* Iterate through all pipeline stages */}
              {STAGES.map((stage) => {
                 // Filter deals for current stage
                 const stageDeals = DEALS.filter(d => d.stage === stage);
                 return (
                   <div key={stage} className="flex flex-col h-full w-[300px] shrink-0 align-top">
                      {/* Stage Column Header */}
                      <div className="flex items-center justify-between mb-4 pl-1 pr-2">
                         <div className="flex items-center gap-2">
                            <h4 className="text-[13px] font-bold text-[#424651] uppercase tracking-tight">{stage}</h4>
                            {/* Deal count badge */}
                            <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-[4px]">
                               {stageDeals.length}
                            </span>
                         </div>
                         {/* Column menu (future: stage actions) */}
                         <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                      </div>

                      {/* Drop Zone: Scrollable deal cards container */}
                      {/* Ready for drag-and-drop implementation */}
                      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-20 pr-1 no-scrollbar">
                         {/* Render all deals in this stage */}
                         {stageDeals.map(deal => (
                           <DealCard
                              key={deal.id}
                              deal={deal}
                              onClick={setSelectedDeal}
                              isSelected={selectedDeal?.id === deal.id}
                           />
                         ))}

                         {/* Empty State for columns with no deals */}
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

        {/* ========== DETAIL PANEL (Modal Overlay) ========== */}
        {/* Displays when a deal card is clicked */}
        {/* IMPORTANT: Uses z-[9998] and z-[9999] to ensure it appears above header (z-40) */}
        {selectedDeal && (
          <>
            {/* Background Overlay Dimmer */}
            {/* z-[9998]: Above all content, below panel */}
            {/* Clicking overlay closes the detail panel */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
              onClick={() => setSelectedDeal(null)}
            ></div>

            {/* Detail Panel Container */}
            {/* z-[9999]: Topmost layer - above header (z-40), overlay (z-[9998]), and all other content */}
            {/* Fixed positioning: top-0 ensures full-height modal from top of viewport */}
            <div className="fixed top-0 right-0 w-[450px] md:w-[520px] h-screen bg-white z-[9999] shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300 ease-out">

               {/* ===== Panel Header ===== */}
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

               {/* ===== Scrollable Body Content ===== */}
               <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">

                  {/* Section 1: Vehicle Information Summary */}
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

                  {/* Section 2: AI-Powered Recommendation */}
                  {/* Dark-themed AI insight card with actionable suggestions */}
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

                  {/* Section 3: Deal Closing Probability */}
                  {/* Visual progress bar showing likelihood of deal closure */}
                  <div>
                     <div className="flex justify-between items-end mb-2">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Closing Probability</h4>
                        <span className="text-sm font-bold text-[#424651]">{selectedDeal.probability}%</span>
                     </div>
                     {/* Progress bar - color changes based on probability */}
                     <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${selectedDeal.probability && selectedDeal.probability > 50 ? 'bg-[#424651]' : 'bg-slate-400'}`}
                          style={{ width: `${selectedDeal.probability}%` }}
                        ></div>
                     </div>
                  </div>

                  {/* Section 4: Quick Actions Grid */}
                  {/* 8-button grid for common deal operations */}
                  <div>
                     <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">Quick Actions</h4>
                     <div className="grid grid-cols-4 gap-2">
                        {[
                           { icon: Phone, label: 'Call' },
                           { icon: Mail, label: 'Email' },
                           { icon: Calendar, label: 'Book' },
                           { icon: FileText, label: 'Quote' },
                           { icon: ShieldCheck, label: 'Verify' },
                           { icon: DollarSign, label: 'Desk' },
                           { icon: Clock, label: 'Log' },
                           { icon: MoreHorizontal, label: 'More' }
                        ].map((action, i) => (
                           <button key={i} className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white border border-slate-200 rounded-[6px] hover:bg-slate-50 hover:border-slate-300 transition-all">
                              <action.icon size={18} className="text-[#424651]" />
                              <span className="text-[10px] font-semibold text-slate-600">{action.label}</span>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Section 5: Required Tasks Checklist */}
                  {/* Interactive checklist of tasks needed to progress the deal */}
                  <div>
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Required Tasks</h4>
                        {/* Urgent task counter badge */}
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-[4px]">2 Urgent</span>
                     </div>
                     <div className="space-y-2">
                        {[
                           { txt: 'Upload Driver License', done: true },
                           { txt: 'Collect Deposit ($1,000)', done: false, urgent: true },
                           { txt: 'Confirm Insurance Validity', done: false, urgent: true },
                           { txt: 'Sign Privacy Notice', done: false, urgent: false },
                        ].map((task, i) => (
                           <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-[6px] border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
                               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${task.done ? 'bg-[#424651] border-[#424651]' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                  {task.done && <div className="w-2 h-2 bg-white rounded-[1px]"></div>}
                               </div>
                               <span className={`text-xs font-medium flex-1 ${task.done ? 'text-slate-400 line-through' : 'text-[#424651]'}`}>{task.txt}</span>
                               {task.urgent && !task.done && <AlertCircle size={14} className="text-[#E75A5A]" />}
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Section 6: Activity Timeline */}
                  {/* Chronological history of all deal-related activities */}
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

                  {/* Section 7: Internal Notes */}
                  {/* Sticky note style area for private deal notes */}
                  <div className="pb-10">
                     <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">Internal Notes</h4>
                     {/* Yellow sticky note design for visibility */}
                     <div className="bg-[#fff9c4] p-3 rounded-[6px] border border-yellow-200 shadow-sm">
                        <p className="text-xs text-yellow-900 leading-relaxed font-medium">
                           "Wife prefers the beige interior, but husband wants black. Need to find a compromise unit or check incoming inventory."
                        </p>
                        <p className="text-[10px] text-yellow-700/60 mt-2 font-bold text-right">- Alex M.</p>
                     </div>
                  </div>

               </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

// ========================================
// HELPER COMPONENTS & ICONS
// ========================================

/**
 * UserPlus Icon Component
 * Custom SVG icon for user addition in timeline
 */
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
