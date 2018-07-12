/**
 *  Simple in-memory database
 */
const cars = [
  {
    model: 'Fiesta',
    year: 2010,
    maker: 'Ford',
  },
  {
    model: 'Uno',
    year: 1972,
    maker: 'Fiat',
  },
  {
    model: 'Corsa',
    year: 2010,
    maker: 'Chevrolet',
  },
]

/**
 * You shoud write your GraphQL resolvers in here.
 * Resolvers are just usual node functions, so here you can make
 * API calls, connect to the database and transform the data in
 * any way you wish. You can learn more about resolvers and its arguments
 * here: https://www.apollographql.com/docs/graphql-tools/resolvers.html
 */
export const resolvers = {
  Mutation: {
    addCar: (_, args, ctx) => {
      console.log('[addCar] Received vtex context:', ctx.vtex)
      console.log('[addCar] Received arguments:', args)
      return cars[0]
    },
  },
  Query: {
    allCars: (_, args, ctx) => {
      console.log('[allCars] Received vtex context:', ctx.vtex)
      console.log('[allCars] Received arguments:', args)
      return cars
    },

    carsByYear: (_, args, ctx) => {
      console.log('[carsByYear] Received vtex context:', ctx.vtex)
      console.log('[carsByYear] Received arguments:', args)
      return cars.filter(car => car.year == args.year)
    },
  },
}
