import React, { useState } from 'react';
import { Course, Announcement, Material, Activity } from '../types';
import {
  Bell,
  FileText,
  Presentation,
  File,
  Search,
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  MoreVertical,
  Filter,
  FileArchive,
  Users,
  Award,
  Calendar,
  Layers,
  Check
} from 'lucide-react';

interface SubjectViewProps {
  course: Course;
  announcements: Announcement[];
  materials: Material[];
  activities: Activity[];
  onOpenAllAnnouncements: () => void;
  onOpenMaterialModal: (material: Material) => void;
  onOpenTaskModal: (activity: Activity) => void;
  onToggleTaskStatus: (activityId: string) => void;
}

function StatusBadge({ status }: { status: string }) {
  let colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
  let Icon = Circle;

  if (status === 'Not Started') {
    colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
    Icon = Circle;
  } else if (status === 'In Progress') {
    colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    Icon = Clock;
  } else if (status === 'Submitted') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    Icon = CheckCircle2;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}

function FileIcon({ type }: { type: string }) {
  switch (type) {
    case 'ppt':
      return <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0"><Presentation className="w-5 h-5" /></div>;
    case 'video':
      return <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0"><BookOpen className="w-5 h-5" /></div>;
    case 'pdf':
      return <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0"><FileText className="w-5 h-5" /></div>;
    case 'doc':
      return <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0"><File className="w-5 h-5" /></div>;
    default:
      return <div className="p-2 bg-gray-100 text-gray-600 rounded-lg shrink-0"><FileArchive className="w-5 h-5" /></div>;
  }
}

