import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Activities } from '../../../../lib/schemas/activity';
import { sendEnrollmentLinkEmail } from './emails';
import { generateRegistrationRefcode, emailFromSref, checkRef, retireRef } from './refcodeMethods';
import { validationsHelper } from '../../helpers/validationsHelper';
import crypto from 'crypto';
import SharedMethods from '../../../api/helpers/sharedMethods';
import { Roles } from 'meteor/alanning:roles';

export const newUser = (user, userId, userIds, roles) => {
  const userName = user.name + ' ' + user.surname;
  Activities.insert({
    type: "user",
    extraTitle: 'activityNames.welcomeMessage',
    title: '',
    createdBy: 'activityNames.BID',
    actionDescription: 'activityNames.addedMessage',
    userId: userId,
    userIds: [userId]
  });
  Activities.insert({
    type: "role",
    extraTitle: 'activityNames.user',
    title: userName,
    createdBy: Meteor.userId(),
    actionDescription: 'activityNames.addedUser',
    redirect: 'userList',
    userIds,
    roles
  });
  const refcode = generateRegistrationRefcode(userId);
  sendEnrollmentLinkEmail(user.email, userName, refcode);
};

if (Meteor.isServer) {
  Meteor.methods({
    'insertNewUser'(user) {
      try {
        if (!Meteor.user().canCreateNewUsers()) {
          throw new Meteor.Error('User not authorized');
        }
        const newUserId = Accounts.createUser(user);
        newUser(user, newUserId, [], ['projectManager']);
        return newUserId;
      } catch (exception) {
        validationsHelper.parseMongoError(exception);
        return exception;
      }
    },
    'updateUserProfile'(user, file, fileId) {
      try {
        const userToUpdate = Meteor.users.findOne({ _id: user._id });

        if (!userToUpdate) {
          throw new Meteor.Error('user-not-found');
        }

        if (fileId !== null) {

          const userFile = {
            name: file.name,
            type: file.type,
            fileid: fileId
          };

          const hash = Promise.await(SharedMethods.calculateHash(userFile.fileid));
          if (hash) {
            userFile.fileHash = hash;
          }

          if (userToUpdate.files === undefined) {
            user.files = [
              userFile
            ];
          } else {
            user.files.push(userFile);
          }
        }

        Meteor.users.update(
          {_id: user._id},
          {$set: user}
        );

        return user._id;
      } catch (exception) {

        console.log("exception catched");

        validationsHelper.parseMongoError(exception);
        return exception;
      }
    },
    'signupUser'({refcode, password, publicKey}) {
      try {
        check(password, String);
        check(refcode, String);
        const email = emailFromSref(refcode);
        const user = Meteor.users.findOne({'emails.address': email });
        console.log('user: ', user);
        if (!user) {
          console.log('[Error] Change Password: Email not found');
          throw new Meteor.Error('email-not-found');
        }
        const userId = user._id;
        console.log('userId: ', userId);

        const isValid = checkRef(refcode);
        if (!isValid) {
          console.log('[Error] Update Password: Reset code is invalid');
          throw new Meteor.Error('reset-code-invalid');
        }
        const affected = retireRef(refcode);
        if (affected === 0) {
          console.log('[Error] Update Password: Unable to retire reset code');
          throw new Meteor.Error('unable-to-retire-code');
        }
        Accounts.setPassword(userId, password);
        Meteor.users.update({_id: userId}, {$set: {'personalInformation.publicKey': publicKey}});

        const isProvider = Roles.userIsInRole(userId, ['provider']);
        const roles = isProvider ? [] : ['projectManager'];
        const provider = isProvider ? Providers.findOne({providerId: userId}) : {};
        const project = isProvider ? Projects.findOne({'providers': provider._id}) : {};
        const userIds = isProvider ? [project.projectManagerId, user.originatorId] : [user.originatorId];
        Activities.insert({
          type: "pendingUser",
          extraTitle: 'activityNames.user',
          title: user.personalInformation.name + ' ' + user.personalInformation.surname,
          postTitle: 'activityNames.pending',
          createdBy: user.originatorId,
          status: 'pending',
          actionDescription: 'activityNames.addedUser',
          redirect: 'userList',
          pendingUserId: userId,
          userIds,
          roles
        });
        console.log('[updatePassword] - successfully finished', `user[${userId}]`);
        return email;
      } catch (exception) {
        console.log(exception);
        throw new Meteor.Error('error', exception);
      }
    },
    'newUserHashData'(userId) {
      const user = Meteor.users.findOne({_id: userId});
      const data = {
        phone: user.personalInformation.phone,
        name: user.personalInformation.name,
        surname: user.personalInformation.surname,
        role: user.roles[0],
        email: user.emails[0].address,
        publicKey: user.personalInformation.publicKey,
      };
      switch (user.roles[0]) {
        case 'executiveDirector': {
          const executiveUnit = ExecutiveUnits.findOne(user.executiveUnitId);
          data.executiveUnitName = executiveUnit.name;
          break;
        }
        case 'provider': {
          const provider = Providers.findOne({providerId: user._id});
          data.providerName = provider.socialReason;
          break;
        }
        default: {
          break;
        }
      }
      console.log('data', data, 'userRole', user.roles[0]);
      const hash = crypto.createHash('sha256');
      hash.update(JSON.stringify(data), 'utf8');
      return {
        newUserAddress: user.personalInformation.publicKey,
        role: user.roles[0],
        activityHash: hash.digest('base64')
      };
    }
  });
}
