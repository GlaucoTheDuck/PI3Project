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
export async function createPin(pinData) {
  try {
    const formData = new FormData();
    
    // Adiciona a imagem
    formData.append('file', {
      uri: pinData.imageUri,
      type: 'image/jpeg', // ou detectar automaticamente
      name: 'pin-image.jpg',
    });

    const dateOnly = new Date(pinData.date).toISOString().split('T')[0];

    // Adiciona dados do pin
    formData.append('title', pinData.title);
    formData.append('desc', pinData.description);
    formData.append('lati', pinData.location.latitude.toString());
    formData.append('long', pinData.location.longitude.toString());
    formData.append('date', dateOnly);
    formData.append('compassHeading', pinData.compassHeading);

    console.log('Dados sendo enviados:', {
      title: pinData.title,
      desc: pinData.description,
      lati: pinData.location.latitude,
      long: pinData.location.longitude,
      date: pinData.date,
      compassHeading: pinData.compassHeading,
      imageUri: pinData.imageUri ? 'presente' : 'ausente'
    });
    
    // Cria uma nova instância do axios sem o Content-Type fixo
    const response = await api.post('/pin/', formData, {
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
export async function uploadImage(id) {
  try {
    const formData = new FormData();
    formData.append('id', id);

    const response = await api.post('/pin/delete', formData, {
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