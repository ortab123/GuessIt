const API_DOGS = "https://api.thedogapi.com/v1"
const API_CATS = "https://api.thecatapi.com/v1"
const KEY = import.meta.env.VITE_DOG_API_KEY ?? ""
const headers = KEY ? { "x-api-key": KEY } : {}

const apiMap = {
  dogs: API_DOGS,
  cats: API_CATS,
}

export async function getBreeds(mode, limit = 100, page = 0) {
  const API = apiMap[mode]

  const res = await fetch(`${API}/breeds?limit=${limit}&page=${page}`, { headers })
  if (!res.ok) throw new Error("Failed to load breeds")
  return res.json()
}

export async function getImageForBreed(breedId, mode) {
  const API = apiMap[mode]
  const res = await fetch(`${API}/images/search?breed_ids=${breedId}&limit=1`, { headers })
  if (!res.ok) throw new Error("Failed to load image")
  const arr = await res.json()
  return arr[0]
}
