import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Edit, Trash2, Plus, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isOwner?: boolean; // For dashboard view
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isOwner }) => {
  const { addToCart, deleteProduct, currentUser, wishlist, toggleWishlist } = useStore();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
    }
  };

  const isLiked = wishlist ? wishlist.includes(product.id) : false;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return; // Could redirect to login here
    toggleWishlist(product.id);
  }

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
           <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-100">
             {product.category}
           </span>
        </div>
        
        {/* Wishlist Button (Customer only) */}
        {!isOwner && currentUser?.role === 'customer' && (
            <button 
                onClick={handleToggleWishlist}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/95 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
            >
                <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
        )}

        {/* Stock status overlay if out of stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
             <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Sold Out</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
             <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
             <Link 
               to={`/farmer/${product.farmerId}`}
               className="text-sm text-gray-500 mt-1 hover:text-green-600 hover:underline transition-colors block"
               onClick={(e) => e.stopPropagation()}
             >
               {product.farmerName}
             </Link>
          </div>
          <div className="text-right">
             <span className="block text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
             <span className="text-xs text-gray-400 font-medium">/ {product.unit}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{product.description}</p>
        
        <div className="mt-auto">
           {isOwner ? (
             <div className="flex gap-2">
                <button 
                  onClick={() => alert("Edit functionality to be implemented")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Edit size={16} /> Edit
                </button>
                <button 
                  onClick={handleDelete} 
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} /> Delete
                </button>
             </div>
           ) : (
             <button
               onClick={handleAddToCart}
               disabled={product.stock === 0 || currentUser?.role === 'farmer'}
               className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95 ${
                 product.stock === 0 || currentUser?.role === 'farmer'
                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                   : 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200'
               }`}
             >
               {product.stock === 0 ? (
                 'Unavailable'
               ) : (
                 <>
                   <Plus size={18} className="stroke-[3]"/> Add to Cart
                 </>
               )}
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;