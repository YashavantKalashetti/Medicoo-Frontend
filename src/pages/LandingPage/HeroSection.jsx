import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {

    const floatingAnimation = {
        y: ['-10%', '10%'],
        transition: {
            y: {
                duration: 2,
                yoyo: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div className="relative overflow-hidden bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Content Section */}
                    <motion.div
                        className="mt-10 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center lg:justify-center lg:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="lg:mb-12 lg:mb-0">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                                <span className="block text-blue-600 dark:text-blue-400 xl:inline">Enhancing</span>{' '}
                                <span className="block xl:inline">Healthcare Access for All</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                We're committed to providing quality healthcare services to everyone. Our multifaceted approach involves policy changes, infrastructure improvements, and community engagement.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <Link to="/auth/login" className="flex items-center rounded text-gray-100 bg-gray-800 hover:text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-gray-100" style={{ padding: "7px" }}>
                                    <NotebookPen className='' />
                                    <span className="ml-2">Book Appointment</span>
                                </Link>

                                <Link to="/about" className="rounded mt-5 sm:mt-0 sm:ml-3">
                                    <Button variant="outline" size="lg">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        className="mb-12 lg:mb-0 relative sm:max-w-lg sm:mx-auto lg:col-span-6 lg:flex lg:items-center lg:justify-center lg:mt-8"
                        animate={floatingAnimation}
                    >
                        <img
                            className="w-full rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-gray-600 lg:w-auto lg:max-w-none"
                            src="https://cdn-icons-png.freepik.com/512/6401/6401436.png"
                            alt="Doctor with patient"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Wave SVG Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
                    <path fill="#f1f1f1" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    );
}
