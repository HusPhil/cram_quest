import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-sidebar p-4 text-white">
      <h2 className="text-xl font-bold">CramQuest</h2>
      <nav className="mt-4">
        <ul>
          <li><Link to="/home" className="block p-2 hover:bg-gray-700">Home</Link></li>
          {/* <li><Link to="/battle" className="block p-2 hover:bg-gray-700">Battle</Link></li> */}
          <li><Link to="/about" className="block p-2 hover:bg-gray-700">About</Link></li>
        </ul>
      </nav>
    </div>
  );
};
