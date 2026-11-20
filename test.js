async function testAPI() {
  const url = 'http://localhost:3000/api/students';

  // 1. POST (New Student -> 201)
  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Mandeep', course: 'B.Tech', age: 19 })
  });
  console.log('1. POST:', res.status, await res.json());

  // 2. GET All (-> 200)
  res = await fetch(url);
  console.log('2. GET ALL:', res.status, await res.json());

  // 3. GET Filter (?course=B.Tech -> 200)
  res = await fetch(url + '?course=B.Tech');
  console.log('3. FILTER:', res.status, await res.json());

  // 4. GET by ID (/1 -> 200)
  res = await fetch(url + '/1');
  console.log('4. GET ID:', res.status, await res.json());

  // 5. PUT Update (/1 -> 200)
  res = await fetch(url + '/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Mandeep', course: 'B.Tech', age: 20 })
  });
  console.log('5. PUT:', res.status, await res.json());

  // 6. DELETE (/1 -> 200)
  res = await fetch(url + '/1', { method: 'DELETE' });
  console.log('6. DELETE:', res.status, await res.json());
}

testAPI();