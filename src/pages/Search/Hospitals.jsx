import React, { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, Phone, Mail, MapPin, Stethoscope, CheckCircle, XCircle, Search, SearchCheck, UserRoundX, UserRound } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";

const SPECIALTIES = [
  "SUPER_SPECIALTY", "MULTI_SPECIALTY", "FERTILITY", "EYE_CARE", "CARDIAC", "NEPHROLOGY", "ONCOLOGY",
  "GENERAL", "MATERNITY", "ORTHOPEDIC", "NEUROLOGY", "PSYCHIATRY", "PEDIATRIC", "GERIATRIC",
  "DERMATOLOGY", "GASTROENTEROLOGY", "PULMONOLOGY", "RHEUMATOLOGY", "UROLOGY", "ENT", "DENTAL",
  "ALLERGY", "ENDOCRINOLOGY", "PLASTIC_SURGERY", "REHABILITATION_CENTER"
];

const avatarImages = [
    "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const HospitalList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const hospitalsPerPage = 7;
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search/hospitals`);
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setHospitals(data.hospitals);
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        setError('An error occurred while fetching hospital data.');
      }
    })();
  }, []);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => {
      const searchRegex = new RegExp(searchTerm, 'i');
      return (
        searchRegex.test(hospital.name) ||
        searchRegex.test(hospital.contactNumber) ||
        searchRegex.test(hospital.email) ||
        searchRegex.test(hospital.address)
        // hospital.speciality.some(spec => searchRegex.test(spec))
      );
    });
  }, [searchTerm, hospitals]);

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    let startPage, endPage;
    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-6 text-center">Hospital Directory</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="relative flex items-center mb-10">
        <Search className="absolute left-3 text-gray-900" />
        <Input
          type="text"
          placeholder="Search by name, contact, email, address, or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      {currentHospitals.map(hospital => (
        <Link to={`/hospitals/${hospital.id}`} key={hospital.id}>
          <Card className="mb-6 overflow-hidden" style={{ border: "2px solid black", height: "42vh" }}>
            <div className="flex">
              <div className="">
                <img src={avatarImages[0]} alt={hospital.id} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-4">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl justify-between">
                    <span className="flex items-center">
                      <Hospital style={{color:"#4186E6"}} className="mr-2" />
                      {hospital.name}
                    </span>
                    <div style={{border:"0px solid black", borderRadius:"50%", padding:"6px", background: hospital.availableForConsult ? "#30e351": "#f75445"}}>
                    {hospital.availableForConsult ? (
                      <UserRound className="text-black-500"  />
                    ) : (
                      <UserRoundX className="text-white-500" style={{color:"white"}} />
                    )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center mb-2"><Phone  className="mr-2" /> {hospital.contactNumber}</p>
                  <p className="flex items-center mb-2"><Mail  className="mr-2" /> {hospital.email}</p>
                  <p className="flex items-center mb-2"><MapPin  className="mr-2" /> {hospital.address}</p>
                  <p className="flex items-center">
                    <Stethoscope  className="mr-2" />
                    {hospital.speciality}
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </Link>
      ))}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); currentPage > 1 && paginate(currentPage - 1); }}
              />
            </PaginationItem>
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink href="#" onClick={(e) => { e.preventDefault(); paginate(1); }}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
              </>
            )}
            {getPageNumbers().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={(e) => { e.preventDefault(); paginate(pageNumber); }}
                  className={currentPage === pageNumber ? "font-bold" : ""}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage + 1 < totalPages && (
              <>
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink href="#" onClick={(e) => { e.preventDefault(); paginate(totalPages); }}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); currentPage < totalPages && paginate(currentPage + 1); }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HospitalList;
  