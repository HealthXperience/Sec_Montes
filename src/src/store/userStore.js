import { create } from 'zustand'

export const useUserStore = create((set) => ({
  usuario: null,
  setUsuario: (usuario) => set({ usuario }),
  
  datos: {
    peso: null,
    altura: null,
    imc: null,
    lanzamiento: null,
    saltoCuerda: null,
    atletismo100m: null,
    recomendaciones: {}
  },
  
  setDatos: (nuevosDatos) => set((state) => ({
    datos: { ...state.datos, ...nuevosDatos }
  })),
  
  resetDatos: () => set({
    datos: {
      peso: null,
      altura: null,
      imc: null,
      lanzamiento: null,
      saltoCuerda: null,
      atletismo100m: null,
      recomendaciones: {}
    }
  })
}))
