import React, { useContext, useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const MedicalSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {dispatch} = useContext(AuthContext);

  
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/${userType}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();
      if (!response.ok) {
        message.error(data.message);
      } else {
        message.success("Logged In successfully");
        console.log(data?.cookie)
        dispatch({type: 'LOGIN', payload: data})
        navigate(from, { replace: true });
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
        <div className="w-1/2 bg-gray-50 dark:bg-gray-700">
          <Card className="bg-white shadow-none border-none bg-gray-50 dark:bg-gray-700" style={{margin: "35px 0"}} >
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Welcome back!</CardTitle>
              <p className="text-center text-gray-600 dark:text-gray-100">Enter your details to access your health information</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 px-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-100">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-gray-50 dark:bg-gray-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-100">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 bg-gray-50 dark:bg-gray-600"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-gray-50 dark:bg-gray-600"
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-gray-700 dark:text-gray-100">Sign in as</Label>
                  <Select className="bg-gray-0 dark:bg-gray-600" onValueChange={setUserType} required>
                    <SelectTrigger className="w-full" >
                      <UserRoundCheck className="text-gray-400" size={18} />
                      <SelectValue className='bg-gray-50 dark:bg-gray-100' placeholder="Select user type" />
                    </SelectTrigger>
                    {/* <div onClick="$event.stopPropagation()"> */}
                      <SelectContent>
                        <SelectItem value="patient" className="bg-gray-50 dark:bg-gray-600">Patient</SelectItem>
                        <SelectItem value="doctor" className="bg-gray-50 dark:bg-gray-600 mt-1 mb-1">Doctor</SelectItem>
                        <SelectItem value="hospital" className="bg-gray-50 dark:bg-gray-600">Hospital</SelectItem>
                      </SelectContent>
                    {/* </div> */}
                  </Select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {
                  loading ? (
                    <Button disabled className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:shadow-lg" >
                      <Loader2 className="animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:shadow-lg">
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

export default MedicalSignInForm;
