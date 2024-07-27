import React from 'react';
import { FaAllergies } from "react-icons/fa";
import { GiMedicalThermometer } from "react-icons/gi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AllergyAndMedicalHistory({ medicalDetails }) {
    return (
        <>
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">Allergies</CardTitle>
                    <FaAllergies size={24} className="text-red-600" />
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        {medicalDetails.allergies && medicalDetails.allergies.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {medicalDetails.allergies.map((allergy, index) => (
                                    <li key={index} className="mb-2">{allergy}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No known allergies</p>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">Medical History</CardTitle>
                    <GiMedicalThermometer size={24} className="text-cyan-600" />
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        {medicalDetails.medicalHistory && medicalDetails.medicalHistory.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {medicalDetails.medicalHistory.map((history, index) => (
                                    <li key={index} className="mb-2">{history}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No medical history available</p>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}