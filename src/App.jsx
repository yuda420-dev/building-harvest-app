import React, { useState } from 'react';

const BuildingHarvestApp = () => {
  const [activeTab, setActiveTab] = useState('order');
  const [cart, setCart] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [pickupReady, setPickupReady] = useState(true);
  
  const thisWeeksCrops = [
    { id: 1, name: 'Fresh Basil', emoji: '🌿', available: '2 oz bundles', price: 3, unit: 'bundle', inStock: 12 },
    { id: 2, name: 'Cilantro', emoji: '🌱', available: '2 oz bundles', price: 3, unit: 'bundle', inStock: 8 },
    { id: 3, name: 'Mixed Microgreens', emoji: '🥬', available: '4 oz clamshell', price: 5, unit: 'box', inStock: 15 },
    { id: 4, name: 'Cherry Tomatoes', emoji: '🍅', available: '1 pint', price: 6, unit: 'pint', inStock: 6 },
    { id: 5, name: 'Fresh Mint', emoji: '🍃', available: '2 oz bundles', price: 3, unit: 'bundle', inStock: 10 },
    { id: 6, name: 'Butter Lettuce', emoji: '🥗', available: '1 head', price: 4, unit: 'head', inStock: 4 },
  ];

  const subscriptionPlans = [
    { id: 'herbs', name: 'Herb Essentials', price: 15, items: ['Basil', 'Cilantro', 'Mint', 'Parsley'], frequency: 'weekly' },
    { id: 'salad', name: 'Salad Builder', price: 25, items: ['Mixed Greens', 'Tomatoes', 'Microgreens', 'Herbs'], frequency: 'weekly' },
    { id: 'chef', name: 'Home Chef', price: 40, items: ['Everything available', 'Priority selection', 'Seasonal specials'], frequency: 'weekly' },
  ];

  const upcomingHarvest = [
    { crop: 'Arugula', emoji: '🥬', ready: 'Jan 6' },
    { crop: 'Thai Basil', emoji: '🌿', ready: 'Jan 8' },
    { crop: 'Strawberries', emoji: '🍓', ready: 'Jan 15' },
  ];

  const addToCart = (crop) => {
    const existing = cart.find(item => item.id === crop.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === crop.id ? {...item, qty: item.qty + 1} : item
      ));
    } else {
      setCart([...cart, {...crop, qty: 1}]);
    }
  };

  const removeFromCart = (cropId) => {
    setCart(cart.filter(item => item.id !== cropId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">🌱 BuildingHarvest</h1>
            <p className="text-green-200 text-sm">The Apex, Unit 12B</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-200">Credits</p>
            <p className="text-lg font-bold">24 🪴</p>
          </div>
        </div>
      </div>

      {/* Pickup Alert */}
      {pickupReady && (
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 m-3 rounded-r-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-800">🎉 Your order is ready!</p>
              <p className="text-amber-700 text-sm">Locker #7 • Code: 4829</p>
            </div>
            <button 
              onClick={() => setPickupReady(false)}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b bg-white sticky top-0 z-10">
        {['order', 'subscribe', 'grow', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize ${
              activeTab === tab 
                ? 'text-green-700 border-b-2 border-green-700' 
                : 'text-gray-500'
            }`}
          >
            {tab === 'order' && '🛒 '}
            {tab === 'subscribe' && '📦 '}
            {tab === 'grow' && '🌱 '}
            {tab === 'history' && '📋 '}
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Order Tab */}
        {activeTab === 'order' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">This Week's Harvest</h2>
                <p className="text-gray-500 text-sm">Order by Tue 8pm • Pickup Thu-Sat</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Rooftop Fresh
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {thisWeeksCrops.map(crop => (
                <div 
                  key={crop.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="text-3xl mb-2">{crop.emoji}</div>
                  <h3 className="font-medium">{crop.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{crop.available}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-700">${crop.price}</span>
                    <button 
                      onClick={() => addToCart(crop)}
                      className="bg-green-600 text-white w-8 h-8 rounded-full text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{crop.inStock} left</p>
                </div>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-medium mb-3">🔜 Coming Soon</h3>
              <div className="flex gap-4 overflow-x-auto">
                {upcomingHarvest.map((item, i) => (
                  <div key={i} className="flex-shrink-0 text-center">
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <p className="text-sm font-medium">{item.crop}</p>
                    <p className="text-xs text-gray-500">{item.ready}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            {cart.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium">{cart.length} items</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {cart.map(i => i.emoji).join('')}
                    </span>
                  </div>
                  <span className="font-bold text-lg">${cartTotal}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">
                  Place Order for Thursday Pickup
                </button>
              </div>
            )}
          </div>
        )}

        {/* Subscribe Tab */}
        {activeTab === 'subscribe' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Weekly Subscriptions</h2>
            <p className="text-gray-500 text-sm mb-4">Set it and forget it. Fresh produce every week.</p>

            <div className="space-y-4">
              {subscriptionPlans.map(plan => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-xl p-4 border-2 ${
                    subscription === plan.id ? 'border-green-500' : 'border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-2xl font-bold text-green-700">
                        ${plan.price}<span className="text-sm font-normal text-gray-500">/week</span>
                      </p>
                    </div>
                    {subscription === plan.id && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    {plan.items.map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setSubscription(plan.id)}
                    className={`w-full py-2 rounded-lg font-medium ${
                      subscription === plan.id 
                        ? 'bg-gray-200 text-gray-600' 
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    {subscription === plan.id ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <h3 className="font-medium text-blue-800 mb-2">💡 Earn Credits</h3>
              <p className="text-sm text-blue-700">
                Help with watering or harvesting and earn credits toward free produce. 
                1 hour = 10 credits = $10 value.
              </p>
              <button className="mt-3 text-blue-600 font-medium text-sm">
                View volunteer shifts →
              </button>
            </div>
          </div>
        )}

        {/* Grow Tab */}
        {activeTab === 'grow' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Our Rooftop Farm</h2>
            <p className="text-gray-500 text-sm mb-4">12 growing stations • 847 sq ft • Est. 2024</p>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 text-center border">
                <p className="text-2xl font-bold text-green-600">247</p>
                <p className="text-xs text-gray-500">lbs harvested</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border">
                <p className="text-2xl font-bold text-blue-600">38</p>
                <p className="text-xs text-gray-500">active members</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border">
                <p className="text-2xl font-bold text-amber-600">$1.2K</p>
                <p className="text-xs text-gray-500">saved vs store</p>
              </div>
            </div>

            {/* Growing Now */}
            <div className="bg-white rounded-xl p-4 border mb-4">
              <h3 className="font-medium mb-3">🌡️ Live Conditions</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Temperature</span>
                  <span className="font-medium">72°F ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Humidity</span>
                  <span className="font-medium">65% ✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Light cycle</span>
                  <span className="font-medium">16h on</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">pH Level</span>
                  <span className="font-medium">6.2 ✓</span>
                </div>
              </div>
            </div>

            {/* Request Crops */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
              <h3 className="font-medium mb-2">🗳️ Vote for Next Season</h3>
              <p className="text-sm text-gray-600 mb-3">
                What should we grow in Spring 2025?
              </p>
              <div className="space-y-2">
                {[
                  { name: 'Hot Peppers 🌶️', votes: 23 },
                  { name: 'Edible Flowers 🌸', votes: 18 },
                  { name: 'Snap Peas 🫛', votes: 15 },
                  { name: 'Lavender 💜', votes: 12 },
                ].map((option, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 bg-white rounded-lg p-2 flex justify-between">
                      <span>{option.name}</span>
                      <span className="text-gray-500">{option.votes}</span>
                    </div>
                    <button className="text-green-600 font-medium">Vote</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            
            <div className="space-y-3">
              {[
                { date: 'Dec 26', items: '🌿🌿🥬🍅', total: 17, status: 'Picked up' },
                { date: 'Dec 19', items: '🌿🌱🍃', total: 9, status: 'Picked up' },
                { date: 'Dec 12', items: '🥬🥬🍅🍅', total: 22, status: 'Picked up' },
                { date: 'Dec 5', items: '🌿🌱🥬', total: 12, status: 'Picked up' },
              ].map((order, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.date}</p>
                    <p className="text-xl">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total}</p>
                    <p className="text-xs text-green-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium mb-2">📊 Your Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-2xl font-bold text-green-600">12.4 lbs</p>
                  <p className="text-gray-500">Produce consumed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">0 miles</p>
                  <p className="text-gray-500">Food miles</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">$47</p>
                  <p className="text-gray-500">vs grocery store</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">8.2 kg</p>
                  <p className="text-gray-500">CO₂ saved</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingHarvestApp;

// Wrap for default export as App
export { BuildingHarvestApp as App };
