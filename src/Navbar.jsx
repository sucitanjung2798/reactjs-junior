import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}>
      <div className="bg-white text-black p-4 flex gap-4 justify-between items-center container mx-auto px-8">
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-2xl font-bold text-black title-page">
            Uhuyy Movie
          </Link>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border bg-slate-200 border-gray-300 rounded-xl focus:outline-none"
              style={{ width: "400px" }}
            />
          </div>
        </div>

        <div>Keranjang</div>
      </div>
    </div>
  );
};

export default Navbar;
