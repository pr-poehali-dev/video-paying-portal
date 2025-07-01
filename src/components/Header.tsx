import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  balance: number;
}

const Header = ({ balance }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Play" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 font-['Montserrat']">
              AdWatch
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Icon name="Wallet" size={20} className="text-purple-600" />
              <span className="font-semibold">{balance} ₽</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Icon name="User" size={16} />
              Профиль
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
