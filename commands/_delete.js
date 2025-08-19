/*CMD
  command: /delete
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Delete feedback command
var userId = user.id;

// Retrieve feedback data
var feedback = Bot.getProperty("feedback", {});

// Check if the user has given feedback
if (feedback.hasOwnProperty(userId)) {
  delete feedback[userId]; // Delete user's feedback
  Bot.setProperty("feedback", feedback);

  Api.sendMessage({
    text: "Your feedback has been deleted."
  });
} else {
  Api.sendMessage({
    text: "You have not provided any feedback yet."
  });
}

