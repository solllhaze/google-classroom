import React, { useState } from 'react';
import {
  Menu,
  Plus,
  Home,
  Calendar as CalendarIcon,
  CheckCircle2,
  FileArchive,
  Settings as SettingsIcon,
  X,
  User,
  GraduationCap,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

import { Course, Activity, Material, Announcement } from './types';
import {
  INITIAL_PROGRAM,
  INITIAL_COURSES,
  ARCHIVED_COURSES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MATERIALS,
  INITIAL_ACTIVITIES,
  CALENDAR_EVENTS,
} from './mockData';

import ClassesView from './components/ClassesView';
import SubjectView from './components/SubjectView';
import CalendarView from './components/CalendarView';
import TodoView from './components/TodoView';
import ArchivedView from './components/ArchivedView';
import SettingsView from './components/SettingsView';
import GradesView from './components/GradesView';
import JoinModal from './components/JoinModal';
import TaskModal from './components/TaskModal';
import MaterialModal from './components/MaterialModal';
import AnnouncementsModal from './components/AnnouncementsModal';

type ViewType = 'classes' | 'subject' | 'calendar' | 'todo' | 'archived' | 'settings' | 'grades';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('classes');
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [archivedCourses, setArchivedCourses] = useState<Course[]>(ARCHIVED_COURSES);
  const [activeCourseId, setActiveCourseId] = useState<string>(INITIAL_COURSES[0].id);

  const [announcements, setAnnouncements] = useState<Record<string, Announcement[]>>(INITIAL_ANNOUNCEMENTS);
  const [materials, setMaterials] = useState<Record<string, Material[]>>(INITIAL_MATERIALS);
  const [activities, setActivities] = useState<Record<string, Activity[]>>(INITIAL_ACTIVITIES);
  const [program] = useState(INITIAL_PROGRAM);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Modals state
  const [selectedTaskModal, setSelectedTaskModal] = useState<{ activity: Activity; course: Course } | null>(null);
  const [selectedMaterialModal, setSelectedMaterialModal] = useState<{ material: Material; course: Course } | null>(null);
  const [isAllAnnouncementsOpen, setIsAllAnnouncementsOpen] = useState(false);

  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  // Helper to toggle task submission status
  const handleToggleTaskStatus = (activityId: string, courseId?: string) => {
    const cId = courseId || activeCourseId;
    setActivities(prev => {
      const courseTasks = prev[cId] || [];
      const updated = courseTasks.map(task => {
        if (task.id === activityId) {
          const isSubmitted = task.status === 'Submitted';
          return {
            ...task,
            status: (isSubmitted ? 'In Progress' : 'Submitted') as Activity['status'],
            submittedAt: isSubmitted ? undefined : 'Just now',
          };
        }
        return task;
      });
      return { ...prev, [cId]: updated };
    });

    // Update opened modal if active
    if (selectedTaskModal && selectedTaskModal.activity.id === activityId) {
      const nextStatus = selectedTaskModal.activity.status === 'Submitted' ? 'In Progress' : 'Submitted';
      setSelectedTaskModal({
        ...selectedTaskModal,
        activity: {
          ...selectedTaskModal.activity,
          status: nextStatus,
          submittedAt: nextStatus === 'Submitted' ? 'Just now' : undefined,
        },
      });
    }
  };

  // Handler to join a new class
  const handleJoinClass = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
    setAnnouncements(prev => ({
      ...prev,
      [newCourse.id]: [
        {
          id: `a_${Date.now()}`,
          courseId: newCourse.id,
          title: `Welcome to ${newCourse.name}`,
          content: `Welcome to the class! Please check the syllabus and materials tab for course requirements.`,
          date: 'Just now',
          author: newCourse.professor,
          authorRole: 'Instructor',
          isImportant: true,
          commentsCount: 0,
        }
      ]
    }));
    setMaterials(prev => ({ ...prev, [newCourse.id]: [] }));
    setActivities(prev => ({ ...prev, [newCourse.id]: [] }));
    setActiveCourseId(newCourse.id);
    setCurrentView('subject');
  };

  // Handler to restore archived course
  const handleRestoreCourse = (courseToRestore: Course) => {
    setArchivedCourses(prev => prev.filter(c => c.id !== courseToRestore.id));
    setCourses(prev => [...prev, courseToRestore]);
    setActiveCourseId(courseToRestore.id);
    setCurrentView('subject');
  };

  // Navigation helpers
  const navigateToSubject = (courseId: string) => {
    setActiveCourseId(courseId);
    setCurrentView('subject');
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden text-foreground">
      {/* Top Google Classroom Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-4 shrink-0 bg-white z-20 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            title="Main menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => setCurrentView('classes')}
            className="flex items-center gap-2.5 select-none cursor-pointer group"
          >
            <img 
              src="/classroom-logo.png" 
              alt="Google Classroom Logo" 
              className="w-7 h-7 object-contain rounded-md shadow-2xs group-hover:scale-105 transition-transform" 
            />
            <span className="text-[1.35rem] font-medium tracking-tight text-muted-foreground flex items-center gap-1.5">
              <span className="text-gray-800 font-bold">Google</span> Classroom
            </span>
            {currentView === 'subject' && activeCourse && (
              <span className="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-medium pl-3 border-l border-gray-300">
                <span>›</span>
                <span className="text-gray-800 font-semibold truncate max-w-[200px] md:max-w-[300px]">
                  {activeCourse.name}
                </span>
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Join class button */}
          <button 
            onClick={() => setIsJoinModalOpen(true)}
            className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground group relative"
            title="Join class"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Grid icon */}
          <button 
            onClick={() => setCurrentView('classes')}
            className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            title="Google apps"
          >
            <GridIcon />
          </button>

          {/* Student profile avatar */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm ml-2 cursor-pointer ring-2 ring-transparent hover:ring-blue-300 transition-all"
              title="Student Profile"
            >
              {program.studentName.charAt(0)}
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-2xl shadow-xl p-5 z-50 space-y-4">
                <div className="text-center space-y-1 border-b border-border pb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto">
                    {program.studentName.charAt(0)}
                  </div>
                  <h4 className="font-bold text-base text-gray-900">{program.studentName}</h4>
                  <p className="text-xs text-muted-foreground">{program.studentEmail}</p>
                  <p className="text-[11px] font-semibold text-gray-500">ID: {program.studentId}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                    <p className="font-bold text-blue-900 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" /> Enrolled Degree Program
                    </p>
                    <p className="text-blue-800 font-medium leading-snug">{program.programName}</p>
                    <p className="text-[11px] text-blue-600 font-semibold mt-1">
                      {program.semester} • AY {program.academicYear}
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex gap-2">
                  <button 
                    onClick={() => { setCurrentView('settings'); setIsProfileMenuOpen(false); }}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    View Settings
                  </button>
                  <button 
                    onClick={() => { setCurrentView('classes'); setIsProfileMenuOpen(false); }}
                    className="flex-1 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    All Classes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Drawer */}
        <aside 
          className={`shrink-0 border-r border-border bg-white flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-[280px]' : 'w-0 opacity-0 overflow-hidden border-none'
          }`}
        >
          <div className="py-2 overflow-y-auto flex-1">
            {/* Top items */}
            <div className="px-2 space-y-0.5">
              <SidebarItem 
                icon={<Home className="w-5 h-5" />} 
                label="Classes" 
                isActive={currentView === 'classes'}
                onClick={() => setCurrentView('classes')}
              />
              <SidebarItem 
                icon={<CalendarIcon className="w-5 h-5" />} 
                label="Calendar" 
                isActive={currentView === 'calendar'}
                onClick={() => setCurrentView('calendar')}
              />
            </div>
            
            <div className="my-3 border-t border-border" />
            
            {/* Enrolled Section Header */}
            <div className="px-4 py-2 flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Enrolled</p>
              <span className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {courses.length}
              </span>
            </div>
            
            {/* Enrolled Items */}
            <div className="px-2 space-y-0.5">
              <SidebarItem 
                icon={<CheckCircle2 className="w-5 h-5" />} 
                label="To-do" 
                isActive={currentView === 'todo'}
                onClick={() => setCurrentView('todo')}
              />
              <SidebarItem
                icon={<BookOpen className="w-5 h-5" />}
                label="Grades"
                isActive={currentView === 'grades'}
                onClick={() => setCurrentView('grades')}
              />

              {courses.map(course => {
                const isCourseActive = currentView === 'subject' && activeCourseId === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => navigateToSubject(course.id)}
                    className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-e-full transition-colors text-sm font-medium ${
                      isCourseActive 
                        ? 'bg-accent text-accent-foreground font-semibold' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${course.theme}`}>
                      {course.name.charAt(0)}
                    </div>
                    <div className="truncate text-left flex-1 min-w-0">
                      <div className="truncate">{course.name}</div>
                      <div className="text-xs font-normal text-muted-foreground truncate flex items-center gap-1.5">
                        <span>{course.section}</span>
                        {course.isIrregular && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1 py-0.2 rounded">
                            Irreg
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="my-3 border-t border-border" />
            
            {/* Bottom items */}
            <div className="px-2 space-y-0.5">
              <SidebarItem 
                icon={<FileArchive className="w-5 h-5" />} 
                label="Archived classes" 
                isActive={currentView === 'archived'}
                onClick={() => setCurrentView('archived')}
              />
              <SidebarItem 
                icon={<SettingsIcon className="w-5 h-5" />} 
                label="Settings" 
                isActive={currentView === 'settings'}
                onClick={() => setCurrentView('settings')}
              />
            </div>
          </div>
        </aside>

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {currentView === 'classes' && (
            <ClassesView
              program={program}
              courses={courses}
              activities={activities}
              onSelectCourse={navigateToSubject}
              onOpenJoinModal={() => setIsJoinModalOpen(true)}
              onOpenTodo={() => setCurrentView('todo')}
            />
          )}

          {currentView === 'subject' && activeCourse && (
            <SubjectView
              course={activeCourse}
              announcements={announcements[activeCourse.id] || []}
              materials={materials[activeCourse.id] || []}
              activities={activities[activeCourse.id] || []}
              onOpenAllAnnouncements={() => setIsAllAnnouncementsOpen(true)}
              onOpenMaterialModal={(m) => setSelectedMaterialModal({ material: m, course: activeCourse })}
              onOpenTaskModal={(a) => setSelectedTaskModal({ activity: a, course: activeCourse })}
              onToggleTaskStatus={(activityId) => handleToggleTaskStatus(activityId, activeCourse.id)}
            />
          )}

          {currentView === 'calendar' && (
            <CalendarView
              courses={courses}
              events={CALENDAR_EVENTS}
              activities={activities}
              onSelectCourse={navigateToSubject}
            />
          )}

          {currentView === 'todo' && (
            <TodoView
              courses={courses}
              activities={activities}
              onToggleStatus={handleToggleTaskStatus}
              onSelectCourse={navigateToSubject}
              onOpenTaskDetails={(activity, course) => setSelectedTaskModal({ activity, course })}
            />
          )}

          {currentView === 'grades' && (
            <GradesView
              courses={courses}
              program={program}
              onSelectCourse={navigateToSubject}
            />
          )}

          {currentView === 'archived' && (
            <ArchivedView
              archivedCourses={archivedCourses}
              onRestoreCourse={handleRestoreCourse}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              program={program}
              courses={courses}
            />
          )}
        </main>
      </div>

      {/* MODALS */}

      {/* Join Class Modal */}
      {isJoinModalOpen && (
        <JoinModal
          program={program}
          onClose={() => setIsJoinModalOpen(false)}
          onJoinSuccess={handleJoinClass}
        />
      )}

      {/* Task / Assignment Submission Modal */}
      {selectedTaskModal && (
        <TaskModal
          activity={selectedTaskModal.activity}
          course={selectedTaskModal.course}
          onClose={() => setSelectedTaskModal(null)}
          onToggleStatus={handleToggleTaskStatus}
        />
      )}

      {/* Material Preview Modal */}
      {selectedMaterialModal && (
        <MaterialModal
          material={selectedMaterialModal.material}
          course={selectedMaterialModal.course}
          onClose={() => setSelectedMaterialModal(null)}
        />
      )}

      {/* All Announcements Modal */}
      {isAllAnnouncementsOpen && activeCourse && (
        <AnnouncementsModal
          announcements={announcements[activeCourse.id] || []}
          course={activeCourse}
          onClose={() => setIsAllAnnouncementsOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarItem({ 
  icon, 
  label, 
  isActive = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive?: boolean; 
  onClick?: () => void; 
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-e-full transition-colors text-sm font-medium ${
        isActive 
          ? 'bg-accent text-accent-foreground font-semibold' 
          : 'text-foreground hover:bg-muted'
      }`}
    >
      <div className={isActive ? 'text-primary' : 'text-muted-foreground'}>{icon}</div>
      <span className="truncate">{label}</span>
    </button>
  );
}

function GridIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 16c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-16 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm16-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm16-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-8 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
    </svg>
  );
}
