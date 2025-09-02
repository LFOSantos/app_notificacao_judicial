import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationAPI } from '../../api'

export function NotificationList(){
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    NotificationAPI.list().then(setItems).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {!loading && (
        <table width="100%" cellPadding={8}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data da Audiência</th>
              <th>Notificado</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(n => (
              <tr key={n.id}>
                <td><Link to={`/notification/${n.id}`}>{n.titulo}</Link></td>
                <td>{n.descricao}</td>
                <td>{new Date(n.dataAudiencia).toLocaleDateString()}</td>
                <td>{n.nome || '-'}</td>
                <td>{n.status}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5}>Nenhuma notificação cadastrada.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
