import Confetti from "react-confetti";
import { Trophy } from "lucide-react";

export default function PublishedBlog() {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 grid justify-center items-center  backdrop-blur-sm w-full h-full -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center gap-5 bg-popover p-5 rounded-lg">
        <p className="text-2xl font-bold">Game Won</p>
        <p>You have won the game</p>

        <div className="flex items-center gap-2">
          <Trophy />
        </div>
        <Confetti
          className="w-full h-full z-1000"
          numberOfPieces={200}
          recycle={true}
        />
      </div>
    </div>
  );
}
