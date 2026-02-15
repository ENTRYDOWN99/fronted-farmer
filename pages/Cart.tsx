import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Sparkles, ChefHat, Clock, BarChart, Loader2, Utensils } from 'lucide-react';
import { generateRecipesFromIngredients, Recipe } from '../services/geminiService';

const Cart = () => {
  const { cart, removeFromCart, checkout, currentUser } = useStore();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax mock
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    checkout();
    navigate('/dashboard'); // Go to orders page
    alert('Order placed successfully!');
  };

  const handleGetRecipes = async () => {
    setLoadingRecipes(true);
    const ingredientNames = Array.from(new Set(cart.map(item => item.name))) as string[];
    const results = await generateRecipesFromIngredients(ingredientNames);
    setRecipes(results);
    setLoadingRecipes(false);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block p-6 bg-green-50 rounded-full mb-4">
          <ShoppingBag className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/marketplace" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Cart Items List */}
        <div className="lg:w-2/3 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
           <ul className="divide-y divide-gray-200">
             {cart.map(item => (
               <li key={item.id} className="p-6 flex items-center">
                 <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded-md border border-gray-200" />
                 <div className="ml-4 flex-1">
                   <div className="flex justify-between">
                     <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                     <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                   </div>
                   <p className="text-sm text-gray-500">{item.farmerName}</p>
                   <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Quantity: <span className="font-semibold">{item.quantity}</span> ({item.unit})
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                   </div>
                 </div>
               </li>
             ))}
           </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
             <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                   <span>Subtotal</span>
                   <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span>Tax (5%)</span>
                   <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                   <span>Total</span>
                   <span>${total.toFixed(2)}</span>
                </div>
             </div>
             <button
               onClick={handleCheckout}
               className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 shadow-md transition-colors"
             >
               Proceed to Checkout
             </button>
             <Link to="/marketplace" className="block text-center mt-4 text-sm text-green-600 hover:underline">
               Continue Shopping
             </Link>
           </div>
        </div>
      </div>

      {/* AI Chef Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <ChefHat className="text-green-600" /> 
                    AI Kitchen Corner
                </h2>
                <p className="text-gray-600 mt-2">Not sure what to cook? Let our AI suggest recipes based on your cart items.</p>
            </div>
            <button
                onClick={handleGetRecipes}
                disabled={loadingRecipes}
                className="flex-shrink-0 bg-white text-green-700 border border-green-200 px-6 py-3 rounded-xl font-bold hover:bg-green-50 hover:border-green-300 shadow-sm transition-all flex items-center gap-2"
            >
                {loadingRecipes ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {loadingRecipes ? 'Creating Menu...' : 'Suggest Recipes'}
            </button>
        </div>

        {recipes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                {recipes.map((recipe, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{recipe.title}</h3>
                        <div className="flex gap-3 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            <span className="flex items-center gap-1"><Clock size={14}/> {recipe.time}</span>
                            <span className="flex items-center gap-1"><BarChart size={14}/> {recipe.difficulty}</span>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-2"><Utensils size={14}/> Ingredients</h4>
                            <div className="flex flex-wrap gap-1">
                                {recipe.ingredients.slice(0, 5).map((ing, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">{ing}</span>
                                ))}
                                {recipe.ingredients.length > 5 && <span className="px-2 py-1 bg-gray-50 text-gray-400 text-xs">+{recipe.ingredients.length - 5} more</span>}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-700 text-sm mb-2">Instructions</h4>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                                {recipe.instructions.slice(0, 3).map((step, i) => (
                                    <li key={i} className="line-clamp-2">{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Cart;