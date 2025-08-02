import { NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// GET endpoint to check resume status or download if requested
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    const publicDir = path.join(process.cwd(), 'public');
    const fileName = 'resume.pdf';
    const filePath = path.join(publicDir, fileName);
    
    const exists = existsSync(filePath);
    
    // If action is download, serve the file
    if (action === 'download') {
      if (!exists) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }

      const fileBuffer = await readFile(filePath);
      
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Raghul_Kannan_Resume.pdf"',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    }
    
    // Get file stats if exists
    let fileStats = null;
    if (exists) {
      try {
        fileStats = await stat(filePath);
      } catch (error) {
        console.error('Error getting file stats:', error);
      }
    }
    
    // Default: return resume status with enhanced metadata
    return Response.json({ 
      exists,
      fileName: exists ? fileName : null,
      downloadUrl: exists ? `/api/resume?action=download` : null,
      directUrl: exists ? `/${fileName}` : null,
      fileSize: fileStats ? Math.round(fileStats.size / 1024) + ' KB' : null,
      lastModified: fileStats ? fileStats.mtime.toISOString() : null,
      message: exists ? 'Resume is available for download' : 'Resume not available',
      available: exists // For backward compatibility
    });
  } catch (error) {
    console.error('Error handling resume request:', error);
    return Response.json({ error: 'Failed to process resume request' }, { status: 500 });
  }
}
