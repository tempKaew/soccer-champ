const historyMatchMessage = () => {
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
          "text": "การทายผลของคุณ",
          "weight": "bold",
          "size": "lg",
          "color": "#aaaaaa"
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
                  "url": "https://sprofile.line-scdn.net/0hYi9VJVWCBkYULy8SxPF4OWR_BSw3Xl9UaEtIdyB4XCUsG0JCPRwcInMpWHYoHBFAME1Ld3QrCnIYPHEgCnn6chMfWHEtGUYUP0tJpA"
                }
              ],
              "cornerRadius": "48px",
              "maxWidth": "48px",
              "maxHeight": "48px"
            },
            {
              "type": "text",
              "text": "Brown CafeBrown CafeBrown Cafe",
              "weight": "bold",
              "size": "lg",
              "align": "start",
              "gravity": "center",
              "margin": "10px"
            }
          ],
          "paddingTop": "10px",
          "paddingBottom": "10px"
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "#",
              "size": "xxs",
              "flex": 0,
              "weight": "bold",
              "color": "#aaaaaa"
            },
            {
              "type": "text",
              "text": "Team",
              "size": "xxs",
              "flex": 4,
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "pts",
              "size": "xxs",
              "flex": 1,
              "weight": "bold"
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "1",
              "size": "xxs",
              "flex": 0,
              "color": "#aaaaaa"
            },
            {
              "type": "text",
              "text": "england 1-0 aaaaaa",
              "size": "xxs",
              "flex": 4,
              "margin": "2px"
            },
            {
              "type": "text",
              "text": "3",
              "size": "xxs",
              "flex": 1
            }
          ]
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "13",
              "size": "xxs",
              "flex": 0,
              "color": "#aaaaaa"
            },
            {
              "type": "text",
              "text": "england 1-0 aaaaaa",
              "size": "xxs",
              "flex": 4,
              "margin": "2px"
            },
            {
              "type": "text",
              "text": "3",
              "size": "xxs",
              "flex": 1
            }
          ]
        }
      ],
      "paddingTop": "10px"
    }
  }
}
export default historyMatchMessage