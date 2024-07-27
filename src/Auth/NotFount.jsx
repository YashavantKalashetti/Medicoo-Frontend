import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          navigate(-1); // Go back to the previous page
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400">
            <Search className="w-8 h-8 mr-2" />
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You will be redirected to the previous page in {countdown} seconds.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
