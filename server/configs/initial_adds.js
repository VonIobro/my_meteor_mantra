// Foobars is _module_template example
import { Posts, Comments, Foobars } from '/lib/collections';

export default function () {
  // Create posts for testing
  if (!Posts.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const title = `This is the post title ${lc}`;
      let author = 'Bob';
      let content = `Post ${lc}'s content is the bestest`;
      let createdAt = new Date();
      const postId = Meteor.uuid();
      Posts.insert({ _id: postId, title, author, content, createdAt });

      // Generate comment linked to postId
      for (lc = 1; lc <= 3; lc++) {
        author = 'Alice';
        content = `This is a Comment! ${lc}`;
        createdAt = new Date();
        Comments.insert({ postId, author, content, createdAt });
      }
    }
  }

  // _module_template example
  if (!Foobars.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const name = `This is the test title ${lc}`;
      const createdAt = new Date();
      const foobarId = Meteor.uuid();
      Foobars.insert({ _id: foobarId, name, createdAt });
    }
  }
}
