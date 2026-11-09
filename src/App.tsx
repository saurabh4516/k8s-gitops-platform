import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  ChevronRight,
  Filter,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import './App.css'
import { getCustomers, getOrders, getProducts } from './services/api'
import type { ApiOrder, ApiProduct } from './services/api'

type Product = ApiProduct & { accent: string }
type CartItem = Product & { quantity: number }

type Order = {
  id: string
  customer: string
  date: string
  amount: string
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled'
  initials: string
}

type Customer = {
  name: string
  email: string
  orders: string
  spent: string
  joined: string
  initials: string
}

function getInitials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

function mapOrderStatus(status: ApiOrder['status']): Order['status'] {
  if (status === 'shipped') return 'Shipped'
  if (status === 'cancelled') return 'Cancelled'
  return 'Processing'
}

const categories = ['All products', 'Workspace', 'Home', 'Accessories', 'Tech']

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [category, setCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadDashboardData() {
      try {
        const [apiProducts, apiOrders, apiCustomers] = await Promise.all([
          getProducts(),
          getOrders(),
          getCustomers(),
        ])

        if (cancelled) return

        const productData: Product[] = apiProducts.map((product) => ({
          ...product,
          accent: product.category === 'Workspace' ? '#e9e6df' : '#e8e2d9',
        }))

        const customerLookup = new Map(
          apiCustomers.map((customer) => [customer.id, customer.name]),
        )

        const customerData: Customer[] = apiCustomers.map((customer) => ({
          name: customer.name,
          email: customer.email,
          orders: '—',
          spent: '—',
          joined: new Date(customer.createdAt).toLocaleDateString(),
          initials: getInitials(customer.name),
        }))

        const orderData: Order[] = apiOrders.map((order) => {
          const customerName = customerLookup.get(order.customerId) ?? order.customerId

          return {
            id: order.id,
            customer: customerName,
            date: new Date(order.createdAt).toLocaleDateString(),
            amount: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(order.total),
            status: mapOrderStatus(order.status),
            initials: getInitials(customerName),
          }
        })

        setProducts(productData)
        setCustomers(customerData)
        setOrders(orderData)
        setApiError('')
      } catch (error) {
        if (!cancelled) {
          setApiError(error instanceof Error ? error.message : 'Unable to load CloudCart data.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadDashboardData()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredProducts = useMemo(
    () => products.filter((product) => {
      const matchesCategory = category === 'All products' || product.category === category
      return matchesCategory && product.name.toLowerCase().includes(query.toLowerCase())
    }),
    [category, query],
  )

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.flatMap((item) => {
      if (item.id !== id) return [item]
      const quantity = item.quantity + change
      return quantity > 0 ? [{ ...item, quantity }] : []
    }))
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={18} fill="currentColor" /></div>
          <span>cloud<span>cart</span></span>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-icon">CC</div>
          <div><strong>CloudCart Store</strong><small>Pro workspace</small></div>
          <ChevronDown size={15} />
        </div>
        <nav className="main-nav">
          <p className="nav-label">Workspace</p>
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Products', icon: Package, count: '24' },
            { name: 'Orders', icon: ShoppingBag, count: '8' },
            { name: 'Customers', icon: Users },
          ].map(({ name, icon: Icon, count }) => (
            <button key={name} className={activePage === name ? 'nav-item active' : 'nav-item'} onClick={() => { setActivePage(name); setMobileNav(false) }}>
              <Icon size={18} /><span>{name}</span>{count && <em>{count}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16} /></div><strong>Unlock more insights</strong><p>Get smarter analytics with Pro.</p><button>Explore Pro <ArrowUpRight size={14} /></button></div>
          <div className="user-row"><div className="avatar avatar-user">AR</div><div><strong>Alex Rivera</strong><small>Administrator</small></div><MoreHorizontal size={17} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation"><Menu size={21} /></button>
          <div className="breadcrumbs"><span>{activePage}</span><ChevronRight size={15} /><strong>{activePage === 'Overview' ? 'Dashboard' : activePage}</strong></div>
          <div className="topbar-actions"><button className="icon-button notification" aria-label="Notifications"><Bell size={19} /><i /></button><div className="topbar-avatar">AR</div></div>
        </header>

        <div className="page-content">
          {loading && <p className="subheading">Loading CloudCart data...</p>}
          {apiError && <p role="alert" className="subheading">API connection error: {apiError}. Make sure all three services are running.</p>}
          {activePage === 'Orders' ? <OrdersPage orders={orders} /> : activePage === 'Customers' ? <CustomersPage customers={customers} /> : (
            <>
              <section className="page-heading">
                <div><p className="eyebrow">Monday, March 25, 2024</p><h1>{activePage === 'Products' ? 'Product catalog' : <>Good morning, Alex <span>âœ¦</span></>}</h1><p className="subheading">{activePage === 'Products' ? 'Manage your inventory and keep your storefront fresh.' : 'Hereâ€™s whatâ€™s happening with your store today.'}</p></div>
                <button className="primary-button"><Plus size={17} /> Add product</button>
              </section>

              {activePage === 'Overview' && <Stats orderCount={orders.length} customerCount={customers.length} revenue={orders.reduce((sum, order) => sum + Number(order.amount.replace(/[$,]/g, '')), 0)} />}
              <section className="catalog-section">
                <div className="section-header"><div><h2>{activePage === 'Products' ? 'All products' : 'Popular products'}</h2><p>Curated essentials your customers love.</p></div><button className="text-button" onClick={() => setActivePage('Products')}>View all <ArrowUpRight size={15} /></button></div>
                <div className="catalog-toolbar">
                  <div className="search-field"><Search size={17} /><input placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>âŒ˜ K</kbd></div>
                  <div className="filter-pills">{categories.map((item) => <button key={item} className={category === item ? 'filter-pill selected' : 'filter-pill'} onClick={() => setCategory(item)}>{item}</button>)}</div>
                  <button className="filter-button"><Filter size={16} /> Filters</button>
                </div>
                <div className="product-grid">
                  {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} onAdd={addToCart} isAdded={cart.some((item) => item.id === product.id)} />)}
                </div>
              </section>
              {activePage === 'Overview' && <RecentOrders orders={orders} onViewAll={() => setActivePage('Orders')} />}
            </>
          )}
        </div>
      </main>

      <button className="cart-float" onClick={() => setCartOpen(true)} aria-label="Open shopping cart"><ShoppingCart size={19} /><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></button>
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} isAdded={cart.some((item) => item.id === selectedProduct.id)} />}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={(id) => setCart(cart.filter((item) => item.id !== id))} onUpdateQuantity={updateQuantity} />}
    </div>
  )
}

