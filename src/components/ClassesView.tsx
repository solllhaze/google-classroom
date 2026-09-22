import React, { useState } from 'react';
import { Course, EnrolledProgram, Activity } from '../types';
import { 
  GraduationCap, 
  Folder, 
  TrendingUp, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Search,
  Plus
} from 'lucide-react';

interface ClassesViewProps {
  program: EnrolledProgram;
  courses: Course[];
  activities: Record<string, Activity[]>;
  onSelectCourse: (courseId: string) => void;
  onOpenJoinModal: () => void;
  onOpenTodo: () => void;
}

export default function ClassesView({
  program,
  courses,
  activities,
  onSelectCourse,
  onOpenJoinModal,
  onOpenTodo,
}: ClassesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 space-y-8">
      {/* Student Enrolled Program Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-6 md:p-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <GraduationCap className="w-4 h-4" /> Enrolled Academic Program
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{program.programName}</h1>
              <p className="text-blue-100 text-sm md:text-base mt-1 font-medium">
                {program.department} • {program.semester}, {program.academicYear}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-blue-100 pt-1">
              <span>Student ID: <strong className="text-white font-semibold">{program.studentId}</strong></span>
              <span>•</span>
              <span>Name: <strong className="text-white font-semibold">{program.studentName}</strong></span>
              <span>•</span>
              <span>Section: <strong className="text-white font-semibold bg-white/20 px-2 py-0.5 rounded">{program.section}</strong></span>
              <span>•</span>
              <span>Status: <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">Active</span></span>
            </div>
          </div>

          {/* Quick Academic Stats */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 shrink-0">
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-xs text-blue-200 uppercase font-semibold">Enrolled Subjects</p>
              <p className="text-2xl font-bold text-white mt-0.5">{courses.length}</p>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <p className="text-xs text-blue-200 uppercase font-semibold">Total Credits</p>
              <p className="text-2xl font-bold text-white mt-0.5">{program.totalCredits}</p>
            </div>
            <div className="text-center px-3">
              <p className="text-xs text-blue-200 uppercase font-semibold">Current GPA</p>
              <p className="text-2xl font-bold text-emerald-300 mt-0.5 flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4" /> {program.currentGpa}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Enrolled Subjects & Classes</h2>
          <p className="text-sm text-muted-foreground">Select any class to view announcements, learning resources, and assignments.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search enrolled subjects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors w-full sm:w-64"
            />
          </div>
          <button 
            onClick={onOpenJoinModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" /> Join Class
          </button>
        </div>
      </div>

      {/* Grid of Enrolled Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredCourses.map(course => {
          const courseTasks = activities[course.id] || [];
          const pendingTasks = courseTasks.filter(t => t.status !== 'Submitted');
          const nextDueTask = pendingTasks[0];

          return (
            <div 
              key={course.id}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer h-full"
              onClick={() => onSelectCourse(course.id)}
            >
              {/* Header Banner */}
              <div className={`p-5 text-white relative ${course.theme} transition-transform h-[160px] flex flex-col justify-between overflow-hidden`}>
                <div className="flex justify-between items-start">
                  <div className="space-y-1 pr-6">
                    <span className="inline-block px-2 py-0.5 text-[11px] font-bold bg-white/20 backdrop-blur-sm rounded-md tracking-wider">
                      {course.code}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight leading-snug line-clamp-2">
                      {course.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <p className="text-sm text-white/90 font-medium">{course.section}</p>
                      {course.isIrregular && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-amber-950 shadow-xs uppercase tracking-wide">
                          Irregular Subject
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-4 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/90">
                  <span>{course.professor}</span>
                  <span className="font-semibold">{course.credits} Credits</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="space-y-3 flex-1">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-gray-700">Room:</span> {course.room}
                  </div>

                  {/* Next Due Task Widget */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                      <span>Upcoming Due</span>
                      {pendingTasks.length > 0 ? (
                        <span className="text-primary font-semibold">{pendingTasks.length} pending</span>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> All done
                        </span>
                      )}
                    </p>
                    {nextDueTask ? (
                      <div>
                        <p className="text-xs font-semibold text-gray-800 truncate">{nextDueTask.title}</p>
                        <p className="text-[11px] text-red-600 font-medium mt-0.5">Due {nextDueTask.dueDate}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">No assignments currently due</p>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onOpenTodo(); }}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      title="View assignments"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`Opening Google Drive folder for ${course.name}`); }}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                      title="Open Google Drive folder"
                    >
                      <Folder className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                    Enter Class <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
