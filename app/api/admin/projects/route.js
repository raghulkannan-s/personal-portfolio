import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

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
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    verifyToken(request);
    await dbConnect();
    
    const projectData = await request.json();
    const project = await Project.create(projectData);
    
    return Response.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
