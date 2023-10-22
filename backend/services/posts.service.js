const tOrmCon = require('../db/connection');
const checkInputData = require('../utils/checkInputData');
const { HttpError, MySqlError, NotFoundError, NoInputDataError } = require('../utils/httpErrors');
const ftp = require('basic-ftp');

class UsersService {
  constructor() {
    this.getOne = this.getOne.bind(this);
    this.get = this.get.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.saveReturningImageObj = this.saveReturningImageObj.bind(this);
  }

  async saveReturningImageObj({ image, post_id, client }) {
    let fNameFullPath;
    if (typeof image === String) throw new Error('wrong format');
    let fName = image?.name;
    if (!fName) throw new Error('wrong format');

    try {
      console.log(image);

      let fNameSplit = fName.split('.');
      const fileFormat = fNameSplit[fNameSplit.length - 1];
      fNameFullPath = image.md5 + '.' + fileFormat;

      await image?.mv('temp/' + fNameFullPath);

      const mimetype = image.mimetype.split('/')[0];

      if (fileFormat !== 'webp' && mimetype === 'image') {
        await webp.cwebp(`temp/${fNameFullPath}`, `temp/${image.md5}.webp`, '-q 80');

        await fs.unlink(`temp/${fNameFullPath}`).catch((e) => {});
        fNameFullPath = image.md5 + '.webp';
      } else if (fileFormat === 'webp') fNameFullPath = image.md5 + '.webp';
    } catch (e) {
      console.log(e);
      await fs.unlink(`temp/${fNameFullPath}`).catch((e) => {});
      throw new Error('file error');
    }

    await client.access({
      host: 'pics1.gmi.pics',
      user: 'pics1_gmi',
      password: 'rE1uY7yL0p',
      secure: true,
    });
    console.log(await client.list());
    await client.ensureDir(`img/post-${post_id}`);
    await client.uploadFrom(`temp/${fNameFullPath}`, `img/post-${post_id}/${fNameFullPath}`);

    return { file_name: fNameFullPath, server_id: 1 };
  }

  getOne(id) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const data = await queryRunner.query(`select * from posts p where p.id = ? limit 1`, [id]);

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

  get({ id, page = 1, take = 10, searchQuery, showText = true }) {
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
          `select p.id,p.title,p.publication_date ` +
            (showText ? `,p.text ` : ` `) +
            'from posts p where p.title like ? or ? IS NULL group by p.id order by publication_date DESC LIMIT ? OFFSET ?',
          [searchQuery, searchQuery, +take, skip]
        )
        .then((data) => res(data))
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  add({ text, title, previewsBinary, images }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        images = Array.isArray(images) ? images : [images];

        previewsBinary = Array.isArray(previewsBinary) ? previewsBinary : [previewsBinary];

        const added_data = await queryRunner.manager.getRepository('Post').save({
          title,
          text,
        });

        if (previewsBinary.length) {
          const client = new ftp.Client();
          //client.ftp.verbose = true;

          for (let imageId in previewsBinary) {
            const imageBinary = previewsBinary[imageId];

            if (typeof imageBinary === String) continue;

            const hash = imageBinary.md5;

            const existing_image = await queryRunner.query('select * from images where hash = ?', [hash])?.[0];

            if (existing_image) continue;

            const imageObj = await this.saveReturningImageObj({
              image: imageBinary,
              post_id: added_data?.[0]?.inserted_id,
              client,
            });

            const { file_name, server_id } = imageObj;

            await queryRunner
              .createQueryBuilder()
              .insert()
              .into('Image')
              .values({ hash, file_name, server_id })
              .onConflict(`("hash") DO NOTHING`)
              .execute();
          }

          client.close();
        }

        //delete all not hash and not name where post_id

        await queryRunner.commitTransaction();

        res(added_data);
      } catch (error) {
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  edit({ id, text, title, publication_date }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        images = Array.isArray(images) ? images : [images];

        previewsBinary = Array.isArray(previewsBinary) ? previewsBinary : [previewsBinary];

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
          .execute();

        if (previewsBinary.length) {
          const client = new ftp.Client();
          //client.ftp.verbose = true;

          for (let imageId in previewsBinary) {
            const imageBinary = previewsBinary[imageId];

            if (typeof imageBinary === String) continue;

            const hash = imageBinary.md5;

            const existing_image = await queryRunner.query('select * from images where hash = ?', [hash])?.[0];

            if (existing_image) continue;

            const imageObj = await this.saveReturningImageObj({
              image: imageBinary,
              post_id: id,
              client,
            }).catch((e) => {});

            if (!imageObj) continue;

            const { file_name, server_id } = imageObj;

            await queryRunner
              .createQueryBuilder()
              .insert()
              .into('Image')
              .values({ hash, file_name, server_id })
              .onConflict(`("hash") DO NOTHING`)
              .execute();
          }

          client.close();
        }

        const removeList = await queryRunner.query(
          'select id from images where post_id<>? and (hash <> any(?)) and (file_name <> any(?))',
          [id, previewsBinary.map((el) => el.md5), images]
        );

        if (removeList.length) {
          const client = new ftp.Client();

          for (let item of removeList) {
            console.log(item);
            await client.remove(`/img/post-${id}/${item.file_name}`).catch((e) => {});
          }
          client.close();
        }

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
