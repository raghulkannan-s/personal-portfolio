import jwt from 'jsonwebtoken';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Invalid token format');
  }
  
  return jwt.verify(token, process.env.JWT_SECRET);
}

export async function POST(request) {
  try {
    verifyToken(request);
    
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return Response.json({ error: 'Only image files are allowed' }, { status: 400 });
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create uploads directory structure
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(publicDir, 'uploads', 'projects');
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);
    
    // Save file
    await writeFile(filePath, buffer);
    
    // Return relative URL for storing in database
    const imageUrl = `/uploads/projects/${fileName}`;
    
    return Response.json({ 
      message: 'Image uploaded successfully',
      imageUrl,
      fileName
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    
    if (error.name === 'JsonWebTokenError' || error.message === 'No token provided' || error.message === 'Invalid token format') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return Response.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    verifyToken(request);
    
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return Response.json({ error: 'No image URL provided' }, { status: 400 });
    }
    
    // Extract filename from URL
    const fileName = path.basename(imageUrl);
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, 'uploads', 'projects', fileName);
    
    if (existsSync(filePath)) {
      await unlink(filePath);
      return Response.json({ message: 'Image deleted successfully' });
    } else {
      return Response.json({ error: 'Image not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    
    if (error.name === 'JsonWebTokenError' || error.message === 'No token provided' || error.message === 'Invalid token format') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return Response.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}