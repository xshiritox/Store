import type { Product } from '../types'
import { useProducts } from '../stores/products'

// Fallback products for when database is empty or loading
export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Cámara Profesional",
    price: 899,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Cámara digital profesional con sensor full-frame y capacidades de video 4K.",
    category: "Electrónicos",
    inStock: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "Auriculares Inalámbricos",
    price: 199,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Auriculares premium con cancelación de ruido activa y 30 horas de batería.",
    category: "Audio",
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Smartwatch Deportivo",
    price: 299,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Reloj inteligente con GPS, monitor cardíaco y resistencia al agua.",
    category: "Deportes",
    inStock: true,
    rating: 4.5,
    reviews: 203
  },
  {
    id: 4,
    name: "Laptop Ultrabook",
    price: 1299,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500",
    description: "Laptop ultradelgada con procesador de última generación y 16GB RAM.",
    category: "Computadoras",
    inStock: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 5,
    name: "Teléfono Premium",
    price: 799,
    image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Smartphone con cámara triple, pantalla OLED y carga rápida inalámbrica.",
    category: "Móviles",
    inStock: true,
    rating: 4.7,
    reviews: 312
  },
  {
    id: 6,
    name: "Tablet Profesional",
    price: 649,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Tablet con stylus incluido, perfecta para diseño y productividad.",
    category: "Tablets",
    inStock: true,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 7,
    name: "Parlante Bluetooth",
    price: 149,
    image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Parlante portátil con sonido 360° y resistencia al agua IPX7.",
    category: "Audio",
    inStock: false,
    rating: 4.3,
    reviews: 94
  },
  {
    id: 8,
    name: "Monitor Gaming",
    price: 399,
    image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=500",
    description: "Monitor curvo de 27\" con tasa de refresco de 144Hz y tecnología HDR.",
    category: "Gaming",
    inStock: true,
    rating: 4.6,
    reviews: 145
  }
]
