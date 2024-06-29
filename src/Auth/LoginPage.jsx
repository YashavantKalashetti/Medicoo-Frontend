import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailIcon, EyeIcon, EyeOffIcon, LockKeyhole, UserRoundCheck } from 'lucide-react';

const MedicalSignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !userType) {
      setError('Please fill in all fields.');
      return;
    }
    console.log('Signup attempted with:', { email, password, userType });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-teal-300 to-green-200">
      <div className="flex w-full max-w-4xl h-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side - Image */}
        <div className="w-1/2 h-auto">
          <img src="https://m.media-amazon.com/images/M/MV5BNjMwNDNkMzEtNzRmNy00YmExLTg3ZWYtM2NjMjFjNWY3MmM0XkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg" alt="Medical Professional" className="object-cover w-full h-full" />
        </div>

        {/* Right side - Form */}
        <div className="w-1/2">
          <Card className="bg-white shadow-none border-none">
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
                    <SelectTrigger className="w-full">
                      <UserRoundCheck className="text-gray-400" size={18} />
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  Sign In
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between px-8">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">Forgot password?</a>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">Create account</a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalSignupForm;
