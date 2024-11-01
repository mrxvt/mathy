"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Timer, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { GameSettings, Problem } from "../types/math";
import { generateProblem, OPERATION_SYMBOLS } from "../utils/math";

interface GameBoardProps {
  settings: GameSettings;
  onGameEnd: (score: number) => void;
}

export default function GameBoard({ settings, onGameEnd }: GameBoardProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const generateNewProblem = () => {
    setProblem(generateProblem(settings.operation, settings.difficulty));
    setUserInput("");
    setFeedback(null);
  };

  const checkAnswer = (input: string | number) => {
    if (!problem) return;
    
    const userAnswer = typeof input === "string" ? parseInt(input) : input;
    
    if (userAnswer === problem.correctAnswer) {
      setScore(prev => prev + 1);
      setFeedback("correct");
      setTimeout(generateNewProblem, 500);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 500);
    }
  };

  useEffect(() => {
    generateNewProblem();
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameEnd(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onGameEnd]);

  if (!problem) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          <span className="font-mono text-xl">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          <span className="font-mono text-xl">{score}</span>
        </div>
      </div>

      <Progress value={(timeLeft / 30) * 100} />

      <Card className="p-8 text-center space-y-6">
        <div className="text-4xl font-bold space-x-4">
          <span>{problem.firstNumber}</span>
          <span>{OPERATION_SYMBOLS[settings.operation]}</span>
          <span>{problem.secondNumber}</span>
          <span>=</span>
          <span>?</span>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {problem.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-xl h-16"
              onClick={() => checkAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Or type your answer..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && userInput) {
                checkAnswer(parseInt(userInput));
              }
            }}
            className={cn(
              "text-center text-xl",
              feedback === "correct" && "border-green-500",
              feedback === "wrong" && "border-red-500"
            )}
          />
          <p className="text-sm text-muted-foreground">Press Enter to submit</p>
        </div>
      </Card>
    </div>
  );
}