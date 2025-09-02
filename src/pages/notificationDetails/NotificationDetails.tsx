import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { NotificationAPI } from '../../api'

export function NotificationDetails(){
  const { id } = useParams()
  const [notif, setNotif] = useState<any>(null)
  const navigate = useNavigate()

  const form = useForm({ defaultValues: { nome:'', email:'', telefone:'', endereco:'' } })
  const { register, handleSubmit, reset, formState:{ errors, isSubmitting } } = form

  useEffect(() => {
    if (!id) return
    NotificationAPI.get(id).then(n => { setNotif(n); reset(n) })
  }, [id])

  const onSubmitNotificado = async (data: any) => {
    await NotificationAPI.updateNotificado(id!, data)
    const updated = await NotificationAPI.get(id!)
    setNotif(updated)
    reset(updated)
  }

  const validar = async (necessitaInfo: boolean) => {
    await NotificationAPI.validar(id!, necessitaInfo)
    const updated = await NotificationAPI.get(id!)
    setNotif(updated)
    reset(updated)
  }

  if (!notif) return <p>Carregando...</p>

  return (
    <div style={{display:'grid', gap:16}}>
      <h3 style={{margin:0}}>{notif.titulo}</h3>
      <div><b>Descrição:</b> {notif.descricao}</div>
      <div><b>Data:</b> {new Date(notif.dataAudiencia).toLocaleDateString()}</div>
      <div><b>Status:</b> {notif.status}</div>

      {notif.status === 'EM ANDAMENTO' && (
        <form onSubmit={handleSubmit(onSubmitNotificado)} style={{display:'grid', gap:12}}>
          <h4>Preencher Notificado(a)</h4>
          <div>
            <label>Nome</label><br/>
            <input {...register('nome', { required:'Informe o nome' })} />
            {errors.nome && <div style={{color:'crimson'}}>{errors.nome.message as any}</div>}
          </div>
          <div>
            <label>Email</label><br/>
            <input {...register('email', { required:'Informe o email' })} />
            {errors.email && <div style={{color:'crimson'}}>{errors.email.message as any}</div>}
          </div>
          <div>
            <label>Telefone</label><br/>
            <input {...register('telefone', { required:'Informe o telefone' })} />
            {errors.telefone && <div style={{color:'crimson'}}>{errors.telefone.message as any}</div>}
          </div>
          <div>
            <label>Endereço</label><br/>
            <textarea {...register('endereco', { required:'Informe o endereço' })} />
            {errors.endereco && <div style={{color:'crimson'}}>{errors.endereco.message as any}</div>}
          </div>
          <button  className="small-save-btn" disabled={isSubmitting} type='submit'>Salvar e Enviar para Validação</button>
        </form>
      )}

      {notif.status === 'VALIDACAO' && (
        <div style={{display:'grid', gap:8}}>
          <h4>Validar Informações</h4>
          <div><b>Nome:</b> {notif.nome}</div>
          <div><b>Email:</b> {notif.email}</div>
          <div><b>Telefone:</b> {notif.telefone}</div>
          <div><b>Endereço:</b> {notif.endereco}</div>
          <div style={{display:'flex', gap:8}}>
            <button className="small-need-btn" onClick={() => validar(true)}>Necessita Informações (voltar)</button>
            <button className="small-check-btn" onClick={() => validar(false)}>Concluir</button>
          </div>
        </div>
      )}

      {notif.status === 'CONCLUIDO' && (
        <div>Notificação concluída.</div>
      )}

    <div style={{display:'grid', gap:16}}>
      {/* ...existing code... */}
      <button
        type="button"
        className="small-back-btn"
        style={{ marginTop: 24 }}
        onClick={() => navigate('/')}
      >
        Voltar para página inicial
      </button>
    </div>
    </div>
  )
}
