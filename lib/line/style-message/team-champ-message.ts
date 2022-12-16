import { typeTeamInfo } from "@lib/types";
import { FlexComponent, FlexContainer } from "@line/bot-sdk";

export default function teamChampMessage(teams:(typeTeamInfo)[]):FlexContainer {

  var teamsFlexComponent:(FlexComponent)[] = teams.map(team => {
    return {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "image",
              "url": process.env.SITE_URL + "/images/teams/" + team.image
            }
          ],
          "cornerRadius": "48px",
          "maxWidth": "24px",
          "maxHeight": "24px"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": team.name,
              "weight": "bold",
              "size": "sm",
              "align": "start",
              "margin": "10px",
              "gravity": "center"
            },
            {
              "type": "text",
              "text": (team.champ_score ?? 0) + " point",
              "weight": "bold",
              "size": "sm",
              "align": "end",
              "gravity": "center"
            }
          ],
          "justifyContent": "space-between"
        }
      ],
      "paddingTop": "5px",
      "paddingBottom": "5px",
      "action": {
        "type": "message",
        "label": "action",
        "text": "ทายแชมป์โลกคือ " + team.name
      }
    }
  })

  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": process.env.SITE_URL + "/images/bg-top-ball-3.webp",
      "size": "full",
      "aspectRatio": "3:1",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "แชมป์บอลโลกปีนี้คือใคร",
          "weight": "bold",
          "size": "lg",
          "color": "#aaaaaa"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": teamsFlexComponent
        }
      ],
      "paddingTop": "10px"
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "* คะแนนที่ได้รับตามทีมที่เลือก",
              "size": "xs",
              "color": "#aaaaaa"
            }
          ],
          "paddingAll": "10px"
        }
      ],
      "paddingAll": "0px"
    }
  };
}