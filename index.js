const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const cheerio = require("cheerio");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
const link = "https://galatexclub.ru/bitrix/catalog_export/telegram.xml";

const tuls = require("./fils/tul");
elect = require("./fils/elect");
del = require("./fils/del");
pay = require("./fils/pay");




bot.start(async (ctx) => {
  try {
    await ctx.replyWithHTML(
      `${ctx.message.from.first_name}.\nДобро пожаловать в GalaTexClub`,
      Markup.inlineKeyboard([
        [
          // Markup.button.callback('Магазины', 'btnShop'),
          Markup.button.callback("Новинки", "btnNew"),
        ],

        [
          Markup.button.callback("Тульская", "btnTul"),
          Markup.button.callback("Электрозаводская", "btnElect"),
        ],

        [
          Markup.button.callback("Доставка", "btnDel"),
          Markup.button.callback("Оплата", "btnPay"),
        ],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

function btnActiv(name, src) {
  bot.action(name, async (ctx) => {
    try {
      if (src !== true) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }
      
      if (name == "btnShop") {
        console.log("магазины");
        await ctx.reply(`/start`);
      } else if (name == "btnNew") {
        try {

          ctx.reply(`Загружаю`);

          async function resolt() {
            await axios.get(link).then((html) => {
              const $ = cheerio.load(html.data);
              //console.log(html);

              $("offer").each((i, el) => {
                var card = `
                Модель: ${$(el).find("model").text()}\n
Цена: ${$(el).find("price").text()}\n\n${$(el).find("picture").text()}\n\nСайт: ${$(el).find("url").text()}
`;
                cards.push(card);
              });
            });
          }
          resolt();

          let cards = [];

          setTimeout(() => {
            for (let i = 0; i <= cards.length; ) {
              if (i <= 7) {
                i++;
              } else if (i > 7) {
                break;
              }
              ctx.reply(cards[i]);
            }
            setTimeout(() => {
              ctx.replyWithHTML(
                `\nПосмотреть еще?\n\n или вернуться назад?`,
                Markup.inlineKeyboard([
                  [
                    Markup.button.callback("ещё 9", "go9"),
                    // Markup.button.callback("убрать 3", "rem3"),
                  ],
                ])
              );
              ctx.reply(`Вернуться назад.\n
/start`);
            }, 2300);
          }, 2000);

        } catch (e) {
          console.error(e);
        }
      } else if (name == "btnTul") {
        await ctx.reply(tuls.Tuls);
        await ctx.reply(`/start`);
      } else if (name == "btnElect") {
        //console.log("электрозаводская");
        await ctx.reply(elect.Elect);
        await ctx.reply(`/start`);
      } else if (name == "btnDel") {
        //console.log("доставка");
        await ctx.reply(del.Del);
        await ctx.reply(`/start`);
      } else if (name == "btnPay") {
       // console.log("оплата");
        await ctx.reply(pay.Pay);
        await ctx.reply(`/start`);
      } else if (name == "go9") {
        //console.log(222);

        try {

          ctx.reply(`Загружаю`);

          async function resolt2() {
            await axios.get(link).then((html) => {
              const $ = cheerio.load(html.data);
              //console.log(html);

              $("offer").each((i, el) => {
                var card2 = `
                Модель: ${$(el).find("model").text()}\n
Цена: ${$(el).find("price").text()}\n\n${$(el).find("picture").text()}\n\nСайт: ${$(el).find("url").text()}
`;
                cards2.push(card2);
              });
            });
          }
          resolt2();

          let cards2 = [];

          
          setTimeout(() => {
            for (let i = 8; i <= cards2.length; ) {
              if (i <= 16) {
                i++;
              } else if (i > 16) {
                break;
              }
              ctx.reply(cards2[i]);
            }
            setTimeout(() => {
              ctx.reply(`/start`);
            }, 2000);
          }, 1500);


        } catch (e) {
          console.error(e);
        }
        
      } 

    } catch (e) {
      console.error(e);
    }

  });
}

btnActiv("btnNew", /*img*/ true);
btnActiv("btnTul", /*img*/ true);
btnActiv("btnElect", /*img*/ true);
btnActiv("btnDel", /*img*/ true);
btnActiv("btnPay", /*img*/ true);
btnActiv("go9", /*img*/ true);
btnActiv("rem3", /*img*/ true);


//https://api.telegram.org/bot5168553497:AAGy9ixPpzHUccNhi2qqtzZpq6IKjVuXoSM/getUpdates - id bota gala


//https://api.telegram.org/bot5168553497:AAGy9ixPpzHUccNhi2qqtzZpq6IKjVuXoSM/sendMessage?chat_id=-1005168553497&text=ok1234k - id bota gala

// #-100770720048 - id grup 
// -1001656697550 - chat_id 

// https://api.telegram.org/bot5168553497:AAGy9ixPpzHUccNhi2qqtzZpq6IKjVuXoSM/sendMessage?chat_id=-659363031&text=hi%20hi%20hi - ссылка для атвета ботом в чат 'заказ'


bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
