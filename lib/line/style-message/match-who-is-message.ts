import { FlexComponent, FlexContainer } from "@line/bot-sdk";
import { typeMathWhoIs } from "../../types";

const matchWhoIsMessage = (matchWhoIs:typeMathWhoIs):FlexContainer => {

  if (matchWhoIs.home.joiner) {
    var componentJoinerHome: (FlexComponent)[] = matchWhoIs.home.joiner?.map(j => {
      return {
        "type": "icon",
        "url": j.image ? j.image : "https://soccer-champ.vercel.app/images/icons/blank-profile.png",
        "margin": "4px"
      }
    })
  }else{
    var componentJoinerHome: (FlexComponent)[] = [{
      "type": "icon",
      "url": "https://soccer-champ.vercel.app/images/icons/blank-profile.png",
      "margin": "4px"
    }]
  }

  if (matchWhoIs.visitor.joiner) {
    var componentJoinerVisitor: (FlexComponent)[] = matchWhoIs.visitor.joiner?.map(j => {
      return {
        "type": "icon",
        "url": j.image ? j.image : "https://soccer-champ.vercel.app/images/icons/blank-profile.png",
        "margin": "4px"
      }
    })
  }else{
    var componentJoinerVisitor: (FlexComponent)[] = [{
      "type": "icon",
      "url": "https://soccer-champ.vercel.app/images/icons/blank-profile.png",
      "margin": "4px"
    }]
  }

  if (matchWhoIs.draw.joiner) {
    var componentJoinerDraw: (FlexComponent)[] = matchWhoIs.draw.joiner?.map(j => {
      return {
        "type": "icon",
        "url": j.image ? j.image : "https://soccer-champ.vercel.app/images/icons/blank-profile.png",
        "margin": "4px"
      }
    })
  }else{
    var componentJoinerDraw: (FlexComponent)[] = [{
      "type": "icon",
      "url": "https://soccer-champ.vercel.app/images/icons/blank-profile.png",
      "margin": "4px"
    }]
  }

  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": process.env.SITE_URL + "/images/bg-top-ball-2.jpg",
      "size": "full",
      "aspectRatio": "4:1",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "สรุปการทายผลนัด",
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "image",
                  "url": process.env.SITE_URL + "/images/teams/" + matchWhoIs.home.image,
                  "size": "45px",
                  "align": "end"
                }
              ],
              "flex": 3
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "flex": 1
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "image",
                  "url": process.env.SITE_URL + "/images/teams/" + matchWhoIs.visitor.image,
                  "size": "45px",
                  "align": "start"
                }
              ],
              "flex": 3
            }
          ],
          "justifyContent": "space-between",
          "alignItems": "center",
          "spacing": "none",
          "margin": "none",
          "paddingTop": "5px"
        },
        {
          "type": "separator",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": matchWhoIs.home.name + " :",
                  "color": "#aaaaaa",
                  "size": "xxs",
                  "flex": 0
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": componentJoinerHome,
                  "flex": 0
                }
              ]
            }
          ]
        },
        {
          "type": "separator",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Draw :",
                  "color": "#aaaaaa",
                  "size": "xxs",
                  "flex": 0
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": componentJoinerDraw,
                  "flex": 0
                }
              ]
            }
          ]
        },
        {
          "type": "separator",
          "margin": "sm"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": matchWhoIs.visitor.name + " :",
                  "color": "#aaaaaa",
                  "size": "xxs",
                  "flex": 0
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": componentJoinerVisitor,
                  "flex": 0
                }
              ]
            }
          ]
        },
        {
          "type": "separator",
          "margin": "sm"
        }
      ],
      "paddingTop": "10px",
      "paddingBottom": "10px",
      "paddingStart": "10px",
      "paddingEnd": "10px"
    }
  }
}

export default matchWhoIsMessage