export default function SubjectView({
  course,
  announcements,
  materials,
  activities,
  onOpenAllAnnouncements,
  onOpenMaterialModal,
  onOpenTaskModal,
  onToggleTaskStatus,
}: SubjectViewProps) {
  const [courseTab, setCourseTab] = useState<'home' | 'classwork' | 'people' | 'grades'>('home');
  const [materialSearch, setMaterialSearch] = useState('');
  const [materialFilter, setMaterialFilter] = useState('All');

  const filteredMaterials = materials.filter(m =>
    (materialFilter === 'All' || m.category === materialFilter) &&
    (m.name.toLowerCase().includes(materialSearch.toLowerCase()) || m.description.toLowerCase().includes(materialSearch.toLowerCase()))
  );

  const classmates = [
    { name: 'Emma Watson', role: 'Student', email: 'e.watson@school.edu' },
    { name: 'Liam Chen', role: 'Student', email: 'l.chen@school.edu' },
    { name: 'Sofia Rodriguez', role: 'Student', email: 's.rodriguez@school.edu' },
    { name: 'Marcus Johnson', role: 'Student', email: 'm.johnson@school.edu' },
    { name: 'Aaliyah Patel', role: 'Student', email: 'a.patel@school.edu' },
  ];

  return (
    <div className="max-w-[1000px] mx-auto p-6 md:p-8 space-y-6">
      {/* Subject Navigation Tabs */}
      <div className="flex items-center justify-center border-b border-border gap-6 sm:gap-10 text-sm font-semibold">
        <button
          onClick={() => setCourseTab('home')}
          className={`pb-3 relative transition-colors ${
            courseTab === 'home' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          Class Home
          {courseTab === 'home' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>

        <button
          onClick={() => setCourseTab('classwork')}
          className={`pb-3 relative transition-colors ${
            courseTab === 'classwork' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          Classwork
          {courseTab === 'classwork' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>

        <button
          onClick={() => setCourseTab('people')}
          className={`pb-3 relative transition-colors ${
            courseTab === 'people' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          People
          {courseTab === 'people' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>

        <button
          onClick={() => setCourseTab('grades')}
          className={`pb-3 relative transition-colors ${
            courseTab === 'grades' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-gray-900'
          }`}
        >
          Grades
          {courseTab === 'grades' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
        </button>
      </div>

      {/* Class Hero Banner */}
      <div className={`relative h-48 md:h-56 rounded-2xl overflow-hidden flex flex-col justify-end p-6 md:p-8 text-white shadow-md ${course.theme}`}>
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-white/20 backdrop-blur-sm rounded-md uppercase tracking-wider">
              {course.code}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">{course.name}</h1>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <p className="text-base md:text-lg text-white/90 font-medium">{course.section} • {course.professor}</p>
              {course.isIrregular && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-xs">
                  Irregular Subject (Cross-Enrolled)
                </span>
              )}
            </div>
          </div>

          <div className="text-xs text-white/90 bg-black/20 backdrop-blur-sm px-3.5 py-2 rounded-xl">
            <p className="font-semibold">{course.room}</p>
            <p>{course.schedule}</p>
          </div>
        </div>
      </div>

      {courseTab === 'home' && (
        <div className="space-y-8">
          {/* SECTION 1: ANNOUNCEMENTS */}
          <section aria-labelledby="announcements-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="announcements-heading" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" /> Announcements
              </h2>
              {announcements.length > 0 && (
                <button 
                  onClick={onOpenAllAnnouncements}
                  className="text-xs font-bold text-primary hover:bg-accent px-3 py-1.5 rounded-lg transition-colors"
                >
                  View all ({announcements.length})
                </button>
              )}
            </div>

            <div className="grid gap-3">
              {announcements.length > 0 ? (
                announcements.slice(0, 1).map((announcement) => (
                  <div 
                    key={announcement.id} 
                    onClick={onOpenAllAnnouncements}
                    className="group bg-white border border-border rounded-xl p-5 hover:border-gray-400 transition-colors shadow-2xs cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-bold text-base text-gray-900 group-hover:text-primary transition-colors">
                            {announcement.title}
                          </h3>
                          {announcement.isImportant && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                              <AlertCircle className="w-3 h-3" /> Important
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                          {announcement.content}
                        </p>
                      </div>
                      <div className="text-right flex flex-col justify-between items-end shrink-0">
                        <span className="text-xs font-semibold text-muted-foreground">{announcement.date}</span>
                        <span className="text-xs text-primary font-semibold group-hover:underline">Read full</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 border border-border rounded-xl text-center text-muted-foreground bg-gray-50/50 text-xs">
                  No announcements yet.
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: MATERIALS */}
          <section aria-labelledby="materials-heading" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-0.5">
                <h2 id="materials-heading" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" /> Learning Materials
                </h2>
                <p className="text-xs text-muted-foreground">PowerPoint slides, lecture notes, and reference files</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text"
                    placeholder="Search materials..."
                    className="pl-9 pr-4 py-1.5 bg-white border border-border rounded-lg text-xs focus:outline-none focus:border-primary transition-colors w-full sm:w-56"
                    value={materialSearch}
                    onChange={(e) => setMaterialSearch(e.target.value)}
                  />
                </div>
                <div className="relative flex items-center">
                  <select 
                    className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-border rounded-lg text-xs font-semibold focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    value={materialFilter}
                    onChange={(e) => setMaterialFilter(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="PowerPoint Presentations">PowerPoint Presentations</option>
                    <option value="Lecture Materials">Lecture Materials</option>
                    <option value="References">References</option>
                    <option value="Other learning resources">Other Resources</option>
                  </select>
                  <Filter className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredMaterials.map(material => (
                <div 
                  key={material.id} 
                  onClick={() => onOpenMaterialModal(material)}
                  className="flex gap-3.5 p-4 bg-white border border-border rounded-xl hover:border-gray-400 hover:shadow-2xs transition-all cursor-pointer group"
                >
                  <FileIcon type={material.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-xs sm:text-sm truncate group-hover:text-primary transition-colors">{material.name}</h3>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">{material.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-2 line-clamp-1">{material.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded">
                        {material.category}
                      </span>
                      <span className="text-[10px] text-gray-400">• {material.fileSize}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredMaterials.length === 0 && (
                <div className="col-span-full py-8 text-center border border-dashed border-border rounded-xl bg-gray-50/50">
                  <p className="text-muted-foreground text-xs">No materials found matching your criteria.</p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 3: ACTIVITIES */}
          <section aria-labelledby="activities-heading" className="space-y-4">
            <div className="space-y-0.5">
              <h2 id="activities-heading" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" /> Activities & Tasks
              </h2>
              <p className="text-xs text-muted-foreground">Class tasks organized by category with submission tracking</p>
            </div>

            <div className="space-y-6">
              {['Activities', 'Projects', 'Quizzes'].map(category => {
                const categoryTasks = activities.filter(t => t.category === category);
                if (categoryTasks.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">{category}</h3>
                    <div className="grid gap-2.5">
                      {categoryTasks.map(task => (
                        <div 
                          key={task.id} 
                          onClick={() => onOpenTaskModal(task)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-border rounded-xl hover:border-gray-400 transition-all cursor-pointer group gap-4 shadow-2xs"
                        >
                          <div className="flex-1 min-w-0 flex items-start gap-3">
                            <div className="mt-0.5 p-2 bg-purple-50 rounded-lg text-purple-700 group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">{task.title}</h4>
                                <span className="text-xs font-semibold text-gray-400">• {task.points} pts</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{task.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 justify-between sm:justify-end pl-11 sm:pl-0">
                            <div className="text-left sm:text-right">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">Due</p>
                              <p className="text-xs font-semibold text-gray-700">{task.dueDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <StatusBadge status={task.status} />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleTaskStatus(task.id);
                                }}
                                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                                  task.status === 'Submitted'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : 'hover:bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                                title={task.status === 'Submitted' ? 'Mark unsubmitted' : 'Mark turned in'}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {activities.length === 0 && (
                <div className="py-8 text-center border border-dashed border-border rounded-xl bg-gray-50/50">
                  <p className="text-muted-foreground text-xs">No tasks assigned currently.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {courseTab === 'classwork' && (
        /* Classwork View */
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="text-lg font-bold text-gray-900">Topic-Based Classwork</h2>
            <span className="text-xs text-muted-foreground">All learning resources & activities</span>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-border space-y-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Module 1: Foundations & Core Concepts
              </h3>
              <div className="space-y-2">
                {materials.slice(0, 2).map(m => (
                  <div key={m.id} onClick={() => onOpenMaterialModal(m)} className="p-3 bg-white border border-border rounded-lg flex items-center justify-between text-xs cursor-pointer hover:border-primary">
                    <span className="font-semibold text-gray-800">{m.name}</span>
                    <span className="text-gray-400">{m.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-border space-y-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Module 2: Applied Studies & Problem Sets
              </h3>
              <div className="space-y-2">
                {activities.map(a => (
                  <div key={a.id} onClick={() => onOpenTaskModal(a)} className="p-3 bg-white border border-border rounded-lg flex items-center justify-between text-xs cursor-pointer hover:border-primary">
                    <span className="font-semibold text-gray-800">{a.title}</span>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {courseTab === 'people' && (
        /* People View */
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2 flex items-center gap-2">
              Teachers
            </h3>
            <div className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {course.professor.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{course.professor}</p>
                <p className="text-xs text-primary">{course.professorEmail}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="text-lg font-bold text-primary">Classmates</h3>
              <span className="text-xs font-semibold text-muted-foreground">{classmates.length} students</span>
            </div>
            <div className="divide-y divide-border bg-white border border-border rounded-xl overflow-hidden">
              {classmates.map((student, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400">Enrolled</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {courseTab === 'grades' && (
        /* Grades View */
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase font-bold text-emerald-100">Overall Course Standing</p>
              <h2 className="text-3xl font-bold mt-1">94.5% (Grade: 1.25)</h2>
              <p className="text-xs text-emerald-100 mt-1">Status: High Passing • {course.credits} Credits</p>
            </div>
            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-center">
              <p className="text-xs text-emerald-100 uppercase font-semibold">Evaluated Items</p>
              <p className="text-xl font-bold mt-0.5">{activities.filter(a => a.status === 'Submitted').length} of {activities.length}</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl divide-y divide-border overflow-hidden text-sm">
            {activities.map(task => (
              <div key={task.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{task.title}</h4>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </div>
                <div className="text-right">
                  {task.status === 'Submitted' ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {task.points} / {task.points} pts (100%)
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      Pending ({task.points} pts)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
