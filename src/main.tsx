import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { conteudo } from './conteudo.ts'

// Cores do tema, definidas em conteudo.ts. O resto da paleta sai delas em index.css.
const { cores } = conteudo
const raiz = document.documentElement.style
raiz.setProperty('--escuro', cores.escuro)
raiz.setProperty('--destaque', cores.destaque)
raiz.setProperty('--fundo', cores.fundo)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
