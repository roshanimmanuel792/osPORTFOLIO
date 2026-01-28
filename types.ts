
import { ReactNode } from 'react';

export interface AppIcon {
  id: string;
  label: string;
  icon: ReactNode;
  color: string;
}

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  heightClass: string; // Tailwinc class for height to simulate masonry
}

export enum AppID {
  PROJECTS = 'projects',
  RESUME = 'resume',
  ABOUT = 'about',
  CONTACT = 'contact',
  TERMINAL = 'terminal'
}
