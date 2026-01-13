
import React, { useState } from 'react';
import { User } from '../types';

interface CreateFriendModalProps {
  onClose: () => void;
  onAdd: (user: User) => void;
}

const CreateFriendModal: React.FC<CreateFriendModalProps> = ({ onClose, onAdd }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [persona, setPersona] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(Math.random().toString(36).substring(7));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !persona) return;

    const newUser: User = {
      id: `ai_${Date.now()}`,
      fullName,
      username: username.toLowerCase().replace(/\s+/g, '_'),
      avatar: `https://picsum.photos/seed/${avatarSeed}/200`,
      bio: persona,
      followers: 0,
      following: 0,
      posts: 0,
      isAI: true
    };

    onAdd(newUser);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        <header className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <button onClick={onClose} className="text-sm font-semibold text-gray-500 hover:text-black">Cancel</button>
          <h2 className="font-bold text-base">New AI Friend</h2>
          <button 
            form="create-friend-form" 
            type="submit" 
            disabled={!fullName || !username || !persona}
            className="text-sm font-bold text-blue-500 disabled:opacity-40 hover:text-blue-600"
          >
            Create
          </button>
        </header>

        <form id="create-friend-form" onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex flex-col items-center mb-4">
            <div className="instagram-gradient p-1 rounded-full mb-3">
              <img 
                src={`https://picsum.photos/seed/${avatarSeed}/200`} 
                alt="Avatar Preview" 
                className="w-24 h-24 rounded-full border-2 border-white bg-gray-100" 
              />
            </div>
            <button 
              type="button" 
              onClick={() => setAvatarSeed(Math.random().toString(36).substring(7))}
              className="text-xs font-semibold text-blue-500 hover:text-blue-700"
            >
              Shuffle Avatar
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Display Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Zen Master" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="zen_bot" 
                  className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">AI Persona (Bio)</label>
              <textarea 
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="Describe how this AI should behave. e.g. A supportive life coach who loves quotes." 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-none"
                required
              />
              <p className="text-[10px] text-gray-400 mt-1 italic">This persona will guide how Gemini responds to you in chat.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFriendModal;
