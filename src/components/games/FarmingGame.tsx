'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Crop {
  id: string;
  name: string;
  icon: string;
  growthTime: number; // in seconds for demo
  waterNeeded: number;
  cost: number;
  sellPrice: number;
  stage: 'seed' | 'growing' | 'ready' | 'harvested';
  plantedAt?: number;
  wateredCount: number;
}

interface Weather {
  type: 'sunny' | 'rainy' | 'cloudy';
  icon: string;
  effect: string;
}

interface FarmStats {
  money: number;
  level: number;
  experience: number;
  totalHarvests: number;
}

const cropTypes = [
  {
    id: 'wheat',
    name: 'Wheat',
    icon: '🌾',
    growthTime: 10, // 10 seconds for demo
    waterNeeded: 2,
    cost: 10,
    sellPrice: 25
  },
  {
    id: 'rice',
    name: 'Rice',
    icon: '🌾',
    growthTime: 15,
    waterNeeded: 3,
    cost: 15,
    sellPrice: 35
  },
  {
    id: 'corn',
    name: 'Corn',
    icon: '🌽',
    growthTime: 12,
    waterNeeded: 2,
    cost: 12,
    sellPrice: 30
  },
  {
    id: 'tomato',
    name: 'Tomato',
    icon: '🍅',
    growthTime: 8,
    waterNeeded: 3,
    cost: 8,
    sellPrice: 20
  }
];

const weathers: Weather[] = [
  { type: 'sunny', icon: '☀️', effect: 'Crops grow normally' },
  { type: 'rainy', icon: '🌧️', effect: 'Free watering for all crops!' },
  { type: 'cloudy', icon: '☁️', effect: 'Crops grow slightly slower' }
];

