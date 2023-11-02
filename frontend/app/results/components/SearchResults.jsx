import React from 'react';

const SearchResults = ({medicine}) => {
  return (
    
          <div key={medicine.id} className="bg-black hover:bg-gray-100 bg-opacity-70 text-white hover:text-black rounded-lg p-4 mx-2.5 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{medicine.medicine}</h2>
            <div className='hover:text-black font-light '>
            <p>Reference: {medicine.reference}</p>
            <p>Pack Size: {medicine['pack-Size']}</p>
            <p>Indications: {medicine.indications.join(', ')}</p>
            <p>Dosage: {medicine.dosage}</p>
            <p>Precaution: {medicine.precaution}</p>
            <p>OPD/IP: {medicine.opd_ip}</p>
            <p>Category: {medicine.category}</p>
            </div>
          </div>
        
  );
};

export default SearchResults;
