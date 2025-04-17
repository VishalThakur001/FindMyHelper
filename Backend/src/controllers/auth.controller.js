import twilioClient from "../utils/twilio.js";

export const sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
  
    try {
      const otpResponse = await twilioClient.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
          to: `+91${phoneNumber}`,
          channel: 'sms',
        });
  
      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
    }
};

export const verifyOTP = async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    try {
      const verificationResult = await twilioClient.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({
          to: `+91${phoneNumber}`,
          code: otp,
        });
  
      if (verificationResult.status === 'approved') {
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'OTP verification failed', error: error.message });
    }
};
  