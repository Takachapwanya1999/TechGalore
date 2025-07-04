import React, { useState, useRef, useEffect, useMemo } from 'react';
import './Dashboard.css';
import logoImg from './assets/logo.png';

const mockProducts = [
  { 
    id: 1, 
    name: 'MacBook Pro M2', 
    category: 'Laptops', 
    price: 25999, 
    stock: 15, 
    description: 'Latest MacBook Pro with M2 chip',
    processor: 'Apple M2',
    ram: '16GB',
    storage: '512GB SSD',
    condition: 'New',
    image: '../../assets/pc.png'
  },
  { 
    id: 2, 
    name: 'Dell XPS 13', 
    category: 'Laptops', 
    price: 18999, 
    stock: 8, 
    description: 'Premium ultrabook with 13-inch display',
    processor: 'Intel i7-1250U',
    ram: '16GB',
    storage: '1TB SSD',
    condition: 'New',
    image: '../../assets/pc.png'
  },
  { 
    id: 3, 
    name: 'iPhone 15 Pro', 
    category: 'Phones', 
    price: 24999, 
    stock: 25, 
    description: 'Latest iPhone with titanium design',
    processor: 'A17 Pro',
    ram: '8GB',
    storage: '256GB',
    condition: 'New',
    image: '../../assets/image.png'
  },
  { 
    id: 4, 
    name: 'Samsung Galaxy S24', 
    category: 'Phones', 
    price: 19999, 
    stock: 12, 
    description: 'Android flagship with AI features',
    processor: 'Snapdragon 8 Gen 3',
    ram: '12GB',
    storage: '256GB',
    condition: 'New',
    image: '../../assets/image.png'
  },
  { 
    id: 5, 
    name: 'iPad Air', 
    category: 'Tablets', 
    price: 14999, 
    stock: 20, 
    description: 'Versatile tablet for work and play',
    processor: 'Apple M1',
    ram: '8GB',
    storage: '256GB',
    condition: 'Used',
    image: '../../assets/image.png'
  },
];

const mockOrders = [
  { id: 1, customer: 'John Doe', product: 'MacBook Pro M2', status: 'Delivered', date: '2024-01-15', amount: 25999 },
  { id: 2, customer: 'Jane Smith', product: 'iPhone 15 Pro', status: 'Processing', date: '2024-01-16', amount: 24999 },
  { id: 3, customer: 'Mike Johnson', product: 'Dell XPS 13', status: 'Shipped', date: '2024-01-17', amount: 18999 },
  { id: 4, customer: 'Sarah Wilson', product: 'Samsung Galaxy S24', status: 'Pending', date: '2024-01-18', amount: 19999 },
  { id: 5, customer: 'David Brown', product: 'iPad Air', status: 'Delivered', date: '2024-01-19', amount: 14999 },
];

const defaultUser = {
  name: 'Technology Galore',
  email: 'admin@techgalore.co.za',
  avatar: 'https://i.imgur.com/8K9X2Qf.png',
  role: 'Administrator'
};

const processorOptions = [
  'Intel i3', 'Intel i5', 'Intel i7', 'Intel i9',
  'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9',
  'Apple M1', 'Apple M2', 'Apple M3', 'Apple M4',
  'Snapdragon 8 Gen 3', 'A17 Pro', 'Exynos 2400'
];

