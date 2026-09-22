import React from 'react';
import { BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { Course, EnrolledProgram } from '../types';

interface GradesViewProps {
  courses: Course[];
  program: EnrolledProgram;
  onSelectCourse: (courseId: string) => void;
}

export default function GradesView({ courses, program, onSelectCourse }: GradesViewProps) {
  const numericGrades = courses
    .filter((c) => c.grade && c.grade !== 'No data')
    .map((c) => parseFloat(c.grade!));
  const hasGradeData = numericGrades.length > 0;
  const gwa =
    hasGradeData
      ? (numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length).toFixed(2)
      : null;

  return (
    <div className="max-w-[1000px] mx-auto p-6 md:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Grades</h1>
            <p className="text-sm text-muted-foreground">
              Official grade record for the current academic period.
            </p>
          </div>
        </div>

        {/* GWA Badge */}
        {gwa ? (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-[10px] font-bold text-emerald-700 uppercase">Current GWA</p>
              <p className="text-lg font-extrabold text-emerald-700 leading-none">{gwa}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase">GWA</p>
              <p className="text-sm font-bold text-gray-400">Pending</p>
            </div>
          </div>
        )}
      </div>

      {/* Program Info Banner */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 bg-blue-50/70 border border-blue-100 rounded-xl text-sm">
        <div className="flex items-center gap-2 text-blue-900">
          <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="font-semibold">{program.programName}</span>
        </div>
        <span className="text-blue-300 hidden sm:block">|</span>
        <span className="text-blue-700 font-medium">
          AY {program.academicYear} &bull; {program.semester}
        </span>
        <span className="text-blue-300 hidden sm:block">|</span>
        <span className="text-blue-700 font-medium">Section {program.section}</span>
      </div>

      {/* Grades Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-2xs">
        {/* Table Header */}
        <div className="grid grid-cols-[140px_1fr_120px_80px_120px] px-5 py-3 border-b border-border bg-gray-50/80">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Code</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Sem</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Grade</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border">
          {courses.map((course) => {
            const isNoData = !course.grade || course.grade === 'No data';
            const gradeNum = isNoData ? null : parseFloat(course.grade!);
            const isPassed = gradeNum !== null && gradeNum <= 3.0;
            const isFailed = gradeNum !== null && gradeNum > 3.0;

            return (
              <div
                key={course.id}
                className="grid grid-cols-[140px_1fr_120px_80px_120px] px-5 py-4 hover:bg-gray-50/60 transition-colors group"
              >
                {/* Code */}
                <div className="flex items-center">
                  <button
                    onClick={() => onSelectCourse(course.id)}
                    className="flex items-center gap-2 group/code"
                    title={`Go to ${course.name}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${course.theme}`} />
                    <span className="font-bold text-sm text-gray-800 group-hover/code:text-primary group-hover/code:underline transition-colors">
                      {course.code}
                    </span>
                  </button>
                </div>

                {/* Description */}
                <div className="flex items-center pr-4">
                  <p className="text-sm text-gray-700 font-medium leading-snug">
                    {course.name}
                    {course.isIrregular && (
                      <span className="ml-2 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded align-middle">
                        Irreg
                      </span>
                    )}
                  </p>
                </div>

                {/* Year */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{program.academicYear}</span>
                </div>

                {/* Sem */}
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-600 font-medium">1</span>
                </div>

                {/* Grade */}
                <div className="flex items-center justify-end">
                  {isNoData ? (
                    <span className="text-sm font-bold text-gray-400">No data</span>
                  ) : isPassed ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-bold">
                      {course.grade}
                    </span>
                  ) : isFailed ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm font-bold">
                      {course.grade}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3 border-t border-border bg-gray-50/50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-gray-700">{courses.length}</span> enrolled subjects
          </p>
          <p className="text-xs text-muted-foreground">
            {hasGradeData
              ? `${numericGrades.length} of ${courses.length} grades available`
              : 'Grades will be posted by the Registrar'}
          </p>
        </div>
      </div>

      {/* Disclaimer Note */}
      <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <span className="text-amber-500 text-base mt-0.5 shrink-0">ⓘ</span>
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">Note:</span> Grades shown here are for reference only. Official grades are
          released by the Registrar&apos;s Office at the end of the semester. Contact your professor for preliminary
          grade inquiries.
        </p>
      </div>
    </div>
  );
}
