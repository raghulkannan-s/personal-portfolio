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

export async function PUT(request, { params }) {
  try {
    verifyToken(request);
    await dbConnect();
    
    const { id } = params;
    const { read } = await request.json();
    
    const contact = await Contact.findByIdAndUpdate(
      id, 
      { read }, 
      { new: true }
    );
    
    if (!contact) {
      return Response.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return Response.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    return Response.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}
