'use strict';

const {mapUser, getRandomFirstName} = require('./util');

// db connection and settings
const connection = require('./config/connection');
let userCollection;
run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('users');
  await connection.get().createCollection('users');
  userCollection = connection.get().collection('users');

  await example1();
  await example2();
  await example3();
  await example4();
  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
async function example1() {
  try {
    await userCollection.insertMany([
      {
        firstName: 'Andrew',
        lastName: 'Rayan',
        department: 'a',
        createdAt: new Date()
      },
      {
        firstName: 'Leanne',
        lastName: 'Graham',
        department: 'a',
        createdAt: new Date()
      },
      {
        firstName: 'Ervin',
        lastName: 'Howell',
        department: 'b',
        createdAt: new Date()
      },
      {
        firstName: 'Clementine',
        lastName: 'Bauch',
        department: 'b',
        createdAt: new Date()
      },
      {
        firstName: 'Patricia',
        lastName: 'Lebsack',
        department: 'c',
        createdAt: new Date()
      },
      {
        firstName: 'Chelsey',
        lastName: 'Dietrich',
        department: 'c',
        createdAt: new Date()
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Delete 1 user from department (a)

async function example2() {
  try {
    await userCollection.deleteOne({department: 'a'});
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)

async function example3() {
  try {
    await userCollection.updateMany({department: 'b'}, {$set: {firstName: 'Anna'}});
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function example4() {
  try {
    const selection = await userCollection.find({department: 'c'}).toArray();

    console.log(selection);
  } catch (err) {
    console.error(err);
  }
}
