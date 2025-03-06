import { createRoot } from 'react-dom/client'
import './app.css'
import './styles/template1.css'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster richColors toastOptions={{ duration: 2000 }} position='bottom-right' />
    </BrowserRouter>
  </Provider>
)