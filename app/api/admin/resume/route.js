import jwt from 'jsonwebtoken';
import { writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}

export async function POST(request) {
  try {
    verifyToken(request);
    
    const formData = await request.formData();
    const file = formData.get('resume');
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      return Response.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save to public directory
    const publicDir = path.join(process.cwd(), 'public');
    const fileName = 'resume.pdf';
    const filePath = path.join(publicDir, fileName);
    
    // Remove existing resume if it exists
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
    
    await writeFile(filePath, buffer);
    
    return Response.json({ 
      message: 'Resume uploaded successfully',
      fileName: fileName,
      downloadUrl: `/${fileName}`
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return Response.json({ error: 'Failed to upload resume' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    verifyToken(request);
    
    const publicDir = path.join(process.cwd(), 'public');
    const fileName = 'resume.pdf';
    const filePath = path.join(publicDir, fileName);
    
    if (existsSync(filePath)) {
      await unlink(filePath);
      return Response.json({ message: 'Resume deleted successfully' });
    } else {
      return Response.json({ error: 'Resume not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting resume:', error);
    return Response.json({ error: 'Failed to delete resume' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const fileName = 'resume.pdf';
    const filePath = path.join(publicDir, fileName);
    
    const exists = existsSync(filePath);
    
    return Response.json({ 
      exists,
      fileName: exists ? fileName : null,
      downloadUrl: exists ? `/${fileName}` : null
    });
  } catch (error) {
    console.error('Error checking resume:', error);
    return Response.json({ error: 'Failed to check resume status' }, { status: 500 });
  }
}
