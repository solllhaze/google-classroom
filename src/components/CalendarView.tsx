import React, { useState } from 'react';
import { Course, CalendarEvent, Activity } from '../types';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, AlertCircle, BookOpen, CheckCircle2 } from 'lucide-react';

interface CalendarViewProps {
  courses: Course[];
  events: CalendarEvent[];
  activities: Record<string, Activity[]>;
  onSelectCourse: (courseId: string) => void;
}

export default function CalendarView({ courses, events, activities, onSelectCourse }: CalendarViewProps) {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'week' | 'list'>('week');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredEvents = events.filter(event => 
    selectedCourseFilter === 'All' || event.courseId === selectedCourseFilter
  );

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-primary rounded-lg">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Schedule & Calendar</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Schedule of enrolled course lectures, quizzes, and assignment due dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Course Filter Dropdown */}
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="All">All Enrolled Classes</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="inline-flex rounded-lg border border-border bg-gray-50 p-1">
            <button
              onClick={() => setActiveTab('week')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-muted-foreground hover:text-gray-900'}`}
            >
              Weekly Timetable
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${activeTab === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-muted-foreground hover:text-gray-900'}`}
            >
              Agenda List
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'week' ? (
        /* Weekly Timetable Columns */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {daysOfWeek.map(day => {
            const dayEvents = filteredEvents.filter(e => e.day === day);

            return (
              <div key={day} className="bg-gray-50/70 border border-border rounded-xl p-4 flex flex-col min-h-[420px]">
                <div className="pb-3 border-b border-border/80 flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-gray-800">{day}</h3>
                  <span className="text-[11px] font-semibold text-muted-foreground bg-white px-2 py-0.5 rounded-full border border-gray-200">
                    {dayEvents.length} events
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {dayEvents.length > 0 ? (
                    dayEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => onSelectCourse(event.courseId)}
                        className="p-3 bg-white border border-border rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group border-l-4"
                        style={{ borderLeftColor: event.color.includes('blue') ? '#2563eb' : event.color.includes('emerald') ? '#047857' : '#ea580c' }}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                          {event.courseName}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors mt-0.5">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-32 flex items-center justify-center text-center text-xs text-muted-foreground italic">
                      No events scheduled
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Agenda List View */
        <div className="bg-white border border-border rounded-xl divide-y divide-border overflow-hidden">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              onClick={() => onSelectCourse(event.courseId)}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-10 rounded-full ${event.color}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {event.day}
                    </span>
                    <span className="text-xs text-muted-foreground">{event.dateStr}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors mt-1">
                    {event.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{event.courseName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {event.time}
                </span>
                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
