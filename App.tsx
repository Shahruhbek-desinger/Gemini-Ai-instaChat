
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import Auth from './components/Auth';
import CreateFriendModal from './components/CreateFriendModal';
import { FRIENDS as INITIAL_FRIENDS } from './constants';
import { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'messages' | 'search'>('messages');
  const [friends, setFriends] = useState<User[]>(INITIAL_FRIENDS);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLogin = (userData: { fullName: string; username: string }) => {
    setCurrentUser({
      id: 'me',
      username: userData.username,
      fullName: userData.fullName,
      avatar: `https://picsum.photos/seed/${userData.username}/200`,
      bio: 'New explorer on InstaChat.',
      followers: 0,
      following: 0,
      posts: 0
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedFriend(null);
    setActiveView('messages');
  };

  const handleAddFriend = (newFriend: User) => {
    setFriends(prev => [newFriend, ...prev]);
    setIsCreateModalOpen(false);
    setSelectedFriend(newFriend);
    setActiveView('messages');
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return friends;
    return friends.filter(u => 
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, friends]);

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (selectedFriend) {
      return (
        <div className="fixed inset-0 md:pl-64 flex bg-white z-[60] md:z-0">
          <div className="w-full h-full max-w-6xl mx-auto md:border-x md:border-zinc-100">
            <ChatWindow 
              friend={selectedFriend} 
              onBack={() => setSelectedFriend(null)} 
              currentUser={currentUser}
            />
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'messages':
        return (
          <div className="pt-14 md:pt-0 md:pl-64 min-h-screen bg-white">
            <div className="max-w-3xl mx-auto p-6 md:p-12">
              <header className="mb-10">
                <h1 className="text-3xl font-bold text-zinc-900">Chats</h1>
                <p className="text-zinc-500 text-sm mt-1">Connect with your friends instantly.</p>
              </header>
              
              <div className="space-y-3">
                {friends.length > 0 ? (
                  friends.map(friend => (
                    <button 
                      key={friend.id} 
                      onClick={() => setSelectedFriend(friend)}
                      className="w-full flex items-center p-5 rounded-3xl hover:bg-zinc-50 transition-all border border-zinc-100/50 hover:border-zinc-200 active:scale-[0.99] group"
                    >
                      <div className="relative">
                        <img src={friend.avatar} className="w-14 h-14 rounded-full mr-4 border border-zinc-100 shadow-sm transition-transform group-hover:scale-105" />
                        <div className="absolute bottom-0 right-4 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-zinc-900 text-lg leading-tight group-hover:text-black transition-colors">{friend.fullName}</p>
                        <p className="text-sm text-zinc-500 truncate mt-0.5">@{friend.username}</p>
                      </div>
                      <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-24 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
                    <p className="text-zinc-400">Your inbox is empty. Start a new conversation!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="pt-14 md:pt-0 md:pl-64 min-h-screen bg-white">
            <div className="max-w-3xl mx-auto p-6 md:p-12">
              <header className="mb-10">
                <h1 className="text-3xl font-bold text-zinc-900 mb-6">Search</h1>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search by name or @username..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-3xl text-base focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all shadow-sm"
                  />
                  <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
              </header>

              <div className="grid grid-cols-1 gap-2">
                {filteredUsers.map(user => (
                  <button 
                    key={user.id} 
                    onClick={() => setSelectedFriend(user)}
                    className="w-full flex items-center p-4 rounded-2xl hover:bg-zinc-50 transition-colors group"
                  >
                    <img src={user.avatar} className="w-12 h-12 rounded-full mr-4 border border-zinc-100" />
                    <div className="text-left">
                      <p className="font-bold text-sm text-zinc-900 group-hover:text-zinc-950 transition-colors">{user.fullName}</p>
                      <p className="text-xs text-zinc-500">@{user.username}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-xs font-bold px-4 py-2 bg-zinc-900 text-white rounded-full">Message</span>
                    </div>
                  </button>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-20 text-zinc-400 text-sm italic">
                    We couldn't find any users matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onNavigate={setActiveView} 
        activeView={activeView} 
        onLogout={handleLogout}
        onCreateFriend={() => setIsCreateModalOpen(true)}
        currentUser={currentUser}
      />
      <main>
        {renderContent()}
      </main>

      {isCreateModalOpen && (
        <CreateFriendModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onAdd={handleAddFriend} 
        />
      )}
    </div>
  );
};

export default App;
