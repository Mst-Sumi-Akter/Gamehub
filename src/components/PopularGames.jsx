import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PopularGames = () => {
  const [games, setGames] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.ratings - a.ratings);
        setGames(sorted.slice(0, 5));
      });
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      const confirmLogin = window.confirm(
        "You must log in to view game details. Click OK to go to login, Cancel to stay on Home."
      );
      if (confirmLogin) {
        navigate("/auth/login");
      }
      return;
    }
    navigate(`/games/${id}`);
  };

  return (
    <section className="w-11/12 mx-auto my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        🎮 Popular Games
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {games.map((game) => (
          <div key={game.id} className="bg-slate-100 border border-slate-300 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <img src={game.coverPhoto} alt={game.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Developer:</span> {game.developer}
              </p>
              <p className="text-yellow-500 font-semibold mb-4">
                ⭐ {game.ratings}
              </p>
              <button
                onClick={() => handleViewDetails(game.id)}
                className="inline-block bg-[#D72050] hover:bg-[#b60534] text-white px-4 py-2 rounded-md transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularGames;
