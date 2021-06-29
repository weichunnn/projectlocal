import { getAllBusinesses } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { businesses } = await getAllBusinesses();
    res.status(200).json({ businesses });
  } catch (error) {
    res.status(500).json({ error });
  }
};
