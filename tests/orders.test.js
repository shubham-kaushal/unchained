import {
  setupDatabase,
  createAnonymousGraphqlFetch,
  createLoggedInGraphqlFetch,
} from "./helpers";
import { SimpleOrder } from "./seeds/orders";
import { USER_TOKEN, ADMIN_TOKEN } from "./seeds/users";
let connection;
let graphqlFetch;

describe("Order: Management", () => {
  beforeAll(async () => {
    [, connection] = await setupDatabase();
    graphqlFetch = await createLoggedInGraphqlFetch(USER_TOKEN);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Query.order for loggedin user", () => {
    it("should return array of current user orders", async () => {
      const {
        data: {
          me: { orders },
        },
      } = await graphqlFetch({
        query: /* GraphQL */ `
          query orders {
            me {
              orders {
                _id
                user {
                  username
                }
              }
            }
          }
        `,
        variables: {},
      });

      expect(orders.length).toEqual(2);
    });

    it("should return single user order", async () => {
      const {
        data: { order },
      } = await graphqlFetch({
        query: /* GraphQL */ `
          query order($orderId: ID!) {
            order(orderId: $orderId) {
              _id
            }
          }
        `,
        variables: {
          orderId: SimpleOrder._id,
        },
      });
      expect(order._id).toEqual(SimpleOrder._id);
    });
  });

  describe("Query.orders for anonymous user", () => {
    it("should return error", async () => {
      const graphqlAnonymousFetch = await createAnonymousGraphqlFetch();
      const { errors } = await graphqlAnonymousFetch({
        query: /* GraphQL */ `
          query orders {
            orders {
              _id
              user {
                username
              }
            }
          }
        `,
        variables: {},
      });
      expect(errors.length).toEqual(1);
    });
  });
});
