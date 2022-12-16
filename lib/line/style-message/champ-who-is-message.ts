import { FlexComponent, FlexContainer } from "@line/bot-sdk";
import { typeChampWhoIs } from "@lib/types";

export default function champWhoIsMessage(predictions:(typeChampWhoIs)[]):FlexContainer {

  var positionBox:(FlexComponent)[] = predictions.map((p, i) => {
    let position = i+1
    return {
      "type": "box",
      "layout": "baseline",
      "contents": [
        {
          "type": "text",
          "text": position.toString(),
          "flex": 0,
          "size": "xxs",
          "color": "#aaaaaa"
        },
        {
          "type": "icon",
          "url": p.line_user_image ?? process.env.SITE_URL + "/images/icons/blank-profile.png",
          "size": "20px"
        },
        {
          "type": "text",
          "text": p.line_user_name ?? 'name',
          "weight": "bold",
          "margin": "sm",
          "flex": 3,
          "size": "xxs",
        },
        {
          "type": "text",
          "text": p.team_champ_name,
          "size": "xxs",
          "align": "start",
          "color": "#aaaaaa",
          "flex": 2
        },
        {
          "type": "text",
          "text": p.point + '',
          "size": "sm",
          "align": "end",
          "color": "#aaaaaa",
          "flex": 1
        }
      ]
    }
  })

  // add header table
  positionBox.unshift(
    {
      "type": "box",
      "layout": "baseline",
      "contents": [
        {
          "type": "text",
          "weight": "bold",
          "margin": "lg",
          "flex": 0,
          "size": "xxs",
          "text": "#",
          "color": "#cccccc"
        },
        {
          "type": "text",
          "text": 'name',
          "weight": "bold",
          "margin": "sm",
          "flex": 3,
          "size": "sm"
        },
        {
          "type": "text",
          "text": 'team',
          "size": "sm",
          "align": "start",
          "flex": 1
        },
        {
          "type": "text",
          "text": 'pts',
          "size": "sm",
          "align": "end",
          "flex": 1
        }
      ]
    }
  )

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
          "text": "สรุปการทายแชมป์",
          "size": "xl",
          "weight": "bold"
        },
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": positionBox,
        }
      ]
    }
  }
}