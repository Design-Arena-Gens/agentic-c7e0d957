'use client'

import { useState } from 'react'
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

const categories = [
  { name: 'Electronics', icon: '💻' },
  { name: 'Accessories', icon: '🎁' },
  { name: 'Audio', icon: '🎵' },
  { name: 'Wearables', icon: '⌚' },
]

export default function Home() {
  const [cart, setCart] = useState<{[key: number]: number}>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const addToCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart))
      }
      return newCart
    })
  }

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <div className="logo">ModernShop</div>
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

      <main>
        <section className="hero">
          <div className="container">
            <h1>Shop the Latest Products</h1>
            <p>Discover amazing deals on premium tech and accessories</p>
            <button className="hero-cta">Shop Now</button>
          </div>
        </section>

        <section className="categories">
          <div className="container">
            <h2 className="section-title">Shop by Category</h2>
            <div className="categories-grid">
              {categories.map(category => (
                <div key={category.name} className="category-card">
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-name">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="products-section">
          <div className="container">
            <h2 className="section-title">Featured Products</h2>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.icon}</div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <div className="product-price">${product.price}</div>
                      <button
                        className="add-to-cart"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
