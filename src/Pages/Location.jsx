import { useState } from 'react';
import { FiMapPin, FiSun, FiSearch, FiNavigation, FiDroplet, FiWind } from 'react-icons/fi';

const LocationSearchPage = () => {
  // State for search and selected location
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample location data
  const locations = [
    {
      id: 1,
      name: "Minintale Town",
      weather: "37.6 °C",
      humidity: "42%",
      wind: "12 km/h",
      areas: [
        {
          name: "Pahalajanapadaya",
          places: ["Anduaketiyaya", "Kudagama", "Gonagiri Re Yu"]
        },
        {
          name: "Ashokabha",
          places: [
            "Faculty of Medicine and Allied Sciences",
            "Village Life Minintale",
            "Taymamrewa"
          ]
        },
        {
          name: "Muhnala Town",
          places: ["Nekatuna vewa"]
        },
        {
          name: "Suluqulu Vehera Baja Mahallivinarya",
          places: ["Karakullava Jumma Masjidi"]
        }
      ]
    },
    {
      id: 2,
      name: "Colombo",
      weather: "32.2 °C",
      humidity: "65%",
      wind: "15 km/h",
      areas: [
        {
          name: "Colombo Fort",
          places: ["Old Parliament", "World Trade Center", "Galle Face"]
        }
      ]
    }
  ];

  // Filter locations based on search
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            <FiMapPin className="inline mr-2 text-blue-500" />
            Location Search
          </h1>
          
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLocation(null);
              }}
            />
          </div>

          {/* Search Results */}
          {searchQuery && !selectedLocation && (
            <div className="mt-4 border rounded-lg max-h-60 overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map(location => (
                  <div 
                    key={location.id}
                    className="p-3 hover:bg-blue-50 cursor-pointer border-b"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <FiMapPin className="inline mr-2 text-blue-400" />
                    {location.name}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Location Details */}
        {selectedLocation ? (
          <div className="space-y-4">
            {/* Weather Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    <FiMapPin className="mr-2 text-blue-500" />
                    {selectedLocation.name}
                  </h2>
                  <div className="mt-4 flex items-center">
                    <FiSun className="text-3xl text-yellow-500 mr-4" />
                    <div>
                      <p className="text-lg">
                        <span className="font-semibold">Weather:</span> {selectedLocation.weather}
                      </p>
                      <div className="flex space-x-4 mt-1">
                        <span className="flex items-center">
                          <FiDroplet className="mr-1 text-blue-400" /> {selectedLocation.humidity}
                        </span>
                        <span className="flex items-center">
                          <FiWind className="mr-1 text-blue-400" /> {selectedLocation.wind}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  <FiNavigation className="mr-2" />
                  Navigate
                </button>
              </div>
            </div>

            {/* Areas List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {selectedLocation.areas.map((area, index) => (
                <div key={index} className="p-4 border-b last:border-b-0">
                  <h3 className="font-bold text-lg mb-2">{area.name}</h3>
                  <ul className="space-y-2">
                    {area.places.map((place, placeIndex) => (
                      <li key={placeIndex} className="flex items-start">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                          {placeIndex + 1}
                        </span>
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Map View</h3>
              </div>
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map would display here</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiMapPin className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-xl text-gray-600">Select a location to view details</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPage;