
import React from 'react';
import { MessageIcon, SearchIcon, PlusIcon } from './Icons';
import { User } from '../types';

interface NavbarProps {
  onNavigate: (view: 'messages' | 'search') => void;
  activeView: string;
  onLogout: () => void;
  onCreateFriend: () => void;
  currentUser: User;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeView, onLogout, onCreateFriend, currentUser }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-zinc-100 bg-white p-8 space-y-12 z-50">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-zinc-900">InstaChat</h1>
          <div className="h-1 w-8 bg-zinc-900 mt-2 rounded-full"></div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => onNavigate('messages')}
            className={`flex items-center space-x-4 p-3.5 rounded-2xl transition-all ${activeView === 'messages' ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/10' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
          >
            <MessageIcon className="w-6 h-6" />
            <span className="font-semibold">Messages</span>
          </button>
          
          <button 
            onClick={() => onNavigate('search')}
            className={`flex items-center space-x-4 p-3.5 rounded-2xl transition-all ${activeView === 'search' ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/10' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}
          >
            <SearchIcon className="w-6 h-6" />
            <span className="font-semibold">Search</span>
          </button>

          <button 
            onClick={onCreateFriend}
            className="flex items-center space-x-4 p-3.5 rounded-2xl text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
          >
            <PlusIcon className="w-6 h-6" />
            <span className="font-semibold">New Friend</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-100 space-y-6">
          <div className="flex items-center space-x-3">
            <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-zinc-100 shadow-sm" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-zinc-900 truncate">{currentUser.fullName}</p>
              <p className="text-xs text-zinc-500 truncate">@{currentUser.username}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-4 p-3.5 rounded-2xl hover:bg-red-50 text-red-500 transition-all font-bold text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span>Sign out</span>
          </button>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 w-full h-16 bg-white border-b border-zinc-100 flex items-center justify-between px-6 z-50">
        <h1 className="text-xl font-bold tracking-tighter text-zinc-900">InstaChat</h1>
        <div className="flex items-center space-x-2">
          <button onClick={onCreateFriend} className="p-2 text-zinc-900">
             <PlusIcon className="w-6 h-6" />
          </button>
          <button onClick={onLogout} className="p-2 text-zinc-400">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-white border-t border-zinc-100 flex items-center justify-around z-50">
        <button onClick={() => onNavigate('messages')} className={`p-3 rounded-xl transition-colors ${activeView === 'messages' ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}>
          <MessageIcon className="w-7 h-7" />
        </button>
        <button onClick={() => onNavigate('search')} className={`p-3 rounded-xl transition-colors ${activeView === 'search' ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}>
          <SearchIcon className="w-7 h-7" />
        </button>
        <div className="p-1">
          <img 
            src={currentUser.avatar} 
            alt="Profile" 
            className="w-9 h-9 rounded-full border border-zinc-100" 
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
