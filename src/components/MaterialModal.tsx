import React from 'react';
import { Material, Course } from '../types';
import { X, Download, ExternalLink, FileText, Presentation, BookOpen, File, FileArchive } from 'lucide-react';

interface MaterialModalProps {
  material: Material;
  course: Course;
  onClose: () => void;
}

export default function MaterialModal({ material, course, onClose }: MaterialModalProps) {
  const getIcon = () => {
    switch (material.type) {
      case 'ppt':
        return <Presentation className="w-8 h-8 text-orange-600" />;
      case 'video':
        return <BookOpen className="w-8 h-8 text-red-600" />;
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />;
      case 'doc':
        return <File className="w-8 h-8 text-blue-600" />;
      default:
        return <FileArchive className="w-8 h-8 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gray-100 rounded-xl">
              {getIcon()}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{course.name}</span>
              <h2 className="text-base font-bold text-gray-900 leading-snug">{material.name}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-semibold rounded-md">
              {material.category}
            </span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-md">
              {material.type.toUpperCase()} File
            </span>
            <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-md border border-gray-200">
              {material.fileSize}
            </span>
            <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-md border border-gray-200">
              Uploaded {material.date}
            </span>
          </div>

          <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-100 space-y-2">
            <h3 className="text-xs font-bold text-gray-700 uppercase">Resource Description</h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
              {material.description}
            </p>
          </div>

          <div className="p-4 border border-dashed border-border rounded-xl flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs font-semibold text-gray-800">{material.name}</p>
                <p className="text-[11px] text-muted-foreground">{material.fileSize} • Ready to view</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-border flex items-center justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              alert(`Simulating open/download of "${material.name}"`);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Download / Open
          </button>
        </div>
      </div>
    </div>
  );
}
