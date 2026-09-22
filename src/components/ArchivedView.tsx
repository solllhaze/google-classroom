import React from 'react';
import { Course } from '../types';
import { FileArchive, RotateCcw, Award, CheckCircle2, Clock } from 'lucide-react';

interface ArchivedViewProps {
  archivedCourses: Course[];
  onRestoreCourse: (course: Course) => void;
}

export default function ArchivedView({ archivedCourses, onRestoreCourse }: ArchivedViewProps) {
  return (
    <div className="max-w-[1000px] mx-auto p-6 md:p-8 space-y-6">
      <div className="border-b border-border pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 text-gray-700 rounded-lg">
            <FileArchive className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Archived Classes</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Past completed classes and semesters. You have view-only access to class resources and past records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {archivedCourses.map(course => (
          <div key={course.id} className="bg-white border border-border rounded-xl overflow-hidden shadow-2xs">
            <div className={`p-5 text-white ${course.theme} opacity-90`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-white/20 rounded uppercase">
                    {course.code}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{course.name}</h3>
                  <p className="text-xs text-white/90">{course.section}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-white/20 rounded-full">
                  Archived
                </span>
              </div>
              <p className="text-xs text-white/80 mt-3">{course.professor}</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{course.schedule}</span>
                <span className="font-semibold text-gray-700">{course.credits} Credits Completed</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  <Award className="w-3.5 h-3.5" /> Grade: 1.25 (Passed)
                </span>
                
                <button
                  onClick={() => onRestoreCourse(course)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-blue-700 transition-colors p-1.5 hover:bg-accent rounded-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restore to Enrolled
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
