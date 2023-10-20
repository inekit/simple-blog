const tOrmCon = require('../db/connection');
const checkInputData = require('../utils/checkInputData');
const { HttpError, MySqlError, NotFoundError, NoInputDataError } = require('../utils/httpErrors');

class UsersService {
  constructor() {
    this.getOnePost = this.getOnePost.bind(this);

    this.getPosts = this.getPosts.bind(this);

    this.addPost = this.addPost.bind(this);

    this.editPost = this.editPost.bind(this);
  }

  getOnePost({ id }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const data = await queryRunner.query(
          `select p.*
                      from public.posts p
                      where p.id = $1 limit 1`,
          [id]
        );

        let postObj = data?.[0];

        res(postObj);

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  getPosts({ id, page = 1, take = 10, searchQuery, showText = true }) {
    return new Promise(async (res, rej) => {
      if (id) {
        return this.getOnePost(id)
          .then((data) => res(data))
          .catch((error) => rej(error));
      }

      const skip = (page - 1) * take;
      searchQuery = searchQuery ? `%${searchQuery}%` : null;

      const connection = await tOrmCon;

      connection
        .query(
          `select p.id,p.title` +
            (showText ? `,p.text` : ``) +
            `from public.posts p
              where (title like $1 or $1 is NULL) 
              group by p.id
              order by publication_date DESC
              LIMIT $2 OFFSET $3`,
          [searchQuery, take, skip]
        )
        .then((data) => res(data))
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  addPost({ text, title }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const data = await queryRunner.manager.getRepository('Post').save({
          title,
          text,
        });

        await queryRunner.commitTransaction();

        res(data);
      } catch (error) {
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  editPost({ id, text, title, publication_date }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const data = await queryRunner.manager
          .getRepository('Post')
          .createQueryBuilder()
          .update({
            title,
            text,
            publication_date,
          })
          .where({
            id: id,
          })
          .returning('*')
          .execute();

        await queryRunner.commitTransaction();

        res(data);
      } catch (error) {
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }
}

module.exports = new UsersService();
