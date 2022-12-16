import { FlexContainer } from "@line/bot-sdk";

export default function ruleCollectPoint():FlexContainer {
  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": process.env.SITE_URL + "/images/bg-top-ball.jpg",
      "size": "full",
      "aspectRatio": "2.5:1",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "contents": [
        {
          "type": "text",
          "text": "กติการ่วมกิจกรรม",
          "size": "xl",
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "ทายผลฟุตบอลเพื่อสะสมคะแนน รับของรางวัล",
          "wrap": true,
          "color": "#aaaaaa",
          "size": "xxs"
        },
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": process.env.SITE_URL + "/images/icons/w.png",
                },
                {
                  "type": "text",
                  "text": "ทีมที่ทายชนะ",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "รับ 3 คะแนน",
                  "size": "sm",
                  "align": "end",
                  "color": "#aaaaaa"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": process.env.SITE_URL + "/images/icons/d.png",
                },
                {
                  "type": "text",
                  "text": "ทีมที่ทายเสมอ",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "รับ 1 คะแนน",
                  "size": "sm",
                  "align": "end",
                  "color": "#aaaaaa"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "icon",
                  "url": process.env.SITE_URL + "/images/icons/l.png",
                },
                {
                  "type": "text",
                  "text": "ทีมที่ทายแพ้",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "รับ 0 คะแนน",
                  "size": "sm",
                  "align": "end",
                  "color": "#aaaaaa"
                }
              ]
            }
          ]
        },
        {
          "type": "text",
          "text": "* เริ่มทายผลได้ก่อนฟุตบอลเริ่มเตะได้เท่านั้น",
          "wrap": true,
          "color": "#aaaaaa",
          "size": "xxs"
        }
      ]
    }
  }
}