'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  description: string
  icon: string
}

const products: Product[] = [
  { id: 1, name: 'Premium Headphones', price: 299, description: 'High-quality wireless headphones with noise cancellation', icon: '🎧' },
  { id: 2, name: 'Smart Watch', price: 399, description: 'Track your fitness and stay connected on the go', icon: '⌚' },
  { id: 3, name: 'Laptop Backpack', price: 79, description: 'Durable and stylish backpack for your tech', icon: '🎒' },
  { id: 4, name: 'Wireless Mouse', price: 49, description: 'Ergonomic design with precision tracking', icon: '🖱️' },
  { id: 5, name: 'Mechanical Keyboard', price: 149, description: 'Premium typing experience with RGB lighting', icon: '⌨️' },
  { id: 6, name: 'USB-C Hub', price: 59, description: 'Expand your connectivity with multiple ports', icon: '🔌' },
  { id: 7, name: 'Phone Stand', price: 29, description: 'Adjustable stand for hands-free viewing', icon: '📱' },
  { id: 8, name: 'Desk Lamp', price: 89, description: 'LED lamp with adjustable brightness', icon: '💡' },
]

export default function CartPage() {
  const [cart, setCart] = useState<{[key: number]: number}>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('cart')
    if (saved) {
      setCart(JSON.parse(saved))
    }
  }, [])

  const updateCart = (newCart: {[key: number]: number}) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev => {
      const newQty = (prev[productId] || 0) + change
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev
        const newCart = rest
        localStorage.setItem('cart', JSON.stringify(newCart))
        return newCart
      }
      const newCart = { ...prev, [productId]: newQty }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const removeItem = (productId: number) => {
    setCart(prev => {
      const { [productId]: _, ...rest } = prev
      localStorage.setItem('cart', JSON.stringify(rest))
      return rest
    })
  }

  const cartItems = Object.entries(cart).map(([id, quantity]) => ({
    product: products.find(p => p.id === parseInt(id))!,
    quantity
  })).filter(item => item.product)

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  if (!mounted) {
    return null
  }

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">ModernShop</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
          </div>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/cart">
              <div className="cart-icon">
                🛒
                {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
              </div>
            </Link>
          </nav>
        </div>
      </header>

      <main className="cart-page">
        <div className="container">
          <h1 className="section-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p style={{ marginTop: '1rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
                Add some products to get started!
              </p>
              <Link href="/">
                <button className="hero-cta">Continue Shopping</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="cart-item">
                    <div className="cart-item-image">{product.icon}</div>
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{product.name}</h3>
                      <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                        {product.description}
                      </p>
                      <div className="cart-item-price">${product.price}</div>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 600 }}>{quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Us</h3>
              <ul>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Customer Service</h3>
              <ul>
                <li>Contact Us</li>
                <li>Shipping Info</li>
                <li>Returns</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <ul>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Legal</h3>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © 2024 ModernShop. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
