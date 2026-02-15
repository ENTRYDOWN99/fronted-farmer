import React from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Package, DollarSign, ShoppingBag, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { currentUser, products, orders } = useStore();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // --- Farmer Dashboard Logic ---
  if (currentUser.role === 'farmer') {
    const myProducts = products.filter(p => p.farmerId === currentUser.id);
    const totalRevenue = myProducts.reduce((sum, p) => sum + (p.price * p.sold), 0);
    const totalSold = myProducts.reduce((sum, p) => sum + p.sold, 0);
    
    // Prepare chart data (Sales by Product)
    const chartData = myProducts.map(p => ({
      name: p.name.substring(0, 10) + (p.name.length > 10 ? '...' : ''),
      sales: p.sold
    })).filter(d => d.sales > 0);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <Link to="/add-product" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 shadow-sm">
            <Plus size={20} /> Add Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                 <Package size={24} />
               </div>
               <div>
                 <p className="text-sm text-gray-500">Total Products</p>
                 <p className="text-2xl font-bold text-gray-800">{myProducts.length}</p>
               </div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-green-100 text-green-600 rounded-full">
                 <DollarSign size={24} />
               </div>
               <div>
                 <p className="text-sm text-gray-500">Total Revenue</p>
                 <p className="text-2xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
               </div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                 <ShoppingBag size={24} />
               </div>
               <div>
                 <p className="text-sm text-gray-500">Total Items Sold</p>
                 <p className="text-2xl font-bold text-gray-800">{totalSold}</p>
               </div>
             </div>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sales Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="sales" fill="#16a34a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* My Products List */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Products</h2>
        {myProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myProducts.map(product => (
              <ProductCard key={product.id} product={product} isOwner={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You haven't listed any products yet.</p>
            <Link to="/add-product" className="text-green-600 font-medium hover:underline mt-2 inline-block">Start Selling</Link>
          </div>
        )}
      </div>
    );
  }

  // --- Customer Dashboard Logic ---
  const myOrders = orders.filter(o => o.customerId === currentUser.id);
  const totalSpent = myOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                 <Package size={24} />
               </div>
               <div>
                 <p className="text-sm text-gray-500">Total Orders</p>
                 <p className="text-2xl font-bold text-gray-800">{myOrders.length}</p>
               </div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-green-100 text-green-600 rounded-full">
                 <DollarSign size={24} />
               </div>
               <div>
                 <p className="text-sm text-gray-500">Total Spent</p>
                 <p className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
               </div>
             </div>
          </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>
      {myOrders.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {myOrders.map(order => (
              <li key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                   <div>
                     <p className="text-sm font-medium text-green-600">Order #{order.id.slice(-6)}</p>
                     <p className="text-xs text-gray-500 flex items-center gap-1">
                       <Clock size={12}/> {new Date(order.date).toLocaleDateString()}
                     </p>
                   </div>
                   <div className="mt-2 sm:mt-0">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                   </div>
                </div>
                <div className="mt-2">
                  <ul className="text-sm text-gray-600">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex justify-end pt-2 border-t border-gray-100">
                    <p className="font-bold text-gray-800">Total: ${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link to="/marketplace" className="text-green-600 font-medium hover:underline mt-2 inline-block">Start Shopping</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
