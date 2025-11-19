import { useParams } from "react-router";
import { useEffect, useState } from "react";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g) => g.id === id);
        setGame(found);
      });
  }, [id]);

  if (!game) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto my-10 flex flex-col md:flex-row items-center gap-8">
      <img
        src={game.coverPhoto}
        alt={game.title}
        className="w-full h-[300px] md:w-1/2 rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
        <p className="mb-3 text-gray-700">{game.description}</p>
        <p className="font-semibold mb-2">Developer: {game.developer}</p>
        <p className="font-semibold mb-4 text-yellow-500">
          ⭐ {game.ratings} / 5
        </p>
        <a
          href={game.downloadLink}
          target="_blank"
          className="bg-[#D72050] hover:bg-[#b60534] text-white p-2 rounded-md transition"
        >
          Download Now
        </a>
      </div>
    </div>
  );
};

export default GameDetails;
