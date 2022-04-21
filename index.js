
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const nodemailer = require("nodemailer");

const lates = new Date("2022-06-20");

//change the details here
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haimanot.tekie.test@gmail.com",
    pass: "*********",
  },
});

async function lilleStrøm() {
  const dates = await fetch(
    "https://pass-og-id.politiet.no/qmaticwebbooking/rest/schedule/branches/9362230d4803607d0f874f958a554d0d46642980c7917856a34fa46786acd48e/dates;servicePublicId=d1b043c75655a6756852ba9892255243c08688a071e3b58b64c892524f58d098;customSlotLength=20",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,nb;q=0.8,no;q=0.7",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "JSESSIONID=C82FA4D1BEFCBBF335C9C5FED1A48A9F; TS015c0906=01e8d14cdca3ee99146741008431965c9c12037df17935fed080efc5fc8820b19c4a17ddf7517c4ab28b2b03c65f3a49208672a638057a8821d69ac45fd2b05fb717e0427a; _ga=GA1.2.1141641448.1650302519; _gid=GA1.2.1990322273.1650302519; TS00000000076=088c91bb0eab2800e804926e4e23d1f7ca7d5d2d7a86cdb0a277faf6f8ebde7af115d8f478b4eae46b9b340dc36cdd9208febf07ce09d000002f587b6cb6b946e5214a513969f3aa9863e0f9c9b69d443ab49f9c7b30c427a75b0555f3721c7aadfe149ce57aeb6eef6f07d1050a4d965ec21ae82a4f021926af974f4cfb89a84d5914e20510aa045d027ffe11e0d09ea5bc1f4d035a96fa258f50b1e91fa0c97262a56f300ef53919862949bd065fff6f231cb3e2b98d7b37b9443709fe30306aa7d8f48fb7b6dd9ad4ed4eea7e4902ec64076355d0f079486ce9041725c93ec7710c7e54bebd0ed15cf973209b5ae20dd8c84f45ac29dedcd5748b91908a4b27ee5dfc2abda0f4; TSPD_101_DID=088c91bb0eab2800e804926e4e23d1f7ca7d5d2d7a86cdb0a277faf6f8ebde7af115d8f478b4eae46b9b340dc36cdd9208febf07ce0638007f9f693b644979aa5bfcb68253326afd7ff151288f6075a4ae3cee01a1b3a179afe3a873b6e9fdc5d9ab243874d3eca27c92b5f00d22db24; TS0179792a=01e8d14cdce49a87decca7a0f1ca495d2c992bf0e09333f57bc4cd6a4df5e8f49faee870c5ee1b7758df5310891a2ac9614d647dab; TS67c87cf6027=088c91bb0eab2000c520bc3a9068454b3f2a48ac713af650ccc3fbbd76885bdbbb39086cd7343b0508aaf38b31113000c111ff82df99694cbe185645ad0c0caf16aaca57d336cb1a818fcc175b6c4ad88f0582e6f3a9b17d6567e8ec6a5f8369",
        Referer: "https://pass-og-id.politiet.no/timebestilling/index.html",
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: null,
      method: "GET",
    }
  );
  const response = await dates.json();
  const firstAvailableDate = response[0];

  const firstAvailableDateValue = new Date(`${firstAvailableDate["date"]}`);
  var mailOptions = {
    from: "haimanot.tekie.test@gmail.com",
    to: "haimif@yahoo.com",
    subject: "Sending Email using Node.js",
    text: `First date in lillestrøm: ${firstAvailableDate["date"]}`,
  };
  if (firstAvailableDateValue < lates) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  console.log("lillestrøm", firstAvailableDateValue);
}

//run every 10 seconds
setInterval(function () {
  lilleStrøm();
}, 10000);
