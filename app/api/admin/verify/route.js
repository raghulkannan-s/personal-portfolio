import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return Response.json({ error: 'Invalid token format' }, { status: 401 });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    
    return Response.json({ 
      success: true, 
      message: 'Token is valid',
      admin: true 
    });
    
  } catch (error) {
    console.error('Token verification failed:', error);
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}