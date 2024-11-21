import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // FontAwesome icons

interface StarRatingProps {
  rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating / 2 - fullStars >= 0.5;

  // Push full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }

  // Push half star if needed
  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  // Push empty stars to fill remaining spots
  const totalStars = 5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return <div className="flex">{stars}</div>;
};



// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       colors: {
//         "red-45": "#E50000",
//         "red-50": "#FF0000",
//         "red-55": "#FF1919",
//         "red-60": "#FF3333",
//         "red-80": "#FF9999",
//         "red-90": "#FFCCCC",
//         "red-95": "#FFE5E5",
//         "red-99": "#FFFAFA",

//         "black-06": "#0F0F0F",
//         "black-08": "#141414",
//         "black-10": "#1A1A1A",
//         "black-12": "#1F1F1F",
//         "black-15": "#262626",
//         "black-20": "#333333",
//         "black-25": "#404040",
//         "black-30": "#4C4C4C",

//         "grey-60": "#999999",
//         "grey-65": "#A6A6A6",
//         "grey-70": "#B3B3B3",
//         "grey-75": "#BFBFBF",
//         "grey-90": "#E4E4E7",
//         "grey-95": "#F1F1F3",
//         "grey-97": "#F7F7F8",
//         "grey-99": "#FCFCFD",
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;
