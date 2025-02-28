import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading]=useState(false)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.sampleapis.com/beers/ale");
      setBeers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  
    < >
      
      <h1 className="font-bold text-black text-3xl p-4 bg-gray-200 mx-auto text-center">
        Catalog
      </h1>
      <input
        type="text"
        className="outline-none border rounded-lg px-4 py-2 w-64 transition-all duration-300 hover:w-80 hover:shadow-md mt-4 ml-5"
        placeholder="Search here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="text-white bg-blue-600 ml-4   rounded-md px-4 py-2 ">
        Search
      </button>
      {
        (
          loading ? (
            <p className="text-center text-xl font-bold mt-6">Loading...</p>
          ) :
          <div className="grid gap-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 w-[85%] mx-auto">
          {filteredBeers.map((item) => (
            <div key={item.id} className="border  rounded-md items-center">
              <div className=" bg-gray-100 mb-4">
                <img
                  src={item.image}
                  alt={item.name || "Default Beer Image"}
                  className="h-44 max-w-full m-auto object-contain"
                />
              </div>
              <div className="px-4 py-1">
                <h2 className="font-bold"> {item.name}</h2>
                <ul className="mt-2 ">
                  <li>
                    <span className="font-black">Price:</span> {item.price}
                  </li>
                  <li>
                    {" "}
                    <span className="font-black">Average:</span>{" "}
                    {item.rating.average}
                  </li>
                  <li>
                    <span className="font-black">reviews:</span>{" "}
                    {item.rating.reviews}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>)
     }
    </>
  );
};

export default App;
