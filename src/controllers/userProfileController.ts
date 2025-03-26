import { Request, Response } from 'express';
import UserProfile from '../models/UserProfile';

export const addUserProfile = async (req: Request, res: Response) => {
  try {
    const { user_id, bio, profile_picture, phone_number, address } = req.body;
    const userProfile = await UserProfile.create({ user_id, bio, profile_picture, phone_number, address });
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user profile', error });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const userProfile = await UserProfile.findOne({ where: { user_id } });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};