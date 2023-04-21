export async function bigmap(img: RequestInfo | URL) {
  const res = await fetch(img);
  const imgBlob = await res.blob();
  const bigmap = await createImageBitmap(imgBlob);
  return bigmap;
}
