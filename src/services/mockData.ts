export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
  image: string
  accent: string
}

export type CartItem = Product & { quantity: number }

export type Order = {
  id: string
  customer: string
  date: string
  amount: string
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled'
  initials: string
}

export type Customer = {
  name: string
  email: string
  orders: number
  spent: string
  joined: string
  initials: string
}

export const products: Product[] = [
  { id: 1, name: 'Aura Desk Lamp', category: 'Workspace', price: 89, stock: 24, rating: 4.9, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80', accent: '#e8eef5' },
  { id: 2, name: 'Terra Ceramic Set', category: 'Home', price: 64, stock: 18, rating: 4.8, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80', accent: '#f1e7df' },
  { id: 3, name: 'Cloud Knit Throw', category: 'Home', price: 128, stock: 9, rating: 4.7, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80', accent: '#e8e4ed' },
  { id: 4, name: 'Mono Carry Tote', category: 'Accessories', price: 76, stock: 31, rating: 4.6, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80', accent: '#e6ece9' },
  { id: 5, name: 'Arc Wireless Headphones', category: 'Tech', price: 189, stock: 12, rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', accent: '#e9e9e9' },
  { id: 6, name: 'Field Notes Journal', category: 'Workspace', price: 24, stock: 43, rating: 4.5, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=80', accent: '#f2eee5' },
]

export const orders: Order[] = [
  { id: '#CC-1048', customer: 'Olivia Martin', date: 'Today, 10:24 AM', amount: '$312.00', status: 'Delivered', initials: 'OM' },
  { id: '#CC-1047', customer: 'Liam Johnson', date: 'Today, 09:16 AM', amount: '$189.00', status: 'Processing', initials: 'LJ' },
  { id: '#CC-1046', customer: 'Noah Williams', date: 'Yesterday, 04:32 PM', amount: '$76.00', status: 'Shipped', initials: 'NW' },
  { id: '#CC-1045', customer: 'Emma Brown', date: 'Yesterday, 01:05 PM', amount: '$217.00', status: 'Delivered', initials: 'EB' },
  { id: '#CC-1044', customer: 'James Davis', date: 'Mar 18, 2024', amount: '$128.00', status: 'Cancelled', initials: 'JD' },
]

export const customers: Customer[] = [
  { name: 'Olivia Martin', email: 'olivia.martin@example.com', orders: 18, spent: '$2,840.00', joined: 'Jan 12, 2024', initials: 'OM' },
  { name: 'Liam Johnson', email: 'liam.johnson@example.com', orders: 12, spent: '$1,920.00', joined: 'Jan 18, 2024', initials: 'LJ' },
  { name: 'Noah Williams', email: 'noah.williams@example.com', orders: 9, spent: '$1,284.00', joined: 'Feb 04, 2024', initials: 'NW' },
  { name: 'Emma Brown', email: 'emma.brown@example.com', orders: 7, spent: '$946.00', joined: 'Feb 19, 2024', initials: 'EB' },
]
