import React, { useState } from 'react';
import { Announcement, Course } from '../types';
import { X, Bell, AlertCircle, MessageSquare, Paperclip, Search } from 'lucide-react';

interface AnnouncementsModalProps {
  announcements: Announcement[];
  course: Course;
  onClose: () => void;
}

export default function AnnouncementsModal({ announcements, course, onClose }: AnnouncementsModalProps) {
  const [search, setSearch] = useState('');

  const filtered = announcements.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-primary rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{course.name}</span>
              <h2 className="text-lg font-bold text-gray-900">All Class Announcements</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border bg-gray-50/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Announcements List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filtered.length > 0 ? (
            filtered.map(announcement => (
              <div key={announcement.id} className="p-5 bg-white border border-border rounded-xl shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm text-gray-900">{announcement.title}</h3>
                      {announcement.isImportant && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                          <AlertCircle className="w-3 h-3" /> Important
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Posted by <strong className="text-gray-700">{announcement.author}</strong> ({announcement.authorRole}) • {announcement.date}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {announcement.content}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400" /> {announcement.commentsCount ?? 0} class comments
                  </span>
                  {announcement.attachmentsCount ? (
                    <span className="flex items-center gap-1 text-primary">
                      <Paperclip className="w-3.5 h-3.5" /> {announcement.attachmentsCount} attachment
                    </span>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-muted-foreground text-xs">
              No announcements match your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-border flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
