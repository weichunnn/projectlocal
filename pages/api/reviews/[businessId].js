import { getAllReviews } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const businessId = req.query.businessId;
    const { reviews } = await getAllReviews(businessId);

    res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
