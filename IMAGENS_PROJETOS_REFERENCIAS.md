# Estrutura de Imagens dos Projetos - Referência Importante

## ⚠️ SEPARAÇÃO CRÍTICA DE IMAGENS

Cada projeto possui **DOIS conjuntos de imagens completamente independentes e separados**:

### 1. **categoryImage** (Imagens dos 3 Cards de Escolha)
- São as imagens que aparecem nos 3 cards (Projeto Arquitetônico, Interiores, Obra)
- Aparecem quando você entra em cada projeto no modal
- Podem ser modificadas SEM afetar a galeria

### 2. **gallery** (Imagens da Galeria Completa)
- São as 4 imagens que aparecem na galeria da página de detalhe
- Aparecem DEPOIS de selecionar uma categoria
- São completamente diferentes de categoryImage

---

## Padrão de Atribuição (Todos os 13 Projetos)

| Projeto | categoryImage (Cards) | gallery (Galeria) |
|---------|----------------------|-------------------|
| Edson House | Img-Edson2, Img-Edson4, Img-Edson5 | Imagem 4, 5, 6, 7 |
| Espaço Elegante | Imagem 2, 3, 4 | Imagem 8, 9, 10, 1 |
| Casa Contemporânea | Imagem 3, 4, 5 | Imagem 6, 7, 8, 9 |
| Luxo Refinado | Imagem 4, 5, 6 | Imagem 5, 6, 7, 8 |
| Espaços Mínimos | Imagem 5, 6, 7 | Imagem 8, 9, 10, 1 |
| Harmonia com Natureza | Imagem 6, 7, 8 | Imagem 2, 3, 4, 5 |
| Jardim Urbano | Imagem 7, 8, 9 | Imagem 3, 4, 5, 6 |
| Villa Litorânea | Imagem 8, 9, 10 | Imagem 4, 5, 6, 7 |
| Retiro na Floresta | Imagem 9, 10, 1 | Imagem 5, 6, 7, 8 |
| Loft Urbano | Imagem 10, 1, 2 | Imagem 6, 7, 8, 9 |
| Cubo Minimalista | Imagem 1, 2, 3 | Imagem 7, 8, 9, 10 |
| Casa de Vidro | Imagem 2, 3, 4 | Imagem 8, 9, 10, 1 |
| Refúgio de Pedra | Imagem 3, 4, 5 | Imagem 9, 10, 1, 2 |

---

## 💡 Como Funciona

1. **Quando você modifica categoryImage** → Muda apenas os 3 cards de escolha
2. **Quando você modifica gallery** → Muda apenas as imagens da galeria completa
3. **As duas alterações são INDEPENDENTES** ✓

---

## 📝 Exemplo Prático

Para o projeto "Edson House":
```javascript
// IMAGENS DOS 3 CARDS (categoryImage)
architecture: {..., categoryImage: 'img/Projetos/edson/Img-Edson2.webp' }
interiors: {..., categoryImage: 'img/Projetos/edson/Img-Edson4.webp' }
construction: {..., categoryImage: 'img/Projetos/edson/Img-Edson5.webp' }

// IMAGENS DA GALERIA (gallery) - COMPLETAMENTE DIFERENTES
gallery: [
  'img/Projetos/Imagem 4.jpeg',
  'img/Projetos/Imagem 5.jpeg',
  'img/Projetos/Imagem 6.jpeg',
  'img/Projetos/Imagem 7.jpeg'
]
```

Se você adicionar imagens de maquete em `categoryImage`, as imagens em `gallery` permanecerão as mesmas! ✓
