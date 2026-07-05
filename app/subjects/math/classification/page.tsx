"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SetDiagram from "@/components/viz/SetDiagram";

interface SortableItem {
  id: string;
  name: string;
  category: "fruit" | "vegetable";
  color: string;
  emoji: string;
}

const ITEMS: SortableItem[] = [
  { id: "apple", name: "苹果", category: "fruit", color: "#ef4444", emoji: "🍎" },
  { id: "banana", name: "香蕉", category: "fruit", color: "#f59e0b", emoji: "🍌" },
  { id: "orange", name: "橙子", category: "fruit", color: "#f97316", emoji: "🍊" },
  { id: "grape", name: "葡萄", category: "fruit", color: "#8b5cf6", emoji: "🍇" },
  { id: "carrot", name: "胡萝卜", category: "vegetable", color: "#f97316", emoji: "🥕" },
  { id: "broccoli", name: "西兰花", category: "vegetable", color: "#22c55e", emoji: "🥦" },
  { id: "tomato", name: "番茄", category: "vegetable", color: "#ef4444", emoji: "🍅" },
  { id: "potato", name: "土豆", category: "vegetable", color: "#d4a574", emoji: "🥔" },
];

export default function ClassificationPage() {
  const [placedItems, setPlacedItems] = useState<Set<string>>(new Set());
  const [celebration, setCelebration] = useState(false);

  const handlePlaceItem = (itemId: string, category: "fruit" | "vegetable") => {
    setPlacedItems((prev) => new Set(prev).add(itemId));

    // Check if all items are placed correctly
    const allPlaced = placedItems.size + 1 === ITEMS.length;
    if (allPlaced) {
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000);
    }
  };

  const handleReset = () => {
    setPlacedItems(new Set());
    setCelebration(false);
  };

  const getPlacedItem = (itemId: string) => {
    return ITEMS.find((item) => item.id === itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4">
      {/* Celebration overlay */}
      {celebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-8xl animate-bounce">🎉</div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-700 mb-2">分类游戏：给物品找家</h1>
          <p className="text-amber-600 text-lg">把水果和蔬菜送到它们各自的家里吧！</p>
        </div>

        {/* Set Diagram visualization */}
        <div className="mb-8">
          <SetDiagram type="basic" A="水果之家" B="蔬菜之家" />
        </div>

        {/* Game area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fruit house */}
          <Card className="border-4 border-red-300 bg-red-50">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🏠</div>
                <h3 className="text-2xl font-bold text-red-600">水果之家</h3>
                <p className="text-red-500">水果应该住在这里</p>
              </div>
              <div className="min-h-[200px] space-y-2">
                {ITEMS.filter((item) => item.category === "fruit")
                  .filter((item) => placedItems.has(item.id))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-2 border-red-300 rounded-lg p-3 flex items-center gap-3 animate-in slide-in-from-bottom-2"
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-lg font-medium text-red-700">{item.name}</span>
                    </div>
                  ))}
                {placedItems.size === 0 && (
                  <div className="text-center py-8 text-red-400">
                    <p>把水果拖到这里吧！</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vegetable house */}
          <Card className="border-4 border-green-300 bg-green-50">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🏡</div>
                <h3 className="text-2xl font-bold text-green-600">蔬菜之家</h3>
                <p className="text-green-500">蔬菜应该住在这里</p>
              </div>
              <div className="min-h-[200px] space-y-2">
                {ITEMS.filter((item) => item.category === "vegetable")
                  .filter((item) => placedItems.has(item.id))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-2 border-green-300 rounded-lg p-3 flex items-center gap-3 animate-in slide-in-from-bottom-2"
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-lg font-medium text-green-700">{item.name}</span>
                    </div>
                  ))}
                {placedItems.size === 0 && (
                  <div className="text-center py-8 text-green-400">
                    <p>把蔬菜拖到这里吧！</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items to sort */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-center text-amber-700 mb-4">这里有一些物品，请帮它们找到家</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {ITEMS.map((item) => {
              const isPlaced = placedItems.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handlePlaceItem(item.id, item.category)}
                  disabled={isPlaced}
                  className={`relative p-4 rounded-xl transition-all duration-200 ${
                    isPlaced
                      ? "bg-gray-100 opacity-50 cursor-default"
                      : `bg-white border-4 ${
                          item.category === "fruit" ? "border-red-300 hover:border-red-400" : "border-green-300 hover:border-green-400"
                        } hover:scale-105 active:scale-95 shadow-md`
                  }`}
                >
                  <div className="text-4xl mb-1">{item.emoji}</div>
                  <div className={`text-sm font-medium ${
                    item.category === "fruit" ? "text-red-600" : "text-green-600"
                  }`}>{item.name}</div>
                  {isPlaced && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset button */}
        <div className="text-center mt-8">
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            重新开始
          </Button>
        </div>

        {/* Simple instruction */}
        <div className="mt-8 text-center text-amber-600">
          <p className="text-sm">💡 小提示：水果一般甜甜的，蔬菜可以炒菜吃哦！</p>
        </div>
      </div>
    </div>
  );
}
