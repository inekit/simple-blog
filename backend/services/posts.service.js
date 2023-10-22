const tOrmCon = require('../db/connection');
const checkInputData = require('../utils/checkInputData');
const { HttpError, MySqlError, NotFoundError, NoInputDataError } = require('../utils/httpErrors');
const ftp = require('basic-ftp');
const webp = require('webp-converter');
webp.grant_permission();
const fs = require('fs').promises;
const ftpParams = {
  host: 'pics1.gmi.pics',
  user: 'pics1_gmi',
  password: 'rE1uY7yL0p',
  // secure: true,
};
class UsersService {
  constructor() {
    this.getOne = this.getOne.bind(this);
    this.get = this.get.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
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

    try {
      await client.access(ftpParams);
      await client.ensureDir(`img/post-${post_id}`);
      await client.uploadFrom(`./temp/${fNameFullPath}`, fNameFullPath);
    } catch (e) {
      console.log(e);
      await fs.unlink(`temp/${fNameFullPath}`).catch((e) => {});
      throw e;
    }

    await fs.unlink(`temp/${fNameFullPath}`).catch((e) => {});

    return { file_name: fNameFullPath, server_id: 1 };
  }

  getOne(id) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const data = await queryRunner.query(
          `select p.*,JSON_ARRAYAGG(JSON_OBJECT('id', i.id,'server_id', i.server_id,'file_name', i.file_name,'alt', i.alt)) image_list from posts p  left join images i on p.id = i.post_id  where p.id = ? group by p.id  limit 1`,
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

  get({ id, page = 1, take = 10, searchQuery, showText = true }) {
    return new Promise(async (res, rej) => {
      if (id) {
        return this.getOne(id)
          .then((data) => res(data))
          .catch((error) => rej(error));
      }

      const skip = (page - 1) * take;
      searchQuery = searchQuery ? `%${searchQuery}%` : null;

      const connection = await tOrmCon;

      connection
        .query(
          `select p.id,p.title,p.publication_date, 
          JSON_ARRAYAGG(JSON_OBJECT('id', i.id,'server_id', i.server_id,'file_name', i.file_name,'alt', i.alt)) image_list ` +
            (showText ? `,p.text ` : ` `) +
            'from posts p left join images i on p.id = i.post_id where p.title like ? or ? IS NULL group by p.id order by publication_date DESC LIMIT ? OFFSET ?',
          [searchQuery, searchQuery, +take, skip]
        )
        .then((data) => res(data))
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  add({ text, title, previewsBinary, images, alts }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        images = Array.isArray(images) ? images : [images];
        alts = Array.isArray(alts) ? alts : [alts];
        alts = alts.map((el) => JSON.parse(el));

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

            const existing_image = (await queryRunner.query('select * from images where hash = ?', [hash]))?.[0];

            console.log(existing_image);
            if (existing_image) continue;

            console.log('continue');

            const post_id = added_data?.id;

            const imageObj = await this.saveReturningImageObj({
              image: imageBinary,
              post_id,
              client,
            });

            const { file_name, server_id } = imageObj;

            await queryRunner.query(
              'insert ignore into images (hash, post_id, file_name, server_id, alt) values (?,?,?,?,?)',
              [hash, post_id, file_name, server_id, alts?.[imageId].alt]
            );
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

  edit({ id, text, title, previewsBinary = [], images = [], alts }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        images = Array.isArray(images) ? images : [images];
        alts = alts ? (Array.isArray(alts) ? alts : [alts]) : [];
        alts = alts?.map((el) => JSON.parse(el));

        previewsBinary = Array.isArray(previewsBinary) ? previewsBinary : [previewsBinary];

        const data = await queryRunner.manager
          .getRepository('Post')
          .createQueryBuilder()
          .update({
            title,
            text,
          })
          .where({
            id: id,
          })
          .execute();

        const newAlts = alts?.filter((el) => !el.file_name);
        console.log(alts, newAlts);

        if (previewsBinary.length) {
          const client = new ftp.Client();
          client.ftp.verbose = true;

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

            await queryRunner.query(
              'insert ignore into images (hash, post_id, file_name, server_id, alt) values (?,?,?,?,?)',
              [hash, id, file_name, server_id, newAlts?.[imageId].alt]
            );
          }

          client.close();
        }

        for (let imageObj of alts) {
          if (!imageObj.file_name) continue;
          await queryRunner.query('update images set alt = ? where post_id = ? and file_name = ?', [
            imageObj.alt,
            id,
            imageObj.file_name,
          ]);
        }

        const newImages = previewsBinary?.length ? previewsBinary.map((el) => el.md5) : ['-1'];
        const oldImages = images?.length ? images : ['-1'];
        const removeList = await queryRunner.query(
          'select id, file_name from images where post_id=? and hash NOT IN (?) and file_name NOT IN (?)',
          [+id, newImages, oldImages]
        );

        console.log(removeList);
        if (removeList.length) {
          await this.removeFromServer(removeList, id);
        }

        await queryRunner.query('delete from images where post_id=? and hash NOT IN (?) and file_name NOT IN (?)', [
          +id,
          newImages,
          oldImages,
        ]);

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

  async removeFromServer(removeList, post_id) {
    const client = new ftp.Client();
    await client.access(ftpParams);

    for (let item of removeList) {
      console.log(item);
      await client.remove(`/img/post-${post_id}/${item.file_name}`).catch((e) => {});
    }
    client.close();
  }

  delete({ id }) {
    return new Promise(async (res, rej) => {
      try {
        const client = new ftp.Client();
        await client.access(ftpParams);

        await client.removeDir(`/img/post-${id}`);
        client.close();
      } catch (e) {
        console.log(e);
      }

      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        await queryRunner.query('delete from images where post_id = ?', [id]);
        const data = await queryRunner.query('delete from posts where id = ?', [id]);

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
