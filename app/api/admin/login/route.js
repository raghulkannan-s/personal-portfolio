import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    if (password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { admin: true },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return Response.json({ token });
    } else {
      return Response.json({ message: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
