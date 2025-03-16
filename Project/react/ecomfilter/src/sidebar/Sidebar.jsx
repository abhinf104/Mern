// import React, { useState } from "react";

// const Sidebar = ({ onFilterChange }) => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedPrice, setSelectedPrice] = useState("All");
//   const [selectedColor, setSelectedColor] = useState("All");

//   const categories = ["All", "Sneakers", "Flats", "Sandals", "Heels"];
//   const prices = ["All", "$0 - $50", "$50 - $100", "$100 - $150", "Over $150"];
//   const colors = [
//     { name: "All", color: "purple" },
//     { name: "Black", color: "black" },
//     { name: "Blue", color: "blue" },
//     { name: "Red", color: "red" },
//     { name: "Green", color: "green" },
//     { name: "White", color: "white" },
//   ];

//   const handleFilterChange = () => {
//     onFilterChange({
//       category: selectedCategory,
//       price: selectedPrice,
//       color: selectedColor,
//     });
//   };

//   return (
//     <div className="p-4 w-64 border-r">
//       <h3 className="font-semibold mb-2">Category</h3>
//       {categories.map((category) => (
//         <div key={category} className="mb-1">
//           <input
//             type="radio"
//             value={category}
//             checked={selectedCategory === category}
//             onChange={() => {
//               setSelectedCategory(category);
//               handleFilterChange();
//             }}
//           />
//           <label className="ml-2">{category}</label>
//         </div>
//       ))}

//       <h3 className="font-semibold mt-4 mb-2">Price</h3>
//       {prices.map((price) => (
//         <div key={price} className="mb-1">
//           <input
//             type="radio"
//             value={price}
//             checked={selectedPrice === price}
//             onChange={() => {
//               setSelectedPrice(price);
//               handleFilterChange();
//             }}
//           />
//           <label className="ml-2">{price}</label>
//         </div>
//       ))}

//       <h3 className="font-semibold mt-4 mb-2">Colors</h3>
//       {colors.map(({ name, color }) => (
//         <div key={name} className="mb-1 flex items-center">
//           <input
//             type="radio"
//             value={name}
//             checked={selectedColor === name}
//             onChange={() => {
//               setSelectedColor(name);
//               handleFilterChange();
//             }}
//           />
//           <span
//             className="w-4 h-4 ml-2 rounded-full inline-block"
//             style={{ backgroundColor: color }}
//           ></span>
//           <label className="ml-2">{name}</label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;
