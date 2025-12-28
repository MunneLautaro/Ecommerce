const today = new Date()
const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

export const initialMatrix = {
  matriz: [],
  width: 0,
  height: 0,
  startDate: null,
  endDate: null,
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  currentMonthLastDay: currentMonthEnd,
  currentMonthStartDate: currentMonthStart,
}

export const matrizReducer = (state, action) => {
  switch (action.type) {
    case "MATRIX_INIT": {
      const { width, height } = action.payload

      const matriz = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => false)
      )

      return {
        ...state,
        matriz,
        width,
        height,
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

    case "SET_CURRENT_MONTH_DATES": {
      return {
        ...state,
        currentMonthLastDay: action.payload.currentMonthLastDay,
        currentMonthStartDate: action.payload.currentMonthStartDate,
      }
    }

    case "RESET_DATES": {
      return {
        ...state,
        startDate: null,
        endDate: null,
      }
    }
    default:
      return state
  }
}
