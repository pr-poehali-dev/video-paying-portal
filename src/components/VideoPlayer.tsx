import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface VideoPlayerProps {
  onComplete: () => void;
  reward: number;
  isWatching: boolean;
  onStartWatching: () => void;
}

const VideoPlayer = ({
  onComplete,
  reward,
  isWatching,
  onStartWatching,
}: VideoPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!isWatching) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 30;
        if (newProgress >= 100) {
          setTimeLeft(0);
          onComplete();
          setProgress(0);
          setTimeLeft(30);
          return 0;
        }
        return newProgress;
      });

      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isWatching, onComplete]);

  const handleStartWatching = () => {
    setProgress(0);
    setTimeLeft(30);
    onStartWatching();
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Icon name="Play" size={24} className="text-blue-600" />
          Рекламное видео
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isWatching ? (
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <Icon name="Play" size={64} className="text-gray-400 mb-4" />
              <p className="text-gray-600 text-center mb-4">
                Нажмите кнопку чтобы начать просмотр
                <br />и заработать{" "}
                <span className="font-bold text-green-600">{reward} ₽</span>
              </p>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse"></div>
              <Icon name="Eye" size={64} className="text-blue-600 mb-4 z-10" />
              <p className="text-blue-800 text-center z-10 font-semibold">
                Просмотр рекламы...
                <br />
                Осталось: {timeLeft} сек
              </p>
            </div>
          )}

          {isWatching && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Прогресс просмотра</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handleStartWatching}
            disabled={isWatching}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isWatching ? (
              <>
                <Icon name="Clock" size={16} className="mr-2" />
                Просмотр идёт...
              </>
            ) : (
              <>
                <Icon name="Play" size={16} className="mr-2" />
                Смотреть за {reward} ₽
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
