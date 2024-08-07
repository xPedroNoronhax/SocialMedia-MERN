// types.ts
export type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  followers: string[];
  following: string[];
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export interface Reply {
  _id: string;
  text: string;
  userId: string;
  userProfilePic?: string;
  username?: string;
  createdAt: string;
}
export interface Post {
  _id: string;
  text: string;
  img?: string;
  createdAt: string;
  replies: Reply[];
  postedBy: User;
  likes: string[];
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  followers: string[];
  following: string[];
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConversation {
  _id: string;
  participants: IUser[];
  lastMessage: {
    sender: IUser;
    text: string;
  };
}
export interface ILastMessage {
  text: string;
  sender: IUser;
}
