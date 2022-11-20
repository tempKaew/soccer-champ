import { FlexContainer } from "@line/bot-sdk";

const matchFlexMessage = ({
  teamHomeName,
  teamHomeImage,
  teamVisitorName,
  teamVisitorImage,
  dateKickoff,
  channel
}:any):FlexContainer => ({
  "type": "bubble",
  "size": "kilo",
  "hero": {
    "type": "box",
    "layout": "baseline",
    "contents": [
      {
        "type": "text",
        "text": "มาทายผลบอลกันเถอะ",
        "size": "xl",
        "weight": "bold",
        "margin": "10px",
        "color": "#ffffff"
      }
    ],
    "justifyContent": "center",
    "paddingAll": "12px"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "image",
            "url": process.env.SITE_URL + "/images/teams/"+teamHomeImage,
            "align": "center"
          },
          {
            "type": "image",
            "url": process.env.SITE_URL + "/images/teams/"+teamVisitorImage,
            "align": "center"
          }
        ],
        "justifyContent": "space-between",
        "alignItems": "center",
        "spacing": "none",
        "margin": "none",
        "paddingAll": "0px"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": "Kick off",
                "size": "sm",
                "color": "#aaaaaa",
                "flex": 3
              },
              {
                "type": "text",
                "text": dateKickoff,
                "flex": 6,
                "color": "#666666",
                "size": "sm"
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": "ถ่ายทอดสด",
                "size": "sm",
                "color": "#aaaaaa",
                "flex": 3
              },
              {
                "type": "text",
                "text": channel,
                "flex": 6,
                "color": "#666666",
                "size": "sm",
                "wrap": true
              }
            ]
          }
        ],
        "margin": "5px"
      },
      {
        "type": "text",
        "text": "ทายผลฟุตบอลเพื่อสะสมคะแนน รับของรางวัล",
        "wrap": true,
        "color": "#aaaaaa",
        "size": "xxs",
        "margin": "5px"
      },
      {
        "type": "text",
        "text": "* เริ่มทายผลได้ก่อนฟุตบอลเริ่มเตะได้เท่านั้น",
        "wrap": true,
        "color": "#aaaaaa",
        "size": "xxs"
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": teamHomeName,
          "text": "ทายผล "+teamHomeName+' ชนะ'
        },
        "flex": 1,
        "style": "primary",
        "height": "sm"
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": teamVisitorName,
          "text": "ทายผล "+teamVisitorName+' ชนะ'
        },
        "flex": 1,
        "style": "secondary",
        "height": "sm",
        "margin": "5px"
      }
    ]
  },
  "styles": {
    "hero": {
      "backgroundColor": "#1e81b0"
    },
    "footer": {
      "backgroundColor": "#f5f5f3"
    }
  }
})

export default matchFlexMessage