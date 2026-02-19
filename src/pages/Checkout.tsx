import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, CreditCard, Banknote, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const { user } = useContext(AuthContext);

  const shippingCost = 23.87;
  const finalTotal = cartTotal + shippingCost;

  const handlePlaceOrder = () => {
    alert("Pedido realizado com sucesso! 🚀\nObrigado por comprar na Loading Jr.");
    navigate('/');
  };

  //Se não tiver usuário logado, não tenta renderizar o endereço
  if (!user) {
     // navigate('/login');
    return (
        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#0f061a] dark:text-white">
            <p>Carregando dados do usuário...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#0f061a] transition-colors">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl animate-fade-in-up">
        
        <div className="flex items-center gap-2 mb-6 text-purple-600 dark:text-purple-400">
          <Link
            to="/products"
            className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors p-2 -ml-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-800"
            title="Voltar para os produtos"
          >
            <ArrowLeft size={24} />
          </Link>
          <DollarSign size={28} />
          <h1 className="text-2xl font-bold border-l-2 border-purple-600 pl-3">Caixa</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-sm mb-4 overflow-hidden">
          <div className="h-1 w-full bg-[repeating-linear-gradient(45deg,#ec4899,#ec4899_30px,#8b5cf6_30px,#8b5cf6_60px)] opacity-80"></div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4">
              <MapPin size={20} />
              <h2 className="text-lg font-bold">Endereço de Entrega</h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
              <div className="font-bold text-gray-900 dark:text-white">
              {user.name}
              </div>
              <div className="text-gray-600 dark:text-gray-300 flex-1 md:px-8">
                {user.address.street}, {user.address.number}, {user.address.neighborhood}, {user.address.complement}, {user.address.city} - {user.address.state}, {user.address.zipCode}
              </div>
              <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline uppercase text-xs">
                Trocar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-sm mb-4 p-6">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 pb-2 border-b dark:border-gray-700">
            <div className="col-span-6">Produtos Pedidos</div>
            <div className="col-span-2 text-center">Preço Unitário</div>
            <div className="col-span-2 text-center">Quantidade</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 text-sm border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded border dark:border-gray-700" />
                <span className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</span>
              </div>
              <div className="col-span-4 md:col-span-2 text-center text-gray-600 dark:text-gray-300">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <div className="col-span-4 md:col-span-2 text-center text-gray-600 dark:text-gray-300">
                {item.quantity}
              </div>
              <div className="col-span-4 md:col-span-2 text-right font-bold text-gray-900 dark:text-white">
                {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-dashed border-gray-200 dark:border-gray-700">
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-900 dark:text-white whitespace-nowrap">Mensagem:</span>
              <input
                type="text"
                placeholder="Deixe uma mensagem para o vendedor..."
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-3 py-1.5 text-sm outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-green-600 dark:text-green-400 font-medium">Opção de envio: Entrega Padrão</span>
              <div className="flex flex-col items-end">
                <span className="text-gray-900 dark:text-white font-bold">R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                <span className="text-xs text-gray-500">Receba entre 10 e 20 dias</span>
              </div>
            </div>

          </div>
          
          <div className="flex justify-end items-center gap-4 mt-6">
            <span className="text-gray-500 text-sm">Total do Pedido ({cartItems.length} itens):</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-sm mb-4 p-6">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Método de Pagamento</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setPaymentMethod('pix')}
              className={`flex items-center gap-2 px-6 py-3 border rounded-sm text-sm font-medium transition-all ${
                paymentMethod === 'pix'
                  ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-purple-300'
              }`}
            >
              <DollarSign size={18} /> Pix
              {paymentMethod === 'pix' && <div className="ml-2 w-2 h-2 rounded-full bg-purple-600"></div>}
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center gap-2 px-6 py-3 border rounded-sm text-sm font-medium transition-all ${
                paymentMethod === 'card'
                  ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-purple-300'
              }`}
            >
              <CreditCard size={18} /> Cartão de Crédito
              {paymentMethod === 'card' && <div className="ml-2 w-2 h-2 rounded-full bg-purple-600"></div>}
            </button>

            <button
              onClick={() => setPaymentMethod('boleto')}
              className={`flex items-center gap-2 px-6 py-3 border rounded-sm text-sm font-medium transition-all ${
                paymentMethod === 'boleto'
                  ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-purple-300'
              }`}
            >
              <Banknote size={18} /> Boleto
              {paymentMethod === 'boleto' && <div className="ml-2 w-2 h-2 rounded-full bg-purple-600"></div>}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-sm p-6 sticky bottom-0 z-40 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col items-end gap-2 max-w-xs ml-auto">
            <div className="flex justify-between w-full text-sm">
              <span className="text-gray-500 dark:text-gray-400">Total em produtos:</span>
              <span className="text-gray-900 dark:text-white">{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between w-full text-sm">
              <span className="text-gray-500 dark:text-gray-400">Total do frete:</span>
              <span className="text-gray-900 dark:text-white">{shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between w-full text-lg mt-2">
              <span className="text-gray-900 dark:text-white font-medium">Pagamento Total:</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded mt-4 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/30"
            >
              Fazer Pedido
            </button>
          </div>
        </div>

      </main>

    </div>
  );
}