const BASE_URL = `https://technical-task-api.icapgroupgmbh.com/api`;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function request<T>(
  url: string,
  method: string,
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + '/table' + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

const client = {
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
};

export async function getTable(itemOffset: number) {
  const data = await fetch(`${BASE_URL}/table${itemOffset ? `/?offset=${itemOffset * 1}` : ''}`);

  return data.json();
}

export async function checkLogin(body: { username: string, password: string }) {
  try {
    const data = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    });

    if (!data.ok) {
      throw new Error('Invalid credentials.');
    }

    return data.json();
  }
  catch (error) {
    throw new Error('Invalid credentials.');
  }
}

export function updatePerson(
  personId: number,
  data: {
    name: string,
    email: string,
    birthday_date: string,
    phone_number: string,
    address: string
  },
) {
  data.birthday_date = '20' + data.birthday_date.trim();
  return client.put(`/${personId}/`, data);
}