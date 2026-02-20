

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    type: [],
    freshness: [],
    brand: [],
    minPrice: 0,
    maxPrice: 500,
  });

  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"];

  const typeOptions = {
    Vegetables: ["Leafy", "Root", "Cruciferous", "Exotic"],
    Fruits: ["Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal"],
    "Dairy Products": ["Milk", "Cheese", "Butter & Ghee", "Yogurt"],
    "Grains & Pulses": ["Rice", "Wheat", "Pulses", "Millets"],
  };

  const freshnessOptions = ["Fresh", "Organic", "Pesticide-Free", "Frozen"];

  const brandOptions = {
    Vegetables: ["Local Organic", "Farm Fresh", "Nature's Basket", "Green Harvest"],
    Fruits: ["Local Organic", "Imported", "FreshCart", "Fruiticana", "TropiFresh"],
    "Dairy Products": ["Amul", "Mother Dairy", "Nestle", "Gowardhan", "Britannia", "Aavin"],
    "Grains & Pulses": ["Fortune", "Local Organic", "India Gate", "24 Mantra", "Tata Sampann", "Organic Tattva"],
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      type: params.type ? params.type.split(",") : [],
      freshness: params.freshness ? params.freshness.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 500,
    });

    setPriceRange([0, Number(params.maxPrice) || 500]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
      if (name === "category") {
        newFilters["type"] = [];
        newFilters["brand"] = [];
      }
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key] !== "" && newFilters[key] !== null && newFilters[key] !== undefined) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */ }
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Type Filter */ }
      {filters.category && typeOptions[filters.category] && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Type ({filters.category})
          </label>
          {typeOptions[filters.category].map((type) => (
            <div key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="type"
                value={type}
                onChange={handleFilterChange}
                checked={filters.type.includes(type)}
                className="mr-2 h-4 w-4 text-blue-500"
              />
              <span className="text-gray-700">{type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Freshness Filter */ }
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Freshness</label>
        {freshnessOptions.map((freshness) => (
          <div key={freshness} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="freshness"
              value={freshness}
              onChange={handleFilterChange}
              checked={filters.freshness.includes(freshness)}
              className="mr-2 h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">{freshness}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */ }
      {filters.category && brandOptions[filters.category] && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Brand</label>
          {brandOptions[filters.category].map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-blue-500"
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          ))}
        </div>
      )}

      {/* Price Range */ }
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;




/*import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    type: [],
    freshness: [],
    brand: [],
    minPrice: 0,
    maxPrice: 500,
  });

  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"];

  const typeOptions = {
    Vegetables: ["Leafy", "Root", "Cruciferous", "Exotic"],
    Fruits: ["Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal"],
    "Dairy Products": ["Milk", "Cheese", "Butter & Ghee", "Yogurt"],
    "Grains & Pulses": ["Rice", "Wheat", "Pulses", "Millets"],
  };

  const freshnessOptions = ["Fresh", "Organic", "Pesticide-Free", "Frozen"];

  const brandOptions = {
    Vegetables: ["Local Organic", "Farm Fresh", "Nature's Basket", "Green Harvest"],
    Fruits: ["Local Organic", "Imported", "FreshCart", "Fruiticana", "TropiFresh"],
    "Dairy Products": ["Amul", "Mother Dairy", "Nestle", "Gowardhan", "Britannia", "Aavin"],
    "Grains & Pulses": ["Fortune", "Local Organic", "India Gate", "24 Mantra", "Tata Sampann", "Organic Tattva"],
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      type: params.type ? params.type.split(",") : [],
      freshness: params.freshness ? params.freshness.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 500,
    });

    setPriceRange([0, Number(params.maxPrice) || 500]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
      if (name === "category") {
        newFilters["type"] = [];
        newFilters["brand"] = [];
      }
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key] !== "" && newFilters[key] !== null && newFilters[key] !== undefined) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */ //}
   /*   <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Type Filter */ //}
   /*   {filters.category && typeOptions[filters.category] && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Type ({filters.category})
          </label>
          {typeOptions[filters.category].map((type) => (
            <div key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="type"
                value={type}
                onChange={handleFilterChange}
                checked={filters.type.includes(type)}
                className="mr-2 h-4 w-4 text-blue-500"
              />
              <span className="text-gray-700">{type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Freshness Filter */ //}
 /*     <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Freshness</label>
        {freshnessOptions.map((freshness) => (
          <div key={freshness} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="freshness"
              value={freshness}
              onChange={handleFilterChange}
              checked={filters.freshness.includes(freshness)}
              className="mr-2 h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">{freshness}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */ //}
  /*    {filters.category && brandOptions[filters.category] && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Brand</label>
          {brandOptions[filters.category].map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-blue-500"
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          ))}
        </div>
      )}

      {/* Price Range */ //}
  /*    <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;



/*import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    type: [],
    freshness: [],
    brand: [],
    minPrice: 0,
    maxPrice: 500,
  });

  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"];

  const typeOptions = {
    Vegetables: ["Leafy", "Root", "Cruciferous", "Exotic"],
    Fruits: ["Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal"],
    "Dairy Products": ["Milk", "Cheese", "Butter & Ghee", "Yogurt"],
    "Grains & Pulses": ["Rice", "Wheat", "Pulses", "Millets"],
  };

  const freshnessOptions = ["Fresh", "Organic", "Pesticide-Free", "Frozen"];

  const brandOptions = {
    Vegetables: ["Local Organic", "Farm Fresh", "Nature's Basket", "Green Harvest"],
    Fruits: ["Local Organic", "Imported", "FreshCart", "Fruiticana", "TropiFresh"],
    "Dairy Products": ["Amul", "Mother Dairy", "Nestle", "Gowardhan", "Britannia", "Aavin"],
    "Grains & Pulses": ["Fortune", "Local Organic", "India Gate", "24 Mantra", "Tata Sampann", "Organic Tattva"],
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      type: params.type ? params.type.split(",") : [],
      freshness: params.freshness ? params.freshness.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 500,
    });

    setPriceRange([0, Number(params.maxPrice) || 500]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
      if (name === "category") {
        newFilters["type"] = [];
        newFilters["brand"] = [];
      }
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key] !== "" && newFilters[key] !== null && newFilters[key] !== undefined) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-md z-10 p-4 overflow-y-auto lg:w-64 lg:h-auto">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */ // }
  /*    <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Type Filter */  //}
   /*   {filters.category && typeOptions[filters.category] && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Type ({filters.category})
          </label>
          {typeOptions[filters.category].map((type) => (
            <div key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="type"
                value={type}
                onChange={handleFilterChange}
                checked={filters.type.includes(type)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Freshness Filter */  //}
 /*     <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Freshness</label>
        {freshnessOptions.map((freshness) => (
          <div key={freshness} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="freshness"
              value={freshness}
              onChange={handleFilterChange}
              checked={filters.freshness.includes(freshness)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{freshness}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */ //}
 /*     {filters.category && brandOptions[filters.category] && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Brand</label>
          {brandOptions[filters.category].map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          ))}
        </div>
      )}

      {/* Price Filter */ //}
   /*   <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;












// import React, { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const FilterSidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [filters, setFilters] = useState({
//     category: "",
//     type: [],
//     freshness: [],
//     brand: [],
//     minPrice: 0,
//     maxPrice: 500,
//   });

//   const [priceRange, setPriceRange] = useState([0, 500]);

//   const categories = ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"];

//   const typeOptions = {
//     Vegetables: ["Leafy", "Root", "Cruciferous", "Exotic"],
//     Fruits: ["Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal"],
//     "Dairy Products": ["Milk", "Cheese", "Butter & Ghee", "Yogurt"],
//     "Grains & Pulses": ["Rice", "Wheat", "Pulses", "Millets"],
//   };

//   const freshnessOptions = ["Fresh", "Organic", "Pesticide-Free", "Frozen"];
  
//   const brands = ["Amul", "Mother Dairy", "Fortune", "Nestle", "Local Organic", "Imported"];

//   useEffect(() => {
//     const params = Object.fromEntries([...searchParams]);

//     setFilters({
//       category: params.category || "",
//       type: params.type ? params.type.split(",") : [],
//       freshness: params.freshness ? params.freshness.split(",") : [],
//       brand: params.brand ? params.brand.split(",") : [],
//       minPrice: Number(params.minPrice) || 0,
//       maxPrice: Number(params.maxPrice) || 500,
//     });

//     setPriceRange([0, Number(params.maxPrice) || 500]);
//   }, [searchParams]);

//   const handleFilterChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     let newFilters = { ...filters };

//     if (type === "checkbox") {
//       if (checked) {
//         newFilters[name] = [...(newFilters[name] || []), value];
//       } else {
//         newFilters[name] = newFilters[name].filter((item) => item !== value);
//       }
//     } else {
//       newFilters[name] = value;
//       if (name === "category") {
//         newFilters["type"] = []; // reset type filter on category change
//       }
//     }

//     setFilters(newFilters);
//     updateURLParams(newFilters);
//   };

//   const updateURLParams = (newFilters) => {
//     const params = new URLSearchParams();

//     Object.keys(newFilters).forEach((key) => {
//       if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
//         params.append(key, newFilters[key].join(","));
//       } else if (newFilters[key] !== "" && newFilters[key] !== null && newFilters[key] !== undefined) {
//         params.append(key, newFilters[key]);
//       }
//     });

//     setSearchParams(params);
//     navigate(`?${params.toString()}`);
//   };

//   const handlePriceChange = (e) => {
//     const newPrice = Number(e.target.value);
//     setPriceRange([0, newPrice]);
//     const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
//     setFilters(newFilters);
//     updateURLParams(newFilters);
//   };

//   return (
//     <div className="p-4">
//       <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

//       {/* Category Filter */ // }
//       <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Category</label>
//         {categories.map((category) => (
//           <div key={category} className="flex items-center mb-1">
//             <input
//               type="radio"
//               name="category"
//               value={category}
//               onChange={handleFilterChange}
//               checked={filters.category === category}
//               className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//             />
//             <span className="text-gray-700">{category}</span>
//           </div>
//         ))}
//       </div>

//       {/* Type Filter (if applicable) */  }
//       {filters.category && typeOptions[filters.category] && (
//         <div className="mb-6">
//           <label className="block text-gray-600 font-medium mb-2">
//             Type ({filters.category})
//           </label>
//           {typeOptions[filters.category].map((type) => (
//             <div key={type} className="flex items-center mb-1">
//               <input
//                 type="checkbox"
//                 name="type"
//                 value={type}
//                 onChange={handleFilterChange}
//                 checked={filters.type.includes(type)}
//                 className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//               />
//               <span className="text-gray-700">{type}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Freshness Filter */ }
//      <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Freshness</label>
//         {freshnessOptions.map((freshness) => (
//           <div key={freshness} className="flex items-center mb-1">
//             <input
//               type="checkbox"
//               name="freshness"
//               value={freshness}
//               onChange={handleFilterChange}
//               checked={filters.freshness.includes(freshness)}
//               className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//             />
//             <span className="text-gray-700">{freshness}</span>
//           </div>
//         ))}
//       </div>

//       {/* Brand Filter */  }
//       <div className="mb-6">
//         <label className="block text-gray-600 font-medium mb-2">Brand</label>
//         {brands.map((brand) => (
//           <div key={brand} className="flex items-center mb-1">
//             <input
//               type="checkbox"
//               name="brand"
//               value={brand}
//               onChange={handleFilterChange}
//               checked={filters.brand.includes(brand)}
//               className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
//             />
//             <span className="text-gray-700">{brand}</span>
//           </div>
//         ))}
//       </div>

//       {/* Price Range Filter */ }
//       <div className="mb-8">
//         <label className="block text-gray-600 font-medium mb-2">Price Range</label>
//         <input
//           type="range"
//           name="priceRange"
//           min={0}
//           max={500}
//           value={priceRange[1]}
//           onChange={handlePriceChange}
//           className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//         />
//         <div className="flex justify-between text-gray-600 mt-2">
//           <span>Rs 0</span>
//           <span>Rs {priceRange[1]}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;



/*import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    type: [],
    freshness: [],
    brand: [],
    minPrice: 0,
    maxPrice: 500,
  });

  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"];

  const typeOptions = {
    Vegetables: ["Leafy", "Root", "Cruciferous", "Exotic"],
    Fruits: ["Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal"],
    "Dairy Products": ["Milk", "Cheese", "Butter & Ghee", "Yogurt"],
    "Grains & Pulses": ["Rice", "Wheat", "Pulses", "Millets"],
  };

  const freshnessOptions = ["Fresh", "Organic", "Pesticide-Free", "Frozen"];
  
  const brands = ["Amul", "Mother Dairy", "Fortune", "Nestle", "Local Organic", "Imported"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      type: params.type ? params.type.split(",") : [],
      freshness: params.freshness ? params.freshness.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 500,
    });

    setPriceRange([0, params.maxPrice || 500]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */ // }
 /*     <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Type Filter (Dynamic based on Category) */  //}
  /*    {filters.category && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">
            Type ({filters.category})
          </label>
          {typeOptions[filters.category]?.map((type) => (
            <div key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="type"
                value={type}
                onChange={handleFilterChange}
                checked={filters.type.includes(type)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Freshness Filter */ //}
 /*     <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Freshness</label>
        {freshnessOptions.map((freshness) => (
          <div key={freshness} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="freshness"
              value={freshness}
              onChange={handleFilterChange}
              checked={filters.freshness.includes(freshness)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{freshness}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */   //}
   /*   <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */ //}
  /*    <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>Rs 0</span>
          <span>Rs {priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;  */
