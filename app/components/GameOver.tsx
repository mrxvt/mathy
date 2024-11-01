import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export default function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <Card className="text-center space-y-4 p-8">
      <Trophy className="w-16 h-16 mx-auto text-primary" />
      <h2 className="text-2xl font-semibold">Time's Up!</h2>
      <p className="text-xl">Your Score: {score}</p>
      <Button onClick={onRestart}>Play Again</Button>
    </Card>
  );
}