const FarmingGame: React.FC = () => {
  const [farmPlots, setFarmPlots] = useState<(Crop | null)[]>(Array(9).fill(null));
  const [selectedCrop, setSelectedCrop] = useState<string>('wheat');
  const [weather, setWeather] = useState<Weather>(weathers[0]);
  const [farmStats, setFarmStats] = useState<FarmStats>({
    money: 100,
    level: 1,
    experience: 0,
    totalHarvests: 0
  });
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update crop growth
      setFarmPlots(plots => 
        plots.map(plot => {
          if (!plot || plot.stage === 'ready' || plot.stage === 'harvested') return plot;
          
          if (plot.stage === 'growing' && plot.plantedAt) {
            const timeElapsed = (Date.now() - plot.plantedAt) / 1000;
            const weatherMultiplier = weather.type === 'cloudy' ? 1.2 : 1;
            const adjustedGrowthTime = plot.growthTime * weatherMultiplier;
            
            if (timeElapsed >= adjustedGrowthTime && plot.wateredCount >= plot.waterNeeded) {
              return { ...plot, stage: 'ready' };
            }
          }
          
          return plot;
        })
      );

      // Auto-water crops if it's raining
      if (weather.type === 'rainy') {
        setFarmPlots(plots => 
          plots.map(plot => {
            if (plot && plot.stage === 'growing' && plot.wateredCount < plot.waterNeeded) {
              return { ...plot, wateredCount: Math.min(plot.wateredCount + 1, plot.waterNeeded) };
            }
            return plot;
          })
        );
      }

      // Change weather randomly
      if (Math.random() < 0.1) { // 10% chance every second
        const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
        setWeather(newWeather);
        addNotification(`Weather changed to ${newWeather.type}! ${newWeather.effect}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [weather.type]);

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev.slice(-2), message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  const plantCrop = (plotIndex: number) => {
    const cropTemplate = cropTypes.find(c => c.id === selectedCrop);
    if (!cropTemplate || farmPlots[plotIndex] || farmStats.money < cropTemplate.cost) return;

    const newCrop: Crop = {
      ...cropTemplate,
      stage: 'growing',
      plantedAt: Date.now(),
      wateredCount: 0
    };

    const newPlots = [...farmPlots];
    newPlots[plotIndex] = newCrop;
    setFarmPlots(newPlots);

    setFarmStats(prev => ({
      ...prev,
      money: prev.money - cropTemplate.cost
    }));

    addNotification(`Planted ${cropTemplate.name} for ₹${cropTemplate.cost}`);
  };

  const waterCrop = (plotIndex: number) => {
    const plot = farmPlots[plotIndex];
    if (!plot || plot.stage !== 'growing' || plot.wateredCount >= plot.waterNeeded) return;

    const newPlots = [...farmPlots];
    newPlots[plotIndex] = { ...plot, wateredCount: plot.wateredCount + 1 };
    setFarmPlots(newPlots);

    addNotification(`Watered ${plot.name}! (${plot.wateredCount + 1}/${plot.waterNeeded})`);
  };

  const harvestCrop = (plotIndex: number) => {
    const plot = farmPlots[plotIndex];
    if (!plot || plot.stage !== 'ready') return;

    const newPlots = [...farmPlots];
    newPlots[plotIndex] = null;
    setFarmPlots(newPlots);

    const earnings = plot.sellPrice;
    const experience = 10;

    setFarmStats(prev => ({
      ...prev,
      money: prev.money + earnings,
      experience: prev.experience + experience,
      totalHarvests: prev.totalHarvests + 1,
      level: Math.floor((prev.experience + experience) / 50) + 1
    }));

    addNotification(`Harvested ${plot.name} for ₹${earnings}! +${experience} XP`);
  };

  const getCropDisplay = (plot: Crop | null) => {
    if (!plot) return { display: '🌱', status: 'Empty plot - Click to plant!' };
    
    switch (plot.stage) {
      case 'growing':
        const progress = Math.min(plot.wateredCount / plot.waterNeeded, 1);
        return {
          display: progress < 0.5 ? '🌱' : progress < 1 ? '🌿' : '🌾',
          status: `Growing... Water: ${plot.wateredCount}/${plot.waterNeeded}`
        };
      case 'ready':
        return { display: plot.icon, status: `${plot.name} ready to harvest!` };
      default:
        return { display: '🌱', status: 'Click to plant!' };
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">🚜 Virtual Farm</h3>
        <p className="text-gray-600">Plant, water, and harvest crops to build your farming empire!</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-800">₹{farmStats.money}</div>
          <div className="text-xs text-green-600">Money</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-800">Level {farmStats.level}</div>
          <div className="text-xs text-blue-600">{farmStats.experience % 50}/50 XP</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-800">{farmStats.totalHarvests}</div>
          <div className="text-xs text-purple-600">Harvests</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <div className="text-2xl">{weather.icon}</div>
          <div className="text-xs text-yellow-600 capitalize">{weather.type}</div>
        </div>
      </div>

      {/* Crop Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">🌱 Select Crop to Plant:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {cropTypes.map(crop => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop.id)}
              disabled={farmStats.money < crop.cost}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedCrop === crop.id
                  ? 'border-blue-500 bg-blue-50'
                  : farmStats.money >= crop.cost
                  ? 'border-gray-300 hover:border-blue-300 bg-white'
                  : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="text-2xl mb-1">{crop.icon}</div>
              <div className="text-sm font-medium">{crop.name}</div>
              <div className="text-xs text-gray-600">₹{crop.cost}</div>
              <div className="text-xs text-green-600">Sells: ₹{crop.sellPrice}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Farm Grid */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">🏡 Your Farm:</h4>
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {farmPlots.map((plot, index) => {
            const { display, status } = getCropDisplay(plot);
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square bg-green-100 border-2 border-green-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-200 transition-all relative"
                onClick={() => {
                  if (!plot) {
                    plantCrop(index);
                  } else if (plot.stage === 'growing') {
                    waterCrop(index);
                  } else if (plot.stage === 'ready') {
                    harvestCrop(index);
                  }
                }}
                title={status}
              >
                <div className="text-4xl mb-1">{display}</div>
                {plot && plot.stage === 'growing' && (
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="h-1 bg-gray-200 rounded">
                      <div 
                        className="h-1 bg-blue-500 rounded transition-all"
                        style={{ width: `${(plot.wateredCount / plot.waterNeeded) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {plot && plot.stage === 'ready' && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-blue-800 mb-2">📚 How to Play:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click empty plots to plant the selected crop</li>
          <li>• Click growing crops to water them</li>
          <li>• Click ready crops (with ✓) to harvest</li>
          <li>• Watch the weather - rain gives free watering!</li>
          <li>• Earn money and experience to level up</li>
        </ul>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2 text-sm text-green-800"
          >
            {notification}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FarmingGame;