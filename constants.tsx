
import { User } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'creative_soul',
  fullName: 'Alex Rivera',
  avatar: 'https://picsum.photos/seed/me/200',
  bio: 'Building the future of social AI. 🚀',
  followers: 1240,
  following: 850,
  posts: 42
};

export const FRIENDS: User[] = [
  {
    id: 'luna',
    username: 'luna_art',
    fullName: 'Luna Chen',
    avatar: 'https://picsum.photos/seed/luna/200',
    bio: 'Digital artist & coffee lover ☕🎨',
    followers: 5400,
    following: 200,
    posts: 154,
    isAI: true
  },
  {
    id: 'jordan',
    username: 'jordan_fit',
    fullName: 'Jordan Sparks',
    avatar: 'https://picsum.photos/seed/jordan/200',
    bio: 'Travel. Fitness. Adventure. 🏔️',
    followers: 8900,
    following: 400,
    posts: 312,
    isAI: true
  },
  {
    id: 'tech_tom',
    username: 'tech_tom',
    fullName: 'Tom Gadget',
    avatar: 'https://picsum.photos/seed/tom/200',
    bio: 'Software Engineer @ FutureTech. Coder for life.',
    followers: 12000,
    following: 10,
    posts: 45,
    isAI: true
  },
  {
    id: 'sam_dev',
    username: 'sam_codes',
    fullName: 'Sam Wilson',
    avatar: 'https://picsum.photos/seed/sam/200',
    bio: 'Fullstack developer and open source enthusiast.',
    followers: 2300,
    following: 150,
    posts: 88,
    isAI: true
  },
  {
    id: 'mia_music',
    username: 'mia_melodies',
    fullName: 'Mia Song',
    avatar: 'https://picsum.photos/seed/mia/200',
    bio: 'Singer/Songwriter. Music is my life. 🎵',
    followers: 45000,
    following: 800,
    posts: 210,
    isAI: true
  }
];
