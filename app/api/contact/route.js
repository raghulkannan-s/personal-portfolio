import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, subject, email, message } = await request.json();
    if (!name || !email || !message || !subject) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date()
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Contact</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 0; margin: 0; line-height: 1.5;">

    <!-- Email Container -->
    <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); border: 1px solid rgba(0, 0, 0, 0.06);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 32px 24px; text-align: center;">
            <!-- Icon -->
            <div style="display: inline-block; width: 56px; height: 56px; background: rgba(255, 255, 255, 0.1); border-radius: 12px; margin-bottom: 16px; text-align: center; line-height: 56px;">
                <span style="color: #d4af37; font-size: 24px;">✉</span>
            </div>
            
            <!-- Title -->
            <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">New Contact Message</h1>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin: 0;">Portfolio Inquiry Received</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px 24px;">
            
            <!-- Contact Info -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <h2 style="color: #1a1a1a; font-size: 16px; font-weight: bold; margin: 0 0 16px 0;">
                    <span style="display: inline-block; width: 6px; height: 6px; background: #d4af37; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                    Contact Details
                </h2>
                
                <!-- Contact Grid -->
                <div style="margin-bottom: 12px;">
                    <div style="display: table; width: 100%; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
                        <div style="display: table-cell; width: 40px; vertical-align: middle;">
                            <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 6px; text-align: center; line-height: 32px;">
                                <span style="color: #3b82f6; font-size: 16px;">👤</span>
                            </div>
                        </div>
                        <div style="display: table-cell; vertical-align: middle; padding-left: 12px;">
                            <div style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 2px;">NAME</div>
                            <div style="font-size: 14px; font-weight: bold; color: #1a1a1a;">${name}</div>
                        </div>
                    </div>
                    
                    <div style="display: table; width: 100%; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
                        <div style="display: table-cell; width: 40px; vertical-align: middle;">
                            <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 6px; text-align: center; line-height: 32px;">
                                <span style="color: #059669; font-size: 16px;">📧</span>
                            </div>
                        </div>
                        <div style="display: table-cell; vertical-align: middle; padding-left: 12px;">
                            <div style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 2px;">EMAIL</div>
                            <a href="mailto:${email}" style="font-size: 14px; font-weight: bold; color: #059669; text-decoration: none;">${email}</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Subject Section -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1a1a1a; font-size: 16px; font-weight: bold; margin: 0 0 12px 0;">
                    <span style="display: inline-block; width: 6px; height: 6px; background: #f59e0b; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                    Subject
                </h3>
                
                <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0; border-left: 3px solid #f59e0b;">
                    <div style="color: #374151; font-size: 16px; line-height: 1.6; font-weight: bold;">
                        ${subject}
                    </div>
                </div>
            </div>
            
            <!-- Message Body -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1a1a1a; font-size: 16px; font-weight: bold; margin: 0 0 12px 0;">
                    <span style="display: inline-block; width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                    Message Body
                </h3>
                
                <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0; border-left: 3px solid #8b5cf6;">
                    <div style="color: #374151; font-size: 14px; line-height: 1.6;">
                        ${message.replace(/\n/g, '<hr/><br/>')}
                    </div>
                </div>
            </div>
            
            <!-- Footer Info -->
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <table style="width: 100%; font-size: 12px; color: #64748b;">
                    <tr>
                        <td style="padding: 8px; text-align: left;">
                            <span style="display: inline-block; width: 16px; height: 16px; background: #e0e7ff; border-radius: 4px; text-align: center; line-height: 16px; margin-right: 6px; vertical-align: middle;">
                                <span style="color: #6366f1; font-size: 10px;">🕒</span>
                            </span>
                            ${new Date().toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </td>
                        <td style="padding: 8px; text-align: right;">
                            <span style="display: inline-block; width: 6px; height: 6px; background: #10b981; border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span>
                            New Message
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="color: #64748b; font-size: 12px; margin-bottom: 8px;">
                Sent via Portfolio Contact Form
            </div>
            <div style="color: #94a3b8; font-size: 11px;">
                &copy; ${new Date().getFullYear()} <span style="color: #d4af37; font-weight: bold;">Raghul Kannan</span> • Portfolio
            </div>
        </div>
    </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.CONTACT_EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_RECEIVER || process.env.CONTACT_EMAIL_USER,
      subject: ` New Message - Portfolio Contact from ${name}`,
      text: `New contact message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\nReceived: ${new Date().toLocaleString()}`,
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
