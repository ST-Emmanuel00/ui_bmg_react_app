import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Accordion } from "./Accordion";


interface RatingSectionProps {
  userId: string;
}

const fakeRatings = [
  { id: 1, rating: 4, comment: "Excelente servicio y atención.", user: "Juan Pérez" },
  { id: 2, rating: 5, comment: "Muy amable y servicial.", user: "Ana García" },
  { id: 3, rating: 3, comment: "Buen trabajo pero puede mejorar.", user: "Carlos López" }
];

export const RatingSection: React.FC<RatingSectionProps> = ({ userId }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log(`User ID: ${userId}, Rating: ${rating}, Comment: ${comment}`);
  };

  return (
    <Accordion title="Ratings and Reviews" isLoading={false} >

      {/* <LinksMenu>
        <LinkButton label="jajaja" />
        <LinkButton label="jajaja" />
  
      </LinksMenu> */}
      {/* Simulated ratings */}
      <div className="space-y-4">
        {fakeRatings.map((review) => (
          <div key={review.id} className="p-4 border-3xl rounded-lg shadow bg-white">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size={20}
                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 font-semibold text-gray-800">{review.user}</span>
            </div>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Section to add a new review */}
      <div className="space-y-2 mt-6">
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              size={20}
              className={i < rating ? "text-yellow-400" : "text-gray-300"}
              onClick={() => handleRatingClick(i + 1)}
            />
          ))}
        </div>
        <textarea
          className="w-full p-2 border-3xl rounded-lg"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Accordion>
  );
};
