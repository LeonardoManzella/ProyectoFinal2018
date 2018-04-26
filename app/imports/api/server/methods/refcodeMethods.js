import { Meteor } from 'meteor/meteor';
import { Refcodes } from '../../../../lib/schemas/refcodes';
import bs58 from 'bs58';
import crypto from 'crypto';
const DEFAULT_REFCODE_LENGTH = 20;

const generateRefcode = function generateRefcode(length = DEFAULT_REFCODE_LENGTH) {
  const hash = crypto.createHash('sha256');
  hash.update(Math.random().toString(), 'utf8');
  const token = bs58.encode(hash.digest());
  return token.toString().substr(0, length);
};

const genRefcode = function(length = DEFAULT_REFCODE_LENGTH) {
  return 'r' + generateRefcode(length);
};

export const checkRef = function(refcode) {
  console.log('refcode', refcode);
  const ref = Refcodes.findOne({ refcode: refcode });
  console.log('ref', ref);
  if (!ref) return false; // if not found, invalidate
  return ref.isActive;
};


export const retireRef = function(refcode) {
  return Refcodes.update({
    refcode: refcode
  }, {
    $set: {
      isActive: false
    }
  });
};

export const emailFromSref = (sref) => {
  console.log('[RPC]emailFromSref - starting', 'sref:', sref);
  // The sref is the authentication token here

  const ref = Refcodes.findOne({ refcode: sref });
  if (ref === undefined || ref === null) {
    console.log('[RPC][Warning] emailFromSref: Ref code not found.', 'sref:', sref);
    throw new Meteor.Error('ref-code-not-found');
  }

  const userId = ref.userId;
  const user = Meteor.users.findOne({_id: userId});
  const email = user.emails[0].address;
  if (email === undefined || email === null) {
    console.log('[RPC][Warning] emailFromSref: E-mail not found.', 'email:', email, 'sref', sref);
    throw new Meteor.Error('email-not-found');
  }

  console.log('[RPC]emailFromSref', 'sref:', sref, 'email:', email);
  return email;
};


export const generateRegistrationRefcode = function(userId) {
  try {
    check(userId, String);
    const user = Meteor.users.findOne({_id: userId});
    console.log('generateRegistrationRefcode', user, userId);
    if (!user) {
      throw new Meteor.Error('User not found');
    }
    const refcode = genRefcode();
    const options = {
      originatorId: Meteor.userId(),
      userId,
      refcode
    };
    Refcodes.insert(options);
    return refcode;
  } catch (exception) {
    throw new Meteor.Error(404, exception);
  }
};

if (Meteor.isServer) {
  Meteor.methods({
    'validateRegistrationRefcode'(refcode) {
      try {
        check(refcode, String);
        const ref = Refcodes.findOne({refcode});
        if (!ref || !ref.isActive) {
          return false;
        }
        const user = Meteor.users.findOne({_id: ref.userId});
        if (user.personalInformation.status === 'approved') {
          return false;
        }
        return true;
      } catch (exception) {
        console.log('exception', exception);
        throw new Meteor.Error(404, exception);
      }
    }
  });
}
