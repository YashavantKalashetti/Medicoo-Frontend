import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailIcon, EyeIcon, EyeOffIcon, LockKeyhole, UserRoundCheck, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { message } from 'antd';

import LoginImage from './LoginImage.jpg';
import CreateAccountLink from '@/Partials/CreateAccountLink';
import ForgotPasswordLink from '@/Partials/ForgotPasswordLink';

const MedicalSignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log(import.meta.env.VITE_BACKEND_URL);

    setError('');
    if (!email || !password || !userType) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;   
    }

    try {
      const response = await fetch(`http://localhost:3030/api/v1/auth/patient/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'no-cors': true
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();
      console.log('Data:', data);
      if (!response.ok) {
        console.log('Error:->', data.message);
        message.error(data.message);
      } else {
        console.log('Response:', data);
        message.success("Logged In successfully");

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = 'http://localhost:5173/';
        }, 2000);
      }
    } catch (error) {
      message.error(error.message);
      console.log('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-pink-200 to-yellow-200">
      <div className="flex w-full max-w-4xl h-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 h-auto">
          <img src="https://m.media-amazon.com/images/M/MV5BNjMwNDNkMzEtNzRmNy00YmExLTg3ZWYtM2NjMjFjNWY3MmM0XkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg" alt="Medical Professional" className="object-cover w-full h-full" />
        </div>
        <div className="w-1/2">
          <Card className="bg-white shadow-none border-none" style={{margin: "20px 0"}} >
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center text-gray-800">Welcome back!</CardTitle>
              <p className="text-center text-gray-600">Enter your details to access your health information</p>
            </CardHeader>
            <CardContent>
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
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-gray-700">Sign in as</Label>
                  <Select onValueChange={setUserType} required>
                    <SelectTrigger className="w-full" onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
                      <UserRoundCheck className="text-gray-400" size={18} />
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {
                  loading ? (
                    <Button disabled className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg" >
                      <Loader2 className="animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      Sign in
                    </Button>
                  )
                }
              </form>
            </CardContent>
            <CardFooter className="flex justify-between px-8">
              <ForgotPasswordLink />
              <CreateAccountLink />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalSignupForm;
