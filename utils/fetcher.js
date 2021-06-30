const fetcher = async (url) => {
  const res = await fetch(url, {
    method: 'GET'
  });

  return res.json();
};

export default fetcher;
