import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Footer } from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, LogOut, ShoppingBag, Clock, Truck, CheckCircle, CreditCard } from 'lucide-react';
import { Header } from '../components/Header';
import { fetchOrders } from '../services/api';

// Definindo o tipo para os pedidos que vêm do JSON
interface OrderData {
  id: string;
  userId: string;
  date: string;
  total: string;
  status: string;
  isActive: boolean;
}

export function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'status' | 'history'>('status');
  
  // Estado para armazenar os dados que vêm do db.json
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4 text-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Você não está conectado.</h2>
            <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold">
              Fazer Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filtrando os pedidos com base no db.json
  const activeOrders = orders.filter(order => order.isActive);
  const historyOrders = orders.filter(order => !order.isActive);

  const getStatusVisuals = (status: string) => {
    switch (status) {
      case 'A Pagar': return { icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
      case 'Preparando': return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
      case 'A Caminho': return { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' };
      case 'A Avaliar': return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
      default: return { icon: Package, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl mt-6 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Minha Conta</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center text-center gap-3 mb-6">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                  <User size={40} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              
              <hr className="border-gray-100 dark:border-gray-700 my-4" />
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab('status')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition font-medium ${activeTab === 'status' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Truck size={20} /> Meus Pedidos
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition font-medium ${activeTab === 'history' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <ShoppingBag size={20} /> Histórico Completo
                </button>
              </div>

              <hr className="border-gray-100 dark:border-gray-700 my-4" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-lg transition font-medium"
              >
                <LogOut size={20} /> Sair da Conta
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
              
              {activeTab === 'status' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Acompanhe seus pedidos</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">Veja o status das suas compras recentes.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl border border-orange-100 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-900/10 flex items-center gap-4">
                      <CreditCard className="text-orange-500" size={28} />
                      <div><p className="text-sm text-gray-500">A Pagar</p><p className="font-bold text-xl dark:text-white">{activeOrders.filter(o => o.status === 'A Pagar').length}</p></div>
                    </div>
                    <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10 flex items-center gap-4">
                      <Clock className="text-blue-500" size={28} />
                      <div><p className="text-sm text-gray-500">Preparando</p><p className="font-bold text-xl dark:text-white">{activeOrders.filter(o => o.status === 'Preparando').length}</p></div>
                    </div>
                    <div className="p-4 rounded-xl border border-purple-100 bg-purple-50 dark:border-purple-900/30 dark:bg-purple-900/10 flex items-center gap-4">
                      <Truck className="text-purple-500" size={28} />
                      <div><p className="text-sm text-gray-500">A Caminho</p><p className="font-bold text-xl dark:text-white">{activeOrders.filter(o => o.status === 'A Caminho').length}</p></div>
                    </div>
                  </div>

                  <div className="space-y-4">

                    {activeOrders.map((order) => {
                      const visuals = getStatusVisuals(order.status);
                      return (
                        <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all">
                          <div className="flex items-center gap-4 mb-3 sm:mb-0">
                            <div className={`p-3 rounded-lg ${visuals.bg}`}><visuals.icon className={visuals.color} size={24} /></div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">Pedido {order.id}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Realizado {order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto">
                            <p className="font-bold text-gray-900 dark:text-white">{order.total}</p>
                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-1 ${visuals.bg} ${visuals.color}`}>{order.status}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Histórico de Compras</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">Todos os itens que você já comprou conosco.</p>
                  
                  <div className="space-y-4">
                    {historyOrders.map((order) => {
                      const visuals = getStatusVisuals(order.status);
                      return (
                        <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl opacity-80 hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-4 mb-3 sm:mb-0">
                            <div className={`p-3 rounded-lg ${visuals.bg}`}><visuals.icon className={visuals.color} size={24} /></div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-white">Pedido {order.id}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Finalizado em {order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto">
                            <p className="font-bold text-gray-900 dark:text-white">{order.total}</p>
                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-1 ${visuals.bg} ${visuals.color}`}>{order.status}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}