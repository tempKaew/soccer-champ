import { FlexComponent, FlexContainer } from "@line/bot-sdk";
import { typeMatchFlex } from "../../types";

const matchFlexMessage = (matches:(typeMatchFlex)[]):FlexContainer => {

  var mapContainerMatch:(FlexComponent)[] = matches.map( match => {
    return {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": process.env.SITE_URL + "/images/teams/" + match.teamHomeImage,
              "align": "center",
              "size": "60px"
            },
            {
              "type": "image",
              "url": process.env.SITE_URL + "/images/teams/" + match.teamVisitorImage,
              "align": "center",
              "size": "60px"
            }
          ],
          "justifyContent": "space-between",
          "alignItems": "center",
          "spacing": "none",
          "margin": "none",
          "paddingTop": "5px"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": match.teamHomeName ?? "",
                "text": "ทายผล " + match.teamHomeName + " ชนะ"
              },
              "style": "secondary",
              "height": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "เสมอ",
                "text": "ทายผล " + match.teamHomeName + " เสมอ"
              },
              "style": "primary",
              "height": "sm",
              "margin": "4px",
              "gravity": "center"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": match.teamVisitorName ?? "",
                "text": "ทายผล " + match.teamVisitorName + " ชนะ"
              },
              "style": "secondary",
              "height": "sm",
              "margin": "4px"
            }
          ],
          "justifyContent": "center",
          "alignItems": "center",
          "paddingStart": "5px",
          "paddingEnd": "5px"
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
                  "size": "xs",
                  "color": "#aaaaaa",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": match.dateKickoff ? match.dateKickoff?.toString().replace(/T/, ' ').replace(/\..+/, '').replace(/:00/, '') : '',
                  "flex": 6,
                  "color": "#666666",
                  "size": "xs",
                  "wrap": true
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
                  "size": "xs",
                  "color": "#aaaaaa",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": match.channel ?? '',
                  "flex": 6,
                  "color": "#666666",
                  "size": "xs",
                  "wrap": true
                }
              ]
            }
          ],
          "margin": "5px",
          "paddingStart": "10px",
          "paddingEnd": "10px",
          "paddingBottom": "10px",
          "paddingTop": "5px"
        }
      ],
      "borderWidth": "1px",
      "borderColor": "#f5f5f5",
      "cornerRadius": "5px",
      "margin": "10px"
    }
  })

  mapContainerMatch.push({
    "type": "box",
    "layout": "vertical",
    "contents": [
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
  })

  return {
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
          "color": "#ffffff",
          "margin": "10px"
        }
      ],
      "justifyContent": "center",
      "paddingAll": "12px",
      "alignItems": "center"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": mapContainerMatch,
      "paddingAll": "0px",
      "paddingStart": "10px",
      "paddingEnd": "10px",
      "paddingBottom": "10px"
    },
    "styles": {
      "hero": {
        "backgroundColor": "#1e81b0"
      },
      "footer": {
        "backgroundColor": "#f5f5f3"
      }
    }
  };
}

export default matchFlexMessage