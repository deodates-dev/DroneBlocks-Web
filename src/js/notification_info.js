const notificationVersion = 1;
export const NotificationLocalKey = 'notificationVersion';

export const notificationData = {
  version: notificationVersion,
  data: {
      type: "confirm",
      html: true,
      message: `Be sure to check out our new course on accessing Tello's camera with Python and OpenCV. Click <a href="https://learn.droneblocks.io/p/droneblocks-challenge-missions/" target="_blank">here</a> to learn more!`,
      yesMessage: 'Learn More',
      noMessage: 'Close',
      // closeConfirm: "true",
      // overlay: true,
      overlayColor: "#1B1B1B",
      callback: function (selection) {
        if (selection) {
          window.open('https://learn.droneblocks.io/p/droneblocks-challenge-missions/','_blank')
        } else {

        }
        localStorage.setItem(NotificationLocalKey, notificationVersion);
      }
  }
}
