import axios from 'axios'
export const api = axios.create({ baseURL: 'http://localhost:3000' })

export const NotificationAPI = {
  list: () => api.get('/notifications').then(r => r.data),
  get: (id: string) => api.get(`/notifications/${id}`).then(r => r.data),
  create: (data: any) => api.post('/notifications', data).then(r => r.data),
  updateNotificado: (id: string, data: any) => api.patch(`/notifications/${id}/notificado`, data).then(r => r.data),
  validar: (id: string, necessitaInfo: boolean) => api.patch(`/notifications/${id}/validar`, { necessitaInfo }).then(r => r.data),
}
