/*CMD
  command: /orderLink
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER
➡️ Send the twitter post link for which you want likes + rt

⚠️ No refund for wrong links.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function isValidLink(link) {
  return link.startsWith("https://x.com") || link.startsWith("https://twitter.com");
}

// Validate the link
if (!isValidLink(message)) {
  var text = `*⚠️ Invalid Link*\n\n👉 The link must start with https://x.com or https://twitter.com`;
  Api.sendMessage({
    text: text,
    parse_mode: "Markdown",
    reply_to_message_id: request.message_id,
    disable_web_page_preview: true
  });
  return;
}

// Store valid link as property
User.setProperty("link", message, "string");

// Proceed with next step (e.g., /startlike command)
Bot.run({ command: "/startlike" });

