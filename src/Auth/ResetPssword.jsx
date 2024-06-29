import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { LockKeyhole, MailIcon } from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    
    try {
      console.log('OTP sent to:', email);
      setShowOtpInput(true);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('OTP validated:', otp);
      alert('OTP validated! Proceed with password reset.');
    } catch (error) {
      console.error('Failed to validate OTP:', error);
      setError('Invalid OTP. Please enter the correct OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-teal-300 to-green-200">
      <div className="max-w-2xl w-full">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">Forgot Password?</CardTitle>
            {!showOtpInput && <p className="text-center text-gray-600">Enter your email to receive a password reset OTP.</p>}
            {showOtpInput && <p className="text-center text-gray-600">Enter the OTP sent to your email.</p>}
          </CardHeader>
          <CardContent>
            {!showOtpInput ? (
              <form onSubmit={handleSubmit} className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive">
                    {error}
                  </Alert>
                )}
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  Send Reset OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-gray-700">OTP</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive">
                    {error}
                  </Alert>
                )}
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  Verify OTP
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center px-8">
            {!showOtpInput && (
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">Back to Sign In</a>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
