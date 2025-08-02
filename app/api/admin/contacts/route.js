import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}

export async function GET(request) {
  try {
    verifyToken(request);
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return Response.json(contacts);
  } catch (error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
