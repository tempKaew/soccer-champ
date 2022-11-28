import { FlexComponent, FlexContainer } from "@line/bot-sdk";
import { typeMathWhoIs } from "@lib/types";

const matchWhoIsMessage = (matchWhoIs:typeMathWhoIs):FlexContainer => {

  //section Home Joiner
  if (matchWhoIs.home.joiner) {
    var componentJoinerHome: (FlexComponent)[] = matchWhoIs.home.joiner?.map(j => {
      return {
        "type": "icon",
        "url": j.image ? j.image : process.env.SITE_URL + "/images/icons/blank-profile.png",
        "margin": "4px"
      }
    })
  }else{
    var componentJoinerHome: (FlexComponent)[] = [{
      "type": "icon",
      "url": process.env.SITE_URL + "/images/icons/blank-profile.png",
      "margin": "4px"
    }]
  }

  //section Visitor Joiner
  if (matchWhoIs.visitor.joiner) {
    var componentJoinerVisitor: (FlexComponent)[] = matchWhoIs.visitor.joiner?.map(j => {
      return {
        "type": "icon",
        "url": j.image ? j.image : process.env.SITE_URL + "/images/icons/blank-profile.png",
        "margin": "4px"
      }
    })
  }else{
    var componentJoinerVisitor: (FlexComponent)[] = [{
      "type": "icon",
      "url": process.env.SITE_URL + "/images/icons/blank-profile.png",
      "margin": "4px"
    }]
  }

  //section Draw Joiner
  if (matchWhoIs.draw.joiner) {
    var componentJoinerDraw: (FlexComponent)[] = matchWhoIs.draw.joiner?.map(j => {
      return {
        "type": "icon",
        "url": j.image ? j.image : process.env.SITE_URL + "/images/icons/blank-profile.png",
        "margin": "4px"
      }
    })
  }else{
    var componentJoinerDraw: (FlexComponent)[] = [{
      "type": "icon",
      "url": process.env.SITE_URL + "/images/icons/blank-profile.png",
      "margin": "4px"
    }]
  }

  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": process.env.SITE_URL + "/images/bg-top-ball-2.webp",
      "size": "full",
      "aspectRatio": "2.5:1",
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
                },
                {
                  "type": "text",
                  "text": matchWhoIs.home.name + "",
                  "size": "xxs",
                  "align": "end",
                  "maxLines": 1
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
                },
                {
                  "type": "text",
                  "text": matchWhoIs.visitor.name + "",
                  "size": "xxs",
                  "align": "start",
                  "maxLines": 1
                }
              ],
              "flex": 3
            }
          ],
          "justifyContent": "space-between",
          "alignItems": "center",
          "spacing": "none",
          "margin": "none",
          "paddingTop": "5px",
          "maxHeight": "60px"
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