const ramOptions = ['4GB', '8GB', '12GB', '16GB', '32GB', '64GB'];
const storageOptions = ['128GB SSD', '256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD', '500GB HDD', '1TB HDD', '2TB HDD'];
const conditionOptions = ['New', 'Used', 'Refurbished'];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('analytics');
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [walletBalance, setWalletBalance] = useState(15420.50);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    category: '', 
    price: '', 
    stock: '', 
    description: '', 
    processor: processorOptions[0], 
    ram: ramOptions[0], 
    storage: storageOptions[0], 
    condition: conditionOptions[0], 
    image: '' 
  });
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletAction, setWalletAction] = useState('');
  const [walletAmount, setWalletAmount] = useState('');
  const [user, setUser] = useState(defaultUser);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: user.name, email: user.email, avatar: user.avatar });
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const modalRef = useRef(null);
  const walletModalRef = useRef(null);
  const profileModalRef = useRef(null);

  const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.amount, 0), [orders]);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddProduct(false);
        setEditingProduct(null);
        setNewProduct({ 
          name: '', 
          category: '', 
          price: '', 
          stock: '', 
          description: '', 
          processor: processorOptions[0], 
          ram: ramOptions[0], 
          storage: storageOptions[0], 
          condition: conditionOptions[0], 
          image: '' 
        });
      }
      if (walletModalRef.current && !walletModalRef.current.contains(event.target)) {
        setShowWalletModal(false);
        setWalletAction('');
        setWalletAmount('');
      }
      if (profileModalRef.current && !profileModalRef.current.contains(event.target)) {
        setShowProfileModal(false);
        setEditProfile({ name: user.name, email: user.email, avatar: user.avatar });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [user]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      };
      setProducts([...products, product]);
      setNewProduct({ 
        name: '', 
        category: '', 
        price: '', 
        stock: '', 
        description: '', 
        processor: processorOptions[0], 
        ram: ramOptions[0], 
        storage: storageOptions[0], 
        condition: conditionOptions[0], 
        image: '' 
      });
      setShowAddProduct(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product, price: product.price.toString(), stock: product.stock.toString() });
    setShowAddProduct(true);
  };

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      const updatedProducts = products.map(p => p.id === editingProduct.id ? {
        ...p,
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      } : p);
      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({ 
        name: '', 
        category: '', 
        price: '', 
        stock: '', 
        description: '', 
        processor: processorOptions[0], 
        ram: ramOptions[0], 
        storage: storageOptions[0], 
        condition: conditionOptions[0], 
        image: '' 
      });
      setShowAddProduct(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setNewProduct({ ...newProduct, image: event.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleWalletAction = () => {
    const amount = parseFloat(walletAmount);
    if (amount > 0) {
      if (walletAction === 'add') setWalletBalance(prev => prev + amount);
      if (walletAction === 'withdraw') {
        if (amount <= walletBalance) setWalletBalance(prev => prev - amount);
        else return alert('Insufficient funds!');
      }
      setShowWalletModal(false);
      setWalletAction('');
      setWalletAmount('');
    }
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setEditProfile({ ...editProfile, avatar: event.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    setUser({ ...user, ...editProfile });
    setShowProfileModal(false);
  };

  const closeModal = (modalType) => {
    switch (modalType) {
      case 'product':
        setShowAddProduct(false);
        setEditingProduct(null);
        setNewProduct({ 
          name: '', 
          category: '', 
          price: '', 
          stock: '', 
          description: '', 
          processor: processorOptions[0], 
          ram: ramOptions[0], 
          storage: storageOptions[0], 
          condition: conditionOptions[0], 
          image: '' 
        });
        break;
      case 'wallet':
        setShowWalletModal(false);
        setWalletAction('');
        setWalletAmount('');
        break;
      case 'profile':
        setShowProfileModal(false);
        setEditProfile({ name: user.name, email: user.email, avatar: user.avatar });
        break;
    }
  };

  const renderAnalytics = () => (
    <div className="analytics">
      <h2><span className="material-icons">analytics</span> Dashboard Analytics</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-icon">
            <span className="material-icons">attach_money</span>
          </div>
          <div className="analytics-content">
            <h3>Total Revenue</h3>
            <p className="analytics-value">R{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">
            <span className="material-icons">inventory</span>
          </div>
          <div className="analytics-content">
            <h3>Total Products</h3>
            <p className="analytics-value">{totalProducts}</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">
            <span className="material-icons">shopping_cart</span>
          </div>
          <div className="analytics-content">
            <h3>Total Orders</h3>
            <p className="analytics-value">{totalOrders}</p>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-icon">
            <span className="material-icons">warning</span>
          </div>
          <div className="analytics-content">
            <h3>Low Stock Products</h3>
            <p className="analytics-value">{lowStockProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products">
      <div className="products-header">
        <h2><span className="material-icons">inventory</span> Products Management</h2>
        <button className="add-product-btn" onClick={() => setShowAddProduct(true)}>
          <span className="material-icons">add</span> Add Product
        </button>
      </div>
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Processor</th>
              <th>RAM</th>
              <th>Storage</th>
              <th>Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} className="product-image" />
                </td>
                <td>{product.name}</td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td className="price">R{product.price.toLocaleString()}</td>
                <td>
                  <span className={`stock-badge ${product.stock < 10 ? 'low-stock' : 'in-stock'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>{product.processor}</td>
                <td>{product.ram}</td>
                <td>{product.storage}</td>
                <td>
                  <span className={`condition-badge ${product.condition.toLowerCase()}`}>
                    {product.condition}
                  </span>
                </td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEditProduct(product)}>
                    <span className="material-icons">edit</span>
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                    <span className="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders">
      <h2><span className="material-icons">shopping_cart</span> Orders Management</h2>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td className="price">R{order.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="wallet">
      <h2><span className="material-icons">account_balance_wallet</span> Wallet Management</h2>
      <div className="wallet-card">
        <div className="wallet-balance">
          <h3>Current Balance</h3>
          <p className="balance-amount">R{walletBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="wallet-actions">
          <button className="wallet-btn add-funds" onClick={() => { setWalletAction('add'); setShowWalletModal(true); }}>
            <span className="material-icons">add</span> Add Funds
          </button>
          <button className="wallet-btn withdraw-funds" onClick={() => { setWalletAction('withdraw'); setShowWalletModal(true); }}>
            <span className="material-icons">remove</span> Withdraw
          </button>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'analytics': return renderAnalytics();
      case 'products': return renderProducts();
      case 'orders': return renderOrders();
      case 'wallet': return renderWallet();
      default: return renderAnalytics();
    }
  };

  return (
    <div className="dashboard-container">
      <nav className={`sidebar ${isNavExpanded ? 'expanded' : ''}`}
           onMouseEnter={() => setIsNavExpanded(true)}
           onMouseLeave={() => setIsNavExpanded(false)}>
        <div className="sidebar-header">
          <img src={logoImg} alt="TechGalore Logo" className="sidebar-logo" />
          <h1 className="sidebar-title">TechGalore</h1>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={activeSection === 'analytics' ? 'active' : ''} 
              onClick={() => setActiveSection('analytics')}
            >
              <span className="material-icons">analytics</span>
              <span className="menu-text">Analytics</span>
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'products' ? 'active' : ''} 
              onClick={() => setActiveSection('products')}
            >
              <span className="material-icons">inventory</span>
              <span className="menu-text">Products</span>
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'orders' ? 'active' : ''} 
              onClick={() => setActiveSection('orders')}
            >
              <span className="material-icons">shopping_cart</span>
              <span className="menu-text">Orders</span>
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'wallet' ? 'active' : ''} 
              onClick={() => setActiveSection('wallet')}
            >
              <span className="material-icons">account_balance_wallet</span>
              <span className="menu-text">Wallet</span>
            </button>
          </li>
        </ul>
        <div className="user-profile">
          <div className="user-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p className="user-role">{user.role}</p>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        {renderSection()}
      </main>

      {/* Product Modal */}
      {showAddProduct && (
        <div className="modal-overlay">
          <div className="modal product-modal" ref={modalRef}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={() => closeModal('product')}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (R)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Processor</label>
                  <select
                    value={newProduct.processor}
                    onChange={e => setNewProduct({ ...newProduct, processor: e.target.value })}
                  >
                    {processorOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>RAM</label>
                  <select
                    value={newProduct.ram}
                    onChange={e => setNewProduct({ ...newProduct, ram: e.target.value })}
                  >
                    {ramOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Storage</label>
                  <select
                    value={newProduct.storage}
                    onChange={e => setNewProduct({ ...newProduct, storage: e.target.value })}
                  >
                    {storageOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select
                    value={newProduct.condition}
                    onChange={e => setNewProduct({ ...newProduct, condition: e.target.value })}
                  >
                    {conditionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={editingProduct ? handleUpdateProduct : handleAddProduct} className="primary">
                <span className="material-icons">{editingProduct ? 'update' : 'add'}</span>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button onClick={() => closeModal('product')} className="secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="modal-overlay">
          <div className="modal wallet-modal" ref={walletModalRef}>
            <div className="modal-header">
              <h2>
                <span className="material-icons">
                  {walletAction === 'add' ? 'add' : 'remove'}
                </span>
                {walletAction === 'add' ? 'Add Funds' : 'Withdraw Funds'}
              </h2>
              <button className="close-btn" onClick={() => closeModal('wallet')}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Amount (R)</label>
                <input
                  type="number"
                  value={walletAmount}
                  onChange={e => setWalletAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="wallet-info">
                <p>Current Balance: <strong>R{walletBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</strong></p>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleWalletAction} className="primary">
                <span className="material-icons">{walletAction === 'add' ? 'add' : 'remove'}</span>
                {walletAction === 'add' ? 'Add Funds' : 'Withdraw'}
              </button>
              <button onClick={() => closeModal('wallet')} className="secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
