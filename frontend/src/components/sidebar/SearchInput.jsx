
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState(""); // Original variable name maintained
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return; // Original variable name maintained
    if (search.length < 3) {
      return toast.error("Le terme de recherche doit contenir au moins 3 caractères"); // Adjusted error message
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Original variable name maintained
    } else toast.error("Aucun utilisateur trouvé !"); // Adjusted error message
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Rechercher…' // "Search…" translated to "Rechercher…"
        className='input input-bordered rounded-full'
        value={search} // Original variable name maintained
        onChange={(e) => setSearch(e.target.value)} // Original variable name maintained
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
