import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const minWithdraw = 10;
  const watchReward = 100;

  const handleVideoComplete = () => {
    setBalance((prev) => prev + watchReward);
    setIsWatching(false);
  };

  const progressToMinimum = Math.min((balance / minWithdraw) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header balance={balance} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-['Montserrat']">
            Зарабатывай просматривая рекламу
          </h1>
          <p className="text-xl text-gray-600 font-['Open_Sans'] max-w-2xl mx-auto">
            Получай 100 рублей за каждый просмотр рекламного видео. Минимальная
            сумма для вывода — 10 рублей на Payeer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Icon name="Wallet" size={24} className="text-purple-600" />
                Ваш баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-purple-600 font-['Montserrat']">
                  {balance} ₽
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>До минимальной выплаты</span>
                    <span>{Math.max(0, minWithdraw - balance)} ₽</span>
                  </div>
                  <Progress value={progressToMinimum} className="h-2" />
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={balance < minWithdraw}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Вывести на Payeer
                </Button>
              </div>
            </CardContent>
          </Card>

          <VideoPlayer
            onComplete={handleVideoComplete}
            reward={watchReward}
            isWatching={isWatching}
            onStartWatching={() => setIsWatching(true)}
          />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Icon
                name="Play"
                size={48}
                className="mx-auto mb-4 text-purple-600"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Смотрите видео
              </h3>
              <p className="text-gray-600 text-sm">
                Просматривайте рекламные ролики и получайте вознаграждение
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Icon
                name="Coins"
                size={48}
                className="mx-auto mb-4 text-blue-600"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Зарабатывайте
              </h3>
              <p className="text-gray-600 text-sm">
                Получайте 100 рублей за каждый полный просмотр
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Icon
                name="CreditCard"
                size={48}
                className="mx-auto mb-4 text-green-600"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Выводите</h3>
              <p className="text-gray-600 text-sm">
                Переводите деньги на Payeer от 10 рублей
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
