interface ILBLeaderboard {
  variant?: 'private' | 'public';
}

interface ILBLeaderboardUser {
  name: string;
  avatar: string;
  type: 'farcaster' | 'wallet';
  position: number;
}
