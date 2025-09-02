import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NotificationAPI } from '../../api'

type Form = { titulo:string; descricao:string; dataAudiencia:string }

export function CreateNotification(){
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<Form>()
  const navigate = useNavigate()

  const onSubmit = async (data: Form) => {
    await NotificationAPI.create(data)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid', gap:12}}>
      <h3 style={{margin:'8px 0'}}>Criar Notificação</h3>
      <div>
        <label>Título</label><br/>
        <input {...register('titulo', { required:'Informe o título' })} />
        {errors.titulo && <div style={{color:'crimson'}}>{errors.titulo.message}</div>}
      </div>
      <div>
        <label>Descrição</label><br/>
        <textarea {...register('descricao', { required:'Informe a descrição' })} />
        {errors.descricao && <div style={{color:'crimson'}}>{errors.descricao.message}</div>}
      </div>
      <div>
        <label>Data da Audiência</label><br/>
        <input type="date" {...register('dataAudiencia', { required:'Informe a data' })} />
        {errors.dataAudiencia && <div style={{color:'crimson'}}>{errors.dataAudiencia.message}</div>}
      </div>
      <div style={{display:'flex', gap:8}}>
        <button disabled={isSubmitting} type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </div>
      <button
        type="button"
        className="small-back-btn"
        style={{ marginTop: 24 }}
        onClick={() => navigate('/')}
      >
        Voltar para página inicial
      </button>
    </form>
    
  )
}
