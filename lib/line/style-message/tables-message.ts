import { FlexComponent, FlexContainer } from "@line/bot-sdk";
import { userPoint } from "../../types";

const tableMessage = (tables:(userPoint)[], lastDateMatch:string|undefined):FlexContainer => {

  var positionBox:(FlexComponent)[] = tables.map((t, i) => {
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
          "url": t.image ?? process.env.SITE_URL + "/images/icons/blank-profile.png",
          "size": "20px"
        },
        {
          "type": "text",
          "text": t.name ?? 'name',
          "weight": "bold",
          "margin": "sm",
          "flex": 3,
          "size": "xxs",
        },
        {
          "type": "text",
          "text": t.match,
          "size": "sm",
          "align": "end",
          "color": "#aaaaaa",
          "flex": 1
        },
        {
          "type": "text",
          "text": t.point,
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
          "text": 'p',
          "size": "sm",
          "align": "end",
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
          "text": "ตารางอันดับคะแนน",
          "size": "xl",
          "weight": "bold"
        },
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": positionBox,
        },
        {
          "type": "text",
          "text": "ีupdate: "+lastDateMatch,
          "wrap": true,
          "color": "#aaaaaa",
          "size": "xxs"
        }
      ]
    }
  }
}

export default tableMessage