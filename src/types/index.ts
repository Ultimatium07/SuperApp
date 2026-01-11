// Global type definitions
export interface User {
  id: string
  telegramId?: number
  username: string
  firstName: string
  lastName?: string
  photoUrl?: string
  level: number
  xp: number
  energy: number
  maxEnergy: number
  gold: number
  miningPower: number
  autoMiningRate: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
}

export interface QuantumParticle {
  id: string
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  color: string
  size: number
  spin: number
  entangled?: string
}

export interface NeuralData {
  eeg: number[]
  thought: string
  confidence: number
  emotion: string
  biometrics: {
    heartRate: number
    gsr: number
    temperature: number
  }
}

export interface MetaverseSession {
  id: string
  mode: 'vr' | 'ar' | 'desktop'
  environment: string
  users: User[]
  objects: MetaverseObject[]
}

export interface MetaverseObject {
  id: string
  type: 'model' | 'ui' | 'particle' | 'light'
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  interactive: boolean
}

export interface AIModel {
  name: string
  type: 'classification' | 'generation' | 'analysis'
  loaded: boolean
  accuracy?: number
}

export interface ProcessingTask {
  id: string
  type: 'image' | 'text' | 'audio' | 'video'
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  result?: any
  error?: string
}

export interface BattleRoom {
  id: string
  name: string
  host: User
  players: User[]
  maxPlayers: number
  status: 'waiting' | 'playing' | 'finished'
  gameMode: 'quiz' | 'mining' | 'battle'
}

export interface StudyRoom {
  id: string
  topic: string
  host: User
  participants: User[]
  maxParticipants: number
  isPublic: boolean
  resources: Resource[]
}

export interface Resource {
  id: string
  type: 'document' | 'video' | 'quiz' | 'link'
  title: string
  url?: string
  content?: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuizSession {
  id: string
  questions: QuizQuestion[]
  currentQuestion: number
  score: number
  timeLeft: number
  isCompleted: boolean
}

// Component props types
export interface QuantumButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export interface HolographicCardProps {
  children: React.ReactNode
  title?: string
  description?: string
  interactive?: boolean
  className?: string
}

export interface NeuralInputProps {
  onCommand: (command: string) => void
  placeholder?: string
  className?: string
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
}

// Webhook types
export interface TelegramWebApp {
  initData: string
  user: TelegramUser
  queryId?: string
  authDate: string
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  language_code?: string
}

// Theme types
export type ThemeMode = 'dark' | 'light' | 'quantum' | 'neon' | 'holographic'

export interface CustomTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

// Animation types
export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
  repeat?: number | 'infinite'
}

// Sound effect types
export interface SoundEffect {
  id: string
  url: string
  volume: number
  loop: boolean
}

// Haptic feedback types
export interface HapticPattern {
  type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'
  duration: number
}

// Achievement types
export interface AchievementProgress {
  achievementId: string
  current: number
  required: number
  isUnlocked: boolean
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number
  user: User
  score: number
  category: string
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

// File types
export interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: Date
  analysis?: FileAnalysis
}

export interface FileAnalysis {
  type: 'image' | 'text' | 'document' | 'other'
  confidence: number
  tags: string[]
  extractedText?: string
  objects?: string[]
}

// Game state types
export interface GameState {
  id: string
  type: 'mining' | 'quiz' | 'battle'
  status: 'idle' | 'playing' | 'paused' | 'finished'
  score: number
  startTime?: Date
  endTime?: Date
}

// Tournament types
export interface Tournament {
  id: string
  name: string
  description: string
  gameMode: string
  maxParticipants: number
  participants: User[]
  status: 'registration' | 'ongoing' | 'finished'
  prizePool?: number
  startTime?: Date
  endTime?: Date
}

// Market types
export interface MarketItem {
  id: string
  name: string
  description: string
  price: number
  currency: 'gold' | 'xp' | 'crypto'
  category: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  owned: boolean
}
