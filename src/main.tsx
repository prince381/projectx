import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UserContextProvider from './context/userContext.tsx'
import './index.css'
import './all.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
)
