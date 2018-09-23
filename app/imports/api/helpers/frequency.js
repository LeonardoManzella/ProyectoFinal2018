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

const monthOptions = [
  {
    value: '1',
    name: 'Enero'
  },
  {
    value: '2',
    name: 'Febrero'
  },
  {
    value: '3',
    name: 'Marzo'
  },
  {
    value: '4',
    name: 'Abril'
  },
  {
    value: '5',
    name: 'Mayo'
  },
  {
    value: '6',
    name: 'Junio'
  },
  {
    value: '7',
    name: 'Julio'
  },
  {
    value: '8',
    name: 'Agosto'
  },
  {
    value: '9',
    name: 'Septiembre'
  },
  {
    value: '10',
    name: 'Octubre'
  },
  {
    value: '11',
    name: 'Noviembre'
  },
  {
    value: '12',
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

