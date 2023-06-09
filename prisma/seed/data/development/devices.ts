export const seedDevices = async ({prisma, terminal}) => {

  // Create device categories
  const phoneCategory = await prisma.category.create({
    data: {
      name: 'Phone',
      isActive: true,
    },
  })

  const tabletCategory = await prisma.category.create({
    data: {
      name: 'Tablet',
      isActive: true,
    },
  })

  const computerCategory = await prisma.category.create({
    data: {
      name: 'Computer',
      isActive: true,
    },
  })

  // Create device brands
  const appleBrand = await prisma.brand.create({
    data: {
      name: 'Apple',
      isActive: true,
    },
  })

  const samsungBrand = await prisma.brand.create({
    data: {
      name: 'Samsung',
      isActive: true,
    },
  })

  const microsoftBrand = await prisma.brand.create({
    data: {
      name: 'Microsoft',
      isActive: true,
    },
  })

  // Create devices
  const iphone13 = await prisma.device.create({
    data: {
      name: 'iPhone 13',
      description: 'Latest iPhone model',
      category: {
        connect: {
          id: phoneCategory.id,
        },
      },
      brand: {
        connect: {
          id: appleBrand.id,
        },
      },
      quantity: 10,
      price: 999,
      isActive: true,
    },
  })

  const iphone14 = await prisma.device.create({
    data: {
      name: 'iPhone 14',
      description: 'Latest powerful iPhone model',
      category: {
        connect: {
          id: phoneCategory.id,
        },
      },
      brand: {
        connect: {
          id: appleBrand.id,
        },
      },
      quantity: 10,
      price: 1999,
      isActive: true,
    },
  })

  const macbookPro13 = await prisma.device.create({
    data: {
      name: 'MacBook Pro 13',
      description: 'Powerful laptop for professionals',
      category: {
        connect: {
          id: computerCategory.id,
        },
      },
      brand: {
        connect: {
          id: appleBrand.id,
        },
      },
      quantity: 5,
      price: 1999,
      isActive: true,
    },
  })

  const macbookPro14 = await prisma.device.create({
    data: {
      name: 'MacBook Pro 14',
      description: 'Powerful laptop for developers',
      category: {
        connect: {
          id: computerCategory.id,
        },
      },
      brand: {
        connect: {
          id: appleBrand.id,
        },
      },
      quantity: 5,
      price: 2999,
      isActive: true,
    },
  })

  const surfacePro = await prisma.device.create({
    data: {
      name: 'Surface Pro',
      description: 'Powerful laptop for windows lover',
      category: {
        connect: {
          id: computerCategory.id,
        },
      },
      brand: {
        connect: {
          id: microsoftBrand.id,
        },
      },
      quantity: 4,
      price: 1499,
      isActive: true,
    },
  })

  const galaxy = await prisma.device.create({
    data: {
      name: 'Galaxy S21',
      description: 'Latest Samsung phone',
      category: {
        connect: {
          id: phoneCategory.id,
        },
      },
      brand: {
        connect: {
          id: samsungBrand.id,
        },
      },
      quantity: 8,
      price: 799,
      isActive: true,
    },
  })

  const iPadPro = await prisma.device.create({
    data: {
      name: 'iPad Pro',
      description: 'Powerful iPad pro for surfing',
      category: {
        connect: {
          id: tabletCategory.id,
        },
      },
      brand: {
        connect: {
          id: appleBrand.id,
        },
      },
      quantity: 5,
      price: 2999,
      isActive: true,
    },
  })

  const note = await prisma.device.create({
    data: {
      name: 'Notebook',
      description: 'Powerful notebook for gaming',
      category: {
        connect: {
          id: tabletCategory.id,
        },
      },
      brand: {
        connect: {
          id: microsoftBrand.id,
        },
      },
      quantity: 2,
      price: 1999,
      isActive: true,
    },
  })

  terminal.green(`Created devices`)
}
