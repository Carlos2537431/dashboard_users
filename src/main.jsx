import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Importa o componente App e o arquivo de estilos index.css
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)// Renderiza o componente App dentro do elemento com id 'root' usando StrictMode para ajudar a identificar problemas potenciais no código React.
