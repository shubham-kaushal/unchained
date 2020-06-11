import { setupDatabase, createLoggedInGraphqlFetch } from './helpers';
import { UnpublishedProduct } from './seeds/products';
import { ADMIN_TOKEN, User, Admin } from './seeds/users';

let connection;
let graphqlFetch;

describe('User Bookmarks', () => {
  beforeAll(async () => {
    [, connection] = await setupDatabase();
    graphqlFetch = await createLoggedInGraphqlFetch(ADMIN_TOKEN);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Mutation.createBookmark', () => {
    it('create a new bookmark for a specific user', async () => {
      const { data: { createBookmark } = {} } = await graphqlFetch({
        query: /* GraphQL */ `
          mutation createBookmark($productId: ID!, $userId: ID!) {
            createBookmark(productId: $productId, userId: $userId) {
              _id
              created
              user {
                _id
              }
            }
          }
        `,
        variables: {
          productId: UnpublishedProduct._id,
          userId: User._id,
        },
      });
      expect(createBookmark).toMatchObject({
        user: {
          _id: User._id,
        },
      });
    });
  });

  describe('User.bookmarks', () => {
    it('returns 1 bookmark', async () => {
      const { data: { user: { bookmarks } } = {} } = await graphqlFetch({
        query: /* GraphQL */ `
          query bookmarks($userId: ID!) {
            user(userId: $userId) {
              _id
              bookmarks {
                product {
                  _id
                }
              }
            }
          }
        `,
        variables: {
          userId: Admin._id,
        },
      });
      expect(bookmarks.length).toEqual(2);
    });
  });
});
