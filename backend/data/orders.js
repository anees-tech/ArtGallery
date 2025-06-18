export default [
  {
    orderItems: [
      { price: 1200 },
      { price: 950 }
    ],
    shippingAddress: {
      address: '123 Main St',
      city: 'Boston',
      postalCode: '02115',
      country: 'USA'
    },
    paymentMethod: 'creditCard',
    totalPrice: 2150,
    isPaid: true,
    paidAt: new Date('2023-09-15'),
    isDelivered: true,
    deliveredAt: new Date('2023-09-20')
  },
  {
    orderItems: [
      { price: 1450 }
    ],
    shippingAddress: {
      address: '456 Park Ave',
      city: 'New York',
      postalCode: '10022',
      country: 'USA'
    },
    paymentMethod: 'paypal',
    totalPrice: 1450,
    isPaid: true,
    paidAt: new Date('2023-10-05'),
    isDelivered: false
  },
  {
    orderItems: [
      { price: 1100 },
      { price: 850 },
      { price: 1650 }
    ],
    shippingAddress: {
      address: '789 Lake St',
      city: 'Chicago',
      postalCode: '60601',
      country: 'USA'
    },
    paymentMethod: 'bankTransfer',
    totalPrice: 3600,
    isPaid: false,
    isDelivered: false
  }
]