import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

const loadingPlaceholderText = "Carregando...";

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 30000,
  });

  return (
    <>
      <h1>Status</h1>
      <GetLastUpdate isLoading={isLoading} data={data} />
      <GetDatabaseStatus isLoading={isLoading} data={data} />
    </>
  );
}

function GetLastUpdate({ isLoading, data }) {
  let updatedAt = loadingPlaceholderText;

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return `Última atualização: ${updatedAt}`;
}

function GetDatabaseStatus({ isLoading, data }) {
  let version = loadingPlaceholderText;
  let maxConnections = loadingPlaceholderText;
  let openedConnections = loadingPlaceholderText;

  if (!isLoading && data) {
    version = data.dependencies.database.version;
    maxConnections = data.dependencies.database.max_connections;
    openedConnections = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <p>Versão da base de dados: {version}</p>
      <p>Máximo de conexões disponíveis: {maxConnections}</p>
      <p>Conexões abertas simultaneamente: {openedConnections}</p>
    </div>
  );
}
