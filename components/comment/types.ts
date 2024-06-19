interface ILBComment {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  comments: string[];
  images: string[];
  replies: ILBComment[];
  recasts: number;
  likes: number;
}
