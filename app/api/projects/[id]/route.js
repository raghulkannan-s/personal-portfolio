import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';


export async function GET(request, { params }) {
    const { id } = await params;
  try {
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    return Response.json(project);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
    const id = await params.id;
    try {
        await dbConnect();
        const project = await Project.findById(id);
        if (!project) {
            return Response.json({ error: 'Project not found' }, { status: 404 });
        }
        const updatedData = await request.json();
        Object.assign(project, updatedData);
        await project.save();
        return Response.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return Response.json({ error: 'Failed to update project' }, { status: 500 });
    }
}