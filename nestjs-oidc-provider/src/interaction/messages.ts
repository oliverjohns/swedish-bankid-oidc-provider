const messages = {
  RFA1: {
    swedish: "Starta BankID-appen.",
    english: "Start your BankID app.",
  },
  RFA2: {
    swedish: "Du har inte BankID-appen installerad. Kontakta din bank.",
    english: "The BankID app is not installed. Please contact your bank.",
  },
  RFA3: {
    swedish: "Åtgärden avbruten. Försök igen",
    english: "Action cancelled. Please try again.",
  },
  RFA4: {
    swedish:
      "En identifiering eller underskrift för det här personnumret är redan påbörjad. Försök igen.",
    english:
      "An identification or signing for this personal number is already started. Please try again.",
  },
  RFA5: {
    swedish: "Internt tekniskt fel. Försök igen.",
    english: "Internal error. Please try again.",
  },
  RFA6: {
    swedish: "Åtgärden avbruten.",
    english: "Action cancelled.",
  },
  RFA8: {
    swedish:
      "BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du skaffa ett hos din bank. Försök sedan igen.",
    english:
      "The BankID app is not responding. Please check that it’s started and that you have internet access. If you don’t have a valid BankID you can get one from your bank. Try again.",
  },
  RFA9: {
    swedish:
      "Skriv in din säkerhetskod i BankID-appen och välj Identifiera eller Skriv under.",
    english:
      "Enter your security code in the BankID app and select Identify or Sign.",
  },
  RFA13: {
    swedish: "Försöker starta BankID-appen.",
    english: "Trying to start your BankID app.",
  },
  RFA14A: {
    swedish:
      "Söker efter BankID, det kan ta en liten stund … Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här datorn. Om du har ett BankID-kort, sätt in det i kortläsaren. Om du inte har något BankID kan du skaffa ett hos din bank. Om du har ett BankID på en annan enhet kan du starta din BankID-app där.",
    english:
      "Searching for BankID, it may take a little while … If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this identification/signing on this computer. If you have a BankID card, please insert it into your card reader. If you don’t have a BankID you can get one from your bank. If you have a BankID on another device you can start the BankID app on that device.",
  },
  RFA14B: {
    swedish:
      "Söker efter BankID, det kan ta en liten stund … Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du skaffa ett hos din bank. Om du har ett BankID på en annan enhet kan du starta din BankID-app där.",
    english:
      "Searching for BankID, it may take a little while … If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this identification/signing on this device. If you don’t have a BankID you can get one from your bank. If you have a BankID on another device you can start the BankID app on that device.",
  },
  RFA15A: {
    swedish:
      "Söker efter BankID, det kan ta en liten stund … Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här datorn. Om du har ett BankID-kort, sätt in det i kortläsaren. Om du inte har något BankID kan du skaffa ett hos din bank.",
    english:
      "Searching for BankID:s, it may take a little while … If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this identification/signing on this computer. If you have a BankID card, please insert it into your card reader. If you don’t have a BankID you can get one from your bank.",
  },
  RFA15B: {
    swedish:
      "Söker efter BankID, det kan ta en liten stund … Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du skaffa ett hos din bank.",
    english:
      "Searching for BankID, it may take a little while … If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this identification/signing on this device. If you don’t have a BankID you can get one from your bank.",
  },
  RFA16: {
    swedish:
      "Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller skaffa ett nytt hos din bank.",
    english:
      "The BankID you are trying to use is blocked or too old. Please use another BankID or get a new one from your bank.",
  },
  RFA17A: {
    swedish:
      "BankID-appen verkar inte finnas i din dator eller mobil. Installera den och skaffa ett BankID hos din bank. Installera appen från din appbutik eller https://install.bankid.com",
    english:
      "The BankID app couldn’t be found on your computer or mobile device. Please install it and get a BankID from your bank. Install the app from your app store or https://install.bankid.com.",
  },
  RFA17B: {
    swedish:
      "Misslyckades att läsa av QR-koden. Starta BankID-appen och läs av QR-koden. Kontrollera att BankID-appen är uppdaterad. Om du inte har BankID-appen måste du installera den och skaffa ett BankID hos din bank. Installera appen från din appbutik eller https://install.bankid.com.",
    english:
      "Failed to scan the QR code. Start the BankID app and scan the QR code. Check that the BankID app is up to date. If you don't have the BankID app, you need to install it and get a BankID from your bank. Install the app from your app store or https://install.bankid.com",
  },
  RFA18: {
    swedish: "Starta BankID-appen.",
    english: "Start the BankID app.",
  },
  RFA19: {
    swedish:
      "Vill du identifiera dig eller skriva under med BankID på den här datorn eller med ett Mobilt BankID?",
    english:
      "Would you like to identify yourself or sign with a BankID on this computer, or with a Mobile BankID?",
  },
  RFA20: {
    swedish:
      "Vill du identifiera dig eller skriva under med ett BankID på den här enheten eller med ett Mobilt BankID?",
    english:
      "Would you like to identify yourself or sign with a BankID on this device, or with a Mobile BankID?",
  },
  RFA21: {
    swedish: "Identifiering eller underskrift pågår.",
    english: "Identification or signing in progress.",
  },
  RFA22: {
    swedish: "Okänt fel. Försök igen.",
    english: "Unknown error. Please try again.",
  },
  RFA23: {
    swedish: "Fotografera och läs av din ID-handling med BankID-appen.",
    english:
      "Process your machine-readable travel document using the BankID app.",
  },
};

export const getMessage = (status: string, hintCode: string) => {
  if (status === "pending") {
    switch (hintCode) {
      case "outstandingTransaction":
        return messages.RFA8;
      case "noClient":
        return messages.RFA1;
      case "started":
        return messages.RFA15A;
      case "userMrtd":
        return messages.RFA23;
      case "userCallConfirm":
        return undefined;
      case "userSign":
        return messages.RFA9;
      default:
        return messages.RFA21;
    }
  }
  if (status === "failed") {
    switch (hintCode) {
      case "expiredTransaction":
        return messages.RFA8;
      case "certificateErr":
        return messages.RFA16;
      case "userCancel":
        return messages.RFA6;
      case "cancelled":
        return messages.RFA3;
      case "startFailed":
        return messages.RFA17A;
      default:
        return messages.RFA22;
    }
  }
};
