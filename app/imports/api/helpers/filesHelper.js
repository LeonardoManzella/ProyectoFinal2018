import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

const Images = new FilesCollection(
  {
    collectionName: 'Images',
    storagePath: process.env.FS_PATH
  });

export default Images;