function Stats({ orderCount, customerCount, revenue }: { orderCount: number; customerCount: number; revenue: number }) {
  return <section className="stats-grid">
    <StatCard label="Order revenue" value={`$${revenue.toFixed(2)}`} change="Live data" icon="revenue" />
    <StatCard label="Total orders" value={String(orderCount)} change="Live data" icon="orders" />
    <StatCard label="Customers" value={String(customerCount)} change="Live data" icon="customers" />
    <div className="chart-card"><div className="card-title-row"><div><p className="stat-label">Revenue overview</p><strong className="chart-value">$8,429</strong><span className="chart-period">This month <ChevronDown size={13} /></span></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="mini-chart"><div className="chart-grid" /><svg viewBox="0 0 280 72" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0d9488" stopOpacity=".22" /><stop offset="100%" stopColor="#0d9488" stopOpacity="0" /></linearGradient></defs><path d="M0,61 C17,58 22,48 38,51 S60,60 77,45 S97,55 111,42 S131,28 145,37 S166,34 178,24 S202,31 214,16 S235,30 249,20 S267,19 280,6 L280,72 L0,72Z" fill="url(#chartFill)" /><path d="M0,61 C17,58 22,48 38,51 S60,60 77,45 S97,55 111,42 S131,28 145,37 S166,34 178,24 S202,31 214,16 S235,30 249,20 S267,19 280,6" fill="none" stroke="#0d9488" strokeWidth="2.5" /></svg></div><div className="chart-labels"><span>Mar 01</span><span>Mar 08</span><span>Mar 15</span><span>Mar 22</span><span>Today</span></div></div>
  </section>
}

function StatCard({ label, value, change, icon }: { label: string; value: string; change: string; icon: string }) {
  return <div className="stat-card"><div className={`stat-icon ${icon}`}>{icon === 'revenue' ? '$' : icon === 'orders' ? <ShoppingBag size={18} /> : icon === 'customers' ? <Users size={18} /> : <Package size={18} />}</div><p className="stat-label">{label}</p><strong className="stat-value">{value}</strong><div className="stat-change"><span>â†— {change}</span> vs last month</div></div>
}

function ProductCard({ product, onSelect, onAdd, isAdded }: { product: Product; onSelect: (product: Product) => void; onAdd: (product: Product) => void; isAdded: boolean }) {
  return <article className="product-card"><button className="product-image" style={{ backgroundColor: product.accent }} onClick={() => onSelect(product)}><img src={product.image} alt={product.name} /><span className="quick-view">Quick view</span></button><div className="product-info"><div className="product-meta"><span>{product.category}</span><span className="rating">â˜… {product.rating}</span></div><h3>{product.name}</h3><div className="product-bottom"><strong>${product.price}</strong><button className={isAdded ? 'add-button added' : 'add-button'} onClick={() => onAdd(product)}>{isAdded ? 'Added' : <Plus size={17} />}</button></div></div></article>
}

