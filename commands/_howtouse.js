/*CMD
  command: /howtouse
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.sendVideo({
  video: "https://t.me/ajaiqjqka/4", // Replace with the file ID or path to the video
  caption: "<b>First Service</b>\n\nThis video explains how to order likes and retweets using the bot's first service.", // Add your custom caption here
  parse_mode: "HTML" // Optional: For text formatting
});


Api.sendMediaGroup({
  media: [
    {
      type: "video",
      media: "https://t.me/ajaiqjqka/2", // Replace with the first video URL or file ID
      caption: "<b>Second Service</b>\n\nThis video explains how to order likes and retweets using the bot's second service.", // Add your caption here
      parse_mode: "HTML" // Optional: Allows for bold, italic, etc., if needed
    },
    {
      type: "video",
      media: "https://t.me/ajaiqjqka/3" // Replace with the second video URL or file ID
    }
  ]
});

