import { Link } from "react-router-dom";

export default function NotificacaoCard({
  id,
  titulo,
  descricao,
  dataAudiencia,
  notificado,
  status,
}: any) {
  return (
    <div className="bg-[#1b263b] rounded-xl p-6 shadow-md mb-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-[#a9d6e5]">
        <Link to={`/notificacao/${id}`}>{titulo}</Link>
      </h2>
      <p className="mt-2 text-sm">{descricao}</p>
      <p className="mt-1 text-sm">{dataAudiencia}</p>
      <p className="mt-1 text-sm">{notificado || "-"}</p>
      <span
        className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          status === "EM_ANDAMENTO"
            ? "bg-yellow-500 text-black"
            : status === "VALIDACAO"
            ? "bg-blue-500 text-white"
            : "bg-green-600 text-white"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
