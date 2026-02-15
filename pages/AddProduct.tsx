import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { generateProductDescription } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

const AddProduct = () => {
  const { addProduct, currentUser } = useStore();
  const navigate = useNavigate();
  const [loadingAI, setLoadingAI] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://picsum.photos/400/300');

  if (!currentUser || currentUser.role !== 'farmer') {
    navigate('/');
    return null;
  }

  const handleGenerateDescription = async () => {
    if (!name) return alert("Please enter a product name first.");
    
    setLoadingAI(true);
    // Passing a constructed "features" string to the helper
    const features = `Price: ${price}/${unit}, Stock: ${stock}`;
    const desc = await generateProductDescription(name, category, features);
    setDescription(desc);
    setLoadingAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    addProduct({
      name,
      category,
      price: parseFloat(price),
      unit,
      stock: parseInt(stock),
      description,
      image
    });

    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Organic Carrots"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy</option>
                  <option>Pantry</option>
                  <option>Grains</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Unit Type</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="kg">Per kg</option>
                  <option value="lb">Per lb</option>
                  <option value="piece">Per piece</option>
                  <option value="bundle">Per bundle</option>
                  <option value="box">Per box</option>
                  <option value="jar">Per jar</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 p-2 focus:border-green-500 focus:ring-green-500"
                    placeholder="0.00"
                  />
                </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="0"
                />
             </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <button 
                  type="button" 
                  onClick={handleGenerateDescription}
                  disabled={loadingAI}
                  className="text-xs flex items-center gap-1 text-purple-600 font-semibold hover:text-purple-800 disabled:opacity-50"
                >
                  {loadingAI ? <Loader2 className="animate-spin h-3 w-3"/> : <Sparkles className="h-3 w-3" />}
                  Generate with AI
                </button>
             </div>
             <textarea
               required
               rows={3}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
               placeholder="Describe your product..."
             />
             <p className="text-xs text-gray-500 mt-1">
               Pro tip: Use the AI button to auto-generate a catchy description based on the name and category.
             </p>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700">Image URL</label>
             <input
               type="url"
               value={image}
               onChange={(e) => setImage(e.target.value)}
               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
               placeholder="https://..."
             />
             <p className="text-xs text-gray-500 mt-1">Using a random placeholder for demo.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3">
             <button
               type="button"
               onClick={() => navigate('/dashboard')}
               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 font-medium"
             >
               Cancel
             </button>
             <button
               type="submit"
               className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-medium shadow-sm"
             >
               List Product
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
