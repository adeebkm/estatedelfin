const nodemailer = require('nodemailer');

// Create a transporter for email sending
const createTransporter = () => {
  // Gmail SMTP configuration
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your Gmail
      pass: process.env.EMAIL_PASS || 'your-app-password'     // Replace with your Gmail app password
    }
  });
};

// Send OTP email
const sendOTPEmail = async (email, otp, firstName) => {
  try {
    // For development, still log to console
    console.log(`📧 Sending OTP Email to: ${email}`);
    console.log(`🔐 OTP Code: ${otp}`);
    console.log(`👤 Recipient: ${firstName}`);
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: '"Estate Deli" <noreply@estatedeli.com>',
      to: email,
      subject: 'Your Estate Deli Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6c4b3c; font-family: 'Playfair Display', serif;">Estate Deli</h1>
            <p style="color: #666; font-size: 18px;">Email Verification</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #6c4b3c; text-align: center; margin-bottom: 20px;">Hi ${firstName}!</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
              Thank you for signing up with Estate Deli. Your verification code is:
            </p>
            
            <div style="background-color: #fff; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px solid #6c4b3c;">
              <h1 style="color: #6c4b3c; font-size: 36px; margin: 0; letter-spacing: 8px; font-family: monospace;">${otp}</h1>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-top: 20px;">
              This code will expire in <strong>10 minutes</strong>.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              If you didn't request this code, please ignore this email.
            </p>
            <p style="color: #6c4b3c; font-size: 16px; margin-top: 20px;">
              Best regards,<br>
              <strong>Estate Deli Team</strong>
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              Estate Deli - Artisanal Coffee & Handcrafted Experience<br>
              Chikmagalur Estate | Since 1889
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    // Fallback to console for development
    console.log(`🔄 Fallback - Use this OTP: ${otp}`);
    return { success: true, message: 'OTP generated (check console)' };
  }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (email, orderDetails) => {
  try {
    console.log(`📧 Sending order confirmation email to: ${email}`);
    console.log(`📦 Order Details:`, orderDetails);
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: '"Estate Deli" <noreply@estatedeli.com>',
      to: email,
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6c4b3c; font-family: 'Playfair Display', serif;">Estate Deli</h1>
            <p style="color: #666; font-size: 18px;">Order Confirmation</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #6c4b3c; text-align: center; margin-bottom: 20px;">Thank you for your order!</h2>
            
            <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #6c4b3c; margin-bottom: 15px;">Order Details:</h3>
              <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
              <p><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</p>
              <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod.toUpperCase()}</p>
              <p><strong>Status:</strong> Confirmed</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">📱 We'll send you updates on your order status</p>
              <p style="color: #666;">🚚 Expected delivery: 30-45 minutes</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6c4b3c; font-size: 16px;">
              Best regards,<br>
              <strong>Estate Deli Team</strong>
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              Estate Deli - Artisanal Coffee & Handcrafted Experience<br>
              Chikmagalur Estate | Since 1889
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent:', info.messageId);
    
    return { success: true, message: 'Order confirmation sent successfully' };
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error);
    return { success: false, message: 'Failed to send order confirmation email' };
  }
};

module.exports = {
  sendOTPEmail,
  sendOrderConfirmationEmail
}; 