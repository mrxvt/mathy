"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { Operation, Difficulty, GameSettings } from "../types/math";

interface GameSettingsProps {
  onStart: (settings: GameSettings) => void;
}

export default function GameSettingsComponent({ onStart }: GameSettingsProps) {
  const operations: Operation[] = ['addition', 'subtraction', 'multiplication', 'division'];
  const difficulties: Difficulty[] = ['single', 'double', 'triple', 'quadruple'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onStart({
      operation: formData.get('operation') as Operation,
      difficulty: formData.get('difficulty') as Difficulty,
    });
  };

  return (
    <Card className="p-8 space-y-6">
      <div className="text-center space-y-4">
        <Brain className="w-16 h-16 mx-auto text-primary" />
        <h2 className="text-2xl font-semibold">Ready to Train?</h2>
        <p className="text-muted-foreground">Choose your training mode!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Operation</h3>
          <RadioGroup name="operation" defaultValue="addition" className="grid grid-cols-2 gap-4">
            {operations.map((op) => (
              <div key={op}>
                <RadioGroupItem
                  value={op}
                  id={op}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={op}
                  className="flex p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary capitalize"
                >
                  {op}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Difficulty</h3>
          <RadioGroup name="difficulty" defaultValue="single" className="grid grid-cols-2 gap-4">
            {difficulties.map((diff) => (
              <div key={diff}>
                <RadioGroupItem
                  value={diff}
                  id={diff}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={diff}
                  className="flex p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary capitalize"
                >
                  {diff} digit
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Start Training
        </Button>
      </form>
    </Card>
  );
}