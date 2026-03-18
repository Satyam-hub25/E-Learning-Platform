import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/lib/api-handler';
import dbConnect from '@/lib/mongodb';

export default apiHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});