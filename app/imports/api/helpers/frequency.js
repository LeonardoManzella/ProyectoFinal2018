const weekOptions = [
  {
    value: 'monday',
    name: 'Lunes'
  },
  {
    value: 'tuesday',
    name: 'Martes'
  },
  {
    value: 'wednesday',
    name: 'Miércoles'
  },
  {
    value: 'thursday',
    name: 'Jueves'
  },
  {
    value: 'friday',
    name: 'Viernes'
  },
  {
    value: 'saturday',
    name: 'Sabado'
  },
  {
    value: 'sunday',
    name: 'Domingo'
  }
];

const monthWeekOptions = [
  {
    value: 'first',
    name: 'Primer'
  },
  {
    value: 'second',
    name: 'Segundo'
  },
  {
    value: 'third',
    name: 'Tercer'
  },
  {
    value: 'fourth',
    name: 'Cuarto'
  }
];

const monthOptions = [
  {
    value: 'january',
    name: 'Enero'
  },
  {
    value: 'february',
    name: 'Febrero'
  },
  {
    value: 'march',
    name: 'Marzo'
  },
  {
    value: 'april',
    name: 'Abril'
  },
  {
    value: 'may',
    name: 'Mayo'
  },
  {
    value: 'june',
    name: 'Junio'
  },
  {
    value: 'july',
    name: 'Julio'
  },
  {
    value: 'august',
    name: 'Agosto'
  },
  {
    value: 'september',
    name: 'Septiembre'
  },
  {
    value: 'october',
    name: 'Octubre'
  },
  {
    value: 'november',
    name: 'Noviembre'
  },
  {
    value: 'december',
    name: 'Diciembre'
  }
];

export const frequencyTime = [
  {
    value: 'daily',
    name: 'Diariamente',
    types: [
      {
        value: 'dayAmount',
        name: 'Cantidad de días',
        type: 'input'
      }
    ]
  },
  {
    value: 'weekly',
    name: 'Semanalmente',
    types: [
      {
        value: 'weekAmount',
        name: 'Cantidad de semanas',
        type: 'input'
      },
      {
        value: 'weekDay',
        name: 'Día de cada semana',
        type: 'select',
        options: weekOptions
      }
    ]  
  },
  {
    value: 'monthly',
    name: 'Mensualmente',
    types: [
      {
        value: 'monthAmount',
        name: 'Cantidad de meses',
        type: 'input'
      },
      {
        value: 'monthDay',
        name: 'Día de cada mes',
        type: 'input'
      },
      {
        value: 'monthWeekDay',
        name: 'Día de semana cada mes',
        type: 'select',
        options: monthWeekOptions,
        secondType: 'select',
        secondOptions: weekOptions
      }
    ]
  },
  {
    value: 'yearly',
    name: 'Anualmente',
    types: [
      {
        value: 'yearAmount',
        name: 'Cantidad de años',
        type: 'input'
      },
      {
        value: 'yearDay',
        name: 'Día de cada año',
        type: 'input',
        secondType: 'select',
        secondOptions: monthOptions
      }
    ]
  }
];

