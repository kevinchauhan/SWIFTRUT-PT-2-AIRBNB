import { FaSwimmingPool, FaMountain, FaUmbrellaBeach, FaTree, FaCrown, FaLandmark, FaPalette, FaWineGlassAlt, FaSun } from "react-icons/fa";
import { GiBoatFishing, GiIsland, } from "react-icons/gi";

const categories = [
    {
        label: "Amazing Pools",
        icon: <FaSwimmingPool />,
        description: "Stunning pools to relax in.",
    },
    {
        label: "Amazing Views",
        icon: <FaMountain />,
        description: "Stunning landscapes and vistas.",
    },
    {
        label: "Beachfront",
        icon: <FaUmbrellaBeach />,
        description: "Relax by the water in beautiful locations.",
    },
    {
        label: "Cabins",
        icon: <FaTree />,
        description: "Cozy cabins for a rustic getaway.",
    },
    {
        label: "Luxe",
        icon: <FaCrown />,
        description: "Luxury homes with premium amenities.",
    },
    {
        label: "Historical Homes",
        icon: <FaLandmark />,
        description: "Stay in homes with a rich history.",
    },
    {
        label: "Treehouses",
        icon: <FaTree />,
        description: "Stay high in the trees for a unique experience.",
    },
    {
        label: "Houseboats",
        icon: <GiBoatFishing />,
        description: "Live on the water with a houseboat stay.",
    },
    {
        label: "Design",
        icon: <FaPalette />,
        description: "Homes with stunning and unique designs.",
    },
    {
        label: "Islands",
        icon: <GiIsland />,
        description: "Escape to a private island getaway.",
    },
    {
        label: "Vineyards",
        icon: <FaWineGlassAlt />,
        description: "Stay on beautiful vineyards and wine estates.",
    },
    {
        label: "Tropical",
        icon: <FaSun />,
        description: "Experience paradise with tropical stays.",
    },
];


const CategoryNavbar = () => {
    return (
        <div className="bg-white container mx-auto py-1 ">
            <div className="">
                {/* <h2 className="text-xl font-semibold text-gray-800">Explore by Category</h2> */}
                <div className="flex overflow-x-auto hide-scrollbar">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer group  rounded-lg py-1 px-4 transition-all duration-300 ease-in-out"
                        >
                            <div className=" py-1 px-4 rounded-full  group-hover:text-primary text-lg">
                                {category.icon}
                            </div>
                            <p className="mt-2 text-xs font-medium text-gray-700 group-hover:text-primary">
                                {category.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryNavbar;
