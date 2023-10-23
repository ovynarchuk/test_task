const API_URL = 'http://146.190.118.121/api/table/?&limit=10';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getTable() {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}