import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
    required: true,
  }],
  githubUrl: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  image: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
