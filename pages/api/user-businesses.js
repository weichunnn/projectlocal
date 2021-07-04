import { getUserBusinesses } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { businesses } = await getUserBusinesses(uid);
    return res.status(200).json({ businesses });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
