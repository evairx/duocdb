import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from 'lucide-react';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/profile/${searchTerm.trim()}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { delay: 0.8, duration: 0.5 }, scale: { duration: 0.2 } }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="relative flex items-center w-[25rem] max-w-full"
    >
      <motion.input
        type="text"
        placeholder="Buscar..."
        className="p-2.5 pl-4 bg-gray-100 border border-gray-300 rounded-full w-full h-[2.8rem] shadow-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white border-none w-[34px] h-[34px] rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-gray-800"
        onClick={handleSearch}
      >
        <Search className="w-[20px] "/>
      </button>
    </motion.div>
  );
}