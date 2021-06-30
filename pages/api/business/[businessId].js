import { getBusiness } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { businessId } = req.query;
    const { business } = await getBusiness(businessId);
    return res.status(200).json({ business });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
