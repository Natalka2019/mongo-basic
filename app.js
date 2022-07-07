'use strict';

const {mapUser, getRandomFirstName} = require('./util');

// db connection and settings
const connection = require('./config/connection');
const students = require('./students.json');

let userCollection;
let articleCollection;
let studentCollection;

run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('users');
  await connection.get().createCollection('users');
  userCollection = connection.get().collection('users');

  await connection.get().dropCollection('articles');
  await connection.get().createCollection('articles');
  articleCollection = connection.get().collection('articles');

  await connection.get().dropCollection('students');
  await connection.get().createCollection('students');
  studentCollection = connection.get().collection('students');

  await example1();
  await example2();
  await example3();
  await example4();
  await example5();
  await example6();
  await example7();
  await example8();
  await example9();
  await example10();
  await example11();
  await example12();
  await example13();
  await example14();
  await example15();
  await example16();
  await example17();
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

// #### Articles

// - Create 5 articles per each type (a, b, c)
async function example5() {
  try {
    await articleCollection.insertMany([
      {
        name: 'Mongodb - introduction',
        description: 'Mongodb - text',
        type: 'a',
        tags: []
      },
      {
        name: 'Mongoose - introduction',
        description: 'Mongoose - text',
        type: 'a',
        tags: []
      },
      {
        name: 'JavaScript - introduction',
        description: 'JavaScript - text',
        type: 'a',
        tags: []
      },
      {
        name: 'HTML - introduction',
        description: 'HTML - text',
        type: 'a',
        tags: []
      },
      {
        name: 'CSS - introduction',
        description: 'CSS - text',
        type: 'a',
        tags: []
      },
      {
        name: 'React - introduction',
        description: 'React - text',
        type: 'b',
        tags: []
      },
      {
        name: 'Angular - introduction',
        description: 'Angular - text',
        type: 'b',
        tags: []
      },
      {
        name: 'Vue - introduction',
        description: 'Vue - text',
        type: 'b',
        tags: []
      },
      {
        name: 'Node - introduction',
        description: 'Node - text',
        type: 'b',
        tags: []
      },
      {
        name: 'Redux - introduction',
        description: 'Redux - text',
        type: 'b',
        tags: []
      },
      {
        name: 'RxJs - introduction',
        description: 'RxJs - text',
        type: 'c',
        tags: []
      },
      {
        name: 'Jest - introduction',
        description: 'Jest - text',
        type: 'c',
        tags: []
      },
      {
        name: 'Typescript - introduction',
        description: 'Typescript - text',
        type: 'c',
        tags: []
      },
      {
        name: 'SQL - introduction',
        description: 'SQL - text',
        type: 'c',
        tags: []
      },
      {
        name: 'Express - introduction',
        description: 'Express - text',
        type: 'c',
        tags: []
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]

async function example6() {
  try {
    await articleCollection.updateMany({type: 'a'}, {$set: {tags: ['tag1-a', 'tag2-a', 'tag3']}});
  } catch (err) {
    console.error(err);
  }
}

// Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a

async function example7() {
  try {
    await articleCollection.updateMany(
      {type: {$ne: 'a'}},
      {$set: {tags: ['tag2', 'tag3', 'super']}}
    );
  } catch (err) {
    console.error(err);
  }
}

// - Find all articles that contains tags [tag2, tag1-a]
async function example8() {
  try {
    const selection = await articleCollection.find({tags: {$in: ['tag2', 'tag1-a']}}).toArray();

    console.log(selection);
  } catch (err) {
    console.error(err);
  }
}

// Pull [tag2, tag1-a] from all articles
async function example9() {
  try {
    await articleCollection.updateMany(
      {},
      {
        $pull: {tags: {$in: ['tag2', 'tag1-a']}}
      }
    );
  } catch (err) {
    console.error(err);
  }
}

// #### Students

// Import all data from students.json into student collection

async function example10() {
  try {
    await studentCollection.insertMany(students);
  } catch (err) {
    console.error(err);
  }
}

// - Find all students who have the worst score for homework, sort by descent

async function example11() {
  try {
    const selection = await studentCollection
      .aggregate([
        {
          $match: {
            scores: {
              $elemMatch: {
                score: {
                  $lte: 30.0
                },
                type: 'homework'
              }
            }
          }
        },
        {
          $sort: {
            'scores.2.score': -1.0
          }
        }
      ])
      .toArray();

    console.log(selection);
  } catch (err) {
    console.error(err);
  }
}
// - Find all students who have the best score for quiz and the worst for homework, sort by ascending

async function example12() {
  try {
    await studentCollection.aggregate([
      {
        $match: {
          scores: {
            $all: [
              {
                $elemMatch: {
                  score: {
                    $gte: 90.0
                  },
                  type: 'quiz'
                }
              },
              {
                $elemMatch: {
                  score: {
                    $lte: 30.0
                  },
                  type: 'homework'
                }
              }
            ]
          }
        }
      },
      {
        $sort: {
          'scores.1.score': 1.0
        }
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Find all students who have best scope for quiz and exam

async function example13() {
  try {
    await studentCollection.aggregate([
      {
        $match: {
          scores: {
            $all: [
              {
                $elemMatch: {
                  score: {
                    $gte: 90.0
                  },
                  type: 'quiz'
                }
              },
              {
                $elemMatch: {
                  score: {
                    $gte: 90.0
                  },
                  type: 'exam'
                }
              }
            ]
          }
        }
      },
      {
        $sort: {
          'scores.0.score': 1.0
        }
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Calculate the average score for homework for all students

async function example14() {
  try {
    const selection = await studentCollection
      .aggregate([
        {
          $unwind: {
            path: '$scores'
          }
        },
        {
          $match: {
            'scores.type': 'homework'
          }
        },
        {
          $group: {
            _id: 'scores.type',
            averageScore: {
              $avg: '$scores.score'
            }
          }
        }
      ])
      .toArray();

    console.log(selection);
  } catch (err) {
    console.error(err);
  }
}
// - Delete all students that have homework score <= 60

async function example15() {
  try {
    await studentCollection.deleteMany({
      scores: {
        $elemMatch: {
          score: {
            $lte: 60.0
          },
          type: 'homework'
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
}
// - Mark students that have quiz score => 80

async function example16() {
  try {
    await userCollection.aggregate([
      {
        $addFields: {
          quize80: 'Marked'
        }
      },
      {
        $unwind: {
          path: '$scores'
        }
      },
      {
        $sort: {
          'scores.type': -1.0
        }
      },
      {
        $addFields: {
          quize80: {
            $cond: {
              if: {
                $and: [
                  {
                    $gte: ['$scores.score', 80.0]
                  },
                  {
                    $eq: ['$scores.type', 'quiz']
                  }
                ]
              },
              then: 'true',
              else: 'false'
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          name: {
            $first: '$name'
          },
          scores: {
            $push: '$scores'
          },
          quize80: {
            $first: '$quize80'
          }
        }
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}
// - Write a query that group students by 3 categories (calculate the average grade for three subjects)
//  - a => (between 0 and 40)
//  - b => (between 40 and 60)
//  - c => (between 60 and 100)

async function example17() {
  try {
    await userCollection.aggregate([
      {
        $addFields: {
          scoresAverage: {
            $divide: [
              {
                $reduce: {
                  input: '$scores',
                  initialValue: 0.0,
                  in: {
                    $add: ['$$value', '$$this.score']
                  }
                }
              },
              {
                $cond: [
                  {
                    $ne: [
                      {
                        $size: {$ifNull: ['$scores', []]}
                      },
                      0.0
                    ]
                  },
                  {
                    $size: {$ifNull: ['$scores', []]}
                  },
                  1.0
                ]
              }
            ]
          }
        }
      },
      {$sort: {scoresAverage: 1}},
      {
        $bucket: {
          groupBy: '$scoresAverage',
          boundaries: [0.0, 40.0, 60.0, 100.0],
          output: {
            students: {
              $push: '$$ROOT'
            }
          }
        }
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}
