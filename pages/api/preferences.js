import { getPreferences } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { preferences } = await getPreferences(uid);
    return res.status(200).json({ preferences });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
