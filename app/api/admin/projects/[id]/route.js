import jwt from 'jsonwebtoken';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
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

export async function PUT(request, { params }) {
  try {
    verifyToken(request);
    await dbConnect();
    
    const { id } = params;
    const projectData = await request.json();
    
    const project = await Project.findByIdAndUpdate(id, projectData, { new: true });
    
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return Response.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    verifyToken(request);
    await dbConnect();
    
    const { id } = params;
    const project = await Project.findById(id);
    
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    // Delete associated image if exists
    if (project.image) {
      try {
        const fileName = path.basename(project.image);
        const publicDir = path.join(process.cwd(), 'public');
        const filePath = path.join(publicDir, 'uploads', 'projects', fileName);
        
        if (existsSync(filePath)) {
          await unlink(filePath);
        }
      } catch (error) {
        console.error('Error deleting project image:', error);
        // Continue with project deletion even if image deletion fails
      }
    }
    
    await Project.findByIdAndDelete(id);
    
    return Response.json({ message: 'Project and associated image deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
