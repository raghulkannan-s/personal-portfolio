import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save to DB
    const contact = await Contact.create({ 
      name: name.trim(), 
      email: email.trim(), 
      message: message.trim(),
      createdAt: new Date()
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: linear-gradient(135deg, #212175, #FFD700); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #212175;">Name:</strong>
            <span style="color: #333; margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #212175;">Email:</strong>
            <a href="mailto:${email}" style="color: #FFD700; margin-left: 10px; text-decoration: none;">${email}</a>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #212175;">Message:</strong>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #FFD700;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Received on: ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_RECEIVER || process.env.CONTACT_EMAIL_USER,
      subject: `🚀 New Portfolio Contact from ${name}`,
      text: `New contact message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nReceived: ${new Date().toLocaleString()}`,
      html: emailHTML
    });

    return Response.json({ 
      message: 'Message sent successfully',
      id: contact._id 
    });
    
  } catch (error) {
    console.error('Error in contact API:', error);
    
    // More specific error handling
    if (error.name === 'ValidationError') {
      return Response.json({ error: 'Invalid data provided' }, { status: 400 });
    }
    
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      return Response.json({ error: 'Email configuration error. Please try again later.' }, { status: 500 });
    }
    
    return Response.json({ 
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
