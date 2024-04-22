export const resFormatter = (data: any) => {
  const res = {
    status: data.response.status,
    data: data.response.data
  };

  if (typeof res.data === 'string') {
    return {
      status: res.status,
      data: {
        message: res.data
      }
    };
  } else {
    return res;
  }
};

export function formatScheduleTime(scheduleTimeString) {
  const year = scheduleTimeString.substring(0, 4);
  const month = scheduleTimeString.substring(5, 7);
  const day = scheduleTimeString.substring(8, 10);

  const timeSeparatorIndex = scheduleTimeString.indexOf('T');
  const hours = scheduleTimeString.substring(timeSeparatorIndex + 1, timeSeparatorIndex + 3);
  const minutes = scheduleTimeString.substring(timeSeparatorIndex + 4, timeSeparatorIndex + 6);

  const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;

  const formattedTime = `${hours}:${minutes}`;
  return `${formattedDate} - ${formattedTime}`;
}


export function formatTime(date) {
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function generateWhatsAppLink(messageData) {
  const phoneNumber = messageData.whatsappNumber;
  const messageText = messageData.textMsg;

  const formattedMessageText = messageText.replace(/ /g, '%20');

  const linkTemplate = 'https://wa.me/';
  const formattedLink = `${linkTemplate}${phoneNumber}?text=${formattedMessageText}`;

  return formattedLink;
}

export const checkStatus = (response, errMsg) => {
  if (![200, 204, 201].includes(response.status)) {
    throw new Error(`${errMsg}`);
  }
};





