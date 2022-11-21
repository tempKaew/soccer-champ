import { FlexComponent, FlexContainer } from "@line/bot-sdk";
import { userPoint } from "../../types";

const tableMessage = (tables:(userPoint)[]):FlexContainer => {

  const positionBox:(FlexComponent)[] = tables.map((t) => {
    return {
      "type": "box",
      "layout": "baseline",
      "contents": [
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
          "flex": 0,
          "size": "sm"
        },
        {
          "type": "text",
          "text": t.point,
          "size": "sm",
          "align": "end",
          "color": "#aaaaaa"
        }
      ]
    }
  })

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
          "text": "แสดงแค่ 10 อันดับแรกเท่านั้น",
          "wrap": true,
          "color": "#aaaaaa",
          "size": "xxs"
        }
      ]
    }
  }
}

export default tableMessage