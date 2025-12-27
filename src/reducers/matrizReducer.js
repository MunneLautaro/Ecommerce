export const initialMatrix = {
  matriz: [],
  ancho: 0,
  alto: 0,

  startDate: null,
  endDate: null,
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
}

export const matrizReducer = (state, action) => {
  switch (action.type) {
    case "MATRIX_INIT": {
      const { ancho, alto } = action.payload

      const matriz = Array.from({ length: alto }, () =>
        Array.from({ length: ancho }, () => false)
      )

      return {
        ...state,
        matriz,
        ancho,
        alto,
        startDate: null,
        endDate: null,
      }
    }

    case "SELECT_DATE": {
      const date = action.payload.date

      if (!state.startDate || !state.endDate) {
        return {
          ...state,
          startDate: date,
          endDate: date,
        }
      }

      if (date >= state.startDate && date <= state.endDate) {
        return {
          ...state,
          startDate: null,
          endDate: null,
        }
      }

      if (date < state.startDate) {
        return {
          ...state,
          startDate: date,
        }
      }

      if (date > state.endDate) {
        return {
          ...state,
          endDate: date,
        }
      }

      return state
    }

    case "DRAG_DATE": {
      const { date, dragging } = action.payload

      if (!state.startDate || !state.endDate) return state

      if (dragging === "start") {
        if (date > state.endDate) {
          return {
            ...state,
            startDate: state.endDate,
            endDate: date,
          }
        }

        return {
          ...state,
          startDate: date,
        }
      }

      if (dragging === "end") {
        if (date < state.startDate) {
          return {
            ...state,
            startDate: date,
            endDate: state.startDate,
          }
        }

        return {
          ...state,
          endDate: date,
        }
      }

      return state
    }

    case "SET_MONTH_YEAR": {
      return {
        ...state,
        [action.payload.attribute]: action.payload.value,
      }
    }

    default:
      return state
  }
}
