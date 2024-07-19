interface ILBLeaderboard {
  variant?: 'private' | 'public';
  isFullWidth?: boolean;
}

interface ILBLeaderboardUser {
  name: string;
  avatar: string;
  type: 'farcaster' | 'wallet';
  position: number;
}
