import React, { useState } from 'react';
import { Course, EnrolledProgram } from '../types';
import { X, Plus, Check, Info } from 'lucide-react';

interface JoinModalProps {
  program: EnrolledProgram;
  onClose: () => void;
  onJoinSuccess: (newCourse: Course) => void;
}

export default function JoinModal({ program, onClose, onJoinSuccess }: JoinModalProps) {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');

  const sampleClasses: Record<string, Partial<Course>> = {
    'CS201': {
      name: 'Data Structures & Algorithms',
      code: 'CS-201',
      section: 'Section B',
      professor: 'Dr. Grace Hopper',
      professorEmail: 'g.hopper@school.edu',
      room: 'Turing Hall 401',
      schedule: 'Tue, Thu • 1:00 PM - 2:30 PM',
      credits: 4,
      theme: 'bg-indigo-700',
    },
    'ENG102': {
      name: 'Academic Writing & Research',
      code: 'ENG-102',
      section: 'Period 1',
      professor: 'Dr. James Baldwin',
      professorEmail: 'j.baldwin@school.edu',
      room: 'Arts Building 108',
      schedule: 'Mon, Wed • 8:00 AM - 9:30 AM',
      credits: 3,
      theme: 'bg-teal-700',
    },
  };

  const handleJoin = () => {
    const trimmed = classCode.trim().toUpperCase();
    if (!trimmed) {
      setError('Please enter a valid class code.');
      return;
    }

    const template = sampleClasses[trimmed] || {
      name: `Subject (${trimmed})`,
      code: trimmed,
      section: 'Regular Section',
      professor: 'Faculty Instructor',
      professorEmail: 'instructor@school.edu',
      room: 'Main Lecture Hall',
      schedule: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
      credits: 3,
      theme: 'bg-cyan-700',
    };

    const newCourse: Course = {
      id: `c_${Date.now()}`,
      name: template.name!,
      code: template.code!,
      section: template.section!,
      professor: template.professor!,
      professorEmail: template.professorEmail!,
      room: template.room!,
      schedule: template.schedule!,
      credits: template.credits!,
      theme: template.theme!,
      headerColor: '#0e7490',
      accentColor: 'text-cyan-700',
    };

    onJoinSuccess(newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold text-gray-900">Join a Class</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Account info card */}
          <div className="p-4 border border-border rounded-xl flex items-center justify-between bg-gray-50/50">
            <div>
              <p className="text-xs text-muted-foreground">You are currently signed in as</p>
              <p className="font-semibold text-sm text-gray-900 mt-0.5">{program.studentName}</p>
              <p className="text-xs text-gray-500">{program.studentEmail} • ID {program.studentId}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-primary border border-blue-200">
              Student
            </span>
          </div>

          {/* Class Code Input */}
          <div className="space-y-2">
            <label className="font-bold text-sm text-gray-800">Class Code</label>
            <p className="text-xs text-muted-foreground">Ask your teacher for the class code, then enter it here.</p>
            <input 
              type="text" 
              placeholder="e.g. CS201 or ENG102"
              value={classCode}
              onChange={(e) => { setClassCode(e.target.value); setError(''); }}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 text-sm font-medium uppercase"
            />
            {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
          </div>

          {/* Quick sample codes chips */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100/80 text-xs space-y-1.5">
            <p className="font-bold text-blue-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary" /> Try sample class codes:
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setClassCode('CS201')}
                className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-bold text-primary hover:bg-blue-50 transition-colors"
              >
                CS201 (Data Structures)
              </button>
              <button
                onClick={() => setClassCode('ENG102')}
                className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-bold text-primary hover:bg-blue-50 transition-colors"
              >
                ENG102 (Writing)
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-border flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleJoin}
            className="px-5 py-2 text-xs font-bold text-white bg-primary hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
          >
            Join Class
          </button>
        </div>
      </div>
    </div>
  );
}
