import React, { useState } from 'react';
import { Activity, Course } from '../types';
import { X, FileText, CheckCircle2, Clock, Upload, Link, Paperclip, Check, AlertCircle } from 'lucide-react';

interface TaskModalProps {
  activity: Activity;
  course: Course;
  onClose: () => void;
  onToggleStatus: (activityId: string, courseId: string) => void;
}

export default function TaskModal({ activity, course, onClose, onToggleStatus }: TaskModalProps) {
  const [attachments, setAttachments] = useState<string[]>(
    activity.status === 'Submitted' ? ['My_Completed_Work_Final.pdf'] : []
  );
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [fileNameInput, setFileNameInput] = useState('');

  const handleAddAttachment = () => {
    if (fileNameInput.trim()) {
      setAttachments([...attachments, fileNameInput.trim()]);
      setFileNameInput('');
      setIsAddingFile(false);
    }
  };

  const handleToggle = () => {
    onToggleStatus(activity.id, activity.courseId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">{course.name}</p>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">{activity.title}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Due date & points banner */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs">
            <div>
              <span className="text-muted-foreground">Due: </span>
              <strong className="text-gray-900 font-semibold">{activity.dueDate}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">Total: </span>
              <strong className="text-primary font-semibold">{activity.points} Points</strong>
            </div>
            <div>
              <span className={`px-2.5 py-1 rounded-full font-semibold border ${
                activity.status === 'Submitted'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : activity.status === 'In Progress'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {activity.status}
              </span>
            </div>
          </div>

          {/* Description / Instructions */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Instructions & Prompt</h3>
            <div className="p-4 bg-gray-50/70 border border-border rounded-xl text-gray-800 leading-relaxed">
              {activity.description}
            </div>
          </div>

          {/* Submission / Your Work Section */}
          <div className="p-5 border border-border rounded-xl space-y-4 bg-white shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Your Work</h3>
              <span className="text-xs text-muted-foreground">
                {activity.status === 'Submitted' ? 'Turned in' : 'Assigned'}
              </span>
            </div>

            {/* List of attachments */}
            {attachments.length > 0 ? (
              <div className="space-y-2">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800">
                    <span className="flex items-center gap-2 truncate">
                      <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                      {file}
                    </span>
                    {activity.status !== 'Submitted' && (
                      <button 
                        onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No work attached yet.</p>
            )}

            {/* Add or create files */}
            {activity.status !== 'Submitted' && (
              <div>
                {isAddingFile ? (
                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="text" 
                      placeholder="File name (e.g. Solution_Report.pdf)"
                      value={fileNameInput}
                      onChange={(e) => setFileNameInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-border rounded-lg text-xs focus:outline-none focus:border-primary"
                    />
                    <button 
                      onClick={handleAddAttachment}
                      className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
                    >
                      Attach
                    </button>
                    <button 
                      onClick={() => setIsAddingFile(false)}
                      className="px-2 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button 
                      onClick={() => setIsAddingFile(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Upload className="w-3.5 h-3.5 text-gray-500" /> + Add or create file
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-border flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleToggle}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
              activity.status === 'Submitted'
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-primary text-white hover:bg-blue-700'
            }`}
          >
            {activity.status === 'Submitted' ? (
              <>Unsubmit Assignment</>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> Turn in / Mark as Done</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
