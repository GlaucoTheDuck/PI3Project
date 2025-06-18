// src/api/pin.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000', // Use localhost em vez de 0.0.0.0
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logging de erros (opcional, para debug)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    return Promise.reject(error);
  }
);

// Buscar pins
export async function getPins() {
  try {
    const response = await api.get('/pin/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pins:', error);
    throw error;
  }
}

// Criar novo pin
// Função para enviar imagem com pin
export async function createPin(imageUri, pinData) {
  try {
    const formData = new FormData();
    
    // Adiciona a imagem
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // ou detectar automaticamente
      name: 'pin-image.jpg',
    });
    
    // Adiciona dados do pin
    formData.append('lati', pinData.lati.toString());
    formData.append('long', pinData.long.toString());
    formData.append('date', pinData.date);
    
    // Cria uma nova instância do axios sem o Content-Type fixo
    const response = await api.post('/pin/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pin com imagem:', error);
    throw error;
  }
}

// Função alternativa: apenas upload de imagem
export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.name || 'image.jpg',
    });

    const response = await api.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}