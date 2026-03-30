const leaveRequestTemplate = ({
    userEmail,
    leaveSubject,
    leaveType,
    fromDate,
    toDate,
    totalDays,
    leaveReasons,
}) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Leave Request</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      color: #333333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }

    .logo {
      max-width: 180px;
      margin-bottom: 20px;
    }

    .message {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .body {
      text-align: left;
      font-size: 15px;
      margin-bottom: 20px;
    }

    .highlight-box {
      background-color: #f4f4f4;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }

    .label {
      font-weight: bold;
    }

    .reason-box {
      background-color: #fafafa;
      padding: 12px;
      border-left: 4px solid red;
      margin-top: 10px;
      border-radius: 5px;
    }

    .footer {
      font-size: 13px;
      color: #999999;
      margin-top: 25px;
    }
  </style>
</head>

<body>
  <div class="container">
    
    <img class="logo"
      src="https://i.ibb.co/7Xyj3PC/logo.png"
      alt="Company Logo" />

    <div class="body">
      <p>Dear Jyoti Ma'am,</p>

      <p>A new leave request has been submitted with the following details:</p>

      <div class="highlight-box">
        <p><span class="label">Employee Email:</span> ${userEmail}</p>
        <p><span class="label">Subject:</span> ${leaveSubject}</p>
        <p><span class="label">Leave Type:</span> ${leaveType}</p>
        <p><span class="label">From:</span> ${fromDate}</p>
        <p><span class="label">To:</span> ${toDate}</p>
        <p><span class="label">Total Days:</span> ${totalDays}</p>
      </div>

      <p class="label">Reason for Leave:</p>
      <div class="reason-box">
        ${leaveReasons}
      </div>

      <p style="margin-top:20px;">
        Please review and take the necessary action.
      </p>
    </div>

    <div class="footer">
      If you have any questions, please contact HR or reply to this email.
    </div>

  </div>
</body>
</html>`;
};

export default leaveRequestTemplate;