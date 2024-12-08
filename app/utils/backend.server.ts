let database: any = {};

export async function fetchBackend(endpoint: string) {
  if (endpoint === "get-config" || endpoint === "get-user-config") {
    return database;
  }
  return null;
}

export async function saveToBackend(config: any) {
  database = JSON.parse(config);
}
