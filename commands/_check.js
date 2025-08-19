/*CMD
  command: /check
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

let ib = Libs.ResourcesLib.anotherUserRes("balance", 1778136109);
let ibName = "I B";
let vk = Libs.ResourcesLib.anotherUserRes("balance", 1395943855);
let vkName = "VK";

var text = `📛 Name :- ${vkName}\n🆔 ID :- 6541914418\n💰 Balance :- ${vk.value()}\n\n`;
text += `📛 Name :- ${ibName}\n🆔 ID :- 6541914418\n💰 Balance :- ${ib.value()}`;

Bot.sendMessage(text);

