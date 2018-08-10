import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Activities } from '../../../../lib/schemas/activity';
import { sendEnrollmentLinkEmail } from './emails';
import { generateRegistrationRefcode, emailFromSref, checkRef, retireRef } from './refcodeMethods';
import { validationsHelper } from '../../helpers/validationsHelper';
import crypto from 'crypto';
import SharedMethods from '../../../api/helpers/sharedMethods';
import { Roles } from 'meteor/alanning:roles';

// export const newUser = (user, userId, userIds, roles) => {
//   const userName = user.name + ' ' + user.surname;
  
//   const refcode = generateRegistrationRefcode(userId);
//   sendEnrollmentLinkEmail(user.email, userName, refcode);
// };

if (Meteor.isServer) {
  Meteor.methods({
    'insertNewUser'(user) {
      try {
        // if (!Meteor.user().canCreateNewUsers()) {
        //   throw new Meteor.Error('User not authorized');
        // }
        if (!user.name || user.name === '' ||
          !user.surname || user.surname === '' ||
          !user.email || user.email === '' ||
          !user.password || user.password === '' ||
          !user.repeatPassword || user.repeatPassword === ''
        ) {
          throw new Meteor.Error('Incomplete fields');
        }
        if (user.password !== user.repeatPassword) {
          throw new Meteor.Error('Passwords doesn\'t match');
        }
        const existingUser = Meteor.users.findOne({'emails.address': user.email});
        if (existingUser) {
          throw new Meteor.Error('User already exists');
        }
        const newUserId = Accounts.createUser({
          email: user.email,
          password: user.password,
          name: user.name,
          surname: user.surname
        });
        // newUser(user, newUserId, [], ['projectManager']);
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
    'signupUser'({refcode, password}) {
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
        Meteor.users.update({_id: userId}, {$set: {'personalInformation.status': 'approved'}});

        const isProvider = Roles.userIsInRole(userId, ['provider']);
        const roles = isProvider ? [] : ['administrator'];
        const provider = isProvider ? Providers.findOne({providerId: userId}) : {};
        const project = isProvider ? Projects.findOne({'providers': provider._id}) : {};
        const userIds = isProvider ? [project.administrator, user.originatorId] : [user.originatorId];
        
        console.log('[updatePassword] - successfully finished', `user[${userId}]`);
        return email;
      } catch (exception) {
        console.log(exception);
        throw new Meteor.Error('error', exception);
      }
    },
    'saveTraits'(user, selectedAnswers) {
      try {
        const userToUpdate = Meteor.users.findOne({ _id: user._id });

        if (!userToUpdate) {
          throw new Meteor.Error('user-not-found');
        }
        
        Meteor.users.update({_id: user._id}, {$set: {'goals': selectedAnswers.goals}});
        Meteor.users.update({_id: user._id}, {$set: {'contributions': selectedAnswers.contributions}});
        Meteor.users.update({_id: user._id}, {$set: {'identity_traits': selectedAnswers.identity_traits}});
        if (Roles.userIsInRole(Meteor.userId(), ['entrepreneur']) &&
          Meteor.user() && Meteor.user().personalInformation.status === 'pendingChatbot') {
          Meteor.users.update({_id: user._id}, {$set: {'personalInformation.status': 'pendingAreas'}});
        }

        console.log('traits saved');
      } catch (exception) {
        console.log(exception);
        throw new Meteor.Error('error', exception);
      }
    }
  });
}
