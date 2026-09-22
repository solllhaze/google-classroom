import React, { useState } from 'react';
import { Course, Activity } from '../types';
import { CheckCircle2, Clock, AlertCircle, FileText, Check, Undo2 } from 'lucide-react';

interface TodoViewProps {
  courses: Course[];
  activities: Record<string, Activity[]>;
  onToggleStatus: (activityId: string, courseId: string) => void;
  onSelectCourse: (courseId: string) => void;
  onOpenTaskDetails: (activity: Activity, course: Course) => void;
}

export default function TodoView({
  courses,
  activities,
  onToggleStatus,
  onSelectCourse,
  onOpenTaskDetails,
}: TodoViewProps) {
  const [selectedTab, setSelectedTab] = useState<'assigned' | 'missing' | 'done'>('assigned');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');

  // Collect all activities from all courses with course reference
  const allActivitiesWithCourse = Object.entries(activities).flatMap(([courseId, items]) => {
    const course = courses.find(c => c.id === courseId);
    return items.map(item => ({ ...item, course }));
  });

  const filteredByCourse = allActivitiesWithCourse.filter(item => 
    selectedCourseFilter === 'All' || item.courseId === selectedCourseFilter
  );

  const assignedTasks = filteredByCourse.filter(t => t.status === 'Not Started' || t.status === 'In Progress');
  const doneTasks = filteredByCourse.filter(t => t.status === 'Submitted');
  const missingTasks = filteredByCourse.filter(t => t.status !== 'Submitted' && t.dueDate.toLowerCase().includes('closed'));

  const currentDisplayList = 
    selectedTab === 'assigned' ? assignedTasks :
    selectedTab === 'missing' ? missingTasks :
    doneTasks;

  return (
    <div className="max-w-[1000px] mx-auto p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student To-do List</h1>
          <p className="text-sm text-muted-foreground">Manage and track your submissions across all enrolled subjects.</p>
        </div>

        {/* Filter by class */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase">Class:</label>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="All">All classes</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-border gap-8">
        <button
          onClick={() => setSelectedTab('assigned')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            selectedTab === 'assigned' ? 'text-primary' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          <span>Assigned</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-bold">
            {assignedTasks.length}
          </span>
          {selectedTab === 'assigned' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          onClick={() => setSelectedTab('missing')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            selectedTab === 'missing' ? 'text-red-600' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          <span>Missing</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 font-bold">
            {missingTasks.length}
          </span>
          {selectedTab === 'missing' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setSelectedTab('done')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            selectedTab === 'done' ? 'text-emerald-700' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          <span>Done</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700 font-bold">
            {doneTasks.length}
          </span>
          {selectedTab === 'done' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {currentDisplayList.length > 0 ? (
          currentDisplayList.map(task => (
            <div
              key={task.id}
              className="p-4 bg-white border border-border rounded-xl hover:border-gray-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group"
            >
              <div 
                className="flex items-start gap-3.5 flex-1 cursor-pointer"
                onClick={() => task.course && onOpenTaskDetails(task, task.course)}
              >
                <div className="mt-0.5 p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-primary transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span 
                      onClick={(e) => { e.stopPropagation(); onSelectCourse(task.courseId); }}
                      className="text-xs font-bold text-gray-500 hover:text-primary hover:underline"
                    >
                      {task.course?.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {task.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-semibold text-gray-600">{task.points} pts</span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-4 justify-between sm:justify-end pl-11 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Due</p>
                  <p className={`text-xs font-semibold ${task.dueDate.includes('Tomorrow') ? 'text-red-600' : 'text-gray-700'}`}>
                    {task.dueDate}
                  </p>
                  {task.submittedAt && (
                    <p className="text-[10px] text-emerald-600 font-medium">Turned in {task.submittedAt}</p>
                  )}
                </div>

                {/* Submit Toggle Button */}
                <button
                  onClick={() => onToggleStatus(task.id, task.courseId)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    task.status === 'Submitted'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-primary text-white hover:bg-blue-700 shadow-xs'
                  }`}
                >
                  {task.status === 'Submitted' ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Turned in
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Turn in
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center border border-dashed border-border rounded-xl bg-gray-50/50 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="font-semibold text-gray-700 text-sm">Nothing to review here!</p>
            <p className="text-xs text-muted-foreground">All assignments in this section are up to date.</p>
          </div>
        )}
      </div>
    </div>
  );
}
