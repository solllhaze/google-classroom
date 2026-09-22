import React, { useState } from 'react';
import { EnrolledProgram, Course } from '../types';
import { Settings as SettingsIcon, GraduationCap, Bell, Shield, User, Check } from 'lucide-react';

interface SettingsViewProps {
  program: EnrolledProgram;
  courses: Course[];
}

export default function SettingsView({ program, courses }: SettingsViewProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [gradeAlerts, setGradeAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-[900px] mx-auto p-6 md:p-8 space-y-8">
      <div className="border-b border-border pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-100 text-gray-700 rounded-lg">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Student Account & Program Settings</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          View your enrolled degree program details, academic profile, and classroom notifications.
        </p>
      </div>

      {/* Enrolled Program Information Card */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-2xs space-y-5">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Enrolled Academic Program</h2>
            <p className="text-xs text-muted-foreground">Officially enrolled student curriculum record</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Degree / Program</span>
            <p className="font-bold text-gray-900 mt-1">{program.programName}</p>
            <p className="text-xs text-gray-500">{program.degree}</p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Department</span>
            <p className="font-bold text-gray-900 mt-1">{program.department}</p>
            <p className="text-xs text-gray-500">Academic Year {program.academicYear}</p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Student ID & Email</span>
            <p className="font-bold text-gray-900 mt-1">{program.studentId}</p>
            <p className="text-xs text-primary">{program.studentEmail}</p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Academic Standing</span>
            <p className="font-bold text-emerald-700 mt-1">Good Standing (GPA: {program.currentGpa})</p>
            <p className="text-xs text-gray-500">{program.totalCredits} Enrolled Credits in {courses.length} Active Subjects</p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
            <p className="text-xs text-muted-foreground">Control alerts for assignments, materials, and instructor announcements</p>
          </div>
        </div>

        <div className="divide-y divide-border text-sm">
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive instant email when a professor posts an announcement</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 text-primary rounded cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">24-Hour Due Date Alerts</p>
              <p className="text-xs text-muted-foreground">Remind me 24 hours before an assignment or quiz is due</p>
            </div>
            <input
              type="checkbox"
              checked={deadlineReminders}
              onChange={(e) => setDeadlineReminders(e.target.checked)}
              className="w-4 h-4 text-primary rounded cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Grade & Feedback Notifications</p>
              <p className="text-xs text-muted-foreground">Alert me as soon as an instructor evaluates my submission</p>
            </div>
            <input
              type="checkbox"
              checked={gradeAlerts}
              onChange={(e) => setGradeAlerts(e.target.checked)}
              className="w-4 h-4 text-primary rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-border">
          {savedSuccess ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4" /> Preferences saved successfully
            </span>
          ) : <div />}
          
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