function RecentOrders({ orders, onViewAll }: { orders: Order[]; onViewAll: () => void }) {
  return <section className="orders-section"><div className="section-header"><div><h2>Recent orders</h2><p>Keep an eye on your latest customer activity.</p></div><button className="text-button" onClick={onViewAll}>View all orders <ArrowUpRight size={15} /></button></div><div className="orders-table"><div className="table-head"><span>Order</span><span>Customer</span><span>Date</span><span>Total</span><span>Status</span><span /></div>{orders.slice(0, 3).map((order) => <OrderRow key={order.id} order={order} />)}</div></section>
}

function OrdersPage({ orders }: { orders: Order[] }) {
  return <section className="orders-page"><div className="orders-toolbar"><div className="search-field"><Search size={17} /><input placeholder="Search orders..." /></div><button className="filter-button"><Filter size={16} /> Filter by status</button></div><div className="orders-table full-table"><div className="table-head"><span>Order</span><span>Customer</span><span>Date</span><span>Total</span><span>Status</span><span /></div>{orders.map((order) => <OrderRow key={order.id} order={order} />)}</div></section>
}

function OrderRow({ order }: { order: Order }) {
  return <div className="table-row"><strong>{order.id}</strong><div className="customer-cell"><div className="avatar">{order.initials}</div><span>{order.customer}</span></div><span className="muted">{order.date}</span><strong>{order.amount}</strong><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span><button className="more-button"><MoreHorizontal size={18} /></button></div>
}

function ProductDetail({ product, onClose, onAdd, isAdded }: { product: Product; onClose: () => void; onAdd: (product: Product) => void; isAdded: boolean }) {
  return <div className="overlay" onClick={onClose}><aside className="detail-panel" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose}><X size={19} /></button><div className="detail-image" style={{ backgroundColor: product.accent }}><img src={product.image} alt={product.name} /></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><div className="detail-rating">â˜… {product.rating} <span>Â· 24 reviews</span></div><p className="detail-price">${product.price}.00</p><p className="detail-description">Thoughtfully designed for everyday living, the {product.name.toLowerCase()} brings a considered touch to your space.</p><div className="stock-status"><span /> In stock Â· {product.stock} available</div><button className="primary-button wide" onClick={() => onAdd(product)}>{isAdded ? 'Added to cart' : 'Add to cart'} <ShoppingCart size={17} /></button></div></aside></div>
}

function CartDrawer({ cart, onClose, onRemove, onUpdateQuantity }: { cart: CartItem[]; onClose: () => void; onRemove: (id: number) => void; onUpdateQuantity: (id: number, change: number) => void }) {
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  return <div className="overlay" onClick={onClose}><aside className="cart-panel" onClick={(event) => event.stopPropagation()}><div className="panel-heading"><div><span className="eyebrow">Your selection</span><h2>Shopping cart <span>({itemCount})</span></h2></div><button className="close-button" onClick={onClose}><X size={19} /></button></div><div className="cart-items">{cart.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>{product.category}</small><b>${product.price * product.quantity}.00</b><div className="quantity-control"><button onClick={() => onUpdateQuantity(product.id, -1)}>-</button><span>{product.quantity}</span><button onClick={() => onUpdateQuantity(product.id, 1)}>+</button></div></div><button onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`}><X size={15} /></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${total}.00</strong></div><div><span>Shipping</span><span className="free">Free</span></div><hr /><div className="total-row"><strong>Total</strong><strong>${total}.00</strong></div><button className="primary-button wide">Proceed to checkout <ChevronRight size={17} /></button></div></aside></div>
}

function CustomersPage({ customers }: { customers: Customer[] }) {
  return <section className="customers-page"><div className="customer-summary"><StatCard label="Total customers" value="8,492" change="+11.6%" icon="customers" /><StatCard label="Returning customers" value="64.8%" change="+4.2%" icon="orders" /><StatCard label="Average lifetime value" value="$284.60" change="+9.1%" icon="revenue" /></div><div className="section-header"><div><h2>Customer directory</h2><p>Understand your most valuable customer relationships.</p></div><button className="primary-button"><Plus size={17} /> Add customer</button></div><div className="orders-table customer-table"><div className="table-head"><span>Customer</span><span>Email</span><span>Orders</span><span>Total spent</span><span>Joined</span><span /></div>{customers.map((customer) => <div className="table-row" key={customer.email}><div className="customer-cell"><div className="avatar">{customer.initials}</div><strong>{customer.name}</strong></div><span className="muted">{customer.email}</span><strong>{customer.orders}</strong><strong>{customer.spent}</strong><span className="muted">{customer.joined}</span><button className="more-button"><MoreHorizontal size={18} /></button></div>)}</div></section>
}

export default App



