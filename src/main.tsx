import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import App from './App'
import './styles/globals.css'
import './styles/quantum.css'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

// Initialize TensorFlow.js
const initTensorFlow = async () => {
  try {
    await tf.ready()
    console.log('🤖 TensorFlow.js initialized successfully')
  } catch (error) {
    console.error('❌ TensorFlow.js initialization failed:', error)
  }
}

// Initialize Telegram WebApp
const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.setHeaderColor('#000000')
    window.Telegram.WebApp.setBackgroundColor('#000000')
    console.log('🤖 Telegram WebApp initialized')
  }
}

// Hide loader and show app
const hideLoader = () => {
  const loader = document.getElementById('quantumLoader')
  if (loader) {
    loader.style.opacity = '0'
    loader.style.transition = 'opacity 0.5s ease-out'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }
}

// Initialize everything
const initializeApp = async () => {
  await Promise.all([
    initTensorFlow(),
    initTelegramWebApp(),
  ])
  
  hideLoader()
  
  // Initialize services
  const { initQuantumCore } = await import('./services/quantumCore')
  const { initNeuralInterface } = await import('./services/neuralInterface')
  const { initMetaverse } = await import('./services/metaverse')
  
  await Promise.all([
    initQuantumCore(),
    initNeuralInterface(),
    initMetaverse(),
  ])
  
  console.log('🚀 NEXUS QUANTUM APEX - All systems initialized!')
}

// Render app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          closeButton
        />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

// Initialize app
initializeApp().catch(console.error)
