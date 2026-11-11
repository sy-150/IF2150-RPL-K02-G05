// Membuka halaman Log In/Sign Up. Kalau halamannya sudah ada di stack, halaman itu
// dipindahkan ke paling atas (isian form tetap ada), bukan ditambah lagi.
export function bukaHalamanAuth(navigation, router, namaRoute, href) {
  const state = navigation.getState();
  const sudahAda = state.routes.find((r) => r.name === namaRoute);
  
  if (!sudahAda) {
    router.push(href);
    return;
  }
  
  const routes = [...state.routes.filter((r) => r.key !== sudahAda.key), sudahAda];
  navigation.dispatch({ type: "RESET", payload: { ...state, routes, index: routes.length - 1 } });
}